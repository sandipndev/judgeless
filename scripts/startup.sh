#!/bin/sh

set -eu

node_modules/.bin/prisma migrate deploy
node_modules/.bin/next start
