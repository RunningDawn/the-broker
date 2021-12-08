#!/bin/bash
################################################################################
LINE="[\e[34m==================================\e[39m]"
GOOD="[\e[92mGOOD\e[39m]"
PASS="[\e[93mPASS\e[39m]"
FAIL="[\e[31mFAIL\e[39m]"

RED=$'\e[31m'
GREEN=$'\e[92m'
BLUE=$'\e[34m'
YELLOW=$'\e[93m'
DEFAULT=$'\e[39m'

################################################################################
# init
function do_init {
    if ! command -v poetry &> /dev/null; then
        echo -e "  ${YELLOW}Poetry not found... Installing!$DEFAULT "
        curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py get-poetry.py
        python get-poetry.py
        rm get-poetry.py
    else
        rm -rf ./.venv
        poetry config virtualenvs.create true
        poetry config virtualenvs.in-project true
        poetry install -vv
    fi
}


################################################################################
# test
function do_test {
    test_args=""
    markers=""
    modules=(
        broker
    )

    # check for args
    for arg in "$@"; do
        # if [[ "$arg" == *"nodb"* ]]; then
        #     DO_NODB=1
        # fi
        if [[ "$arg" == *"cov"* ]]; then
            DO_COVERAGE=1
        fi
        if [[ "$arg" == *"lint"* ]]; then
            DO_LINT=1
        fi
        if [[ "$arg" == *"full"* ]]; then
            DO_FULL=1
        fi

        for i in "${modules[@]}"; do
        if [[ "$arg" == *"$i"* ]]; then
            eval "do_$i=1"
        fi
        done
    done

    # add args
    if [ -n "${DO_COVERAGE+1}" ]; then
    test_args+=" --cov"
    fi
    if [ -n "${DO_LINT+1}" ]; then
    test_args+=" --flake8 --cache-clear"
    fi
    if [ -n "${DO_FULL+1}" ]; then
    test_args+=" -rP"
    fi
    # if [ -n "${DO_NODB+1}" ]; then
    # echo $DO_NODB
    # test_args+=" --nodb"
    # fi

    for i in "${modules[@]}"; do
    marker="do_${i}"
    if [ -n "${!marker+1}" ]; then
        markers+=" ${i}"
    fi
    done

    test_args+=" -W ignore::PendingDeprecationWarning"
    markers=`echo $markers|sed 's/\ /\ or\ /g'`
    poetry run pytest -v ${test_args} -m "${markers}" --color=yes
}


################################################################################
# dev
function do_dev {
    ENV="dev" PYTHONUNBUFFERED="true" poetry run python -u app.py
}


################################################################################
# deploy install
function do_deploy_install {
    poetry install --no-dev
}


################################################################################
# prod
function do_prod {
    ENV="prod" PYTHONUNBUFFERED="true" poetry run python -u app.py
}


################################################################################
# refresh
# function do_refresh {

# }


################################################################################
################################################################################
ACTION=$1
if [ "$ACTION" == "init" ]; then
    DEP="./pyproject.toml"
    VENV="./.venv"
    if [ -d "$VENV" ]; then
        echo -e "$PASS\t Re-building virtual environment"
        do_init
    elif [ -f "$DEP" ]; then
        echo -e "$GOOD\t Building virtual environment"
        do_init
    else
        echo -e "$FAIL\t requirements.txt file does not exist"
    fi

elif [ "$ACTION" == "test" ]; then
    do_test "$@"

elif [ "$ACTION" == "dev" ]; then
    do_dev

elif [ "$ACTION" == "deploy_install" ]; then
    do_deploy_install

elif [ "$ACTION" == "prod" ]; then
    do_prod

else
    echo -e "~~~ \e[33mUSAGE:\e[39m ~~~"
    echo -e "\e[93mbash do.sh init  # initialization of application dependencies"
    echo -e "\e[93mbash do.sh test  # run system tests and coverage"
    echo -e "\e[93mbash do.sh dev  # run dev server"
    echo -e "\e[93mbash do.sh deploy_install  # installs only non-dev dependencies"
    echo -e "\e[93mbash do.sh prod  # run dev server"
    # echo -e "\e[93mbash do.sh refresh  # refreshes the database"
fi
