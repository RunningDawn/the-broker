import os
from the_broker import run_broker, run_broker_dev


if __name__ == "__main__":
    print("\n\n- THE BROKER STARTING UP -")
    env = os.environ.get('ENV')
    if env == "dev":
        print("RUNNING DEV")
        run_broker_dev()
    elif env == "prod":
        print("RUNNING PROD")
        run_broker()
    else:
        print("invalid environment specified in ENV")
