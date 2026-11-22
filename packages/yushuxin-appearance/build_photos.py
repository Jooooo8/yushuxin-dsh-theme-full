"""Generate client.js for the filmstrip bundle from YOUR OWN photos.

No third-party artwork is shipped with this repository. Put your photos in one
of these locations, then run this script:

    <repo>/assets/photos/        (recommended)
    <repo>/assets/虞书欣/
    <repo>/虞书欣/
    <repo>/photos/

The script also works in the original flat layout where the photos folder sits
next to the bundle folder. All images are read by content (Pillow detects the
real format), so wrong extensions such as JPEG named .png are handled.
"""
import base64
import io
import json
import sys
from pathlib import Path

from PIL import Image, ImageOps

HERE = Path(__file__).resolve().parent
ROOTS = [HERE.parent, HERE.parent.parent]


def find_dir(*candidates):
    for root in ROOTS:
        for name in candidates:
            path = root / name
            if path.is_dir():
                return path
    return None


photos_dir = find_dir("assets/photos", "assets/虞书欣", "虞书欣", "photos")
if photos_dir is None:
    print("ERROR: no photo folder found.")
    print("Create one of: assets/photos/, assets/虞书欣/, 虞书欣/, photos/")
    print("and put your own images there. See assets/README.md.")
    sys.exit(1)

files = sorted(p for p in photos_dir.iterdir() if p.is_file())
if not files:
    print("ERROR: photo folder is empty:", photos_dir)
    sys.exit(1)

uris = []
for i, path in enumerate(files):
    try:
        with Image.open(path) as im:
            im = ImageOps.exif_transpose(im).convert("RGB")
            im = ImageOps.fit(im, (360, 480), Image.LANCZOS, centering=(0.5, 0.35))
            buf = io.BytesIO()
            im.save(buf, format="JPEG", quality=72, optimize=True)
        b64 = base64.b64encode(buf.getvalue()).decode("ascii")
        uris.append("data:image/jpeg;base64," + b64)
    except Exception as exc:
        print("SKIP", path.name, exc)
    if (i + 1) % 25 == 0:
        print("processed", i + 1, "/", len(files))

if len(uris) < 2:
    print("ERROR: need at least 2 readable images, got", len(uris))
    sys.exit(1)


def crop_square(path, size, quality):
    with Image.open(path) as im:
        im = ImageOps.exif_transpose(im).convert("RGB")
        im = ImageOps.fit(im, (size, size), Image.LANCZOS, centering=(0.5, 0.3))
        buf = io.BytesIO()
        im.save(buf, format="JPEG", quality=quality, optimize=True)
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode("ascii")


# Dedicated portraits for the header avatar and the blank-session Hero brand mark.
avatar = crop_square(files[min(5, len(files) - 1)], 120, 75)
hero = crop_square(files[min(90, len(files) - 1)], 200, 78)

template = (HERE / "client.template.js").read_text(encoding="utf-8")
template = template.replace("__PHOTOS__", json.dumps(uris, ensure_ascii=False))
template = template.replace("__AVATAR__", avatar)
template = template.replace("__HERO__", hero)
out = HERE / "client.js"
out.write_text(template, encoding="utf-8")

print("photos:", len(uris))
print("wrote", out, out.stat().st_size, "bytes")
