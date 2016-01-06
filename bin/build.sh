#!/usr/bin/env bash

source ./bin/extract.sh
source ./bin/rewrite.sh

tsd --version >/dev/null 2>&1 || { echo >&2 "tsd must be install for this build to work. Aborting."; exit 1; }
tsc --version >/dev/null 2>&1 || { echo >&2 "tsc must be install for this build to work. Aborting."; exit 1; }

WORKING_ROOT=$(pwd)
WORKING_SOURCE=$WORKING_ROOT/angular2
WORKING_TARGET=$WORKING_ROOT/target
DITSY_TAG=$(git describe --tags 2>/dev/null)
ANGULAR_REPO_ROOT=$(mktemp -d -t angular)
ANGULAR_REPO_BASE=modules/angular2
ANGULAR_DITS_FILES=('src/core/di.ts' 'manual_typings/globals-es6.d.ts' 'manual_typings/globals.d.ts')

rm -rf $WORKING_SOURCE
tsd install

cd $ANGULAR_REPO_ROOT
git clone https://github.com/angular/angular.git .
ANGULAR_TAG=$(git describe --tags)

if [ "$DITSY_TAG" != "$ANGULAR_TAG" ]; then
  # extract the di typescript resources from the angular2 repo
  for ANGULAR_DITS_FILE in "${ANGULAR_DITS_FILES[@]}"
  do
    extract $ANGULAR_DITS_FILE

    # blitz the typescript definitions and remove dependency on zone.js
    if [[ $ANGULAR_DITS_FILE == *globals-es6.d.ts ]]; then
      cp $WORKING_SOURCE/$ANGULAR_DITS_FILE $WORKING_SOURCE/$ANGULAR_DITS_FILE.bak
      sed -i '' -E '/(zone|hammerjs|jasmine|angular-protractor).d.ts/d' $WORKING_SOURCE/$ANGULAR_DITS_FILE
      sed -i '' -E 's/Zone/typeof Object/g' $WORKING_SOURCE/$ANGULAR_DITS_FILE
    fi
  done
fi

cd $WORKING_ROOT
rm -rf $ANGULAR_REPO_ROOT
tsc
rewrite $WORKING_TARGET
