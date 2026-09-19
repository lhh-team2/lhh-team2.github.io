// Rules that don't need a screen: leaderboard, Codenames, meter.
// Check them with: node game/logic.test.js

const sameName = (a, b) => a.trim().toLowerCase() === b.trim().toLowerCase();

function findCodename(rows, typed) {
  return rows.find((row) => sameName(row.codename, typed)) || null;
}

function newCodename(rows, adjectives, animals, random = Math.random) {
  const pick = (list) => list[Math.floor(random() * list.length)];
  for (let tries = 0; tries < 200; tries++) {
    const name = pick(adjectives) + " " + pick(animals);
    if (!findCodename(rows, name)) return name;
  }
  // ponytail: board nearly full of names; number the overflow instead of enumerating what's free
  let n = 2;
  while (findCodename(rows, `${adjectives[0]} ${animals[0]} ${n}`)) n++;
  return `${adjectives[0]} ${animals[0]} ${n}`;
}

// One row per Codename holding that player's best Bounty. Ties rank the earlier Run higher.
function recordRun(rows, codename, run, now, size) {
  rows = rows.map((row) => ({ ...row }));
  let row = findCodename(rows, codename);
  let improved = true;
  if (!row) {
    row = { codename, bounty: run.bounty, toads: run.toads, runs: 0, bestAt: now };
    rows.push(row);
  } else if (run.bounty > row.bounty) {
    Object.assign(row, { bounty: run.bounty, toads: run.toads, bestAt: now });
  } else {
    improved = false;
  }
  row.runs++;
  row.lastAt = now;
  rows.sort((a, b) => b.bounty - a.bounty || a.bestAt - b.bestAt);
  return { rows: rows.slice(0, size), improved };
}

// The player's row with the rows just above and below it. rank is 0 if they fell off the board.
function neighbours(rows, codename) {
  const index = rows.findIndex((row) => sameName(row.codename, codename));
  if (index < 0) return { rank: 0, around: [] };
  const from = Math.max(0, index - 1);
  const around = rows.slice(from, index + 2).map((row, i) => ({ ...row, rank: from + i + 1 }));
  return { rank: index + 1, around };
}

// position and greenWidth are fractions of the bar; green sits in the middle.
function meterResult(position, greenWidth) {
  return Math.abs(position - 0.5) <= greenWidth / 2 ? "green" : "red";
}

// Needle swings 0 → 1 → 0 at a steady speed.
function needlePosition(travelled) {
  const t = travelled % 2;
  return t <= 1 ? t : 2 - t;
}

const randomInt = (min, max, random = Math.random) => min + Math.floor(random() * (max - min + 1));

if (typeof module !== "undefined") {
  module.exports = { findCodename, newCodename, recordRun, neighbours, meterResult, needlePosition, randomInt };
}
