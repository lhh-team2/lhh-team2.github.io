# Terminators music prompts (for Gemini music generation)

Vocabulary (Run, Rider, Toad Bandit, ...) is defined in [`CONTEXT.md`](../CONTEXT.md). Art prompts are in [`art-prompts.md`](art-prompts.md).

## How to use

1. Open the Gemini app, choose **Create music**, and paste one prompt below as-is.
2. Generate a few takes and keep the one that loops best: play it twice back to back and listen for a bump at the join.
3. If it is close, reply with a targeted edit ("same track, but no harmonica" / "faster, around 150 BPM") instead of re-rolling.
4. If Gemini adds singing anyway, reply "instrumental only, remove all vocals".
5. Gemini clips are short (about 30 seconds). That is fine: the game loops the clip for the whole 90-second Run.
6. Trim the loop in Audacity and export it as **OGG Vorbis** to `game/music/run.ogg` (and `game/music/title.ogg`). Not MP3: MP3 adds a sliver of silence at each end, so the loop clicks at the join. Keep a WAV copy as the master.

---

## 1. Run loop (the main one)

```text
Create an instrumental background music loop for a kids' browser arcade game. No vocals, no lyrics, no spoken words, no sound effects.

The game: friendly toy-like robot cowboys gallop on horseback across the Australian outback at sunset, scooping up loot bags and lassoing runaway cane toad bandits against a 90-second clock. The tone is funny, cheerful and adventurous, like a Saturday-morning cartoon. Never dark, menacing, or sad.

Style: upbeat outback-western chase music with a light robotic twist.
- Tempo: about 140 BPM, 4/4, with a steady galloping "da-da-dum, da-da-dum" rhythm that never lets up.
- Lead: a catchy, whistle-able melody on twangy acoustic guitar and banjo, answered by harmonica.
- Rhythm: brushed snare and woodblock or clapsticks for the hoofbeats, bouncy upright bass, a jaw harp boing for comedy.
- Colour: a low didgeridoo-style drone underneath, plus a few playful chiptune synth blips and beeps to hint that the riders are robots. Keep the synths as seasoning; the acoustic instruments lead.
- Key: bright major key. Energetic from the very first beat.

Looping rules (important): this clip repeats back to back for the whole game.
- No intro, no build-up, no fade-in, no fade-out, no big ending.
- Same tempo and same energy from the first second to the last.
- End on a bar that leads straight back into the first bar.

Mix: keep it light and uncluttered so game sound effects can sit on top. No long silences, no sudden loud hits.

It must be an original composition. Do not imitate any existing film, TV, or game theme.
```

## 2. Title and leaderboard loop (optional)

```text
Create an instrumental background music loop for the title screen of a kids' browser arcade game. No vocals, no lyrics, no spoken words, no sound effects.

The game: friendly toy-like robot cowboys in the Australian outback at sunset, about to ride out after runaway cane toad bandits. Tone: warm, relaxed, a little cheeky, like the calm before a cartoon chase.

Style: laid-back outback-western campfire tune with a light robotic twist.
- Tempo: about 95 BPM, 4/4, easy clip-clop walking rhythm.
- Lead: gentle twangy acoustic guitar melody with lazy harmonica replies. Use the same kind of melody a faster chase version could be built from.
- Rhythm: soft shaker and woodblock hoof-steps, upright bass.
- Colour: a low didgeridoo-style drone, and an occasional soft chiptune synth blip to hint that the riders are robots.
- Key: bright major key.

Looping rules (important): this clip repeats back to back while the player reads the screen.
- No intro, no fade-in, no fade-out, no big ending.
- Same tempo and energy throughout, ending on a bar that leads straight back into the first bar.

Mix: quiet and uncluttered. It must be an original composition. Do not imitate any existing film, TV, or game theme.
```
