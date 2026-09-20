// Run with: node game/logic.test.js
const assert = require("node:assert");
const L = require("./logic.js");

let rows = [];
const save = (name, bounty, toads, now) => {
  const result = L.recordRun(rows, name, { bounty, toads }, now, 3);
  rows = result.rows;
  return result.improved;
};

// New rows, sorted by Bounty, ties to the earlier Run
save("Dusty Wombat", 500, 2, 1);
save("Turbo Galah", 900, 4, 2);
save("Rusty Emu", 500, 1, 3);
assert.deepStrictEqual(rows.map((r) => r.codename), ["Turbo Galah", "Dusty Wombat", "Rusty Emu"]);

// Returning player: matched ignoring capitalization and outer spaces, best Bounty kept
assert.strictEqual(L.findCodename(rows, "  dusty WOMBAT ").codename, "Dusty Wombat");
assert.strictEqual(L.findCodename(rows, "Dusty  Wombat"), null);
assert.strictEqual(L.findCodename(rows, "Dusty Womba"), null);
assert.strictEqual(save("dusty wombat", 100, 0, 4), false);
assert.strictEqual(save("dusty wombat", 1000, 5, 5), true);
assert.strictEqual(rows.length, 3);
assert.deepStrictEqual(
  { ...rows[0] },
  { codename: "Dusty Wombat", bounty: 1000, toads: 5, runs: 3, bestAt: 5, lastAt: 5 },
);

// Board is trimmed to size; a Run that doesn't make it has rank 0
save("Lucky Koala", 10, 0, 6);
assert.strictEqual(rows.length, 3);
assert.strictEqual(L.neighbours(rows, "Lucky Koala").rank, 0);

// Neighbours: row above, own row, row below
const middle = L.neighbours(rows, "turbo galah");
assert.strictEqual(middle.rank, 2);
assert.deepStrictEqual(middle.around.map((r) => [r.rank, r.codename]), [
  [1, "Dusty Wombat"], [2, "Turbo Galah"], [3, "Rusty Emu"],
]);
assert.deepStrictEqual(L.neighbours(rows, "Dusty Wombat").around.map((r) => r.rank), [1, 2]);

// New Codenames never collide with the board, even when the word lists run out
assert.strictEqual(L.newCodename(rows, ["Dusty", "Shy"], ["Wombat"], () => 0.99), "Shy Wombat");
assert.strictEqual(L.newCodename(rows, ["Dusty"], ["Wombat"]), "Dusty Wombat 2");

// Meter: green in the middle, red at both ends
assert.strictEqual(L.meterResult(0.5, 0.3), "green");
assert.strictEqual(L.meterResult(0.36, 0.3), "green");
assert.strictEqual(L.meterResult(0.34, 0.3), "red");
assert.strictEqual(L.meterResult(0.9, 0.3), "red");
assert.strictEqual(L.needlePosition(0.25), 0.25);
assert.strictEqual(L.needlePosition(1.75), 0.25);

for (let i = 0; i < 1000; i++) {
  const n = L.randomInt(1, 100);
  assert.ok(n >= 1 && n <= 100 && Number.isInteger(n));
}

console.log("logic ok");
