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
          .addChoices(flatten_games(games_mobile))))

      // ALL
      .addSubcommand((cmd) => cmd
        .setName("all")
        .setDescription("join all game channels")))

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
          .addChoices(flatten_games(games_mobile))))

    // ALL
      .addSubcommand((cmd) => cmd
        .setName("all")
        .setDescription("leave all game channels"))),


  async execute(interaction) {

    // check channel name
    const request_channel = interaction.member.guild.channels.cache.find(c => c.name == "game-notify-opt-in");

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
          if (game !== "ALL") {
            pretty_games += `\n\t\t${game}`;
          }
        });
      });
      interaction.reply({
        content: pretty_games,
        ephemeral: true
      });


    } else if (interaction.options.getSubcommandGroup() === "join") {
      // join games

      // BATCH join all games
      if (interaction.options.getSubcommand() === "all") {
        interaction.reply({
          content: "‎\n\n**You have joined all the game channels!**",
        });
        console.log(`--!! ${interaction.member.user.username} is joining all channels`);
        for (const genre in games_list) {
          for (const game in games_list[genre]) {
            if (game === "ALL") continue;

            const role = interaction.member.guild.roles.cache.find(r => r.name == game);
            const has_role = interaction.member.roles.cache.find(r => r.name == role.name) !== undefined;
            if (has_role) {
              console.log(`${interaction.member.user.username} tried to join ${game}`);
            } else {
              console.log(`${interaction.member.user.username} joined ${game}`);
              await interaction.member.roles.add(role);
            }
          }
        }
        console.log(`--!! ${interaction.member.user.username} joined all channels`);

      } else {
        // get role information for single role
        const game_role = interaction.options.getString("game");
        if (game_role === "ALL") {
          // BATCH join all roles of game type
          const game_type = interaction.options.getSubcommand();
          const game_type_list = eval(`games_${game_type}`);
          interaction.reply({
            content: `‎\n\n**You have joined all the ${game_type} game channels!**`,
          });
          console.log(`--!! ${interaction.member.user.username} is joining all ${game_type} channels`);
          for (const game in game_type_list) {
            if (game === "ALL") continue;

            const role = interaction.member.guild.roles.cache.find(r => r.name == game);
            const has_role = interaction.member.roles.cache.find(r => r.name == role.name) !== undefined;
            if (has_role) {
              console.log(`${interaction.member.user.username} tried to join ${game}`);
            } else {
              console.log(`${interaction.member.user.username} joined ${game}`);
              await interaction.member.roles.add(role);
            }
          }
          console.log(`--!! ${interaction.member.user.username} joined all ${game_type} channels`);

        } else {
          // join single role
          const role = interaction.member.guild.roles.cache.find(r => r.name == game_role);
          const has_role = interaction.member.roles.cache.find(r => r.name == role.name) !== undefined;
          const game_name = eval(`games_${interaction.options.getSubcommand()}`)[game_role];
          const game_channel = `${game_name.toLowerCase().replaceAll(" ","-")}`;
          const game_channel_link = interaction.member.guild.channels.cache.find(c => c.name == game_channel);
          // specific join welcome text
          let game_channel_welcome_text;
          if (game_channel_link) {
            game_channel_welcome_text = `\n\nCheck out ${game_channel_link}`;
          } else {
            const all_the_games = interaction.member.guild.channels.cache.find(c => c.name == "game-notify-opt-in");
            const mod = interaction.member.guild.members.cache.find(n => n.user.username == "Vealor" && n.user.discriminator == "8793").user.id;
            game_channel_welcome_text = `\n\nHead on over to ${all_the_games} and make a thread to discuss!! \n\nFeel free to ask <@${mod}> if you need any help`;
          }

          if (has_role) {
            // already has role
            console.log(`${interaction.member.user.username} tried to join ${game_name}`);
            interaction.reply({
              content: `‎\n\n**You are already a part of ${game_name}!** ${game_channel_welcome_text}`,
            });
          } else {
            // success assign role
            console.log(`${interaction.member.user.username} joined ${game_name}`);
            await interaction.member.roles.add(role);
            interaction.reply({
              content: `‎\n\n**Welcome to ${game_name}!** ${game_channel_welcome_text}`,
            });
          }
        }

      }

    } else if (interaction.options.getSubcommandGroup() === "leave") {
      // leave games

      // BATCH leave all games
      if (interaction.options.getSubcommand() === "all") {
        interaction.reply({
          content: "‎\n\n**You have left all the game channels!**",
        });
        console.log(`--!! ${interaction.member.user.username} is leaving all channels`);
        for (const genre in games_list) {
          for (const game in games_list[genre]) {
            if (game === "ALL") continue;

            const role = interaction.member.guild.roles.cache.find(r => r.name == game);
            const has_role = interaction.member.roles.cache.find(r => r.name == role.name) !== undefined;
            if (!has_role) {
              console.log(`${interaction.member.user.username} tried to leave ${game}`);
            } else {
              console.log(`${interaction.member.user.username} left ${game}`);
              await interaction.member.roles.remove(role);
            }
          }
        }
        console.log(`--!! ${interaction.member.user.username} left all channels`);

      } else {
        // get role information for single role
        const game_role = interaction.options.getString("game");

        if (game_role === "ALL") {
          // BATCH leave all roles of game type
          const game_type = interaction.options.getSubcommand();
          const game_type_list = eval(`games_${game_type}`);
          interaction.reply({
            content: `‎\n\n**You have left all the ${game_type} game channels!**`,
          });
          console.log(`--!! ${interaction.member.user.username} is leaving all ${game_type} channels`);
          for (const game in game_type_list) {
            if (game === "ALL") continue;

            const role = interaction.member.guild.roles.cache.find(r => r.name == game);
            const has_role = interaction.member.roles.cache.find(r => r.name == role.name) !== undefined;
            if (!has_role) {
              console.log(`${interaction.member.user.username} tried to leave ${game}`);
            } else {
              console.log(`${interaction.member.user.username} left ${game}`);
              await interaction.member.roles.remove(role);
            }
          }
          console.log(`--!! ${interaction.member.user.username} left all ${game_type} channels`);

        } else {
          // leave single role
          const role = interaction.member.guild.roles.cache.find(r => r.name == game_role);
          const has_role = interaction.member.roles.cache.find(r => r.name == role.name) !== undefined;
          const game_name = eval(`games_${interaction.options.getSubcommand()}`)[game_role];

          if (!has_role) {
            // already doesn't have role
            console.log(`${interaction.member.user.username} tried to leave ${game_name}`);
            interaction.reply({
              content: `‎\n\n**You are already not a part of ${game_name}!**`,
            });
          } else {
            // success remove role
            console.log(`${interaction.member.user.username} left ${game_name}`);
            await interaction.member.roles.remove(role);
            interaction.reply({
              content: `‎\n\n**You have left ${game_name}!**`,
            });
          }
        }

      }
    }
  }
};
