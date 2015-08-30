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

var EXTENSION_NAME = "GitHub Profile Fluency Widget";

var GitHub_Profile_Fluency_Chrome_Extension =         "v1.1.0";
var Current_Build_is =                                "v1.1.0";
var Current_Release_is =                              "1.1.0";

/*
vx.0.0 = major changes, will no longer be compatible
update status: update immediately

v0.x.0 = minor changes
update status: recommend update

v0.0.x = bug fixes
update status: not a required update

Release Notes for v1.1.0:

Release Notes for v1.2.0:

TODO:
- fix display so that languages don't spill out of box if user has lots of languages
- Fix Authentication
- Get all languages in a repository, not just the repository.language attribute
- Only show languages from files that the user is a direct contributor to
- Look for updates and auto-update
- Settings to turn off auto-update
- Extension Information
- fix null language displaying by removing from calculations

This extension adds a box to a user's profile which displays the languages they know based
off of repositories that they have contributed to

Contribution GuideLines:
If you are interested in contributing create a fork and create a merge request, your code will be reviewed before
being merged and committed to master.
Follow the programming style that is already present in this extension.
After contributing add your name to the AUTHORED_BY variable so that your work is appropriatly credited

GitHub Repository:
TODO

Google Chrome Extension WareHouse:
TODO

 */

var AUTHORED_BY = ["Kyle Chickering"];

/*
Handle browser based authentication tokens on a user basis to secure account information and
maintain API OAuth authentication standards

for testing and ease of use you can use a personal access token here instead of going through the authentication
do not push your access token to a public repository or share this token with anyone, treat it like a password.
 */

var ACCESS_TOKEN = "";

/*
var CLIENT_ID = "bb08a2ba2bfd420d57cc";
var CLIENT_SECRET = "03f3eaa9c6d968c2ec547bb8d0e68eb1eb1cf794";

if(!ACCESS_TOKEN) {
    if (!CLIENT_ID || !CLIENT_SECRET) {

        ACCESS_TOKEN = "c1a438bab179f491cc72e0d019af0169179d7966";

    }
}
*/

/*
JSON Dependencies include:
- github_colors

JSON element created by GitHub user ozh
https://github.com/ozh

This is the source code for the JSON list
I have used an un-altered version of this source code for this extension
https://github.com/ozh/github-colors/blob/master/colors.json

Source repository by ozh
https://github.com/ozh/github-colors
 */

