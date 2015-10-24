#!/BIN/BASH

rm -rf chrome_development/
mkdir chrome_development
cp src/js/content.js chrome_development/
cp src/json/github_colors.js chrome_development/
cp src/icon/icon-16.png chrome_development/
cp src/icon/icon-32.png chrome_development/
cp src/icon/icon-64.png chrome_development/
cp src/icon/icon-128.png chrome_development/
cp chrome/manifest.json chrome_development/
echo chrome development directory created