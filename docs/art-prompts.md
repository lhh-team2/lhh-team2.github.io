# Terminators art prompts (for ChatGPT image generation)

Vocabulary (Badge, Scene, Rider, ...) is defined in [`CONTEXT.md`](../CONTEXT.md).

## How to use

1. Start a **new ChatGPT chat** and paste the whole **Setup message** below. It generates nothing; it just loads the Style Block and Character Blocks into the conversation.
2. Paste **Composition Blocks** one at a time, in the order given. Each one is short because the setup message carries the detail.
3. Generate the five **Character Sheets** first and download each image ChatGPT produces. For every later image, **attach the relevant sheet image files to your message** (the **+** / paperclip button in the message box, or drag and drop) along with the prompt text. ChatGPT uses the pictures as visual references, which is what keeps characters identical between images. Each prompt below says which sheets to attach on its "Upload:" line.
4. To fix something, reply with a targeted edit ("keep everything the same, but make the hat brim wider") instead of re-rolling the whole image.
5. If the chat gets long or you start a new one, paste the Setup message again and re-upload the sheets.

To change the look everywhere, edit the Style Block. To change a character, edit its Character Block. To add game art later, write only a new Composition Block (template at the bottom).

**Printing the pit banner:** ChatGPT output is ~1536×1024, too small for print. Trace the Scene to SVG first (Inkscape *Path → Trace Bitmap*, or vectorizer.ai); the flat style was chosen so this works cleanly.

---

## Setup message (paste first, as one message)

```text
I'm going to ask you for a series of images that must all share one art style and one cast of characters. Do not generate anything yet. Read the STYLE BLOCK and CHARACTER BLOCKS below, apply them to every image I ask for in this conversation, and reply only with "Ready".

=== STYLE BLOCK ===
Flat 2D vector cartoon illustration. Bold, uniform dark navy (#1B1B2F) outlines. Simple cel shading: at most one shadow tone and one highlight tone per surface. No gradients except in a sky. No textures, no photorealism, no 3D rendering, no painterly brushwork. Clean, chunky shapes that stay readable at very small sizes. Tone: friendly, funny, kid-appropriate, Saturday-morning-cartoon energy.

Palette: matte black #2B2D31, gunmetal grey #5E6673, polished silver #C9D1D9, copper #B87333, leather brown #8B5A2B, rope tan #D9B97A, teal #2EC4B6, amber #FFB703, violet #9B5DE5, toad olive-tan #8A7F4F, cream #EADFB4, red ochre earth #B5452A, sunset orange #F4923B, dusk purple #5B3A8C.

Hard rules for every image:
- No guns, holsters, knives, or weapons of any kind. Lassos only.
- Robots never have red eyes, skull or skeletal faces, exposed teeth, or visible endoskeletons. They are rounded, toy-like, and friendly, with expressive glowing screen-style eyes.
- Every character is an original design, not based on any film, TV, game, or toy character.
- No text, letters, numbers, logos, signatures, or watermarks unless the prompt explicitly asks for them. (The single "$" on a money bag is the only standing exception.)

=== CHARACTER BLOCKS ===

SILVER RIDER (the leader): A tall, lanky robot cowboy in polished silver metal. Narrow cylindrical torso, long thin limbs with ball joints, rounded capsule-shaped head with a single wide horizontal visor eye glowing teal. Teal bandana around the neck. Small silver sheriff-star plate on the chest. Traditional brown leather cowboy hat. Carries a tan rope lasso. Confident, cheerful expression.

BLACK RIDER (the eager one): A short, round robot cowboy in matte black metal. Spherical body, stubby arms and legs, dome head with two big round eyes glowing amber. Amber bandana around the neck. Small silver sheriff-star plate on the chest. Traditional brown leather cowboy hat, slightly too big for its head. Carries a tan rope lasso. Excited, wide-eyed expression.

GREY RIDER (the steady one): A medium-height, boxy robot cowboy in gunmetal grey metal. Square torso, blocky shoulders, cube-shaped head with rounded corners, a single springy antenna poking up through the hat, and two square eyes glowing violet. Violet bandana around the neck. Small silver sheriff-star plate on the chest. Traditional brown leather cowboy hat. Carries a tan rope lasso. Calm, determined expression.

ROBOT HORSE: A friendly mechanical horse in brushed steel with copper joints, hooves, and rivets. Barrel-shaped body, segmented neck, blocky head with round softly glowing white eyes, a mane and tail made of flat copper plates, a simple brown leather saddle and reins. All three Riders ride identical Robot Horses.

TOAD BANDIT: A cartoon cane toad outlaw that is clearly a cane toad, not a frog: squat wide body, dry warty olive-tan skin, cream belly, bony ridges over the eyes, and a large swollen gland bulging behind each eye. Wears a black bandit eye-mask and a tiny brown cowboy hat, and clutches a tan burlap money bag marked with a single "$". Runs upright on its back legs. Comically panicked expression: bulging eyes, sweat drops. Never scary, never injured.
```

