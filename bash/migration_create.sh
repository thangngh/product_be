#!/bin/bash

if [ -z "$1" ]; then
  echo "Error: Please provide a file name for the migration."
  exit 1
fi

yarn run typeorm migration:generate database/migrations/"$1"