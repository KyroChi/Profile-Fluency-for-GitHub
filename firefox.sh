#!/BIN/BASH

rm -rf firefox_development/
mkdir firefox_development/
cp firefox/package.json firefox_development/
cp firefox/install.rdf firefox_development/
mkdir firefox_development/data/
cp firefox/firefox.js firefox_development/data/
cp src/js/content.js firefox_development/data/
cp src/icon/icon-16.png firefox_development/data/
cp src/icon/icon-32.png firefox_development/data/
cp src/icon/icon-64.png firefox_development/data/
cp src/js/content.js firefox_development/data/
cp src/json/github_colors.js firefox_development/data/

echo firefox development directory created

cd firefox_development/
jpm xpi
#jpm run
#cd ..