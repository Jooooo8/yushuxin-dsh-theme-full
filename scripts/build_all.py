"""Build all generated client bundles from your own assets.

Usage:  python scripts/build_all.py

Requires Pillow and numpy. Generated client.js files are gitignored on purpose:
they embed the artwork you supply, which must not be committed.
"""
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SCRIPTS = [
    ROOT / "packages" / "yushuxin-appearance" / "build_photos.py",
    ROOT / "packages" / "qyu-companion" / "build_assets.py",
]

failed = False
for script in SCRIPTS:
    print("=== building", script.relative_to(ROOT), "===")
    result = subprocess.run([sys.executable, str(script)])
    if result.returncode != 0:
        failed = True
        print("FAILED:", script.name)

if failed:
    print("\nSome bundles could not be built. Check assets/README.md.")
    sys.exit(1)
print("\nAll bundles built. You can now install the three packages.")
