const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();

module.exports = {
  name: "ready",
  once: true,
  async execute (client, commands) {
    console.log("\t~~ The Broker is online ~~");

    // set presence and activity
    client.user.setPresence({
      status: "online",
      activities: [{
        name: "/help",
        type: "WATCHING",
      }]
    });

    // register slash commands
    const CLIENT_ID = client.user.id;
    const rest = new REST({
      version: "9"
    }).setToken(process.env.TOKEN);

    (async () => {
      try {
        if (process.env.ENV === "production") {
          await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: commands
          });
          console.log("[GLOBAL] Successfully registered commands");
        } else {
          await rest.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID), {
            body: commands
          });
          console.log("[LOCAL] Successfully registered commands");
        }
      } catch (err) {
        if (err) console.error(err);
      }
      for (const comm of commands) {
        console.log(`[INIT] Command => ${comm.name}`);
      }
    })();
  }
};
