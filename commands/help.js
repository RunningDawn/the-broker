const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Find out what commands I have!"),
  async execute(interaction) {

    const commands = [
      "/help **=>** *this command!*",
      "/game <join/leave> <game_type> <game_name> **=>** *join a game channel on the server*"
    ];

    let outmsg = "‎\n\n";
    for (const comm of commands) {
      outmsg += `${comm}\n\n`;
    }

    interaction.reply({
      content: outmsg,
      ephemeral: true
    });
  }
};