var github_colors = {
    "ABAP": {"color": "#E8274B", "url": "https://github.com/trending?l=ABAP"},
    "ActionScript": {"color": "#882B0F", "url": "https://github.com/trending?l=as3"},
    "Ada": {"color": "#02f88c", "url": "https://github.com/trending?l=Ada"},
    "Agda": {"color": "#315665", "url": "https://github.com/trending?l=Agda"},
    "AGS Script": {"color": "#B9D9FF", "url": "https://github.com/trending?l=AGS Script"},
    "Alloy": {"color": "#cc5c24", "url": "https://github.com/trending?l=Alloy"},
    "AMPL": {"color": "#E6EFBB", "url": "https://github.com/trending?l=AMPL"},
    "ANTLR": {"color": "#9DC3FF", "url": "https://github.com/trending?l=ANTLR"},
    "Apex": {"color": "#000000", "url": "https://github.com/trending?l=Apex"},
    "API Blueprint": {"color": "#2ACCA8", "url": "https://github.com/trending?l=API Blueprint"},
    "APL": {"color": "#5A8164", "url": "https://github.com/trending?l=APL"},
    "AppleScript": {"color": null, "url": "https://github.com/trending?l=AppleScript"},
    "Arc": {"color": "#aa2afe", "url": "https://github.com/trending?l=Arc"},
    "Arduino": {"color": "#bd79d1", "url": "https://github.com/trending?l=Arduino"},
    "ASP": {"color": "#6a40fd", "url": "https://github.com/trending?l=aspx-vb"},
    "AspectJ": {"color": "#a957b0", "url": "https://github.com/trending?l=AspectJ"},
    "Assembly": {"color": "#6E4C13", "url": "https://github.com/trending?l=nasm"},
    "ATS": {"color": "#1ac620", "url": "https://github.com/trending?l=ATS"},
    "Augeas": {"color": "#000000", "url": "https://github.com/trending?l=Augeas"},
    "AutoHotkey": {"color": "#6594b9", "url": "https://github.com/trending?l=AutoHotkey"},
    "AutoIt": {"color": "#1C3552", "url": "https://github.com/trending?l=AutoIt"},
    "Awk": {"color": "#000000", "url": "https://github.com/trending?l=Awk"},
    "Batchfile": {"color": "#000000", "url": "https://github.com/trending?l=bat"},
    "Befunge": {"color": "#000000", "url": "https://github.com/trending?l=Befunge"},
    "Bison": {"color": "#000000", "url": "https://github.com/trending?l=Bison"},
    "BitBake": {"color": "#000000", "url": "https://github.com/trending?l=BitBake"},
    "BlitzBasic": {"color": "#000000", "url": "https://github.com/trending?l=BlitzBasic"},
    "BlitzMax": {"color": "#cd6400", "url": "https://github.com/trending?l=BlitzMax"},
    "Bluespec": {"color": "#000000", "url": "https://github.com/trending?l=Bluespec"},
    "Boo": {"color": "#d4bec1", "url": "https://github.com/trending?l=Boo"},
    "Brainfuck": {"color": "#2F2530", "url": "https://github.com/trending?l=Brainfuck"},
    "Brightscript": {"color": "#000000", "url": "https://github.com/trending?l=Brightscript"},
    "Bro": {"color": "#000000", "url": "https://github.com/trending?l=Bro"},
    "C": {"color": "#555555", "url": "https://github.com/trending?l=C"},
    "C#": {"color": "#178600", "url": "https://github.com/trending?l=csharp"},
    "C++": {"color": "#f34b7d", "url": "https://github.com/trending?l=cpp"},
    "C2hs Haskell": {"color": "#000000", "url": "https://github.com/trending?l=C2hs Haskell"},
    "Cap'n Proto": {"color": "#000000", "url": "https://github.com/trending?l=Cap'n Proto"},
    "CartoCSS": {"color": "#000000", "url": "https://github.com/trending?l=CartoCSS"},
    "Ceylon": {"color": "#000000", "url": "https://github.com/trending?l=Ceylon"},
    "Chapel": {"color": "#8dc63f", "url": "https://github.com/trending?l=Chapel"},
    "ChucK": {"color": "#000000", "url": "https://github.com/trending?l=ChucK"},
    "Cirru": {"color": "#ccccff", "url": "https://github.com/trending?l=Cirru"},
    "Clarion": {"color": "#db901e", "url": "https://github.com/trending?l=Clarion"},
    "Clean": {"color": "#3F85AF", "url": "https://github.com/trending?l=Clean"},
    "CLIPS": {"color": "#000000", "url": "https://github.com/trending?l=CLIPS"},
    "Clojure": {"color": "#db5855", "url": "https://github.com/trending?l=Clojure"},
    "CMake": {"color": "#000000", "url": "https://github.com/trending?l=CMake"},
    "COBOL": {"color": "#000000", "url": "https://github.com/trending?l=COBOL"},
    "CoffeeScript": {"color": "#244776", "url": "https://github.com/trending?l=CoffeeScript"},
    "ColdFusion": {"color": "#ed2cd6", "url": "https://github.com/trending?l=cfm"},
    "ColdFusion CFC": {"color": "#ed2cd6", "url": "https://github.com/trending?l=cfc"},
    "Common Lisp": {"color": "#3fb68b", "url": "https://github.com/trending?l=Common Lisp"},
    "Component Pascal": {"color": "#b0ce4e", "url": "https://github.com/trending?l=Component Pascal"},
    "Cool": {"color": "#000000", "url": "https://github.com/trending?l=Cool"},
    "Coq": {"color": "#000000", "url": "https://github.com/trending?l=Coq"},
    "Crystal": {"color": "#776791", "url": "https://github.com/trending?l=Crystal"},
    "CSS": {"color": "#563d7c", "url": "https://github.com/trending?l=CSS"},
    "Cucumber": {"color": "#000000", "url": "https://github.com/trending?l=Cucumber"},
    "Cuda": {"color": "#000000", "url": "https://github.com/trending?l=Cuda"},
    "Cycript": {"color": "#000000", "url": "https://github.com/trending?l=Cycript"},
    "Cython": {"color": "#000000", "url": "https://github.com/trending?l=Cython"},
    "D": {"color": "#fcd46d", "url": "https://github.com/trending?l=D"},
    "Dart": {"color": "#00B4AB", "url": "https://github.com/trending?l=Dart"},
    "Diff": {"color": "#88dddd", "url": "https://github.com/trending?l=Diff"},
    "DIGITAL Command Language": {"color": null, "url": "https://github.com/trending?l=DIGITAL Command Language"},
    "DM": {"color": "#447265", "url": "https://github.com/trending?l=DM"},
    "Dogescript": {"color": "#cca760", "url": "https://github.com/trending?l=Dogescript"},
    "DTrace": {"color": "#000000", "url": "https://github.com/trending?l=DTrace"},
    "Dylan": {"color": "#6c616e", "url": "https://github.com/trending?l=Dylan"},
    "E": {"color": "#ccce35", "url": "https://github.com/trending?l=E"},
    "Eagle": {"color": "#814C05", "url": "https://github.com/trending?l=Eagle"},
    "eC": {"color": "#913960", "url": "https://github.com/trending?l=ec"},
    "ECL": {"color": "#8a1267", "url": "https://github.com/trending?l=ECL"},
    "edn": {"color": "#db5855", "url": "https://github.com/trending?l=edn"},
    "Eiffel": {"color": "#946d57", "url": "https://github.com/trending?l=Eiffel"},
    "Elixir": {"color": "#6e4a7e", "url": "https://github.com/trending?l=Elixir"},
    "Elm": {"color": "#60B5CC", "url": "https://github.com/trending?l=Elm"},
    "Emacs Lisp": {"color": "#c065db", "url": "https://github.com/trending?l=Emacs Lisp"},
    "EmberScript": {"color": "#FFF4F3", "url": "https://github.com/trending?l=EmberScript"},
    "Erlang": {"color": "#B83998", "url": "https://github.com/trending?l=Erlang"},
    "F#": {"color": "#b845fc", "url": "https://github.com/trending?l=fsharp"},
    "Factor": {"color": "#636746", "url": "https://github.com/trending?l=Factor"},
    "Fancy": {"color": "#7b9db4", "url": "https://github.com/trending?l=Fancy"},
    "Fantom": {"color": "#dbded5", "url": "https://github.com/trending?l=Fantom"},
    "Filterscript": {"color": "#000000", "url": "https://github.com/trending?l=Filterscript"},
    "fish": {"color": null, "url": "https://github.com/trending?l=fish"},
    "FLUX": {"color": "#88ccff", "url": "https://github.com/trending?l=FLUX"},
    "Forth": {"color": "#341708", "url": "https://github.com/trending?l=Forth"},
    "FORTRAN": {"color": "#4d41b1", "url": "https://github.com/trending?l=FORTRAN"},
    "Frege": {"color": "#00cafe", "url": "https://github.com/trending?l=Frege"},
    "Game Maker Language": {"color": "#8fb200", "url": "https://github.com/trending?l=Game Maker Language"},
    "GAMS": {"color": "#000000", "url": "https://github.com/trending?l=GAMS"},
    "GAP": {"color": "#000000", "url": "https://github.com/trending?l=GAP"},
    "GAS": {"color": "#000000", "url": "https://github.com/trending?l=GAS"},
    "GDScript": {"color": "#000000", "url": "https://github.com/trending?l=GDScript"},
    "Genshi": {"color": "#000000", "url": "https://github.com/trending?l=Genshi"},
    "Gentoo Ebuild": {"color": "#000000", "url": "https://github.com/trending?l=Gentoo Ebuild"},
    "Gentoo Eclass": {"color": "#000000", "url": "https://github.com/trending?l=Gentoo Eclass"},
    "GLSL": {"color": "#000000", "url": "https://github.com/trending?l=GLSL"},
    "Glyph": {"color": "#e4cc98", "url": "https://github.com/trending?l=Glyph"},
    "Gnuplot": {"color": "#f0a9f0", "url": "https://github.com/trending?l=Gnuplot"},
    "Go": {"color": "#375eab", "url": "https://github.com/trending?l=Go"},
    "Golo": {"color": "#88562A", "url": "https://github.com/trending?l=Golo"},
    "Gosu": {"color": "#82937f", "url": "https://github.com/trending?l=Gosu"},
    "Grace": {"color": "#000000", "url": "https://github.com/trending?l=Grace"},
    "Grammatical Framework": {"color": "#79aa7a", "url": "https://github.com/trending?l=Grammatical Framework"},
    "Groovy": {"color": "#e69f56", "url": "https://github.com/trending?l=Groovy"},
    "Groovy Server Pages": {"color": "#000000", "url": "https://github.com/trending?l=Groovy Server Pages"},
    "Hack": {"color": "#000000", "url": "https://github.com/trending?l=Hack"},
    "Handlebars": {"color": "#01a9d6", "url": "https://github.com/trending?l=Handlebars"},
    "Harbour": {"color": "#0e60e3", "url": "https://github.com/trending?l=Harbour"},
    "Haskell": {"color": "#29b544", "url": "https://github.com/trending?l=Haskell"},
    "Haxe": {"color": "#f7941e", "url": "https://github.com/trending?l=Haxe"},
    "HTML": {"color": "#e44b23", "url": "https://github.com/trending?l=HTML"},
    "Hy": {"color": "#7790B2", "url": "https://github.com/trending?l=Hy"},
    "HyPhy": {"color": "#000000", "url": "https://github.com/trending?l=HyPhy"},
    "IDL": {"color": "#a3522f", "url": "https://github.com/trending?l=IDL"},
    "Idris": {"color": "#000000", "url": "https://github.com/trending?l=Idris"},
    "IGOR Pro": {"color": "#000000", "url": "https://github.com/trending?l=IGOR Pro"},
    "Inform 7": {"color": "#000000", "url": "https://github.com/trending?l=Inform 7"},
    "Inno Setup": {"color": "#000000", "url": "https://github.com/trending?l=Inno Setup"},
    "Io": {"color": "#a9188d", "url": "https://github.com/trending?l=Io"},
    "Ioke": {"color": "#078193", "url": "https://github.com/trending?l=Ioke"},
    "Isabelle": {"color": "#FEFE00", "url": "https://github.com/trending?l=Isabelle"},
    "J": {"color": "#9EEDFF", "url": "https://github.com/trending?l=J"},
    "Jasmin": {"color": "#000000", "url": "https://github.com/trending?l=Jasmin"},
    "Java": {"color": "#b07219", "url": "https://github.com/trending?l=Java"},
    "Java Server Pages": {"color": "#000000", "url": "https://github.com/trending?l=jsp"},
    "JavaScript": {"color": "#f1e05a", "url": "https://github.com/trending?l=JavaScript"},
    "JFlex": {"color": "#DBCA00", "url": "https://github.com/trending?l=JFlex"},
    "JSONiq": {"color": "#40d47e", "url": "https://github.com/trending?l=JSONiq"},
    "Julia": {"color": "#a270ba", "url": "https://github.com/trending?l=Julia"},
    "KiCad": {"color": "#000000", "url": "https://github.com/trending?l=KiCad"},
    "Kotlin": {"color": "#EA4DFA", "url": "https://github.com/trending?l=Kotlin"},
    "KRL": {"color": "#28431f", "url": "https://github.com/trending?l=KRL"},
    "LabVIEW": {"color": "#000000", "url": "https://github.com/trending?l=LabVIEW"},
    "Lasso": {"color": "#999999", "url": "https://github.com/trending?l=Lasso"},
    "Latte": {"color": "#A8FF97", "url": "https://github.com/trending?l=Latte"},
    "Lean": {"color": "#000000", "url": "https://github.com/trending?l=Lean"},
    "Lex": {"color": "#DBCA00", "url": "https://github.com/trending?l=Lex"},
    "LFE": {"color": "#004200", "url": "https://github.com/trending?l=LFE"},
    "LilyPond": {"color": "#000000", "url": "https://github.com/trending?l=LilyPond"},
    "Limbo": {"color": "#000000", "url": "https://github.com/trending?l=Limbo"},
    "Literate Agda": {"color": "#000000", "url": "https://github.com/trending?l=Literate Agda"},
    "Literate CoffeeScript": {"color": "#000000", "url": "https://github.com/trending?l=litcoffee"},
    "Literate Haskell": {"color": "#000000", "url": "https://github.com/trending?l=lhs"},
    "LiveScript": {"color": "#499886", "url": "https://github.com/trending?l=LiveScript"},
    "LLVM": {"color": "#000000", "url": "https://github.com/trending?l=LLVM"},
    "Logos": {"color": "#000000", "url": "https://github.com/trending?l=Logos"},
    "Logtalk": {"color": "#000000", "url": "https://github.com/trending?l=Logtalk"},
    "LOLCODE": {"color": "#cc9900", "url": "https://github.com/trending?l=LOLCODE"},
    "LookML": {"color": "#652B81", "url": "https://github.com/trending?l=LookML"},
    "LoomScript": {"color": "#000000", "url": "https://github.com/trending?l=LoomScript"},
    "LSL": {"color": "#3d9970", "url": "https://github.com/trending?l=LSL"},
    "Lua": {"color": "#000080", "url": "https://github.com/trending?l=Lua"},
    "M": {"color": "#000000", "url": "https://github.com/trending?l=M"},
    "Makefile": {"color": "#427819", "url": "https://github.com/trending?l=Makefile"},
    "Mako": {"color": "#000000", "url": "https://github.com/trending?l=Mako"},
    "Mask": {"color": "#f97732", "url": "https://github.com/trending?l=Mask"},
    "Mathematica": {"color": "#000000", "url": "https://github.com/trending?l=Mathematica"},
    "Matlab": {"color": "#bb92ac", "url": "https://github.com/trending?l=Matlab"},
    "Max": {"color": "#c4a79c", "url": "https://github.com/trending?l=max/msp"},
    "Mercury": {"color": "#ff2b2b", "url": "https://github.com/trending?l=Mercury"},
    "MiniD": {"color": null, "url": "https://github.com/trending?l=MiniD"},
    "Mirah": {"color": "#c7a938", "url": "https://github.com/trending?l=mirah"},
    "Modelica": {"color": null, "url": "https://github.com/trending?l=Modelica"},
    "Module Management System": {"color": null, "url": "https://github.com/trending?l=Module Management System"},
    "Monkey": {"color": null, "url": "https://github.com/trending?l=Monkey"},
    "Moocode": {"color": null, "url": "https://github.com/trending?l=Moocode"},
    "MoonScript": {"color": null, "url": "https://github.com/trending?l=MoonScript"},
    "MTML": {"color": "#b7e1f4", "url": "https://github.com/trending?l=MTML"},
    "MUF": {"color": null, "url": "https://github.com/trending?l=MUF"},
    "mupad": {"color": null, "url": "https://github.com/trending?l=mupad"},
    "Myghty": {"color": null, "url": "https://github.com/trending?l=Myghty"},
    "Nemerle": {"color": "#3d3c6e", "url": "https://github.com/trending?l=Nemerle"},
    "nesC": {"color": "#94B0C7", "url": "https://github.com/trending?l=nesC"},
    "NetLinx": {"color": "#0aa0ff", "url": "https://github.com/trending?l=NetLinx"},
    "NetLinx+ERB": {"color": "#747faa", "url": "https://github.com/trending?l=NetLinx+ERB"},
    "NetLogo": {"color": "#ff6375", "url": "https://github.com/trending?l=NetLogo"},
    "NewLisp": {"color": "#87AED7", "url": "https://github.com/trending?l=NewLisp"},
    "Nimrod": {"color": "#37775b", "url": "https://github.com/trending?l=Nimrod"},
    "Nit": {"color": "#009917", "url": "https://github.com/trending?l=Nit"},
    "Nix": {"color": "#7e7eff", "url": "https://github.com/trending?l=Nix"},
    "NSIS": {"color": null, "url": "https://github.com/trending?l=NSIS"},
    "Nu": {"color": "#c9df40", "url": "https://github.com/trending?l=Nu"},
    "NumPy": {"color": null, "url": "https://github.com/trending?l=NumPy"},
    "Objective-C": {"color": "#438eff", "url": "https://github.com/trending?l=Objective-C"},
    "Objective-C++": {"color": "#6866fb", "url": "https://github.com/trending?l=Objective-C++"},
    "Objective-J": {"color": "#ff0c5a", "url": "https://github.com/trending?l=Objective-J"},
    "OCaml": {"color": "#3be133", "url": "https://github.com/trending?l=OCaml"},
    "Omgrofl": {"color": "#cabbff", "url": "https://github.com/trending?l=Omgrofl"},
    "ooc": {"color": "#b0b77e", "url": "https://github.com/trending?l=ooc"},
    "Opa": {"color": null, "url": "https://github.com/trending?l=Opa"},
    "Opal": {"color": "#f7ede0", "url": "https://github.com/trending?l=Opal"},
    "OpenCL": {"color": null, "url": "https://github.com/trending?l=OpenCL"},
    "OpenEdge ABL": {"color": null, "url": "https://github.com/trending?l=OpenEdge ABL"},
    "OpenSCAD": {"color": null, "url": "https://github.com/trending?l=OpenSCAD"},
    "Ox": {"color": null, "url": "https://github.com/trending?l=Ox"},
    "Oxygene": {"color": "#cdd0e3", "url": "https://github.com/trending?l=Oxygene"},
    "Oz": {"color": "#fab738", "url": "https://github.com/trending?l=Oz"},
    "Pan": {"color": "#cc0000", "url": "https://github.com/trending?l=Pan"},
    "Papyrus": {"color": "#6600cc", "url": "https://github.com/trending?l=Papyrus"},
    "Parrot": {"color": "#f3ca0a", "url": "https://github.com/trending?l=Parrot"},
    "Parrot Assembly": {"color": null, "url": "https://github.com/trending?l=Parrot Assembly"},
    "Parrot Internal Representation": {"color": null, "url": "https://github.com/trending?l=Parrot Internal Representation"},
    "Pascal": {"color": "#b0ce4e", "url": "https://github.com/trending?l=Pascal"},
    "PAWN": {"color": "#dbb284", "url": "https://github.com/trending?l=PAWN"},
    "Perl": {"color": "#0298c3", "url": "https://github.com/trending?l=Perl"},
    "Perl6": {"color": "#0000fb", "url": "https://github.com/trending?l=Perl6"},
    "PHP": {"color": "#4F5D95", "url": "https://github.com/trending?l=PHP"},
    "PicoLisp": {"color": null, "url": "https://github.com/trending?l=PicoLisp"},
    "PigLatin": {"color": "#fcd7de", "url": "https://github.com/trending?l=PigLatin"},
    "Pike": {"color": "#005390", "url": "https://github.com/trending?l=Pike"},
    "PLpgSQL": {"color": null, "url": "https://github.com/trending?l=PLpgSQL"},
    "PLSQL": {"color": null, "url": "https://github.com/trending?l=PLSQL"},
    "PogoScript": {"color": "#d80074", "url": "https://github.com/trending?l=PogoScript"},
    "PowerShell": {"color": null, "url": "https://github.com/trending?l=PowerShell"},
    "Processing": {"color": "#0096D8", "url": "https://github.com/trending?l=Processing"},
    "Prolog": {"color": "#74283c", "url": "https://github.com/trending?l=Prolog"},
    "Propeller Spin": {"color": "#7fa2a7", "url": "https://github.com/trending?l=Propeller Spin"},
    "Puppet": {"color": "#332A77", "url": "https://github.com/trending?l=Puppet"},
    "Pure Data": {"color": "#91de79", "url": "https://github.com/trending?l=Pure Data"},
    "PureBasic": {"color": "#5a6986", "url": "https://github.com/trending?l=PureBasic"},
    "PureScript": {"color": "#1D222D", "url": "https://github.com/trending?l=PureScript"},
    "Python": {"color": "#3572A5", "url": "https://github.com/trending?l=Python"},
    "QMake": {"color": null, "url": "https://github.com/trending?l=QMake"},
    "QML": {"color": "#44a51c", "url": "https://github.com/trending?l=QML"},
    "R": {"color": "#198ce7", "url": "https://github.com/trending?l=R"},
    "Racket": {"color": "#22228f", "url": "https://github.com/trending?l=Racket"},
    "Ragel in Ruby Host": {"color": "#e17600", "url": "https://github.com/trending?l=Ragel in Ruby Host"},
    "RAML": {"color": "#77d9fb", "url": "https://github.com/trending?l=RAML"},
    "REALbasic": {"color": null, "url": "https://github.com/trending?l=REALbasic"},
    "Rebol": {"color": "#358a5b", "url": "https://github.com/trending?l=Rebol"},
    "Red": {"color": "#ee0000", "url": "https://github.com/trending?l=Red"},
    "Redcode": {"color": null, "url": "https://github.com/trending?l=Redcode"},
    "RenderScript": {"color": null, "url": "https://github.com/trending?l=RenderScript"},
    "RobotFramework": {"color": null, "url": "https://github.com/trending?l=RobotFramework"},
    "Rouge": {"color": "#cc0088", "url": "https://github.com/trending?l=Rouge"},
    "Ruby": {"color": "#701516", "url": "https://github.com/trending?l=Ruby"},
    "Rust": {"color": "#dea584", "url": "https://github.com/trending?l=Rust"},
    "Sage": {"color": null, "url": "https://github.com/trending?l=Sage"},
    "SaltStack": {"color": "#646464", "url": "https://github.com/trending?l=SaltStack"},
    "SAS": {"color": "#B34936", "url": "https://github.com/trending?l=SAS"},
    "Scala": {"color": "#7dd3b0", "url": "https://github.com/trending?l=Scala"},
    "Scheme": {"color": "#1e4aec", "url": "https://github.com/trending?l=Scheme"},
    "Scilab": {"color": null, "url": "https://github.com/trending?l=Scilab"},
    "Self": {"color": "#0579aa", "url": "https://github.com/trending?l=Self"},
    "Shell": {"color": "#89e051", "url": "https://github.com/trending?l=bash"},
    "ShellSession": {"color": null, "url": "https://github.com/trending?l=ShellSession"},
    "Shen": {"color": "#120F14", "url": "https://github.com/trending?l=Shen"},
    "Slash": {"color": "#007eff", "url": "https://github.com/trending?l=Slash"},
    "Slim": {"color": "#ff8f77", "url": "https://github.com/trending?l=Slim"},
    "Smali": {"color": null, "url": "https://github.com/trending?l=Smali"},
    "Smalltalk": {"color": "#596706", "url": "https://github.com/trending?l=Smalltalk"},
    "Smarty": {"color": null, "url": "https://github.com/trending?l=Smarty"},
    "SourcePawn": {"color": "#5c7611", "url": "https://github.com/trending?l=SourcePawn"},
    "SQF": {"color": "#3F3F3F", "url": "https://github.com/trending?l=SQF"},
    "SQLPL": {"color": null, "url": "https://github.com/trending?l=SQLPL"},
    "Squirrel": {"color": "#800000", "url": "https://github.com/trending?l=Squirrel"},
    "Standard ML": {"color": "#dc566d", "url": "https://github.com/trending?l=Standard ML"},
    "Stata": {"color": null, "url": "https://github.com/trending?l=Stata"},
    "SuperCollider": {"color": "#46390b", "url": "https://github.com/trending?l=SuperCollider"},
    "Swift": {"color": "#ffac45", "url": "https://github.com/trending?l=Swift"},
    "SystemVerilog": {"color": "#DAE1C2", "url": "https://github.com/trending?l=SystemVerilog"},
    "Tcl": {"color": "#e4cc98", "url": "https://github.com/trending?l=Tcl"},
    "Tcsh": {"color": null, "url": "https://github.com/trending?l=Tcsh"},
    "TeX": {"color": "#3D6117", "url": "https://github.com/trending?l=TeX"},
    "Thrift": {"color": null, "url": "https://github.com/trending?l=Thrift"},
    "Turing": {"color": "#45f715", "url": "https://github.com/trending?l=Turing"},
    "TXL": {"color": null, "url": "https://github.com/trending?l=TXL"},
    "TypeScript": {"color": "#2b7489", "url": "https://github.com/trending?l=TypeScript"},
    "Unified Parallel C": {"color": "#4e3617", "url": "https://github.com/trending?l=Unified Parallel C"},
    "Unity3D Asset": {"color": "#ab69a1", "url": "https://github.com/trending?l=Unity3D Asset"},
    "UnrealScript": {"color": "#a54c4d", "url": "https://github.com/trending?l=UnrealScript"},
    "Vala": {"color": "#fbe5cd", "url": "https://github.com/trending?l=Vala"},
    "VCL": {"color": null, "url": "https://github.com/trending?l=VCL"},
    "Verilog": {"color": "#b2b7f8", "url": "https://github.com/trending?l=Verilog"},
    "VHDL": {"color": "#adb2cb", "url": "https://github.com/trending?l=VHDL"},
    "VimL": {"color": "#199f4b", "url": "https://github.com/trending?l=vim"},
    "Visual Basic": {"color": "#945db7", "url": "https://github.com/trending?l=Visual Basic"},
    "Volt": {"color": "#1F1F1F", "url": "https://github.com/trending?l=Volt"},
    "Web Ontology Language": {"color": "#9cc9dd", "url": "https://github.com/trending?l=Web Ontology Language"},
    "WebIDL": {"color": null, "url": "https://github.com/trending?l=WebIDL"},
    "wisp": {"color": "#7582D1", "url": "https://github.com/trending?l=wisp"},
    "xBase": {"color": "#403a40", "url": "https://github.com/trending?l=xBase"},
    "XC": {"color": "#99DA07", "url": "https://github.com/trending?l=XC"},
    "Xojo": {"color": null, "url": "https://github.com/trending?l=Xojo"},
    "XProc": {"color": null, "url": "https://github.com/trending?l=XProc"},
    "XQuery": {"color": "#5232e7", "url": "https://github.com/trending?l=XQuery"},
    "XS": {"color": null, "url": "https://github.com/trending?l=XS"},
    "XSLT": {"color": null, "url": "https://github.com/trending?l=XSLT"},
    "Xtend": {"color": null, "url": "https://github.com/trending?l=Xtend"},
    "Yacc": {"color": null, "url": "https://github.com/trending?l=Yacc"},
    "Zephir": {"color": "#118f9e", "url": "https://github.com/trending?l=Zephir"},
    "Zimpl": {"color": null, "url": "https://github.com/trending?l=Zimpl"}
};

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

