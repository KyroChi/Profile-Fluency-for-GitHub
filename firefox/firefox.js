exports.main = function (options, callbacks) {
    var pageMod = require("sdk/page-mod");
    var data = require("sdk/self").data;

    pageMod.PageMod({
        include: "*.github.com",
        contentScriptFile: [data.url("./github_colors.js"), data.url("./content.js")]
    });
};