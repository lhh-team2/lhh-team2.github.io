# Terminators: The Game (spec)

A browser game for the pit table and the team site. A Rider gallops across the outback for 90 seconds, scooping up Loot Bags and lassoing Toad Bandits, to earn the biggest Bounty. Words in **bold** are defined in [`CONTEXT.md`](../CONTEXT.md). Decisions with a "why" behind them are in [`adr/`](adr/).

## The Run

- A **Run** lasts **90 seconds**. It ends early if all **5 Toad Bandits** are caught.
- Catching all 5 early pays a **time bonus of $10 per second left**, so finishing early always beats running out the clock.
- **Bounty** = Loot Bags + caught Toad Bandits + time bonus. Bounty never goes down.
- View: side-on. Three horizontal **Lanes** stacked on screen, the world scrolling right-to-left, the Rider near the left edge facing right. Lower Lanes are drawn slightly larger and in front (the "2.5D").
- Forward movement is automatic. The player only changes Lane and works the Giddy-Up Meter.

## Lanes: Loot Bags and Hazards

- Each Lane randomly spawns **Loot Bags** and **Hazards** ahead of the Rider.
- A Loot Bag is worth a hidden random **$1–$100**. All bags look the same; the amount pops up ("+$37") on pickup.
- A **Hazard** (prickly pear, termite mound) costs **2 gears**. Hazards never cost Bounty.

## Giddy-Up Meter

- Speed is one of **5 gears**. A Run starts in gear 2. Gear never drops below 1.
- The meter sits under the Lanes: a bar coloured **red, green, red** with a needle swinging end to end at constant speed.
- Space stops the needle. **Green: +1 gear. Red: −1 gear.** The needle freezes for 0.5 s, then swings again.
- Ignore the meter and you lose 1 gear about every 6 s.
- The higher the gear, the narrower the green zone and the faster the needle.

## Toad Bandits

- One Toad Bandit is on screen at a time. It appears at the right edge in a random Lane and flees at a pace between gear 2 and gear 3: at gear 3+ you gain on it, at gear 2 or below it pulls away.
- Reach it **in its Lane** to start a **Lasso Showdown**. If you catch up in the wrong Lane, it stays just out of reach until you switch.
- If it gets off the right edge of the screen, it escapes.
- An escaped Toad Bandit is **not gone**: it stays "at large" and comes back after about 8 s in a random Lane. Escaping costs the player time, nothing else.
- Each Toad Bandit's value is a hidden random **$100–$250**, rolled once and unchanged by escapes.
- The HUD shows 5 toad icons: caught or at large.

## Lasso Showdown

- The view zooms in on the Toad Bandit and the 90-second clock **pauses**.
- A tug-of-war bar drains by itself; every Space press fills it. Fill it within **5 s** to catch the toad. Otherwise it escapes and the Rider drops **1 gear**.
- The drain gets faster with each toad **already caught**. A toad that escaped is no harder the next time.
- A catch shows the toad lassoed and carted off. Nothing violent, ever.

## Controls

| | Keyboard | Touch |
|---|---|---|
| Change Lane | ↑ / ↓ or W / S | tap the upper / lower half of the track |
| Giddy-Up Meter, Lasso Showdown | Space | big **GIDDY-UP** button, bottom right |

Touch play is landscape only; portrait shows a "rotate your phone" screen.

## Screens

1. **Title**: pick a Rider (Silver, Black, or Grey; looks only, no stat differences), a static three-picture "how to play" panel, and the top 10.
2. **Run**.
3. **Results**: Bounty broken down into bags, toads, and time bonus; toads caught out of 5; one random cane toad fact; the top 10.
4. **Save**: shows a freshly generated **Codename** with four choices:
   - **Save as Dusty Wombat**
   - **🎲 New name** (as many times as they like)
   - **Returning player?** opens a text box. The entry must match a Codename already on the leaderboard, ignoring capitalization and leading/trailing spaces. No match: "No rider by that name, check the spelling", then retry or go back.
   - **Skip**: don't save.
5. **Rank**: the player's row highlighted, with the rows above and below it. If a returning player didn't beat their best: "Your best is still $1,840."
6. **Play again** returns to Title.

Any screen other than the Run returns to Title after 30 s without input, so the pit-table device is always ready for the next player.

