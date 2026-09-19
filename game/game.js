"use strict";
// The game itself. Rules: docs/game.md. Numbers to tune: config.js. Words like Run, Lane,
// Loot Bag, Giddy-Up Meter, Lasso Showdown, Bounty, Codename: CONTEXT.md.

const W = 960, H = 540; // the canvas is always drawn at this size, then stretched to fit
const RIDER_X = 170;
const GROUND_Y = 216;
const LANES = [
  { y: 303, scale: 0.85 },
  { y: 378, scale: 1.0 },
  { y: 453, scale: 1.15 },
];
const METER = { x: 220, y: 492, w: 520, h: 30 };
const CATCH_GAP = 90;

const RIDERS = [
  { id: "silver", name: "Silver Rider", body: "#C9D1D9", accent: "#2EC4B6" },
  { id: "black", name: "Black Rider", body: "#2B2D31", accent: "#FFB703" },
  { id: "grey", name: "Grey Rider", body: "#5E6673", accent: "#9B5DE5" },
];

const $ = (id) => document.getElementById(id);
const canvas = $("canvas");
const ctx = canvas.getContext("2d");
const stage = $("stage");
const money = (n) => "$" + n.toLocaleString("en-US");
const pickOne = (list) => list[Math.floor(Math.random() * list.length)];

// Sprites are optional: until a file exists in game/sprites/, a simple drawn shape stands in.
const SPRITES = {};
for (const name of ["silver-rider", "black-rider", "grey-rider", "toad-bandit", "toad-showdown",
  "loot-bag", "prickly-pear", "termite-mound", "background"]) {
  const img = new Image();
  img.onload = () => { SPRITES[name] = img; };
  img.src = `sprites/${name}.png`;
}

let screen = "title";
let rider = RIDERS[0];
let run = null; // the Run being played
let lastRun = null; // the finished Run waiting to be saved
let lastInput = performance.now();

// ─────────────────────────── Leaderboard storage ───────────────────────────

const STORAGE_KEY = "terminators.leaderboard.v1";

function loadBoard() {
  try {
    const rows = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(rows) ? rows : [];
  } catch {
    return [];
  }
}

function storeBoard(rows) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
  } catch {
    // Private browsing or storage full: the game still plays, the Bounty just isn't kept.
  }
}

// ─────────────────────────────── The Run ───────────────────────────────

function newRun() {
  return {
    time: CONFIG.runSeconds,
    clock: 0,
    bounty: 0, fromBags: 0, fromToads: 0, timeBonus: 0,
    gear: CONFIG.startGear,
    dist: 0,
    nextSpawnAt: W * 0.8,
    items: [],
    lane: 1,
    y: LANES[1].y,
    meter: { travelled: 0, freeze: 0, sinceHit: 0 },
    toads: Array.from({ length: CONFIG.toadCount }, () => ({
      value: randomInt(CONFIG.toadValueMin, CONFIG.toadValueMax),
      caught: false,
    })),
    toad: null, // the Toad Bandit on screen right now
    toadTimer: CONFIG.toadFirstDelay,
    showdown: null,
    popups: [],
    dust: [],
  };
}

function changeGear(by) {
  run.gear = Math.max(1, Math.min(5, run.gear + by));
}

function popup(text, x, y, color = "#FFB703") {
  run.popups.push({ text, x, y, color, life: 1.2 });
}

function spawnColumn(x) {
  const column = LANES.map(() => {
    const roll = Math.random();
    if (roll < CONFIG.hazardChance) return pickOne(["prickly-pear", "termite-mound"]);
    if (roll < CONFIG.hazardChance + CONFIG.lootBagChance) return "loot-bag";
    return null;
  });
  // Always leave a way through.
  if (column.every((kind) => kind && kind !== "loot-bag")) column[randomInt(0, 2)] = null;
  column.forEach((kind, lane) => {
    if (kind) run.items.push({ kind, lane, x: x + randomInt(-40, 40), hit: false });
  });
}

