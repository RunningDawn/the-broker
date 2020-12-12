import os
import pathlib
import signal
import sys
import threading
import tomlkit
from .broker import run_bot
from .helper._reloader import Watcher

# ==============================================================================
# Grabs version of the application
with open(file=str(pathlib.Path(__file__).parent.parent) + "/pyproject.toml") as f:
    __version__ = tomlkit.parse(string=f.read())['tool']['poetry']['version']


# ==============================================================================
def version():
    """Gets version of the code
    """
    print(__version__)


# ==============================================================================
def run_broker_dev():
    """Runs dev environment of the code
    """
    print("VERSION: v" + __version__)

    # hot-reloading
    signal.signal(signal.SIGTERM, lambda *args: sys.exit(0))
    reloader = Watcher()
    try:
        if os.environ.get("BROKER_AUTORELOAD") == "true":
            t = threading.Thread(target=run_bot, args=())
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
    print("VERSION: v" + __version__)
    run_bot()
