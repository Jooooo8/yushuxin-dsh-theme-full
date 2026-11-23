"""Generate client.js for the Q-version companion from YOUR OWN artwork/audio.

Provide in assets/character/ (or the flat q版/ folder):
    an open-eye image (any name)
    eyes-closed.jpg  -- optional closed-eye blink frame
    eyes-half.jpg    -- optional half-closed blink frame
Provide two audio clips in assets/audio/ (or 音频/): 1.mp3, 2.mp3.

Both audio files may actually be MP4/M4A despite the .mp3 name; they are
embedded as data:audio/mp4;base64 and decoded by the browser.
"""
import base64
import io
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

HERE = Path(__file__).resolve().parent
ROOTS = [HERE.parent, HERE.parent.parent]


def find_dir(*candidates):
    for root in ROOTS:
        for name in candidates:
            path = root / name
            if path.is_dir():
                return path
    return None


character_dir = find_dir("assets/character", "assets/q版", "q版", "character")
audio_dir = find_dir("assets/audio", "音频", "audio")
all_images = sorted(p for p in character_dir.iterdir() if p.is_file()) if character_dir else []


def pick_image(keyword):
    for p in all_images:
        if keyword in p.name.lower():
            return p
    return None


closed_path = pick_image("closed")
half_path = pick_image("half")
open_path = None
for p in all_images:
    low = p.name.lower()
    if "closed" in low or "half" in low:
        continue
    open_path = p
    break

audio_paths = sorted(p for p in audio_dir.iterdir() if p.is_file()) if audio_dir else []

missing = []
if open_path is None:
    missing.append("an open-eye character image")
if len(audio_paths) < 2:
    missing.append("two audio clips")
if missing:
    print("ERROR: missing", "; ".join(missing))
    sys.exit(1)


def cutout(path):
    """Return (data URI, PNG bytes) for one expression image."""
    im = Image.open(path).convert("RGB")
    probe = im.copy()
    for seed in [(0, 0), (im.width - 1, 0), (0, im.height - 1), (im.width - 1, im.height - 1)]:
        ImageDraw.floodfill(probe, seed, (0, 0, 0), thresh=52)
    a = np.asarray(probe)
    filled = (a[:, :, 0] == 0) & (a[:, :, 1] == 0) & (a[:, :, 2] == 0)
    alpha_img = Image.fromarray(np.where(filled, 0, 255).astype("uint8"), "L")
    alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(0.7))
    rgba = im.convert("RGBA")
    rgba.putalpha(alpha_img)
    bbox = alpha_img.point(lambda p: 255 if p > 12 else 0).getbbox()
    if bbox is None:
        bbox = (0, 0, im.width, im.height)
    margin = 8
    bbox = (
        max(0, bbox[0] - margin), max(0, bbox[1] - margin),
        min(im.width, bbox[2] + margin), min(im.height, bbox[3] + margin),
    )
    cut = rgba.crop(bbox)
    cut.thumbnail((480, 480), Image.LANCZOS)
    buf = io.BytesIO()
    cut.save(buf, format="PNG", optimize=True)
    data = buf.getvalue()
    return "data:image/png;base64," + base64.b64encode(data).decode("ascii"), data


open_uri, open_bytes = cutout(open_path)
(HERE / "character.png").write_bytes(open_bytes)
# Blink frames fall back to the open-eye image when not supplied.
closed_uri = cutout(closed_path)[0] if closed_path else open_uri
half_uri = cutout(half_path)[0] if half_path else open_uri

template = (HERE / "client.template.js").read_text(encoding="utf-8")
template = template.replace("__CHAR__", open_uri)
template = template.replace("__CLOSED__", closed_uri)
template = template.replace("__HALF__", half_uri)
audio_uris = []
for path in audio_paths:
    raw = path.read_bytes()
    audio_uris.append("data:audio/mp4;base64," + base64.b64encode(raw).decode("ascii"))
template = template.replace("__AUDIO__", json.dumps(audio_uris, ensure_ascii=False))

out = HERE / "client.js"
out.write_text(template, encoding="utf-8")
print("open:", open_path.name)
print("closed:", closed_path.name if closed_path else "fallback")
print("half:", half_path.name if half_path else "fallback")
print("audio:", [p.name for p in audio_paths])
print("wrote", out, out.stat().st_size, "bytes")
