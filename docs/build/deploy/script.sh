#! /bin/sh

npm run build:icon
npm run build:jd
npm run build:wx

if [ $RELEASE_NAME ]; then
  # only build document when deploy
  npm run build:docs
fi
