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

# "name-2.png" is the second animation frame of "name.png". It is shrunk by exactly the same
# amount as frame 1, so the character only stays the same size if ChatGPT drew it the same size.
# If a frame 2 looks too big or small in the game, nudge it here (1.1 = 10% bigger) and re-run.
FRAME_2_SIZE_FIX = {
    "silver-rider-2": 1.0, "black-rider-2": 1.0, "grey-rider-2": 1.0, "toad-bandit-2": 1.0,
}


def clean(im):
    im = im.convert("RGBA")
    alpha = im.getchannel("A").point(lambda a: 0 if a <= GLOW_ALPHA else a)
    im.putalpha(alpha)
    return im.crop(alpha.getbbox())  # the game stands sprites on their bottom edge, so no empty margin


def save(im, scale, name):
    im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
    im.quantize(256, method=Image.Quantize.FASTOCTREE).save(OUT / f"{name}.png", optimize=True)


def frames(name):
    """Frame 1 and (if there is one) frame 2 of a sprite.

    "name-run.png" is both frames side by side in one image, drawn together so they match.
    When it exists it replaces "name.png" and "name-2.png".
    """
    sheet = SRC / f"{name}-run.png"
    if sheet.exists():
        im = Image.open(sheet).convert("RGBA")
        # Cut at the emptiest column in the middle third: the gap between the two characters.
        columns = im.getchannel("A").resize((im.width, 1), Image.BOX).tobytes()
        third = im.width // 3
        cut = min(range(third, 2 * third), key=lambda x: columns[x])
        return im.crop((0, 0, cut, im.height)), im.crop((cut, 0, im.width, im.height))
    frame_2 = SRC / f"{name}-2.png"
    return Image.open(SRC / f"{name}.png"), Image.open(frame_2) if frame_2.exists() else None


OUT.mkdir(exist_ok=True)
for name, height in HEIGHTS.items():
    frame_1, frame_2 = frames(name)
    frame_1 = clean(frame_1)
    scale = height / frame_1.height
    save(frame_1, scale, name)
    if frame_2:
        save(clean(frame_2), scale * FRAME_2_SIZE_FIX.get(f"{name}-2", 1.0), f"{name}-2")

bg = Image.open(SRC / "background.png").convert("RGB")
bg.resize((round(bg.width * 1080 / bg.height), 1080), Image.LANCZOS).save(OUT / "background.jpg", quality=85)

for f in sorted(OUT.iterdir()):
    print(f"{f.name:22s} {Image.open(f).size}  {f.stat().st_size // 1024} KB")
