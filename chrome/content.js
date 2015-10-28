/*
The MIT License (MIT)

Copyright (c) 2015 Kyle Chickering

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

"use strict";

var EXTENSION_NAME = "GitHub Profile Fluency";

var Current_Build_is =                                "v0.0.1";
var Current_Release_is =                              "v1.6.1";

/*
TODO:
- Get all languages in a repository, not just the repository.language attribute
- Only show languages from files that the user is a direct contributor to

This extension adds a box to a user's profile which displays the languages they know based
off of repositories that they have contributed to

GitHub Repository:
https://github.com/kyrochi/githubprofilefluency

Google Chrome Extension WareHouse:
https://goo.gl/lryKuS
*/

var AUTHORED_BY = ["Kyle Chickering"];

/*
Synchronous, not Asynchronous so that a JSON object is returned before the program moves on
Call get_json("http://url.goes-here") to retrieve API objects as JSON
 */

function get_json(url) {

    var request = new XMLHttpRequest();

    request.open("GET", url, false);
    request.send();

    if (request.status == 200) {

        return JSON.parse(request.responseText)

    }
    // 404 Error, API called an address that doesn't exist, returns an empty JSON object
    if (request.status == 400) {

        return {}

    }
}

/*
JSON Dependencies include:
- github_colors

JSON element created by GitHub user ozh
https://github.com/ozh

This is the source code for the JSON list
I have used an un-altered version of this source code for this extension
https://github.com/ozh/github-colors/blob/master/github_colors.js

Source repository by ozh
https://github.com/ozh/github-colors

UPDATED: 10 24 15
*/

var github_colors = get_json("https://github.com/ozh/github-colors/blob/master/github_colors.js");

/*
Default profile is:

PROFILE = "/kyrochi"

BASE_PATH = "https://www.github.com"
PROFILE_PATH = BASE_PATH + PROFILE
https://www.github.com/kyrochi

make API calls to:

BASE_API_PATH = "https://api.github.com/users"
PROFILE_API_PATH = BASE_HTTPS_PATH + PROFILE
https://api.github.com/users/kyrochi

profile variable is the location of the profile where this extension pulls its information from
*/

var profile = "/kyrochi";

/*
Gets the current URL of the profile you are viewing and derives the "/username" that is needed to send an
API call to the GitHub API
*/

function get_current_profile() {

    var a = document.createElement("A");
    a.className = "hidden";
    a.href = document.location;

    return a.pathname;

}

// HTML DOM

var div0 = document.createElement("DIV");
div0.className = "context-loader-container";

var div1 = document.createElement("DIV");
div1.className = "overall-summary overall-summary-bottomless";

var div1_0 = document.createElement("DIV");
div1_0.className = "stats-switcher-viewport js-stats-switcher-viewport";

var div1_0_0 = document.createElement("DIV");
div1_0_0.className = "stats-switcher-wrapper";

var ul_numbers = document.createElement("DIV");
ul_numbers.className = "numbers-summary";

var li_0 = document.createElement("LI");
li_0.className = "commits";

var li_0_a_0 = document.createElement("A");

var li_0_a_0_span_0 = document.createElement("SPAN");
li_0_a_0_span_0.className = "octicon octicon-keyboard";

var li_0_a_0_span_1 = document.createElement("SPAN");

li_0_a_0_span_1.className = "num text-emphasized";
li_0_a_0_span_1.innerHTML = ""; // number of languages
li_0_a_0.appendChild(li_0_a_0_span_0);
li_0_a_0.appendChild(li_0_a_0_span_1);
li_0_a_0.appendChild(document.createTextNode("   languages"));
li_0.appendChild(li_0_a_0);

var li_1 = document.createElement("LI");

var li_1_a_0 = document.createElement("A");
li_1_a_0.href = get_current_profile() + "?tab=repositories";

var li_1_a_0_span_0 = document.createElement("SPAN");
li_1_a_0_span_0.className = "octicon octicon-repo";

var li_1_a_0_span_1 = document.createElement("SPAN");
li_1_a_0_span_1.className = "num text-emphasized";

li_1_a_0_span_1.innerHTML = ""; // number of repositories

