# import discord
from discord.ext import commands


class Timer(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.config = bot.config


# ==============================================================================
def setup(bot):
    bot.add_cog(Timer(bot))
