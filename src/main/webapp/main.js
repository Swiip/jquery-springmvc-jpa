require(
/**
 * Require configuration
 */
{
    paths : {
        text : "libs/text-1.0.2",
        order : "libs/order-1.0.5",
        jquery : "libs/jquery-1.7.1",
        underscore : "libs/underscore-1.3.1",
        jqueryui : "libs/jqueryui-1.8.14",
        themeswitcher : "http://jqueryui.com/themeroller/themeswitchertool/?",
        "jqgrid-lib" : "libs/jquery-jqgrid-4.3.1",
        jqgrid : "jqgrid.conf"
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
    login.init(function() {
        require(["users"], function(users) {
            users.init(); 
        });
    });
});