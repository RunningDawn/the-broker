import asyncio
import os
import pathlib
import signal
import sys
import threading
import tomlkit
from .broker import run_bot
from .util._reloader import Watcher

# ==============================================================================
with open(file=str(pathlib.Path(__file__).parent.parent) + "/pyproject.toml") as f:
    __version__ = tomlkit.parse(string=f.read())['tool']['poetry']['version']


# ==============================================================================
def run_broker_dev():
    """Runs dev environment of the code
    """
    print("VERSION: v" + str(__version__))

    # hot-reloading
    signal.signal(signal.SIGTERM, lambda *args: sys.exit(0))
    reloader = Watcher()
    try:
        if os.environ.get("BROKER_AUTORELOAD") == "true":
            loop = asyncio.get_event_loop()
            loop.create_task(run_bot())
            t = threading.Thread(target=loop.run_forever, args=())
            t.setDaemon(True)

            with reloader:
                t.start()
                reloader.run()
        else:
            sys.exit(reloader.restart_with_reloader())
    except KeyboardInterrupt:
        pass


# ==============================================================================
def run_broker():
    '''Runs production environment of the code
    '''
    print("VERSION: v" + str(__version__))

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    try:
        loop.run_until_complete(run_bot())
    except KeyboardInterrupt:
        pass