---

## Composition Blocks (paste one at a time)

### 1–5. Character Sheets

Run once per character, replacing `<CHARACTER>` with `SILVER RIDER`, `BLACK RIDER`, `GREY RIDER`, `ROBOT HORSE`, `TOAD BANDIT`. From the second sheet on, upload the first sheet and add the last line.

```text
Create a character reference sheet for the <CHARACTER>. Landscape 3:2. Plain white background, no scenery, no ground shadow. Show the same character three times at the same scale, full body, evenly spaced: front view, side view facing right, and three-quarter view. Neutral standing pose, lasso coiled in one hand if the character has one. No labels or text.
Match the art style, outline weight, and proportions of the attached sheet exactly.
```

### 6. Badge (with wordmark)

Upload: Silver Rider sheet.

```text
Create the team Badge: a circular emblem, square 1:1 image, transparent background outside the circle. Use the attached SILVER RIDER sheet as the exact character reference.

Inside the circle: a filled sunset orange (#F4923B) disc. Centered on it, the SILVER RIDER from the chest up, facing three-quarters right, hat on, one arm raised swinging a lasso. The lasso rope itself forms the circular border of the emblem, running all the way around the disc as a thick tan rope ring. A thick dark navy outline surrounds the entire emblem so it reads on both light and dark backgrounds.

Across the bottom, overlapping the rope ring, a curved cream ribbon banner with the word "TERMINATORS" in bold dark navy western slab-serif capitals. Spell it exactly: T-E-R-M-I-N-A-T-O-R-S. Beside each end of the ribbon, a small prickly pear cactus pad as an accent. No other text. Keep shapes big and simple: this must stay legible as a 2-inch sticker.
```

### 7. Badge (textless)

Same chat, right after the Badge you like. The favicon is the Rider's head and hat cropped from this.

```text
Make a second version of that exact Badge with the ribbon, the word, and the cactus accents removed. Extend the rope ring to close the circle where the ribbon was. Change nothing else.
```

### 8. Scene

Upload: all five sheets.

```text
Create the Scene: a wide landscape 3:2 illustration. Use the attached sheets as exact character references.

Action, moving left to right: on the left half, the SILVER RIDER, BLACK RIDER, and GREY RIDER each gallop on a ROBOT HORSE, chasing toward the right. Silver Rider is in front, mid-throw, lasso loop flying forward. Black Rider leans so far forward it is nearly falling off. Grey Rider spins a lasso loop overhead. On the right half, three TOAD BANDITS of slightly different sizes sprint away to the right on their back legs, each clutching a "$" money bag, looking back in panic; the flying lasso loop is about to drop over the nearest one. Dust clouds kick up behind the horses and the toads.

Setting: the Australian outback at sunset. Flat red ochre earth, clumps of prickly pear cactus in the foreground and midground, a few scattered gum trees, tall termite mounds, a distant farm windmill and water tank, and generic flat-topped rock outcrops on the horizon (do not depict Uluru or any real landmark). Sky is a smooth gradient from sunset orange at the horizon to dusk purple at the top.

Composition: keep all characters in the lower two-thirds. Leave the top third as open sky with nothing important in it, so the image can be cropped to a wide website header. No text anywhere except the "$" on each money bag.
```

---

## Game sprites (phase 1)

Rules and sprite list come from [`game.md`](game.md). Each character starts as one static sprite; the game code adds the bobbing, leaning, and dust. Second animation frames come after, in the next section. Paste the Setup message first, as always. Save each full-size result into `art/sprites/` under the filename given, then run `python3 art/make-sprites.py` from the repo root. It erases ChatGPT's faint glow, trims the empty margins, shrinks everything, and writes the game-ready files to `game/sprites/`.

