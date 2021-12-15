// const Discord = require("discord.js");
const { getFullTimestamp } = require("../util/datetime.js");

module.exports = {
  name: "guildMemberRemove",
  execute(member) {
    const channel = member.guild.channels.cache.find(c => c.name === "member-exchange");

    let outmsg = `:x: <${getFullTimestamp()}> ${member.user} left the server`;
    console.log(`SRV => ${member.username} LEFT`);
    if (member.nickname) {
      outmsg += ` with the nickname "${member.nickname}"`;
    }
    channel.send(outmsg);

    // const newMemberEmbed = new Discord.MessageEmbed()
    //   .setColor("#a73838")
    //   .setTitle("Left")
    //   .setDescription(outmsg)
    //   .setThumbnail(member.user.displayAvatarURL())
    //   .setTimestamp();

    // channel.send({ embeds: [newMemberEmbed]});
  }
};
