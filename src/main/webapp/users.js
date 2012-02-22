define([ "jquery", "underscore", "text!grid.html", "text!select.html", "jqgrid" ], function($, _, grid, select) {
    return {
        init : function() {
            $(".content").html(_.template(grid, {
                id : "users"
            }));

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
                    name : "skills",
                    formatter : function(cellvalue, options, rowObject) {
                        var result = "";
                        _.each(cellvalue, function(item) {
                            result += item.name + "<br/>";
                        });
                        return result;
                    },
                    editable : true,
                    edittype : "select",
                    editoptions : {
                        dataUrl : "rest/skill/all",
                        buildSelect : function(data) {
                            return _.template(select, {
                                list : JSON.parse(data)
                            });
                        },
                        dataInit : function(element) {
                            var selectedRow = $("#grid-users").jqGrid("getGridParam", "selrow");
                            var rowData = $("#grid-users").jqGrid("getRowData", selectedRow);
                            $(element).val(_.pluck(rowData.skills, "id"));
                        },
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
