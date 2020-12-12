# import discord
from discord.ext import commands


class Random(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.config = bot.config

    @commands.command(aliases=['backwards'])
    async def reverse(self, ctx, *, text: str):
        """Everything you type after reverse will be reversed
        """
        t_rev = text[::-1].replace("@", "@\u200B").replace("&", "&\u200B")
        await ctx.send(f"🔁 {t_rev}")


# ==============================================================================
def setup(bot):
    bot.add_cog(Random(bot))