function updateRun(dt) {
  const r = run;
  r.clock += dt;
  if (r.showdown) return updateShowdown(dt);

  r.time -= dt;
  if (r.time <= 0) return endRun();

  const speed = CONFIG.gearSpeed[r.gear];
  r.dist += speed * dt;
  r.y += (LANES[r.lane].y - r.y) * Math.min(1, dt * 14);

  // Giddy-Up Meter
  if (r.meter.freeze > 0) r.meter.freeze -= dt;
  else r.meter.travelled += CONFIG.needleSpeed[r.gear] * dt;
  r.meter.sinceHit += dt;
  if (r.meter.sinceHit >= CONFIG.gearDecaySeconds) {
    r.meter.sinceHit = 0;
    if (r.gear > 1) popup("Slowing down...", METER.x + METER.w / 2, METER.y - 10, "#EADFB4");
    changeGear(-1);
  }

  // Loot Bags and Hazards
  while (r.dist + W + 100 > r.nextSpawnAt) {
    spawnColumn(r.nextSpawnAt);
    r.nextSpawnAt += CONFIG.spawnEveryPixels;
  }
  for (const item of r.items) {
    const x = item.x - r.dist;
    if (item.hit || item.lane !== r.lane || Math.abs(x - RIDER_X) > 45) continue;
    item.hit = true;
    if (item.kind === "loot-bag") {
      const value = randomInt(CONFIG.lootBagMin, CONFIG.lootBagMax);
      r.bounty += value;
      r.fromBags += value;
      popup("+" + money(value), RIDER_X + 30, r.y - 120);
    } else {
      changeGear(-CONFIG.hazardGearLoss);
      popup("OUCH!", RIDER_X + 30, r.y - 120, "#FF6B5E");
    }
  }
  r.items = r.items.filter((item) => item.x - r.dist > -120 && !(item.hit && item.kind === "loot-bag"));

  updateToad(dt, speed);

  for (const p of r.popups) { p.y -= 40 * dt; p.life -= dt; }
  r.popups = r.popups.filter((p) => p.life > 0);
  if (Math.random() < dt * speed / 25) {
    r.dust.push({ x: RIDER_X - 50, y: r.y - 4, size: 5 + Math.random() * 8, life: 0.6 });
  }
  for (const d of r.dust) { d.x -= speed * dt * 0.6; d.life -= dt; }
  r.dust = r.dust.filter((d) => d.life > 0);
}

function updateToad(dt, speed) {
  const r = run;
  if (!r.toad) {
    r.toadTimer -= dt;
    const atLarge = r.toads.map((t, i) => (t.caught ? -1 : i)).filter((i) => i >= 0);
    if (r.toadTimer <= 0 && atLarge.length) {
      r.toad = { index: pickOne(atLarge), lane: randomInt(0, 2), x: W + 60, entering: true };
    }
    return;
  }
  const toad = r.toad;
  if (toad.entering) {
    toad.x -= 260 * dt;
    if (toad.x <= 700) toad.entering = false;
  } else {
    toad.x += (CONFIG.toadSpeed - speed) * dt;
  }
  if (toad.x - RIDER_X <= CATCH_GAP) {
    if (toad.lane === r.lane) return startShowdown();
    toad.x = RIDER_X + CATCH_GAP; // wrong Lane: it stays just out of reach
  }
  if (!toad.entering && toad.x > W + 80) {
    r.toad = null;
    r.toadTimer = CONFIG.toadReturnDelay;
    popup("It got away... it'll be back!", W - 260, LANES[toad.lane].y - 60, "#EADFB4");
  }
}

// ─────────────────────────── Lasso Showdown ───────────────────────────

function startShowdown() {
  const caught = run.toads.filter((t) => t.caught).length;
  run.showdown = {
    bar: CONFIG.showdownStart,
    time: CONFIG.showdownSeconds,
    drain: CONFIG.showdownDrain + CONFIG.showdownDrainPerCaught * caught,
    intro: 0.9,
    result: null,
    resultTimer: 1.3,
  };
}

function updateShowdown(dt) {
  const s = run.showdown;
  if (s.intro > 0) { s.intro -= dt; return; }
  if (s.result) {
    s.resultTimer -= dt;
    if (s.resultTimer <= 0) finishShowdown();
    return;
  }
  s.time -= dt;
  s.bar = Math.max(0, s.bar - s.drain * dt);
  if (s.time <= 0) s.result = "lose";
}

