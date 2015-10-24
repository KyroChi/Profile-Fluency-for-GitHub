# Development

This repository aims to create a friendly development experience to encourage contribution. The steps required
to build and run development builds of GitHub Profile fluency are outlined in this file.

## Developing For Chrome

The files relevent to Chrome development are as follows:

```
manifest.json
content.js
github_colors.js
chrome.sh
```

The relevent Chrome directory structure is as follows:

```
root
├───chrome
├	└───manifest.json
├───...
├───src
├	├───js
├   ├	└───content.js
├   └───json
├	└───github_colors.js
├───...
├───chrome.sh
└───...
```

The first step in developing for Chrome is to build a development folder that can be loaded into Google Chrome and tested. To do this `cd` into the project's `root` directory and make `chrome.sh	` executable by running `chmod 755 chrome.sh`. This step only needs to be done once and from here on to build or update your development directory all you need to run is `./chrome.sh	`.

### chrome.sh

`chrome.sh` is a simple file that allows simultanious development for both FireFox and Chrome at the same time. Every time you run `chrome.sh` it will create a new directory (`chrome_development`) and copy all of the relevent files into the directory. 

:warning: **DO NOT MODIFY FILES IN THIS NEW DIRECTORY** The changes you make to this directory will not be reflected by git and will be lost when the development directory is re-created :warning:


### Adding the Development Folder to Chrome

In Google Chrome visit `chrome://extensions` and enable "Developer mode" by enabling the check box in the upper right hand corner of the page. Next click "Load unpacked extension..." and find the path to the `chrome_development` directory. The plugin should now be loaded and ready for testing. (If you have Profile Fluency installed from the Chrome store it is reccomended that you disable that version while testing a local development version to avoid any conflicts)

### Testing Your Changes

To reflect your changes in chrome run `chrome.sh` from the shell and reload the extension at `chrome://extensions`

### manifest.json

For most development you don't need to update the manifest. If you feel that you need to update the manifest you can read about Chrome manifests [here](https://developer.chrome.com/extensions/manifest).

:warning: **DO NOT UPDATE `"version"`, it is for Chrome store releases ONLY**:warning:

### content.js

This file contains all of the logic that is run every time that a GitHub user page is loaded. This is where you will do most of your development. The file pulls JSON from the GitHub API and builds HTML DOM elements accordingly and injects those elements into the page.

### github_colors.json

Color object so that the plugin knows which colors to display each language as. Don't modify this file unless you are adding or updating colors.