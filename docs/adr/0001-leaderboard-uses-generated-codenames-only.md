# Leaderboard uses generated Codenames only; players never type a name

Players are children and the leaderboard is headed for a public cloud database, so the game never asks for a name: every saved Run gets a randomly generated Codename, and a returning player reclaims theirs by typing it exactly (case-insensitive) or is rejected. We gave up personal names on the board, and accepted that anyone who knows a Codename can play under it, in exchange for storing no personal information and needing no name moderation.

The phase 1 leaderboard lives in `localStorage`, so it only records Runs played on one shared pit-table device, and its admin code (for deleting rows) is checked in client-side JavaScript. That is a curtain, not a lock, and must be replaced with real authentication before admin actions exist in the Firebase phase.
