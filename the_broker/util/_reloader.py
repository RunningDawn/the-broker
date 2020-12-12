import os
import subprocess
import sys
import time


def _get_args_for_reloading():
    """Determine how the script was executed, and return the args needed
    to execute it again in a new process.

    TODO: clean up... a bunch
    """
    rv = [sys.executable]
    py_script = sys.argv[0]
    args = sys.argv[1:]
    # Need to look at main module to determine how it was executed.
    __main__ = sys.modules["__main__"]

    # The value of __package__ indicates how Python was called. It may
    # not exist if a setuptools script is installed as an egg. It may be
    # set incorrectly for entry points created with pip on Windows.
    if getattr(__main__, "__package__", None) is None or (
        os.name == "nt"
        and __main__.__package__ == ""
        and not os.path.exists(py_script)
        and os.path.exists(f"{py_script}.exe")
    ):
        # Executed a file, like "python app.py".
        py_script = os.path.abspath(py_script)

        if os.name == "nt":
            # Windows entry points have ".exe" extension and should be
            # called directly.
            if not os.path.exists(py_script) and os.path.exists(f"{py_script}.exe"):
                py_script += ".exe"

            if (
                os.path.splitext(sys.executable)[1] == ".exe"
                and os.path.splitext(py_script)[1] == ".exe"
            ):
                rv.pop(0)

        rv.append(py_script)
    else:
        # Executed a module, like "python -m werkzeug.serving".
        if sys.argv[0] == "-m":
            # Flask works around previous behavior by putting
            # "-m flask" in sys.argv.
            # TODO remove this once Flask no longer misbehaves
            args = sys.argv
        else:
            if os.path.isfile(py_script):
                # Rewritten by Python from "-m script" to "/path/to/script.py".
                py_module = __main__.__package__
                name = os.path.splitext(os.path.basename(py_script))[0]

                if name != "__main__":
                    py_module += f".{name}"
            else:
                # Incorrectly rewritten by pydevd debugger from "-m script" to "script".
                py_module = py_script

            rv.extend(("-m", py_module.lstrip(".")))

    rv.extend(args)
    return rv


class Watcher:
    DIRECTORY_TO_WATCH = "."

    def __init__(self):
        from watchdog.observers import Observer
        from watchdog.events import PatternMatchingEventHandler
        self.observer = Observer()
        trigger_reload = self.trigger_reload

        class Handler(PatternMatchingEventHandler):
            def on_any_event(self, event):
                trigger_reload(event.src_path)
        self.event_handler = Handler(
            patterns=["*.py", "*.pyc", "*.zip", "*.toml", "*.cfg"],
            ignore_patterns=[
                "*/__pycache__/*",
                "*/.git/*",
                "*/.hg/*",
            ],
        )
        self.should_reload = False
        self.observer.start()

    def __enter__(self):
        print("DEV file watcher starting...\n")
        self.watches = {}
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print("\nDEV server shutting down...")
        self.observer.stop()
        self.observer.join()

    def run(self):
        self.observer.schedule(self.event_handler, self.DIRECTORY_TO_WATCH, recursive=True)
        while not self.should_reload:
            time.sleep(1)
        sys.exit(3)

    def trigger_reload(self, filename):
        self.should_reload = True

    def restart_with_reloader(self):
        while True:
            args = _get_args_for_reloading()
            new_environ = os.environ.copy()
            new_environ["BROKER_AUTORELOAD"] = "true"
            exit_code = subprocess.call(args, env=new_environ, close_fds=False)
            if exit_code != 3:
                return exit_code
