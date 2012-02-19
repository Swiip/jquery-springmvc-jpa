require(
/**
 * Require configuration
 */
{
    paths : {
        jquery : "libs/jquery-1.7.1",
        jqueryui : "libs/jqueryui-1.8.14",
        themeswitcher : "http://jqueryui.com/themeroller/themeswitchertool/?"
    }
},
/**
 * Dependencies
 */
[ "jquery", "login", "themeswitcher" ],
/**
 * Main function
 */
function($, login) {
    $('#switcher').themeswitcher();
    login.init();
});