## GitHub-Profile-Fluency

A Google Chrome plugin to display languages that a GitHub user knows

![current version](https://img.shields.io/badge/version-1.3.0-green.svg)
![current release](https://img.shields.io/badge/release-1.3.0-green.svg)

[Get the extension here!](https://chrome.google.com/webstore/detail/github-profile-fluency/ebehmeojfclfifngmnfedkbakddbecja)

This plugin adds a language display bar at the top of a user's profile. The display shows how many languages the user has used in their public repositories and has a color bar that mimics that of the repository language statistics bar.

![Screenshot](http://i.imgur.com/qfZjAXQ.png)

![Another Screenshot](http://i.imgur.com/8GMwDcn.png)

## How To Use
This plugin isn't currently avalible on the extension warehouse, however it will be soon.

To use this plugin currently you will need to generate a GitHub Personal Access Token by going to your settings and selecting "Personal Access Tokens" in the left hand menubar. Than you will need to create a new access token by clicking on "Generate New Token". These are the various permissions that are required for this extension: 

![Access Token](http://i.imgur.com/4OqPObJ.png)

After generating an access token, copy and paste the token into the `ACCESS_TOKEN.js` as the value of `var ACCESS_TOKEN`. Next, in google chrome, go to your extensions and enable "Developer Mode" in the upper right corner. Than select load unpacked extension and link to the parent directory of this project. From here you can create your own changes with a fork or just use the extension as is.

Support for the Extension Warehouse will come about after implementing an authentication method other than using personal access tokens
