// ═══════════════════════════════════════════════════════════════
//  GAME SETTINGS — change these numbers to balance the game!
//  Rules are explained in docs/game.md. Save, refresh the page, play.
// ═══════════════════════════════════════════════════════════════

const CONFIG = {
  runSeconds: 90,
  toadCount: 5,
  timeBonusPerSecond: 10, // only paid if every Toad Bandit is caught early

  // Gears 1 to 5. Slot 0 is unused so that gearSpeed[3] means gear 3.
  startGear: 2,
  gearSpeed: [0, 200, 280, 380, 480, 580], // pixels per second
  gearDecaySeconds: 6, // lose a gear if the meter is ignored this long
  stridesPerSecond: [0, 2.0, 2.5, 3.0, 3.6, 4.2], // how fast the gallop animation plays in each gear
  toadStepsPerSecond: 5,
  hazardGearLoss: 2,
  lostShowdownGearLoss: 1,

  // Giddy-Up Meter. Widths are a fraction of the bar (0.30 = 30% is green).
  greenWidth: [0, 0.34, 0.30, 0.24, 0.18, 0.13],
  needleSpeed: [0, 0.9, 1.0, 1.2, 1.4, 1.7], // bar-lengths per second
  meterFreezeSeconds: 0.5,

  // Loot Bags and Hazards. Every `spawnEveryPixels`, each Lane rolls the dice.
  spawnEveryPixels: 260,
  lootBagChance: 0.35,
  hazardChance: 0.18,
  lootBagMin: 1,
  lootBagMax: 100,

  // Toad Bandits. toadSpeed sits between gear 2 and gear 3 on purpose:
  // gear 3+ gains on the toad, gear 2 or lower lets it pull away.
  toadSpeed: 330,
  toadValueMin: 100,
  toadValueMax: 250,
  toadFirstDelay: 4, // seconds before the first toad shows up
  toadNextDelay: 4, // seconds after a catch
  toadReturnDelay: 8, // seconds after an escape

  // Lasso Showdown. The bar goes from 0 (empty) to 1 (caught).
  showdownSeconds: 5,
  showdownStart: 0.3,
  showdownFillPerPress: 0.08,
  showdownDrain: 0.2, // per second, for the first toad
  showdownDrainPerCaught: 0.04, // extra drain for each toad already caught

  musicVolume: 0.6, // 0 = silent, 1 = full volume

  idleResetSeconds: 30,
  leaderboardSize: 50,
  leaderboardShown: 10,

  // Not a real lock: anyone can read this file. See docs/adr/0001.
  adminCode: "giddyup",
};

// ═══════════════════════════════════════════════════════════════
//  TEAM TO-DO: replace these starter lists with your own.
// ═══════════════════════════════════════════════════════════════

// Starter facts. Check each one against your innovation project research.
const FACTS = [
  "Cane toads were brought to Australia in 1935 to eat beetles in sugar cane fields. They didn't eat the beetles.",
  "A female cane toad can lay tens of thousands of eggs at a time.",
  "Cane toads ooze poison from the big glands behind their eyes. It can kill animals that try to eat them.",
  "Cane toads are native to Central and South America, not Australia.",
  "Cane toad eggs and tadpoles are poisonous too.",
  "Cane toads keep spreading across northern Australia, many kilometres further every year.",
];

// Codename = one adjective + one animal. Keep every word kind and kid-safe.
const CODENAME_ADJECTIVES = [
  "Dusty", "Turbo", "Rusty", "Speedy", "Lucky", "Sunny", "Mighty", "Sneaky",
  "Jolly", "Rowdy", "Zippy", "Brave", "Clever", "Rapid", "Wild", "Cosmic",
  "Thunder", "Golden", "Silver", "Copper", "Desert", "Midnight", "Electric",
  "Bouncy", "Steady", "Swift", "Daring", "Happy", "Gritty", "Blazing",
];

const CODENAME_ANIMALS = [
  "Wombat", "Galah", "Dingo", "Kangaroo", "Koala", "Emu", "Echidna",
  "Platypus", "Kookaburra", "Wallaby", "Quokka", "Goanna", "Cockatoo",
  "Bilby", "Numbat", "Possum", "Bandicoot", "Quoll", "Cassowary", "Brolga",
  "Lyrebird", "Budgie", "Gecko", "Skink", "Magpie", "Pelican", "Bettong",
  "Potoroo", "Jabiru", "Thorny Devil",
];