### 9–11. Mounted Riders

Run three times, replacing `<RIDER>` with `SILVER RIDER`, `BLACK RIDER`, `GREY RIDER`. Upload: that Rider's sheet and the Robot Horse sheet. Files: `silver-rider.png`, `black-rider.png`, `grey-rider.png`.

```text
Create a game sprite of the <RIDER> riding the ROBOT HORSE, using the attached sheets as exact character references. Landscape 3:2, transparent background, no ground, no ground shadow, no dust, no scenery. Strict side view facing right, whole horse and rider visible, centered, filling about 85% of the frame. The horse is mid-gallop with all four legs tucked under it. The rider leans forward slightly, one hand on the reins, the other holding a coiled tan lasso at its side. No text.
```

### 12. Toad Bandit (running)

Upload: Toad Bandit sheet. File: `toad-bandit.png`.

```text
Create a game sprite of the TOAD BANDIT, using the attached sheet as the exact character reference. Square 1:1, transparent background, no ground, no ground shadow, no dust, no scenery. Strict side view facing right, full body, centered, filling about 80% of the frame. Sprinting upright on its back legs, clutching its "$" money bag against its chest with both arms, head turned to glance back over its shoulder in comic panic. No text other than the "$" on the bag.
```

### 13. Toad Bandit (Lasso Showdown close-up)

Upload: Toad Bandit sheet. File: `toad-showdown.png`.

```text
Create a close-up game sprite of the TOAD BANDIT, using the attached sheet as the exact character reference. Square 1:1, transparent background, no scenery. Three-quarter view facing right, shown from the waist up, filling about 85% of the frame. A loop of tan lasso rope is cinched around its middle, pinning its arms, with the rope leading off the left edge of the image. It strains forward trying to pull away, eyes bulging, sweat drops flying, still hugging its "$" money bag. Funny, not distressing. No text other than the "$" on the bag.
```

### 14. Props

One prompt, one image; cut the three props apart afterwards. Files: `loot-bag.png`, `prickly-pear.png`, `termite-mound.png`.

```text
Create a sheet of three separate game props in a single horizontal row, evenly spaced, not touching or overlapping. Landscape 3:2, transparent background, no ground, no ground shadows. Each prop is seen from the side at eye level:
1. A plump tan burlap money bag tied with rope at the neck, marked with a single "$", sitting upright.
2. A clump of prickly pear cactus: five or six flat green oval pads with short spines and a few pink-red fruits, about as tall as it is wide.
3. A tall, narrow red ochre termite mound with lumpy ridged sides, about twice as tall as it is wide.
No text other than the "$" on the bag.
```

### 15. Background strip

File: `background.png`. This scrolls sideways forever. The game flips every second copy, so the edges always line up even if ChatGPT's don't.

```text
Create a wide scrolling game background of the Australian outback at sunset, 3:2 landscape, designed to tile seamlessly left-to-right: the left and right edges must line up exactly. No characters, no animals, no text.
Top 40%: sky in a smooth gradient from sunset orange at the horizon to dusk purple at the top, with generic flat-topped rock outcrops, a few scattered gum trees, and one distant farm windmill with a water tank on the horizon (do not depict Uluru or any real landmark).
Bottom 60%: completely flat, empty red ochre earth with only very subtle tonal variation. Nothing may be drawn on it (no plants, rocks, tracks, or shadows) because game lanes are drawn over this area.
```

---

## Animation: second frames

The game flips between two pictures of each character to make it run. Frame 1 is the sprite you already have; these prompts make frame 2. A missing frame 2 is fine: that character just stays on frame 1.

Frame 2 only works if it is **the same drawing with different legs**. So the Rider prompts attach frame 1 itself (the full-size file from `art/sprites/`, not the small one in `game/sprites/`) and ask ChatGPT to change as little as possible. (The toad needs a different trick; see prompt 19.) After each result, check it against frame 1 before saving:

- Same size? Flip between the two images in a viewer. The hat, head, and body should stay put while only the legs move.
- Same details? Bandana, eye color, star, saddle, and the horse's color all unchanged.
- If something drifted, reply with a targeted fix (*"the rider's head got bigger; match the attached frame 1 exactly"*) rather than starting over.

