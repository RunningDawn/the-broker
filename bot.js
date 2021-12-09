require("dotenv").config();
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { Client, Intents, Collection } = require("discord.js");

// client init
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});


// command builder
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
const commands = [];
client.commands = new Collection();
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}


client.once("ready", () => {
  console.log("The Broker is online");

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
  })();
});


// init interactions
client.on("interactionCreate", async interaction => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (err) {
    if (err) console.error(err);
    await interaction.reply({
      content: "An error occurred while executing that command.",
      ephemeral: true
    });
  }
});


client.login(process.env.TOKEN);