function pressShowdown() {
  const s = run.showdown;
  if (s.intro > 0 || s.result) return;
  s.bar += CONFIG.showdownFillPerPress;
  if (s.bar < 1) return;
  s.bar = 1;
  s.result = "win";
  const toad = run.toads[run.toad.index];
  toad.caught = true;
  run.bounty += toad.value;
  run.fromToads += toad.value;
}

function finishShowdown() {
  const won = run.showdown.result === "win";
  if (!won) changeGear(-CONFIG.lostShowdownGearLoss);
  run.toadTimer = won ? CONFIG.toadNextDelay : CONFIG.toadReturnDelay;
  run.toad = null;
  run.showdown = null;
  run.meter.sinceHit = 0;
  if (run.toads.every((t) => t.caught)) endRun();
}

function endRun() {
  const r = run;
  const toads = r.toads.filter((t) => t.caught).length;
  const perfect = toads === r.toads.length;
  r.timeBonus = perfect ? Math.floor(Math.max(0, r.time)) * CONFIG.timeBonusPerSecond : 0;
  r.bounty += r.timeBonus;
  lastRun = { bounty: r.bounty, toads, perfect, fromBags: r.fromBags, fromToads: r.fromToads, timeBonus: r.timeBonus };
  run = null;
  showResults();
}

// ─────────────────────────────── Controls ───────────────────────────────

function moveLane(by) {
  if (!run || run.showdown) return;
  run.lane = Math.max(0, Math.min(LANES.length - 1, run.lane + by));
}

function pressGiddyUp() {
  if (!run) return;
  if (run.showdown) return pressShowdown();
  const m = run.meter;
  if (m.freeze > 0) return;
  const green = meterResult(needlePosition(m.travelled), CONFIG.greenWidth[run.gear]) === "green";
  changeGear(green ? 1 : -1);
  m.freeze = CONFIG.meterFreezeSeconds;
  m.sinceHit = 0;
  popup(green ? "GIDDY-UP!" : "WHOA...", METER.x + METER.w / 2, METER.y - 10, green ? "#2ECC71" : "#FF6B5E");
}

addEventListener("keydown", (e) => {
  lastInput = performance.now();
  if (screen !== "run") return;
  const lane = { ArrowUp: -1, KeyW: -1, ArrowDown: 1, KeyS: 1 }[e.code];
  if (!lane && e.code !== "Space") return;
  e.preventDefault();
  if (e.repeat) return; // holding a key down is not mashing
  if (lane) moveLane(lane);
  else pressGiddyUp();
});

canvas.addEventListener("pointerdown", (e) => {
  if (screen !== "run") return;
  if (run.showdown) return pressGiddyUp();
  const box = canvas.getBoundingClientRect();
  const y = (e.clientY - box.top) * (H / box.height);
  moveLane(y < (GROUND_Y + METER.y) / 2 ? -1 : 1);
});

$("giddyup").addEventListener("pointerdown", (e) => {
  e.preventDefault();
  pressGiddyUp();
});

addEventListener("pointerdown", () => { lastInput = performance.now(); });

// ─────────────────────────────── Drawing ───────────────────────────────

function drawSprite(name, x, feetY, height, fallback) {
  const img = SPRITES[name];
  if (!img) return fallback(x, feetY, height);
  const width = height * img.width / img.height;
  ctx.drawImage(img, x - width / 2, feetY - height, width, height);
}

function box(color, x, y, w, h) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function blob(color, x, y, rx, ry) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
}

function text(str, x, y, size, color = "#EADFB4", align = "center") {
  ctx.font = `bold ${size}px "Trebuchet MS", system-ui, sans-serif`;
  ctx.textAlign = align;
  ctx.lineWidth = size / 6;
  ctx.strokeStyle = "#1B1B2F";
  ctx.lineJoin = "round";
  ctx.strokeText(str, x, y);
  ctx.fillStyle = color;
  ctx.fillText(str, x, y);
}

