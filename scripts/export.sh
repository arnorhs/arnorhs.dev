#!/bin/bash
set -e

yarn posts build
yarn astro build

if [[ -z "${SKIP_RESOC}" ]]; then
  yarn resoc build ../astro/dist/og-image
fi