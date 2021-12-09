// const Discord = require("discord.js");
const { getFullTimestamp } = require("../util/datetime.js");

module.exports = {
  name: "guildMemberAdd",
  execute(member) {
    const channel = member.guild.channels.cache.find(c => c.name === "member-exchange");

    let outmsg = `:white_check_mark: <${getFullTimestamp()}> ${member.user} joined the server`;



    channel.send(outmsg);

    // const newMemberEmbed = new Discord.MessageEmbed()
    //   .setColor("#6b9645")
    //   .setTitle("Joined")
    //   .setDescription(outmsg)
    //   .setThumbnail(member.user.displayAvatarURL())ssssssssssssssssssss
    //   .setTimestamp();

    // channel.send({ embeds: [newMemberEmbed]});
  }
};
