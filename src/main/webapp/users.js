define([ "jquery", "underscore", "text!users.html", "jqgrid" ], function($, _, users) {
    return {
        init : function() {
            $(".content").html(_.template(users));

            $("#grid-users").jqGrid({
                url : "rest/user",
                editurl : "rest/user",
                caption : "Users",
                colNames : [ "Id", "Login", "Password", "Full Name" ],
                colModel : [ {
                    name : "id",
                    editable : false
                }, {
                    name : "login",
                    editable : true
                }, {
                    name : "password",
                    hidden : true,
                    editable : true,
                    edittype : "password",
                    editrules : {
                        edithidden : true
                    }
                }, {
                    name : "fullname",
                    editable : true
                } ],
                pager : "#pager-users"
            }).jqGrid("navGrid", "#pager-users", {
                add : {},
                edit : {},
                del : {}
            });
        }
    };
});
