// "role": "Game Name" -> converts "Game Name" to channel name as "game-name"
const games_mmo = {
  "Ashes of Creation": "Ashes of Creation",
  "Black Desert Online": "Black Desert",
  "Camelot Unchained": "Camelot Unchained",
  "Crowfall": "Crowfall",
  "Elyon": "Elyon",
  "EVE Online": "EVE Online",
  "FFXIV": "FFXIV",
  "Guild Wars 2": "Guild Wars 2",
  "New World": "New World",
  "TERA": "TERA",
  "Warframe": "Warframe",
  "WoW": "World of Warcraft",

};
const games_fps = {
  "Apex": "Apex",
  "Battlefield": "Battlefield",
  "CSGO": "CSGO",
  "Escape from Tarkov": "Escape from Tarkov",
  "Overwatch": "Overwatch",
  "PubG": "PubG",
  "Valorant": "Valorant",
};
const games_rts = {
  "Stellaris": "Stellaris",
};
const games_moba = {
  "League of Legends": "League of Legends",
};
const games_rpg = {
  "Dauntless": "Dauntless",
  "Diablo": "Diablo",
  "Elder Scrolls": "Elder Scrolls",
  "Grim Dawn": "Grim Dawn",
  "Monster Hunter": "Monster Hunter",
  "Path of Exile": "Path of Exile",
};
const games_survival = {
  "7 Days to Die": "7 Days to Die",
  "ARK": "ARK",
  "Icarus": "Icarus",
  "Last Oasis": "Last Oasis",
  "Rust": "Rust",
  "The Forest": "The Forest",
};
const games_craftlike = {
  "Astroneer": "Astroneer",
  "Craftopia": "Craftopia",
  "ECO": "ECO",
  "Factorio": "Factorio",
  "Minecraft": "Minecraft",
  "Satisfactory": "Satisfactory",
  "Stardew Valley": "Stardew Valley",
  "Terraria": "Terraria",
  "Valheim": "Valheim",
};
const games_roguelike = {
  "Deep Rock Galactic": "Deep Rock Galactic",
  "Gunfire Reborn": "Gunfire Reborn",
};
const games_mobile = {
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





