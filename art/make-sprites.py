#!/usr/bin/env python3
"""Turn the full-size ChatGPT images in art/sprites/ into small game sprites in game/sprites/.

Run from the repo root after adding or replacing an image:  python3 art/make-sprites.py
Needs Pillow (pip install pillow).
"""
from pathlib import Path
from PIL import Image

SRC = Path(__file__).parent / "sprites"
OUT = Path(__file__).parent.parent / "game" / "sprites"

# Output height in pixels: twice the biggest size the game draws it at.
HEIGHTS = {
    "silver-rider": 560, "black-rider": 560, "grey-rider": 560,
    "toad-bandit": 300, "toad-showdown": 640,
    "loot-bag": 140, "prickly-pear": 180, "termite-mound": 240,
}
GLOW_ALPHA = 60  # ChatGPT adds a faint glow around sprites; anything fainter than this is erased

OUT.mkdir(exist_ok=True)
for name, height in HEIGHTS.items():
    im = Image.open(SRC / f"{name}.png").convert("RGBA")
    alpha = im.getchannel("A").point(lambda a: 0 if a <= GLOW_ALPHA else a)
    im.putalpha(alpha)
    im = im.crop(alpha.getbbox())  # the game stands sprites on their bottom edge, so no empty margin
    im = im.resize((round(im.width * height / im.height), height), Image.LANCZOS)
    im.quantize(256, method=Image.Quantize.FASTOCTREE).save(OUT / f"{name}.png", optimize=True)

bg = Image.open(SRC / "background.png").convert("RGB")
bg.resize((round(bg.width * 1080 / bg.height), 1080), Image.LANCZOS).save(OUT / "background.jpg", quality=85)

for f in sorted(OUT.iterdir()):
    print(f"{f.name:22s} {Image.open(f).size}  {f.stat().st_size // 1024} KB")