// Stand-in shapes, used only while a sprite file is missing.
const FALLBACK = {
  rider(x, y, h) {
    const u = h / 120;
    box("#B87333", x - 38 * u, y - 40 * u, 9 * u, 40 * u);
    box("#B87333", x + 28 * u, y - 40 * u, 9 * u, 40 * u);
    blob("#9AA3AD", x, y - 50 * u, 52 * u, 22 * u); // horse body
    blob("#9AA3AD", x + 56 * u, y - 72 * u, 18 * u, 13 * u); // horse head
    box(rider.body, x - 14 * u, y - 100 * u, 28 * u, 42 * u);
    blob(rider.body, x, y - 108 * u, 15 * u, 13 * u);
    box(rider.accent, x - 14 * u, y - 98 * u, 28 * u, 7 * u); // bandana
    box(rider.accent, x + 2 * u, y - 112 * u, 12 * u, 5 * u); // eye glow
    box("#8B5A2B", x - 26 * u, y - 120 * u, 52 * u, 6 * u);
    box("#8B5A2B", x - 13 * u, y - 132 * u, 26 * u, 14 * u);
  },
  toad(x, y, h) {
    const u = h / 80;
    blob("#8A7F4F", x, y - 30 * u, 32 * u, 28 * u);
    blob("#EADFB4", x + 6 * u, y - 22 * u, 18 * u, 16 * u);
    box("#1B1B2F", x - 4 * u, y - 50 * u, 34 * u, 9 * u); // bandit mask
    blob("#D9B97A", x - 26 * u, y - 24 * u, 14 * u, 16 * u);
    text("$", x - 26 * u, y - 18 * u, 18 * u, "#1B1B2F");
  },
  "loot-bag"(x, y, h) {
    blob("#D9B97A", x, y - h * 0.4, h * 0.42, h * 0.4);
    box("#D9B97A", x - h * 0.15, y - h, h * 0.3, h * 0.3);
    text("$", x, y - h * 0.25, h * 0.5, "#1B1B2F");
  },
  "prickly-pear"(x, y, h) {
    blob("#4E8B3A", x, y - h * 0.3, h * 0.3, h * 0.3);
    blob("#5FA347", x - h * 0.3, y - h * 0.65, h * 0.22, h * 0.26);
    blob("#5FA347", x + h * 0.28, y - h * 0.7, h * 0.22, h * 0.28);
    blob("#E0457B", x + h * 0.3, y - h * 0.98, h * 0.08, h * 0.08);
  },
  "termite-mound"(x, y, h) {
    ctx.fillStyle = "#7A2E1C";
    ctx.beginPath();
    ctx.moveTo(x - h * 0.28, y);
    ctx.lineTo(x - h * 0.1, y - h);
    ctx.lineTo(x + h * 0.12, y - h * 0.92);
    ctx.lineTo(x + h * 0.28, y);
    ctx.fill();
  },
};
const ITEM_HEIGHT = { "loot-bag": 46, "prickly-pear": 62, "termite-mound": 84 };

function drawBackground(dist) {
  const bg = SPRITES.background;
  if (bg) {
    const width = bg.width * H / bg.height;
    for (let x = -((dist * 0.25) % width); x < W; x += width) ctx.drawImage(bg, x, 0, width, H);
  } else {
    const sky = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
    sky.addColorStop(0, "#5B3A8C");
    sky.addColorStop(1, "#F4923B");
    box(sky, 0, 0, W, GROUND_Y);
    for (let i = 0; i < 3; i++) { // far-off rock outcrops
      const x = ((i * 420 - dist * 0.25) % 1260 + 1260) % 1260 - 200;
      box("#7A2E1C", x, GROUND_Y - 46 - i * 12, 190 - i * 30, 46 + i * 12);
    }
    box("#B5452A", 0, GROUND_Y, W, H - GROUND_Y);
  }
  // Lane lines rush past at full speed so the gear changes can be felt.
  LANES.forEach((lane, i) => {
    box(`rgba(27, 27, 47, ${0.06 + i * 0.04})`, 0, lane.y - 63, W, 75);
    ctx.fillStyle = "rgba(234, 223, 180, .45)";
    for (let x = -(dist % 120); x < W; x += 120) ctx.fillRect(x, lane.y + 10, 50, 3);
  });
}

