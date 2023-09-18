const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Find out what commands I have!"),
  async execute(interaction) {

    const commands = [
      "/help **=>** *this command! it lists the available commands*",
      "Unfortunately there are no other commands right now!",
      "The bot will show suggestions just like @'ing someone. It also works to autofill with tab. It will autofill selected suggestion and this is normally the top suggestion. You are able to use keyboard arrows to move up and down on the list before pressing tab to select the desired command."
    ];

    let outmsg = "‎\n\n";
    for (const comm of commands) {
      outmsg += `${comm}\n\n`;
    }

    await interaction.reply({
      content: outmsg,
      ephemeral: true
    });
  }
};
