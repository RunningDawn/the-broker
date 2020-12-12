# import discord
import random
from discord.ext import commands


class Insults(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.config = bot.config

    @commands.command()
    async def insult(self, ctx, *, user=None):
        """Insults the user or 1+ other users
        """
        if not user:
            userlist = [f"<@{ctx.author.id}>"]
        else:
            userlist = user.split()
        for user in userlist:
            outmsg = "    " + f"{user}"
            t1 = ['lazy', 'stupid', 'insecure', 'idiotic', 'slimy', 'slutty', 'smelly', 'pompous', 'communist', 'dicknose', 'pig-eating', 'racist', 'elitist', 'white trash', 'drug-loving', 'butterface', 'tone deaf', 'ugly', 'creepy']
            t2 = ['douche', 'ass', 'turd', 'rectum', 'butt', 'cock', 'shit', 'crotch', 'bitch', 'prick', 'slut', 'taint', 'fuck', 'dick', 'goner', 'shart', 'nut', 'sphincter']
            t3 = ['pilot', 'canoe', 'captain', 'pirate', 'hammer', 'knob', 'box', 'jockey', 'nazi', 'waffle', 'goblin', 'blossum', 'biscuit', 'clown', 'socket', 'monster', 'hound', 'dragon', 'balloon', 'nugget']
            w1 = random.choice(t1)
            if w1[0] == 'a' or w1[0] == 'e' or w1[0] == 'i' or w1[0] == 'u':
                outmsg += " is an " + w1 + " " + random.choice(t2) + " " + random.choice(t3) + "."
            else:
                outmsg += " is a " + w1 + " " + random.choice(t2) + " " + random.choice(t3) + "."
            await ctx.send(outmsg)


# ==============================================================================
def setup(bot):
    bot.add_cog(Insults(bot))
