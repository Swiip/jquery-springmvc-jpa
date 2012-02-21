define([ "jquery", "underscore", "text!users.html", "jqgrid" ], function($, _, users) {
    return {
        init : function() {
            $(".content").html(_.template(users));

            $("#grid-users").jqGrid({
                url : "rest/user",
                editurl : "rest/user",
                caption : "Users",
                colNames : [ "Id", "Login", "Password", "Full Name", "Skills" ],
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
                }, {
                    name : "skills.id",
                    formatter : function(cellvalue, options, rowObject) {
                        var result = "";
                        $(rowObject.skills).each(function(index, item) {
                            result += item.name + "<br/>";
                        });
                        return result;
                    },
                    editable : true,
                    edittype : "select",
                    editoptions : {
                        dataUrl : "rest/skill/options",
                        multiple : true,
                        size : 5
                    },
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
