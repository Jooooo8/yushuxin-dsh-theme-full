"""Generate client.js for the Q-version companion from YOUR OWN artwork/audio.

No third-party artwork is shipped with this repository. Provide:

    <repo>/assets/character/<image>   one chibi image (or assets/q版/)
    <repo>/assets/audio/1.mp3          two audio clips
    <repo>/assets/audio/2.mp3

Also accepts the original flat layout:  q版/ and 音频/ next to the bundle.
Both audio files may actually be MP4/M4A despite the .mp3 name; they are
embedded as data:audio/mp4;base64 and decoded by the browser.
"""
import base64
import io
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageOps

HERE = Path(__file__).resolve().parent
ROOTS = [HERE.parent, HERE.parent.parent]


def find_dir(*candidates):
    for root in ROOTS:
        for name in candidates:
            path = root / name
            if path.is_dir():
                return path
    return None


def first_file(folder):
    if folder is None:
        return None
    items = sorted(p for p in folder.iterdir() if p.is_file())
    return items[0] if items else None


character_dir = find_dir("assets/character", "assets/q版", "q版", "character")
audio_dir = find_dir("assets/audio", "音频", "audio")
character_path = first_file(character_dir)
audio_paths = sorted(p for p in audio_dir.iterdir() if p.is_file()) if audio_dir else []

missing = []
if character_path is None:
    missing.append("character image (assets/character/)")
if len(audio_paths) < 2:
    missing.append("two audio clips (assets/audio/1.mp3, 2.mp3)")
if missing:
    print("ERROR: missing", "; ".join(missing))
    print("See assets/README.md — artwork is NOT included in this repository.")
    sys.exit(1)

# --- cut out the near-white background into a transparent sticker ---
im = Image.open(character_path).convert("RGB")
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
    # Fully light image: nothing survived the cut-out, keep the whole canvas.
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
char_uri = "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode("ascii")
(HERE / "character.png").write_bytes(buf.getvalue())

template = (HERE / "client.template.js").read_text(encoding="utf-8")
template = template.replace("__CHAR__", char_uri)
for n, path in enumerate(audio_paths[:2], start=1):
    raw = path.read_bytes()
    uri = "data:audio/mp4;base64," + base64.b64encode(raw).decode("ascii")
    template = template.replace("__AUDIO%d__" % n, uri)

out = HERE / "client.js"
out.write_text(template, encoding="utf-8")
print("character:", character_path.name)
print("audio:", [p.name for p in audio_paths[:2]])
print("wrote", out, out.stat().st_size, "bytes")
