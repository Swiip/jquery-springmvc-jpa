define([ "jquery", "jqueryui/dialog" ], function($) {
    return {
        callback : null,
        
        status : null,

        init : function(callback) {
            this.callback = callback;
            $.ajax({
                url : "rest/login",
                method : "GET",
                success : $.proxy(this.result, this)
            });
        },
        
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

        result : function(status) {
            if(status.loggedIn) {
                this.status = status;
                $(".div-login").dialog("close");
                this.callback();
            } else {
                this.dialog();
            }
        },
        
        logout : function() {
            $.ajax({
                url : "rest/login",
                method : "DELETE",
                success : $.proxy(this.dialog, this)
            });
        }
    };
});