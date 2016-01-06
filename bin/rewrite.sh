#!/usr/bin/env

source ./bin/relative.sh

function rewrite() {
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
#      echo "replace $REQUIRE_PATH with $RELATIVE_PATH"

      sed -i '' -E "s/$REQUIRE_PATH/$RELATIVE_PATH/g" $DI_JS_FILE
    done
  done
}