function drawRun() {
  const r = run;
  drawBackground(r.dist);

  for (const d of r.dust) blob(`rgba(234, 223, 180, ${d.life})`, d.x, d.y, d.size, d.size * 0.6);

  // Far Lanes first so near Lanes overlap them.
  LANES.forEach((lane, i) => {
    for (const item of r.items) {
      if (item.lane !== i) continue;
      ctx.globalAlpha = item.hit ? 0.35 : 1;
      drawSprite(item.kind, item.x - r.dist, lane.y, ITEM_HEIGHT[item.kind] * lane.scale, FALLBACK[item.kind]);
      ctx.globalAlpha = 1;
    }
    if (r.toad && r.toad.lane === i) {
      const hop = Math.abs(Math.sin(r.clock * 14)) * 10;
      drawSprite("toad-bandit", r.toad.x, lane.y - hop, 84 * lane.scale, FALLBACK.toad);
    }
    if (r.lane === i) drawRider(RIDER_X, r.y, 128 * lane.scale, (LANES[r.lane].y - r.y) * 0.004);
  });

  drawHud();
  drawMeter();
  for (const p of r.popups) {
    ctx.globalAlpha = Math.min(1, p.life * 2);
    text(p.text, p.x, p.y, 26, p.color);
    ctx.globalAlpha = 1;
  }
  if (r.showdown) drawShowdown();
}

function drawRider(x, feetY, height, lean) {
  const bob = Math.sin(run.clock * (6 + run.gear * 2)) * 4;
  ctx.save();
  ctx.translate(x, feetY + bob);
  ctx.rotate(lean);
  drawSprite(rider.id + "-rider", 0, 0, height, FALLBACK.rider);
  ctx.restore();
}

function drawHud() {
  const r = run;
  box("rgba(27, 27, 47, .8)", 0, 0, W, 46);
  const seconds = Math.ceil(Math.max(0, r.time));
  text(`${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`, 20, 33, 28,
    seconds <= 10 ? "#FF6B5E" : "#EADFB4", "left");
  text(money(r.bounty), W / 2, 34, 30, "#FFB703");
  r.toads.forEach((toad, i) => {
    const x = W - 30 - i * 40;
    blob(toad.caught ? "#FFB703" : "#8A7F4F", x, 23, 15, 13);
    if (toad.caught) text("✓", x, 31, 22, "#1B1B2F");
  });
}

function drawMeter() {
  const r = run;
  const { x, y, w, h } = METER;
  box("rgba(27, 27, 47, .8)", 0, y - 16, W, H - y + 16);
  text("GEAR", 60, y + 23, 20);
  for (let g = 1; g <= 5; g++) box(g <= r.gear ? "#FFB703" : "#3A3A55", 92 + g * 20, y + 26 - g * 5, 15, g * 5 + 4);

  const green = CONFIG.greenWidth[r.gear] * w;
  box("#1B1B2F", x - 4, y - 4, w + 8, h + 8);
  box("#C0392B", x, y, w, h);
  box("#2ECC71", x + (w - green) / 2, y, green, h);
  const needle = x + needlePosition(r.meter.travelled) * w;
  box("#1B1B2F", needle - 5, y - 9, 10, h + 18);
  box("#EADFB4", needle - 2, y - 7, 4, h + 14);
}