## Leaderboard

- Players never type a name of their own; see [ADR 0001](adr/0001-leaderboard-uses-generated-codenames-only.md).
- Codenames are "adjective + outback animal" from two kid-written, kid-safe word lists (about 30 words each). A Codename already on the board is never offered as a new one.
- **One row per Codename**, holding that player's **best** Bounty. Ties rank the earlier Run higher. The device keeps the top 50; everyone sees the top 10.
- **Admin view** at `/game/#admin`, behind a code kept in `CONFIG`: rank, Codename, best Bounty, toads caught in that Run, number of Runs, last played. Actions: **delete row** and **clear all**. The whiteboard at the pit is copied from here.
- Phase 1 stores the leaderboard in `localStorage`, so it only covers Runs played on that one device.

## How it's built

- Lives in this repo under `game/`, served at `/game/`, with a "Game" link added to `nav:` in `_config.yml`.
- `game/index.html` has **no front matter**, so Jekyll copies it untouched and the game gets the whole screen.
- Plain `<canvas>` and vanilla JavaScript. No framework, no build step.
- Every tunable number (times, gears, spawn chances, green-zone widths, needle speeds, drain rates, payouts, admin code) lives in one `CONFIG` object so the team can balance the game without touching logic. The toad facts and Codename word lists sit beside it.
- Music: one looping clip, `game/music/run.ogg`, plays during the Run (made with [`music-prompts.md`](music-prompts.md); volume is `musicVolume` in `CONFIG`). No sound effects in phase 1.

## Art

Static transparent sprites in `game/sprites/`, made from the full-size originals in `art/sprites/` by `python3 art/make-sprites.py`; the code supplies gallop bob, lean on Lane change, and dust puffs. Riders and the running Toad Bandit can each have a second animation frame (`name-2.png`: horse fully extended, toad on the opposite stride) that the game alternates with the first; without one, that character stays on frame 1. Prompts are in [`art-prompts.md`](art-prompts.md#game-sprites-phase-1).

| File | What |
|---|---|
| `silver-rider.png`, `black-rider.png`, `grey-rider.png` | each Rider mounted on a Robot Horse, side view facing right |
| `silver-rider-2.png`, `black-rider-2.png`, `grey-rider-2.png` | optional gallop frame 2: horse fully extended |
| `toad-bandit.png` | Toad Bandit sprinting, facing right |
| `toad-bandit-2.png` | optional running frame 2: legs swapped. Made by the script from `art/sprites/toad-bandit-run.png` (both frames in one image). Without it the game rocks frame 1 to suggest running |
| `toad-showdown.png` | Lasso Showdown close-up |
| `loot-bag.png`, `prickly-pear.png`, `termite-mound.png` | props |
| `background.jpg` | sideways-scrolling outback strip with empty ground for the Lanes |

## The team still needs to write

- About 10 cane toad facts from the innovation project.
- The two Codename word lists.

## Later phases

- Firebase leaderboard shared across devices. Admin actions need real authentication first (ADR 0001).
- Sound effects, title-screen music, more animation frames, Riders with different stats.

---

## Original brainstorm

The team's first notes, kept as written.


The Perspective of the game is top-down, 2.5D, with Movement limited to one of three lanes that they can move between.

There are three lanes on a track. In each lane, there is a set chance that there will be a bag full of money from $1 to $100, and when you hit that bag, you gain the money.

On the bottom, underneath the lanes, there is a box with a green section and a red section, and a little line that swings between them linearly. When you click space, the bar stops. If it stops in the green, your horse goes faster. If it stops in the red, your horse goes slower.

When you get close to the cane toads, it'll zoom in on the cane toad, and you have to spam space. If you don't spam fast enough, you lose the cane toad. If you spam fast enough, you get the cane toad. When you get the cane toad, you get money. There's a leaderboard where the amount of money you get places you want it.

Arrow keys or WASD can be used to control when there's a keyboard attached, or there can be touch controls for mobile. Movement is limited to going between different lanes, moving vertically up or down. Forward movement is automatic, with the speed changing based on your performance with the timing aspect of the game to change your horse's speed.

For phase 1, the leaderboard should use local storage, but eventually we could use Google Firebase for a global leaderboard in a later phase.

