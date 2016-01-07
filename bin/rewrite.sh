#!/usr/bin/env

source ./bin/relative.sh

function rewriteBefore() {
  local LANG_TS=$1/src/facade/lang.ts
  sed -i '' '1i\
    /// <reference path="../../manual_typings/globals.d.ts"/>
  ' $LANG_TS
}

function rewriteAfter() {
  local TARGET=$1

  find ${TARGET} -name *.js | while read DI_JS_FILE; do
    SOURCE=$(dirname ${DI_JS_FILE})

    for REQUIRE_PATH in $(grep -o "require(['\"]angular2.*['\"])" $DI_JS_FILE)
    do
      REQUIRE_PATH=$(echo $REQUIRE_PATH | sed "s/require(['\"]\(.*\)['\"])/\1/g")
      ABSOLUTE_PATH=$(echo $REQUIRE_PATH | sed "s/angular2/target/g")
      RELATIVE_PATH=$(relative "$SOURCE" "$WORKING_ROOT/$ABSOLUTE_PATH")

      REQUIRE_PATH=$(echo $REQUIRE_PATH | sed -e 's/[\/&]/\\&/g')
      RELATIVE_PATH=$(echo $RELATIVE_PATH | sed -e 's/[\/&]/\\&/g')

      sed -i '' -E "s/$REQUIRE_PATH/$RELATIVE_PATH/g" $DI_JS_FILE
    done
  done

  find ${TARGET} -name *.d.ts | while read DI_TS_FILE; do
    SOURCE=$(dirname ${DI_TS_FILE})

    for IMPORT_PATH in $(grep -o "from ['\"]angular2.*['\"]" $DI_TS_FILE)
    do
      IMPORT_PATH=$(echo $IMPORT_PATH | sed "s/from ['\"]\(.*\)['\"]/\1/g")
      ABSOLUTE_PATH=$(echo $IMPORT_PATH | sed "s/angular2/target/g")
      RELATIVE_PATH=$(relative "$SOURCE" "$WORKING_ROOT/$ABSOLUTE_PATH")

      IMPORT_PATH=$(echo $IMPORT_PATH | sed -e 's/[\/&]/\\&/g')
      RELATIVE_PATH=$(echo $RELATIVE_PATH | sed -e 's/[\/&]/\\&/g')

      echo "from $IMPORT_PATH to $RELATIVE_PATH in $DI_TS_FILE"

      sed -i '' -E "s/$IMPORT_PATH/$RELATIVE_PATH/g" $DI_TS_FILE
    done
  done
}