function drawShowdown() {
  const s = run.showdown;
  box("rgba(27, 27, 47, .82)", 0, 0, W, H);

  const pull = s.result === "win" ? 1 : s.bar;
  const shake = s.result ? 0 : Math.sin(run.clock * 40) * 3;
  const toadX = (s.result === "lose" ? 760 + (1.3 - s.resultTimer) * 500 : 760 - pull * 200) + shake;
  ctx.strokeStyle = "#D9B97A";
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(250, 330);
  ctx.quadraticCurveTo((250 + toadX) / 2, 330 + (1 - pull) * 60, toadX - 60, 350);
  if (s.result !== "lose") ctx.stroke();
  drawSprite(rider.id + "-rider", 210, 470, 280, FALLBACK.rider);
  drawSprite("toad-showdown", toadX, 480, 300, FALLBACK.toad);

  if (s.intro > 0) return text("LASSO SHOWDOWN!", W / 2, 120, 64, "#FFB703");
  if (s.result === "win") return text("GOTCHA!  +" + money(run.toads[run.toad.index].value), W / 2, 120, 58, "#2ECC71");
  if (s.result === "lose") return text("IT GOT AWAY!", W / 2, 120, 58, "#FF6B5E");

  const touch = matchMedia("(pointer: coarse)").matches;
  text(touch ? "MASH THE BUTTON!" : "MASH SPACE!", W / 2, 70, 44, "#FFB703");
  box("#1B1B2F", 196, 96, 568, 48);
  box("#3A3A55", 200, 100, 560, 40);
  box("#FFB703", 200, 100, 560 * Math.min(1, s.bar), 40);
  text(s.time.toFixed(1), W / 2, 190, 36, s.time < 2 ? "#FF6B5E" : "#EADFB4");
}

// ─────────────────────────────── Screens ───────────────────────────────

let focusTimer = 0;

function show(name, focusId) {
  screen = name;
  stage.classList.toggle("running", name === "run");
  for (const el of document.querySelectorAll(".screen")) el.classList.toggle("on", el.id === "screen-" + name);
  lastInput = performance.now();
  // Focus arrives late so a player still mashing Space from the Run can't skip a screen by accident.
  clearTimeout(focusTimer);
  document.activeElement?.blur();
  if (focusId) focusTimer = setTimeout(() => $(focusId).focus(), 1200);
}

