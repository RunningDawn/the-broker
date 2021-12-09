const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("insult")
    .setDescription("Insult someone!")
    .addUserOption((user) => user
      .setName("target")
      .setDescription("The target of your insult")
      .setRequired(true)),

  async execute(interaction) {
    let outmsg = `‎\n\n<@${interaction.options.getUser("target").id}> is a`;
    const t1 = ["lazy", "stupid", "insecure", "idiotic", "slimy", "slutty", "smelly", "pompous", "communist", "dicknose", "pig-eating", "racist", "elitist", "white trash", "drug-loving", "butterface", "tone deaf", "ugly", "creepy"];
    const t2 = ["douche", "ass", "turd", "rectum", "butt", "cock", "shit", "crotch", "bitch", "prick", "slut", "taint", "fuck", "dick", "goner", "shart", "nut", "sphincter"];
    const t3 = ["pilot", "canoe", "captain", "pirate", "hammer", "knob", "box", "jockey", "nazi", "waffle", "goblin", "blossum", "biscuit", "clown", "socket", "monster", "hound", "dragon", "balloon", "nugget"];
    const w1 = t1[Math.floor(Math.random()*t1.length)];

    if (["a","e","i","u"].includes(w1[0])) {
      outmsg += "n";
    }
    outmsg += ` ${w1} ${t2[Math.floor(Math.random()*t2.length)]} ${t3[Math.floor(Math.random()*t3.length)]}.`;

    interaction.reply({
      content: outmsg
    });
  }
};