li_1_a_0.appendChild(li_1_a_0_span_0);
li_1_a_0.appendChild(li_1_a_0_span_1);
li_1_a_0.appendChild(document.createTextNode("   repositories"));
li_1.appendChild(li_1_a_0);
ul_numbers.appendChild(li_0);
ul_numbers.appendChild(li_1);

var div_1_0_0_0 = document.createElement("DIV");
div_1_0_0_0.className = "repository-lang-stats";

var ol_lang = document.createElement("OL");
ol_lang.className = "repository-lang-stats-numbers";

// Append span elements to this DIV
var div2 = document.createElement("DIV");
div2.className = "repository-lang-stats-graph js-toggle-lang-stats";

div0.appendChild(div1);

var pages = 0;
var total_repositories = get_json( "https://api.github.com/users" + get_current_profile() + "/repos");

// Get all repositories if user has more than 30 repositories
while (total_repositories.length > 29 + (29 * pages)) {

    pages += 1;
    var page_num = pages + 1;
    var add_page = get_json("https://api.github.com/users" + get_current_profile() + "/repos?page=" + page_num.toString());
    total_repositories = total_repositories.concat(add_page);

}

var total_repos = 0;
var total_length = 0;
var total_size = 0;
var languages = [];

for (var repository in total_repositories) {

    if (total_repositories.hasOwnProperty(repository)) {

        // Increase total size
        total_length += total_repositories[repository].size;

        if (!languages[total_repositories[repository].language] && total_repositories[repository].language != null) {

            if (total_repositories[repository].size == 0 || total_repositories[repository].size == 0.0) {

                languages[total_repositories[repository].language] = 10;
                total_size += 10;

            } else if (total_repositories[repository].fork) {

                languages[total_repositories[repository].language] = 10;
                total_size += 10;

            } else {

                languages[total_repositories[repository].language] = total_repositories[repository].size;

            }

            total_size += total_repositories[repository].size;

        } if (languages[total_repositories[repository].language] && total_repositories[repository].language != null && !total_repositories[repository].fork) {

            languages[total_repositories[repository].language] += total_repositories[repository].size;
            total_size += total_repositories[repository].size;

        } else {

            // Do nothing, ignore null repository language and size

        }

        total_repos ++;

    }

}

var sorted_languages = [];

for (var language in languages) {
    if (languages.hasOwnProperty(language)) {

        sorted_languages.push([language, languages[language]]);

    }
}

sorted_languages.sort(function(a, b) {return b[1] - a[1]});

languages = sorted_languages;

for (var i = 0; i < languages.length; i++) {

    if (i < 7) {
        var ol_li = document.createElement("LI");
        var ol_li_a = document.createElement("A");
        ol_li_a.href = github_colors[languages[i][0]].url;

        var percentage = languages[i][1] / total_size;

        var span_language_color = document.createElement("SPAN");
        span_language_color.className = "color-block language-color";
        span_language_color.style.backgroundColor = github_colors[languages[i][0]].color;

        var span_language = document.createElement("SPAN");
        span_language.className = "lang";
        span_language.innerHTML = "   " + languages[i][0];

        var span_percent = document.createElement("SPAN");
        span_percent.className = "percent";
        span_percent.innerHTML = "   " + (percentage * 100).toFixed(1) + "%";

        ol_li_a.appendChild(span_language_color);
        ol_li_a.appendChild(span_language);
        ol_li_a.appendChild(span_percent);

        ol_li.appendChild(ol_li_a);

        var span_color = document.createElement("SPAN");
        span_color.className = "language-color";
        span_color.style.width = percentage + "%";
        span_color.style.backgroundColor = github_colors[languages[i][0]].color;
        span_color.innerHTML = "   " + languages[i][0];

        ol_lang.appendChild(ol_li);
        div2.appendChild(span_color);
    }

}

li_1_a_0_span_1.innerHTML = "   " + total_repos.toString();
li_0_a_0_span_1.innerHTML = "   " + languages.length;

div_1_0_0_0.appendChild(ol_lang);
div1_0_0.appendChild(ul_numbers);
div1_0_0.appendChild(div_1_0_0_0);
div1_0.appendChild(div1_0_0);
div1.appendChild(div1_0);
div0.appendChild(div1);
div0.appendChild(div2);

div0.style.marginBottom = "20px";

var appendTo = document.getElementsByClassName("contributions-tab")[0];
appendTo.insertBefore(div0, appendTo.children[0]);