Save into `art/sprites/` under the filename given and run `python3 art/make-sprites.py`. If a frame 2 still looks slightly bigger or smaller than frame 1 in the game, nudge it with `FRAME_2_SIZE_FIX` at the top of that script. Gallop speed per gear is `stridesPerSecond` in `game/config.js`.

### 16–18. Mounted Riders, gallop frame 2 (fully extended)

Run three times. Upload: that Rider's frame 1 from `art/sprites/` (for example `silver-rider.png`), plus that Rider's sheet and the Robot Horse sheet. Files: `silver-rider-2.png`, `black-rider-2.png`, `grey-rider-2.png`.

```text
The attached sprite is frame 1 of a two-frame gallop animation: the horse's legs are gathered under its body. Create frame 2: the same horse and rider at full stretch.

Redraw the attached sprite exactly: same character designs, same colors, same outline weight, same size on the canvas, same position on the canvas, same strict side view facing right, same 3:2 landscape canvas, transparent background, no ground, no ground shadow, no dust, no scenery, no text.

Change ONLY these things:
- The horse's front legs reach straight out forward and its hind legs stretch straight out behind, all four hooves off the ground, in the classic fully extended gallop pose.
- The horse's neck and head stretch slightly forward, and its mane and tail stream back a little flatter.
- The rider's hat brim and bandana tails flutter back slightly.

Do not change the rider's pose, the rider's or horse's proportions, the saddle, the reins, the lasso, or anything else. The horse's body and the rider must line up with frame 1 when the two images are laid on top of each other.
```

### 19. Toad Bandit, both running frames in one image

Attaching frame 1 and asking for "the same but with the legs swapped" does not work for the toad: ChatGPT hands back a copy of the attachment. So this prompt does **not** attach the sprite. It asks for both frames, freshly drawn side by side in one image, which keeps them consistent with each other. Use a **new chat** (paste the Setup message first) so earlier attempts don't pull it back to the old picture.

Upload: the Toad Bandit sheet only. File: `toad-bandit-run.png`. The script cuts it into the two frames, and they replace `toad-bandit.png`, so it doesn't matter that the new toad isn't pixel-identical to the old one.

```text
Generate a brand new image (do not edit or reuse an earlier image): a two-frame run cycle sprite sheet of the TOAD BANDIT, using the attached sheet only as the character design reference.

Landscape 3:2, transparent background, no ground, no ground shadows, no dust, no scenery. Two drawings of the same character side by side, one in the left half and one in the right half, with a clear empty gap between them, not touching or overlapping. Both are the same size, stand at the same height, and are seen from the same strict side view facing right, full body. In both, it runs upright, clutches its "$" money bag against its chest with both arms, and looks back over its shoulder in comic panic. The head, hat, mask, arms, bag, and body are identical in both drawings. Only the legs differ:

LEFT drawing: the near leg (closest to the viewer) is swung far forward with the knee lifted high and the foot out in front; the far leg is stretched straight out behind, toes pushing off.

RIGHT drawing: the opposite stride. The near leg is stretched straight out behind, toes pushing off; the far leg is swung far forward with the knee lifted high and the foot out in front.

The two leg poses must be obviously different at a glance. No text other than the "$" on each bag.
```

If the two drawings come back with the same legs again, say which drawing is wrong and what its legs should do (*"the right-hand toad's legs match the left one; its near leg should be stretched out behind"*). Until a second frame exists, the game rocks the single toad picture back and forth as it hops, so it already reads as running.

---

## Template for further game art

For any pose not covered above (or a later phase), fill in this Composition Block per character and pose; nothing above needs to change. Always upload the character's sheet.

```text
Create a game sprite of the <CHARACTER>, using the attached sheet as the exact character reference. Square 1:1, transparent background, no ground shadow, no scenery. Full body, centered, side view facing right, filling about 80% of the frame. Pose: <POSE, e.g. "galloping", "lasso wind-up", "running in panic", "caught in lasso">. No text.
```

For animation, ask for frames in one image so they stay consistent: *"...show 4 frames of a <run cycle> in a single horizontal row, evenly spaced on a 4×1 grid, same scale in every frame."* Mounted Riders: upload both the Rider sheet and the Robot Horse sheet.