function fillTable(table, headings, rows, highlight) {
  table.replaceChildren();
  const addRow = (cells, tag) => {
    const tr = table.insertRow();
    cells.forEach((cell, i) => {
      const el = tr.appendChild(document.createElement(tag));
      if (cell instanceof Node) el.append(cell);
      else el.textContent = cell;
      if (typeof cell === "number" || /^[$#]/.test(cell)) el.className = "num";
      if (i === 0 && tag === "th") el.className = "num";
    });
    return tr;
  };
  if (headings) addRow(headings, "th");
  for (const row of rows) addRow(row.cells, "td").classList.toggle("me", row.key === highlight);
}

const boardRow = (row, rank) => ({ key: row.codename, cells: ["#" + rank, row.codename, money(row.bounty)] });

function showTitle() {
  run = null;
  const top = loadBoard().slice(0, CONFIG.leaderboardShown);
  const board = $("title-board");
  board.replaceChildren();
  if (top.length) {
    const table = board.appendChild(document.createElement("table"));
    fillTable(table, ["", "Top Riders", "Bounty"], top.map((row, i) => boardRow(row, i + 1)));
  } else {
    board.textContent = "No Bounties yet. Be the first!";
  }
  show("title", "play");
}

function startRun() {
  run = newRun();
  show("run");
}

function showResults() {
  const r = lastRun;
  $("results-title").textContent = r.perfect ? "PERFECT ROUNDUP!" : "TIME'S UP!";
  $("results-bounty").textContent = money(r.bounty);
  fillTable($("results-table"), null, [
    { cells: ["Loot Bags", money(r.fromBags)] },
    { cells: [`Toad Bandits (${r.toads} of ${CONFIG.toadCount})`, money(r.fromToads)] },
    { cells: ["Time bonus", money(r.timeBonus)] },
  ]);
  $("results-fact").textContent = pickOne(FACTS);
  show("results", "results-next");
}

function showSave() {
  $("save-codename").textContent = newCodename(loadBoard(), CODENAME_ADJECTIVES, CODENAME_ANIMALS);
  show("save", "save-go");
}

function saveAs(codename) {
  if (!lastRun) return showTitle();
  const before = findCodename(loadBoard(), codename);
  const { rows, improved } = recordRun(loadBoard(), codename, lastRun, Date.now(), CONFIG.leaderboardSize);
  storeBoard(rows);
  lastRun = null;

  const { rank, around } = neighbours(rows, codename);
  $("rank-title").textContent = before ? before.codename : codename;
  $("rank-note").textContent =
    !improved ? `Your best is still ${money(before.bounty)}.`
    : rank ? `You're #${rank}!`
    : `Not in the top ${CONFIG.leaderboardSize} this time. Ride again!`;
  fillTable($("rank-table"), null, around.map((row) => boardRow(row, row.rank)), $("rank-title").textContent);
  show("rank", "rank-again");
}

$("riders").append(...RIDERS.map((choice) => {
  const button = document.createElement("button");
  button.type = "button";
  const swatch = button.appendChild(document.createElement("span"));
  swatch.className = "swatch";
  swatch.style.background = `linear-gradient(${choice.body} 70%, ${choice.accent} 70%)`;
  button.append(choice.name);
  button.addEventListener("click", () => {
    rider = choice;
    for (const other of $("riders").children) other.setAttribute("aria-pressed", other === button);
  });
  button.setAttribute("aria-pressed", choice === rider);
  return button;
}));

$("play").addEventListener("click", startRun);
$("results-next").addEventListener("click", showSave);
$("save-go").addEventListener("click", () => saveAs($("save-codename").textContent));
$("save-reroll").addEventListener("click", showSave);
$("save-skip").addEventListener("click", showTitle);
$("rank-again").addEventListener("click", showTitle);

$("save-returning").addEventListener("click", () => {
  $("returning-input").value = "";
  $("returning-error").textContent = "";
  show("returning", "returning-input");
});
$("returning-back").addEventListener("click", showSave);
$("returning-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const row = findCodename(loadBoard(), $("returning-input").value);
  if (row) saveAs(row.codename);
  else $("returning-error").textContent = "No rider by that name. Check the spelling!";
});

// ─────────────────────────────── Admin ───────────────────────────────
// The code check below is a curtain, not a lock. Replace it with real sign-in before the
// leaderboard leaves this device (docs/adr/0001).

function showAdmin() {
  run = null;
  $("admin-form").hidden = false;
  $("admin-body").hidden = true;
  $("admin-code").value = "";
  $("admin-error").textContent = "";
  show("admin", "admin-code");
}

function fillAdmin() {
  const when = (ms) => new Date(ms).toLocaleString([], { dateStyle: "short", timeStyle: "short" });
  fillTable($("admin-table"), ["", "Codename", "Best Bounty", "Toads", "Runs", "Last played", ""],
    loadBoard().map((row, i) => {
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "plain";
      remove.textContent = "Delete";
      remove.addEventListener("click", () => {
        if (!confirm(`Delete ${row.codename}?`)) return;
        storeBoard(loadBoard().filter((other) => other.codename !== row.codename));
        fillAdmin();
      });
      return { key: row.codename, cells: ["#" + (i + 1), row.codename, money(row.bounty), row.toads, row.runs, when(row.lastAt), remove] };
    }));
}

$("admin-form").addEventListener("submit", (e) => {
  e.preventDefault();
  if ($("admin-code").value !== CONFIG.adminCode) {
    $("admin-error").textContent = "Wrong code.";
    return;
  }
  $("admin-form").hidden = true;
  $("admin-body").hidden = false;
  fillAdmin();
});
$("admin-clear").addEventListener("click", () => {
  if (!confirm("Clear the whole leaderboard? This can't be undone.")) return;
  storeBoard([]);
  fillAdmin();
});
$("admin-close").addEventListener("click", () => { location.hash = ""; });

function route() {
  if (location.hash === "#admin") showAdmin();
  else showTitle();
}
addEventListener("hashchange", route);

// ─────────────────────────────── Main loop ───────────────────────────────

setInterval(() => {
  const idle = (performance.now() - lastInput) / 1000;
  if (screen !== "title" && screen !== "run" && idle > CONFIG.idleResetSeconds) {
    if (location.hash) location.hash = "";
    else showTitle();
  }
}, 1000);

let lastFrame = performance.now();
function frame(now) {
  const dt = Math.min(0.05, (now - lastFrame) / 1000);
  lastFrame = now;
  if (screen === "run" && run) updateRun(dt);
  if (screen === "run" && run) drawRun();
  requestAnimationFrame(frame);
}

route();
requestAnimationFrame(frame);
