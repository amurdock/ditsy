#!/usr/bin/env bash

function extract() {
  local SOURCE=$1
  local FOLDER=$WORKING_SOURCE/$(dirname ${SOURCE})
  local BASENAME=$(basename ${SOURCE})
  local ABSOLUTE_WORKING_FOLDER
  local RELATIVE_WORKING_FOLDER
  local REWRITE=false

  if [ ! -f $FOLDER/$BASENAME ]; then
    mkdir -p $FOLDER
    cp $ANGULAR_REPO_BASE/$SOURCE $FOLDER

    if [ $? -ne 0 ]; then
      echo "error copying $ANGULAR_REPO_BASE/$SOURCE to $FOLDER"
      exit -1
    fi

    IFS=$'\n'

    for dependency in $(grep -o "from '.*'" $ANGULAR_REPO_BASE/$SOURCE)
    do
      dependency=${dependency/from /}
      dependency=${dependency%\'}
      dependency=${dependency#\'}

      if [[ $dependency == angular2* ]]; then
        REWRITE=true
        extract ${dependency#angular2/}.ts
      else
        ABSOLUTE_WORKING_FOLDER=$FOLDER/$(dirname ${dependency})
        ABSOLUTE_WORKING_FOLDER=$(mkdir -p $ABSOLUTE_WORKING_FOLDER; cd $ABSOLUTE_WORKING_FOLDER; pwd)
        RELATIVE_WORKING_FOLDER=${ABSOLUTE_WORKING_FOLDER#$WORKING_SOURCE/}

        extract $RELATIVE_WORKING_FOLDER/$(basename ${dependency}).ts
      fi
    done
  fi
}
