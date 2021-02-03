const r2 = require("r2");
const Discord = require("discord.js");
const config = require("../config.json");
const Keyv = require("keyv");

const users = new Keyv(process.env.DATABASE_URL, { namespace: "users" });
const items = new Keyv(process.env.DATABASE_URL, { namespace: "items" });
const guilds = new Keyv(process.env.DATABASE_URL, { namespace: "guilds" });

const addMoni = async function (who, add) {
  let current = await users.get(who);
  if (current === undefined) {
    await users.set(who, add);
  } else {
    await users.set(who, current + add);
  }
};

const formatCooldown = function (time) {
  let final;
  if (time > 3600) {
    let hours = ~~(time / 3600);
    let minutes = ~~((time - 3600 * hours) / 60);
    let seconds = time - 3600 * hours - minutes * 60;
    final = `${hours} hours, ${minutes} minutes and ${seconds.toFixed(
      1
    )} seconds`;
  } else if (time > 60) {
    let minutes = ~~(time / 60);
    let seconds = time - minutes * 60;
    final = `${minutes} minutes and ${seconds.toFixed(1)} seconds`;
  } else {
    final = `${time.toFixed(1)} seconds`;
  }
  return final;
};

const buyableItems = {
  fan: 100,
  orangedetector: 100,
  mangodetector: 50,
  carrotdetector: 50,
  starmagnet: 100,
  shovel: 100,
  tieronepick: 500,
  tiertwopick: 650,
  tierthreepick: 750,
};

const sellableItems = {
  fan: buyableItems.fan / 2,
  orangedetector: buyableItems.orangedetector / 2,
  mangodetector: buyableItems.mangodetector / 2,
  carrotdetector: buyableItems.carrotdetector / 2,
  starmagnet: buyableItems.starmagnet / 2,
  shovel: buyableItems.shovel / 2,
  tieronepick: buyableItems.tieronepick / 2,
  tiertwopick: buyableItems.tiertwopick / 2,
  tierthreepick: buyableItems.tierthreepick / 2,
  "rainbonite pick": 400,
  "personal refinery": 1000,
  lockpick: 70,
  "rigged dice": 100,
};

const itemAliases = {
  od: "orangedetector",
  md: "mangodetector",
  cd: "carrotdetector",
  sm: "starmagnet",
  sh: "shovel",
  tonep: "tieronepick",
  ttwop: "tiertwopick",
  tthreep: "tierthreepick",
  rd: "rigged dice",
  lp: "lockpick",
  rp: "rainbonite pick",
  pr: "personal refinery",
};

const ores = {
  tier1: ["copper", "tin", "iron", "lead", "silver", "bronze"],
  tier2: [
    "gold",
    "platinum",
    "titanium",
    "obsidian",
    "cobalt",
    "goshine",
    "fasalt",
    "maclantite",
  ],
  tier3: [
    "magmanite",
    "rainbonite",
    "starium",
    "lumionite",
    "hellinite",
    "grapium",
    "heaveninite",
    "erdon",
    "shakerium",
    "kelite",
    "limeinite",
  ],
};

const oreSell = {
  tier1: 9,
  tier2: 19,
  tier3: 25,
};

const emoji = {
  silver: "<:silver:776578867988267059>",
  titanium: "<:titanium:776587848924135434>",
  tin: "<:tin:776581611193368579>",
  starium: "<a:starium:776601907254788107>",
  shakerium: "<a:shakerium:776875604967948293>",
  rainbonite: "<a:rainbonite:776596286887165962>",
  platinum: "<:platinum:776586722560966666>",
  obsidian: "<:obsidian:776589898039296021>",
  hellinite: "<:hellinite:776619917193117728>",
  maclantite: "<:maclantite:776598697022324769>",
  lumionite: "<a:lumanite:776604908701876267>",
  lead: "<:lead:776579886637776908>",
  iron: "<:iron:776582852065230858>",
  magmanite: "<a:magamanite:776607429034770494>",
  heaveninite: "<:heaveninite:778736725794619393>",
  grapium: "<a:grapium:776612094929010688>",
  goshine: "<:goshine:776592415209029643>",
  gold: "<:gold:776585426689327105>",
  fasalt: "<:fasalt:776598681218056203>",
  erdon: "<a:Erdon:776623794622038066>",
  copper: "<:copper:776577290506600489>",
  cobalt: "<:cobalt:776590825412624414>",
  bronze: "<:bronze:776581702318424134>",
  kelite: ":question:",
  limeinite: ":question:",
};

const blacklisted = [];

module.exports = {
  Discord: Discord,
  config: config,
  blacklisted: blacklisted,
  users: users,
  addMoni: addMoni,
  items: items,
  buyableItems: buyableItems,
  r2: r2,
  ores: ores,
  oreSell: oreSell,
  emoji: emoji,
  guilds: guilds,
  sellableItems: sellableItems,
  formatCooldown: formatCooldown,
  itemAliases: itemAliases,
};
