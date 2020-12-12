# import discord
import random
from discord.ext import commands


class Compliment(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.config = bot.config

    @commands.command()
    async def compliment(self, ctx, *, user=None):
        """Compliments the user or 1+ other users
        """
        if not user:
            userlist = [f"<@{ctx.author.id}>"]
        else:
            userlist = user.split()
        for user in userlist:
            outmsg = "    " + f"{user}"

            t1 = ['beautiful', 'fabulous', 'cute', 'adorable', 'gorgeous', 'intelligent', 'wise', 'awesome', 'optimistic']
            t2 = ['unicorn', 'kitten', 'pupper', 'panda', 'human being', 'wabbit', 'hedgehog', 'person']
            w1 = random.choice(t1)
            if w1[0] == 'a' or w1[0] == 'e' or w1[0] == 'i' or w1[0] == 'u':
                outmsg += ", are an " + w1 + " " + random.choice(t2) + "!"
            else:
                outmsg += ", are a " + w1 + " " + random.choice(t2) + "!"
            await ctx.send(outmsg)


# ==============================================================================
def setup(bot):
    bot.add_cog(Compliment(bot))
