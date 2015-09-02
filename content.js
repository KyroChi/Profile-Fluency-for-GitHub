// The MIT License (MIT)
//
// Copyright (c) 2015 Kyle Chickering
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

"use strict";

var EXTENSION_NAME = "GitHub Profile Fluency Widget";

var Current_Build_is =                                "v1.3.0";
var Current_Release_is =                              "n/a";


// vx.0.0 = major changes, will no longer be compatible
// update status: update immediately
//
// v0.x.0 = minor changes
// update status: recommend update
//
// v0.0.x = bug fixes
// update status: not a required update
//
// Release Notes for v1.1.0:
//
// Release Notes for v1.2.0:
//
// Release Notes for v1.3.0:
// - Removed all forms of authentication, ready for publishing on extension store
//
// TODO:
// - fix display so that languages don't spill out of box if user has lots of languages
// - Get all languages in a repository, not just the repository.language attribute
// - Only show languages from files that the user is a direct contributor to
// - Look for updates and auto-update
// - Settings to turn off auto-update
// - Extension Information
//
// This extension adds a box to a user's profile which displays the languages they know based
// off of repositories that they have contributed to
//
// Contribution Guidelines:
// If you are interested in contributing create a fork and create a merge request, your code will be reviewed before
// being merged and committed to master.
// Follow the programming style that is already present in this extension.
// After contributing add your name to the AUTHORED_BY variable so that your work is appropriately credited
//
// GitHub Repository:
// https://github.com/kyrochi/githubprofilefluency
//
// Google Chrome Extension WareHouse:
// TODO

var AUTHORED_BY = ["Kyle Chickering"];


// Default profile is:
//
// PROFILE = "/kyrochi"
//
// BASE_PATH = "https://www.github.com"
// PROFILE_PATH = BASE_PATH + PROFILE
// https://www.github.com/kyrochi
//
// make API calls to:
//
// BASE_API_PATH = "https://api.github.com/users"
// PROFILE_API_PATH = BASE_HTTPS_PATH + PROFILE
// https://api.github.com/users/kyrochi
//
// profile variable is the location of the profile where this extension pulls its information from

var profile = "/kyrochi";

// Gets the current URL of the profile you are viewing and derives the "/username" that is needed to send an
// API call to the GitHub API

function get_current_profile() {

    var a = document.createElement("A");
    a.className = "hidden";
    a.href = document.location;

    return a.pathname;

}

// Test function that explores data mining in the github api to return more detailed information

function mine_from_API (){

    var user_path = get_current_profile();

    var request_user_details = new XMLHttpRequest();

    request_user_details.onreadystatechange = function() {

        if(request_user_details.readyState == 4 && request_user_details.status == 200) {

            var user_repositories = JSON.parse(request_user_details.responseText);
            console.log(user_repositories);

            for (var repository in user_repositories) {

                // Check if the JSON object has its own property
                if (user_repositories.hasOwnProperty(repository)) {

                    console.log(user_repositories[repository].commits_url);

                } else {

                    console.log("ERROR, repository wasn't found");

                }

            }

        }

    };

    request_user_details.open("GET", "https://api.github.com/users" + user_path + "/repos", true);
    request_user_details.setRequestHeader("Authorization", "token " + ACCESS_TOKEN);
    request_user_details.send();


}

// Creates all of the HTML for the lang stats display box and includes the logic used to translate the
// GitHub API callback information into descending order by the size and type of their repositories
//
// no additional CSS is needed to style DOM objects because the manifest specifies that only GitHub profile pages
// will be injected with the "content.js" and all GitHub profile pages include the required style sheets
// to style all of the created DOM objects. However it is necessary to add class names to all of your DOM
// objects so that the GitHub's stylesheets recognize the object and style it accordingly. Preferred method
// of adding a class to a DOM object is with the "element.className = class_name" method.

