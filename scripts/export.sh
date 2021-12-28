#!/bin/bash
set -e

yarn gen:posts
yarn build:posts

if [[ -z "${SKIP_RESOC}" ]]; then
  yarn build:resoc
fi

yarn astro build

if [[ -z "${SKIP_RESOC}" ]]; then
  cp -rf resoc/dist astro/dist/og-image
fi

