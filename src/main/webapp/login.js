/**
 * Define the module login
 * 
 * The module name is not explicitly set and will be assumed by the path and file name. As for the require function, the
 * define will allow to set a list of needed modules and a function to launch when it's ready with the modules in arguments.
 * 
 * This module aims to handle by itself all the "single page web application login" aspects
 */
define([ "jquery", "jqueryui/dialog" ], function($) {
    return {
        /**
         * callback to launch when the user is logged in
         */
        callback : null,

        /**
         * current login status
         */
        status : null,

        /**
         * Initialize method to launch at application startup to check authentication
         * 
         * @param callback
         *            callback to launch when the user is authenticate
         * @returns void
         */
        init : function(callback) {
            this.callback = callback;
            $.ajax({
                url : "rest/login",
                method : "GET",
                success : $.proxy(this.result, this)
            });
        },

        /**
         * Open a modal dialog with the form login
         * 
         * @returns void
         */
        dialog : function() {
            $(".div-login").dialog({
                title : "Identification",
                width : 380,
                modal : true,
                buttons : {
                    Login : $.proxy(function() {
                        $.ajax({
                            url : "rest/login",
                            type : "POST",
                            data : $(".div-login form").serialize(),
                            success : $.proxy(this.result, this)
                        });
                    }, this)
                }
            });
        },

        /**
         * Handler for handle a login status, it's the same handler for checking existing status or receiving a new one after a login attempt
         * 
         * @param status
         *            new login status returned
         * @returns void
         */
        result : function(status) {
            if (status.loggedIn) {
                this.status = status;
                $(".div-login").dialog("close");
                if (this.callback) {
                    this.callback();
                }
            } else {
                this.dialog();
            }
        },
        
        /**
         * logout function which can be used by any action of the application which need a logout
         * 
         * @returns void
         */
        logout : function() {
            $.ajax({
                url : "rest/login",
                method : "DELETE",
                success : $.proxy(this.dialog, this)
            });
        }
    };
});