function new_organize_langs(repoLink) {

    // Creates the DOM elements in DOM tree that the extension need to create the language display bar
    // DOM elements are nested according to their respective HTML nesting properties and
    // elements are appended to their parents inline with the parent and after all children have been
    // appended to the DOM.

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
/* TODO add total contributions to the file
                        var li_2 = document.createElement("LI");

                            var li_2_a_0 = document.createElement("A");

                                var li_2_a_0_span_0 = document.createElement("SPAN");
                                li_2_a_0_span_0.className = "octicon octicon-file-code";

                                var li_2_a_0_span_1 = document.createElement("SPAN");
                                li_2_a_0_span_1.className = "num text-emphasized";
                                li_2_a_0_span_1.innerHTML = "   0";

                            li_2_a_0.appendChild(li_2_a_0_span_0);
                            li_2_a_0.appendChild(li_2_a_0_span_1);
                            li_2_a_0.appendChild(document.createTextNode("   total contributions"));

                        li_2.appendChild(li_2_a_0);
*/
                    ul_numbers.appendChild(li_0);
                    ul_numbers.appendChild(li_1);
                    //ul_numbers.appendChild(li_2);

                    var div_1_0_0_0 = document.createElement("DIV");
                    div_1_0_0_0.className = "repository-lang-stats";

                        var ol_lang = document.createElement("OL");
                        ol_lang.className = "repository-lang-stats-numbers";

        // Append span elements to this DIV
        var div2 = document.createElement("DIV");
        div2.className = "repository-lang-stats-graph js-toggle-lang-stats";

    div0.appendChild(div1);

    var totalsize = 0;        // Total size of all the repositories that a user has

    var languages = Object(); // Object that stores language-value associations {"language": value, "language": value}

    var repositories = 0;

    for (var l in repoLink) {

        repositories += 1;

        if(repoLink.hasOwnProperty(l)) {

            totalsize += repoLink[l].size;

            var repo_lang = repoLink[l].language;

            var repo_size = repoLink[l].size;

            if (!languages[repo_lang] && repo_lang != null) {

                languages[repo_lang] = 0;

            } else {

                console.log("null repos");

            }

            if (repo_lang == null) {

            } else {

                languages[repo_lang] += repo_size;

            }
        }
    }

    // show total number of repositories
    li_1_a_0_span_1.innerHTML = "   " + repositories;

    var new_array = [];

    for (var git_lang in languages) {
        if (languages.hasOwnProperty(git_lang)) {

            var obj = Object();
            obj.lang = git_lang;
            obj.size = languages[git_lang];
            new_array.push(obj);

        }

    }

    new_array.sort(function(a, b){return b.size - a.size});

    var languages_known = 0;

    for (var ii in new_array) {

        languages_known += 1;

        if (new_array.hasOwnProperty(ii)) {

            var obj2 = new_array[ii];

            // If there isn't a default color, ie. color or language returns null, than the color will be set to black
            var color = "#000000";


            if (github_colors.hasOwnProperty(obj2.lang)) {

                color = github_colors[obj2.lang].color;

            }

            var percentage = (obj2.size / totalsize) * 100;

            var ol_li = document.createElement("LI");

                var ol_li_a = document.createElement("A");

                if (github_colors[obj2.lang] == undefined) {

                    ol_li_a.href = "#";

                } else {

                    ol_li_a.href = github_colors[obj2.lang].url;

                }

                    var ol_li_span = document.createElement("SPAN");
                    ol_li_span.className = "color-block language-color";
                    ol_li_span.style.backgroundColor = color;

                        var ol_li_span_lang = document.createElement("SPAN");
                        ol_li_span_lang.className = "lang";
                        ol_li_span_lang.innerHTML = "   " + obj2.lang;

                        var ol_li_span_percent = document.createElement("SPAN");
                        ol_li_span_percent.className = "percent";
                        ol_li_span_percent.innerHTML = "   " + percentage.toFixed(1) + "%";

                ol_li_a.appendChild(ol_li_span);
                ol_li_a.appendChild(ol_li_span_lang);
                ol_li_a.appendChild(ol_li_span_percent);

            ol_li.appendChild(ol_li_a);

            var span = document.createElement("SPAN");
            span.className = "language-color";
            span.style.width = percentage + "%";
            span.style.backgroundColor = color;
            span.innerHTML = git_lang;

            ol_lang.appendChild(ol_li);
            div2.appendChild(span);

        }

    }

    // show how many languages the user knows
    li_0_a_0_span_1.innerHTML = "   " + languages_known;

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
    //appendTo.appendChild(div0);

}


// Sends a request to the GitHub API and uses the callback values to add the code colors to the profile that
// is currently being viewed by the Google Chrome user.

function display_language_fluency() {

    // Request repository information from the GitHub API. GitHub API returns a callback with a JSON
    // object containing all of the information about the current profile's created repositories

    var profile_request = new XMLHttpRequest();

    profile_request.onreadystatechange = function() {

        if (profile_request.readyState == 4 && profile_request.status == 200) {

            var repos = JSON.parse(profile_request.responseText);

            // This function call creates all of the HTML to display the language info box and appends it to
            // the page's DOM
            //
            // repos = JSON object with all of the user's repositories and their properties

            new_organize_langs(repos);

        }

    };


    // Send a JSON REST HTML request to the GitHub API, no access token required

    profile_request.open("GET", "https://api.github.com/users" + get_current_profile() + "/repos", true);
    profile_request.send();

}


// Specify call time in manifest.JSON
// currently set to "document-start", this will call the script BEFORE the page finishes loading

display_language_fluency();

// Log Credits, use this area to log information about the extension to the JS console on chrome

console.log(GitHub_Profile_Fluency_Chrome_Extension);
console.log(Current_Build_is);
console.log(Current_Release_is);

console.log("GitHub Profile Fluency Authored By: " + AUTHORED_BY);
console.log(EXTENSION_NAME + " Has finished displaying fluency");