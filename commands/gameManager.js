const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  games_list,
  games_mmo,
  games_fps,
  games_rts,
  games_moba,
  games_rpg,
  games_survival,
  games_craftlike,
  games_roguelike,
  games_mobile,
  flatten_games } = require("../util/games_list.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("game")
    .setDescription("Join a game channel")

    // List games and categories
    .addSubcommand((cmd) => cmd
      .setName("list")
      .setDescription("List available games and categories"))

    // ## JOIN ##
    .addSubcommandGroup((group) => group
      .setName("join")
      .setDescription("Join a game channel!")

      // MMO
      .addSubcommand((cmd) => cmd
        .setName("mmo")
        .setDescription("Massively Multiplayer Online games")
        .addStringOption((option) => option
          .setName("game")
          .setDescription("choose a game")
          .setRequired(true)
          .addChoices(flatten_games(games_mmo))))

      // FPS
      .addSubcommand((cmd) => cmd
        .setName("fps")
        .setDescription("First Person Shooter games")
        .addStringOption((option) => option
          .setName("game")
          .setDescription("choose a game")
          .setRequired(true)
          .addChoices(flatten_games(games_fps))))

      // RTS
      .addSubcommand((cmd) => cmd
        .setName("rts")
        .setDescription("Real-Time Strategy games")
        .addStringOption((option) => option
          .setName("game")
          .setDescription("choose a game")
          .setRequired(true)
          .addChoices(flatten_games(games_rts))))

      // MOBA
      .addSubcommand((cmd) => cmd
        .setName("moba")
        .setDescription("Multiplayer Online Battle Arena games")
        .addStringOption((option) => option
          .setName("game")
          .setDescription("choose a game")
          .setRequired(true)
          .addChoices(flatten_games(games_moba))))

      // RPG
      .addSubcommand((cmd) => cmd
        .setName("rpg")
        .setDescription("Role Playing Games")
        .addStringOption((option) => option
          .setName("game")
          .setDescription("choose a game")
          .setRequired(true)
          .addChoices(flatten_games(games_rpg))))

      // Survival
      .addSubcommand((cmd) => cmd
        .setName("survival")
        .setDescription("Survival games")
        .addStringOption((option) => option
          .setName("game")
          .setDescription("choose a game")
          .setRequired(true)
          .addChoices(flatten_games(games_survival))))

      // Craftlike
      .addSubcommand((cmd) => cmd
        .setName("craftlike")
        .setDescription("Crafting oriented games")
        .addStringOption((option) => option
          .setName("game")
          .setDescription("choose a game")
          .setRequired(true)
          .addChoices(flatten_games(games_craftlike))))

      // Roguelike
      .addSubcommand((cmd) => cmd
        .setName("roguelike")
        .setDescription("Roguelike games")
        .addStringOption((option) => option
          .setName("game")
          .setDescription("choose a game")
          .setRequired(true)
          .addChoices(flatten_games(games_roguelike))))

      // Mobile
      .addSubcommand((cmd) => cmd
        .setName("mobile")
        .setDescription("Mobile games")
        .addStringOption((option) => option
          .setName("game")
          .setDescription("choose a game")
          .setRequired(true)
          .addChoices(flatten_games(games_mobile)))))

    // ## LEAVE ##
    .addSubcommandGroup((group) => group
      .setName("leave")
      .setDescription("Leave a game channel!")

      // MMO
      .addSubcommand((cmd) => cmd
        .setName("mmo")
        .setDescription("Massively Multiplayer Online games")
        .addStringOption((option) => option
          .setName("game")
          .setDescription("choose a game")
          .setRequired(true)
          .addChoices(flatten_games(games_mmo))))

      // FPS
      .addSubcommand((cmd) => cmd
        .setName("fps")
        .setDescription("First Person Shooter games")
        .addStringOption((option) => option
          .setName("game")
          .setDescription("choose a game")
          .setRequired(true)
          .addChoices(flatten_games(games_fps))))

      // RTS
      .addSubcommand((cmd) => cmd
        .setName("rts")
        .setDescription("Real-Time Strategy games")
        .addStringOption((option) => option
          .setName("game")
          .setDescription("choose a game")
          .setRequired(true)
          .addChoices(flatten_games(games_rts))))

      // MOBA
      .addSubcommand((cmd) => cmd
        .setName("moba")
        .setDescription("Multiplayer Online Battle Arena games")
        .addStringOption((option) => option
          .setName("game")
          .setDescription("choose a game")
          .setRequired(true)
          .addChoices(flatten_games(games_moba))))

      // RPG
      .addSubcommand((cmd) => cmd
        .setName("rpg")
        .setDescription("Role Playing Games")
        .addStringOption((option) => option
          .setName("game")
          .setDescription("choose a game")
          .setRequired(true)
          .addChoices(flatten_games(games_rpg))))

      // Survival
      .addSubcommand((cmd) => cmd
        .setName("survival")
        .setDescription("Survival games")
        .addStringOption((option) => option
          .setName("game")
          .setDescription("choose a game")
          .setRequired(true)
          .addChoices(flatten_games(games_survival))))

      // Craftlike
      .addSubcommand((cmd) => cmd
        .setName("craftlike")
        .setDescription("Crafting oriented games")
        .addStringOption((option) => option
          .setName("game")
          .setDescription("choose a game")
          .setRequired(true)
          .addChoices(flatten_games(games_craftlike))))

      // Roguelike
      .addSubcommand((cmd) => cmd
        .setName("roguelike")
        .setDescription("Roguelike games")
        .addStringOption((option) => option
          .setName("game")
          .setDescription("choose a game")
          .setRequired(true)
          .addChoices(flatten_games(games_roguelike))))

      // Mobile
      .addSubcommand((cmd) => cmd
        .setName("mobile")
        .setDescription("Mobile games")
        .addStringOption((option) => option
          .setName("game")
          .setDescription("choose a game")
          .setRequired(true)
          .addChoices(flatten_games(games_mobile))))),


  async execute(interaction) {
    const request_channel = interaction.member.guild.channels.cache.find(c => c.name == "join-a-game-channel");

    if (!(interaction.channelId == request_channel.id)) {

      // wrong channel
      interaction.reply({
        content: `‎\n\n**Please do this in the correct channel!**\n\n${request_channel}`,
        ephemeral: true
      });

    } else if (interaction.options.getSubcommand() === "list") {

      // List all games
      let pretty_games = "‎\n**LIST OF GAMES:**\n";
      Object.entries(games_list).forEach(([category,games]) => {
        pretty_games += `\n${category}`;
        Object.entries(games).forEach(([game, ]) =>{
          pretty_games += `\n\t\t${game}`;
        });
      });
      interaction.reply({
        content: pretty_games,
        ephemeral: true
      });
    } else if (interaction.options.getSubcommandGroup() === "join") {

      // attempt assign role
      console.log(interaction.options.getSubcommand());
      const game_role = interaction.options.getString("game");
      const role = interaction.member.guild.roles.cache.find(r => r.name == game_role);
      const has_role = interaction.member.roles.cache.find(r => r.name == role.name) !== undefined;
      const game_name = eval(`games_${interaction.options.getSubcommand()}`)[game_role];
      const game_channel = `${game_name.toLowerCase().replaceAll(" ","-")}`;
      const game_channel_link = interaction.member.guild.channels.cache.find(c => c.name == game_channel);
      let game_channel_welcome_text;
      if (game_channel_link) {
        game_channel_welcome_text = `\n\nCheck out ${game_channel_link}`;
      } else {
        const mod = interaction.member.guild.members.cache.find(n => n.user.username == "Vealor" && n.user.discriminator == "8793").user.id;
        game_channel_welcome_text = `\n\nOops! Looks like this game has no channel for it - ask <@${mod}> for help!`;
      }
      console.log(has_role);
      if (has_role) {
        // already has role
        interaction.reply({
          content: `‎\n\n**You are already a part of ${game_name}!** ${game_channel_welcome_text}`,
        });


      } else {
        // success assign role
        await interaction.member.roles.add(role);
        interaction.reply({
          content: `‎\n\n**Welcome to ${game_name}!** ${game_channel_welcome_text}`,
        });
      }


    } else {
      // attempt remove role
      const game_role = interaction.options.getString("game");
      const role = interaction.member.guild.roles.cache.find(r => r.name == game_role);
      const has_role = interaction.member.roles.cache.find(r => r.name == role.name) !== undefined;
      const game_name = eval(`games_${interaction.options.getSubcommand()}`)[game_role];
      console.log(has_role);
      if (!has_role) {
        // already doesn't have role
        interaction.reply({
          content: `‎\n\n**You are already not a part of ${game_name}!**`,
        });


      } else {
        // success assign role
        await interaction.member.roles.remove(role);
        interaction.reply({
          content: `‎\n\n**You have left ${game_name}!**`,
        });
      }
    }
  }
};