/*
Test function that explores data mining in the github api to return more detailed information
 */

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

/*
  Creates all of the HTML for the lang stats display box and includes the logic used to translate the
  GitHub API callback information into descending order by the size and type of their repositories

  no additional CSS is needed to style DOM objects because the manifest specifies that only GitHub profile pages
  will be injected with the "content.js" and all GitHub profile pages include the required style sheets
  to style all of the created DOM objects. However it is necessary to add class names to all of your DOM
  objects so that the GitHub's stylesheets recognize the object and style it accordingly. Preferred method
  of adding a class to a DOM object is with the "element.className = class_name" method.
*/

function new_organize_langs(repoLink) {

    /*
    Creates the DOM elements in DOM tree that the extension need to create the language display bar
    DOM elements are nested according to their respective HTML nesting properties and
    elements are appended to their parents inline with the parent and after all children have been
    appended to the DOM.
     */

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

/*
 Sends a request to the GitHub API and uses the callback values to add the code colors to the profile that
 is currently being viewed by the Google Chrome user.
 */

function display_language_fluency() {

    /*
    Request repository information from the GitHub API. GitHub API returns a callback with a JSON
    object containing all of the information about the current profile's created repositories
     */

    var profile_request = new XMLHttpRequest();

    profile_request.onreadystatechange = function() {

        if (profile_request.readyState == 4 && profile_request.status == 200) {

            var repos = JSON.parse(profile_request.responseText);

            /*
            This function call creates all of the HTML to display the language info box and appends it to
            the page's DOM

            repos = JSON object with all of the user's repositories and their properties
             */

            new_organize_langs(repos);

        }

    };

    /*
    Send a JSON REST HTML request to the GitHub API
    uses a authentication token that is generated by GitHub for the extension user
    DO NOT USE A STATIC AUTHORIZATION TOKEN, TOKEN MUST BE SPECIFIC TO EXTENSION USER
     */

    profile_request.open("GET", "https://api.github.com/users" + get_current_profile() + "/repos", true);
    profile_request.setRequestHeader("Authorization", "token " + ACCESS_TOKEN);
    profile_request.send();

}

/*
Specify call time in manifest.JSON
currently set to "document-start", this will call the script BEFORE the page finishes loading
 */

display_language_fluency();

/*
Log Credits, use this area to log information about the extension to the JS console on chrome
 */

console.log(GitHub_Profile_Fluency_Chrome_Extension);
console.log(Current_Build_is);
console.log(Current_Release_is);

console.log("GitHub Profile Fluency Authored By: " + AUTHORED_BY);
console.log(EXTENSION_NAME + " Has finished displaying fluency");

function probe_data(repoLink) {

    /*
    for repository in repolinks
        get information about repository
        return the files that the user has worked on
        return the languages of those files

        for each language from each file
            add to the language counter
            add to the total size
            return sorted list of languages by amount of code
     */

}