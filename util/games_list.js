// "role": "Game Name" -> converts "Game Name" to channel name as "game-name"
const games_mmo = {
  "ALL": "ALL",
  "Ashes of Creation": "Ashes of Creation",
  "Crowfall": "Crowfall",
  "EVE Online": "EVE Online",
  "FFXIV": "FFXIV",
  "Guild Wars 2": "Guild Wars 2",
  "Lost Ark": "Lost Ark",
  "Mortal Online": "Mortal Online",
  "New World": "New World",
  "Warframe": "Warframe",
};
const games_fps = {
  "ALL": "ALL",
  "Apex": "Apex",
  "Destiny 2": "Destiny 2",
  "Escape from Tarkov": "Escape from Tarkov",
  "Foxhole": "Foxhole",
  "Overwatch": "Overwatch",
  "Planetside 2": "Planetside 2",
  "Valorant": "Valorant",
};
const games_rts = {
  "ALL": "ALL",
  "Stellaris": "Stellaris",
};
const games_moba = {
  "ALL": "ALL",
  "League of Legends": "League of Legends",
};
const games_rpg = {
  "ALL": "ALL",
  "Dauntless": "Dauntless",
  "Divinity Original Sin": "Divinity Original Sin",
  "Diablo": "Diablo",
  "Elden Ring": "Elden Ring",
  "Grim Dawn": "Grim Dawn",
  "Monster Hunter": "Monster Hunter",
  "Path of Exile": "Path of Exile",
};
const games_survival = {
  "ALL": "ALL",
  "7 Days to Die": "7 Days to Die",
  "Among Us": "Among Us",
  "ARK": "ARK",
  "Last Oasis": "Last Oasis",
  "Rust": "Rust",
  "The Forest": "The Forest",
};
const games_craftlike = {
  "ALL": "ALL",
  "Astroneer": "Astroneer",
  "ECO": "ECO",
  "Factorio": "Factorio",
  "Minecraft": "Minecraft",
  "Satisfactory": "Satisfactory",
  "Stardew Valley": "Stardew Valley",
  "Terraria": "Terraria",
  "Valheim": "Valheim",
};
const games_roguelike = {
  "ALL": "ALL",
  "Deep Rock Galactic": "Deep Rock Galactic",
  "Gunfire Reborn": "Gunfire Reborn",
};
const games_mobile = {
  "ALL": "ALL",
  "LotR rise to war": "LotR rise to war",
};

function flatten_games(game_list) {
  return Object.entries(game_list).map(([k,v]) => {return [v, k];});
}

const games_list = {
  "MMO": games_mmo,
  "FPS": games_fps,
  "RTS": games_rts,
  "MOBA": games_moba,
  "RPG": games_rpg,
  "Survival": games_survival,
  "Craftlike": games_craftlike,
  "Roguelike": games_roguelike,
  "Mobile": games_mobile
};

module.exports = {
  games_list: games_list,
  games_mmo: games_mmo,
  games_fps: games_fps,
  games_rts: games_rts,
  games_moba: games_moba,
  games_rpg: games_rpg,
  games_survival: games_survival,
  games_craftlike: games_craftlike,
  games_roguelike: games_roguelike,
  games_mobile: games_mobile,
  flatten_games: flatten_games,
};





