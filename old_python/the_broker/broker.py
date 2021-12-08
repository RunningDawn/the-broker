

# import asyncio
import discord
import json
import os
import pathlib
import tomlkit
from discord.ext.commands import Bot


class TheBroker(Bot):
    def __init__(self, *args, prefix=None, **kwargs):

        prefix = [";;"]
        self.config = {
            "command_prefix": prefix,
            "prefix": prefix,
        }
        super().__init__(*args, **kwargs, command_prefix=self.config['command_prefix'])
        self.config['token'] = json.load(open('./token.json'))['token']
        with open(file=str(pathlib.Path(__file__).parent.parent) + "/pyproject.toml") as f:
            self.config['version'] = tomlkit.parse(string=f.read())['tool']['poetry']['version']

        for file in os.listdir("the_broker/cogs"):
            if file.endswith(".py"):
                name = file[:-3]
                self.load_extension(f"the_broker.cogs.{name}")

    async def on_ready(self):
        print('\nLogged in as <' + str(self.user.name) + '> ID: ' + str(self.user.id))
        print('~~~~~~')

    async def on_message(self, msg):
        if not self.is_ready() or msg.author.bot:  # or not permissions.can_handle(msg, "send_messages"):
            return

        await self.process_commands(msg)


# ==============================================================================
async def run_bot():
    broker_bot = TheBroker(
        # owner_ids=config()["owners"],
        command_attrs=dict(hidden=True),
        # help_command=HelpFormat(),
        intents=discord.Intents(  # kwargs found at https://discordpy.readthedocs.io/en/latest/api.html?highlight=intents#discord.Intents
            guilds=True,
            members=True,
            messages=True,
            reactions=True,
            # resences=True
        )
    )
    await broker_bot.start(broker_bot.config['token'])
