## GitHub-Profile-Fluency

A Google Chrome plugin to display languages that a GitHub user knows

![current version](https://img.shields.io/badge/version-1.6.0-green.svg)
![current release](https://img.shields.io/badge/release-1.4.0-green.svg)

[Get the extension here!](https://chrome.google.com/webstore/detail/github-profile-fluency/ebehmeojfclfifngmnfedkbakddbecja)

This plugin adds a language display bar at the top of a user's profile. The display shows how many languages the user 
has used in their public repositories and has a color bar that mimics that of the repository language statistics bar.

![Screenshot](http://i.imgur.com/qfZjAXQ.png)

![Another Screenshot](http://i.imgur.com/8GMwDcn.png)

## Development

#### Chrome

To create a folder that you can load as an unpacked extension run `$ make build_chrome` and make will create a directory 
called `chrome_development` in your root folder. Do not edit any files in this directory, edit the JavaScript in src/ 
and re run `$ make build_chrome` to update the development directory. In chrome, go to `chrome://extensions/` and select
`Developer mode` in the upper right corner. Next click `Load unpacked extension...` and select the chrome_development
directory. If you make changes to any of the files you will need to re-make the directory and reload the extension in
chrome before your changes will be recognized by the browser. If you change the architecture of the plugin make sure that
you update the makefile accordingly.

#### FireFox

Developing for FireFox is slightly more steps than developing Chrome extensions. Start by running `$ make build_firefox`
which will create a properly structured directory in root. Next, cd into the new directory with `$ cd firefox_development`.
Once here you will need to run `jpm run` which creates a new firefox development profile and will open firefox, from here
you can see your changes in the browser. This process must be repeated every time you make changes.

install jpm

Developing for firefox is slightly more involved so I have created a shell script, `firefox.sh`, to help automate the
process. The script bundles some commands together in a continent location to prevent running repetitive commands. 
(The script does the following when executed: `make build_firefox` -> `cd firefox_development` -> `jpm run` -> `cd ..`.)
When you clone the repository make sure that `firefox.sh` is executable by running `$ chmod 755 firefox.sh`.
After you have modified the core content of the plugin cd into the root directory and run `$ ./firefox.sh` to
run a new FireFox development profile. To exit, run `^C` in your terminal or quit the FireFox application.


#### Pull Requests

Before you submit your Pull Request make sure that your additions or changes work on BOTH Chrome and Firefox even if you
are developing for only one of the two browsers. Your PR will be tested and reviewed before being merged with master.

After you have made your additions submit a pull request [here](https://github.com/KyroChi/GitHub-Profile-Fluency/pulls).
In your PR make sure you describe in detail the additions or changes you have made to the extension.