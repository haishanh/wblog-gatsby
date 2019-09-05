#!/bin/bash

if [ ! -d marketing ]; then
  git clone \
    "https://${GH_TOKEN}@github.com/Wiredcraft/marketing.git" \
    --depth 1
fi
