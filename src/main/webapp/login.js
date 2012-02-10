define([ "jquery", "jqueryui/dialog" ], function($) {
    return {
        loginStatus : null,

        init : function() {
            $.ajax({
                url : "rest/user/status",
                success : $.proxy(this.loginResult, this)
            });
        },
        
        loginDialog : function() {
            $(".div-login").dialog({
                title : "Identification",
                width : 380,
                modal : true,
                buttons : {
                    Enregistrer : $.proxy(function() {
                        $.ajax({
                            url : "rest/user/login",
                            type : "POST",
                            data : $("#div-login form").serialize(),
                            success : $.proxy(this.loginResult, this)
                        });
                    }, this)
                }
            });
        },

        loginResult : function(loginStatus) {
            if(loginStatus.loggedIn) {
                this.loginStatus = loginStatus;
                $(".div-login").dialog("close");
                require(["index"], function(index) {
                    index.init();
                });
            } else {
                this.loginDialog();
            }
        },
        
        logout : function() {
            $.ajax({
                url : "rest/user/logout",
                success : $.proxy(this.loginDialog, this)
            });
        }
    };
});