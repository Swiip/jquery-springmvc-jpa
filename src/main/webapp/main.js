/**
 * This is the application JavaScript bootstrap which launch the "require" function in order to configure the loader, load the first needed scripts
 * and initiate page behaviors.
 */
require(
/**
 * Require configuration. http://requirejs.org/docs/api.html#config.
 */
{
    /**
     * We use the Require JS ability to map path in order to use library by simple module names instead of full path information. It allow also to
     * update libraries without impact module requirements description
     */
    paths : {
        text : "libs/text-1.0.2",
        order : "libs/order-1.0.5",
        jquery : "libs/jquery-1.7.1",
        underscore : "libs/underscore-1.3.1",
        jqueryui : "libs/jqueryui-1.8.14",
        // Little trick here, the script is located on the directory URL, we use a final "?" to disable require automatic behavior which add a ".js"
        themeswitcher : "http://jqueryui.com/themeroller/themeswitchertool/?",
        // jqGrid is loaded in two times, the configuration of jqGrid which is dependents of jqGrid library
        "jqgrid-lib" : "libs/jquery-jqgrid-4.3.1",
        jqgrid : "jqgrid.conf"
    }
},
/**
 * Dependencies
 * 
 * List of modules names needed to start the application
 */
[ "jquery", "login", "themeswitcher", "jqueryui/button" ],
/**
 * Main function
 * 
 * This function is launched by Require JS when it has loaded all dependencies and their own dependencies (recursively). The arguments of the function
 * is the module loaded in dependency in the same order. If the dependency is a module, the value is setted and if not, the script is loaded but the
 * module variable is null. In this case, the first two are modules, the two others are just script to be loaded.
 */
function($, login) {
    /**
     * Initiate jQuery UI theme switcher on the anchor placed in the page
     */
    $("#switcher").themeswitcher();

    /**
     * Enhance button set and listen click events on it. The handlers calls new require functions in order to load sub modules only when asked by the
     * client
     */
    $(".menu").buttonset();
    $(".menu .users").click(function() {
        require([ "users" ], function(users) {
            users.init();
        });
    });
    $(".menu .skills").click(function() {
        require([ "skills" ], function(skills) {
            skills.init();
        });
    });

    /**
     * Initialize login controller which will handle itself showing login dialog or not
     */
    login.init();
});