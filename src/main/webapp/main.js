require(
/**
 * Require configuration
 */
{
    paths : {
        jquery : "libs/jquery-1.7.1",
        jqueryui : "libs/jqueryui-1.8.14"
    }
},
/**
 * Dependencies
 */
[ "login" ],
/**
 * Main function
 */
function(login) {
    login.init();
});