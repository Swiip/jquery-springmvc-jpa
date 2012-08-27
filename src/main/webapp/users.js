/**
 * Define the users module which act as the controller of the users view
 * 
 * It uses the Require JS text plugin in order to load a needed templates for the view. The files content is in arguments for the module function and
 * can be used with the underscore template renderer everywhere in the module
 */
define([ "jquery", "underscore", "text!grid.html", "text!select.html", "jqgrid" ], function($, _, grid, select) {
    return {
        init : function() {
            /**
             * Update the content anchor with the template in dependency
             */
            $(".content").html(_.template(grid, {
                id : "users"
            }));

            /**
             * Start a jqGrid grid on the just inserted anchor
             */
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
                },
                /**
                 * Skills value is a join in the model and will be a complex type in JSON data model. A specific formatter is used to serialize cell
                 * value
                 * 
                 * For the edition part, the select is built from a template and initialization is also overridden to work with complex data
                 */
                {
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
                            var selectContent = _.template(select, {
                                list : JSON.parse(data)
                            });
                            
                            
                            return selectContent; 
                        },
                        dataInit : function(element) {
                            var selectedRow = $("#grid-users").jqGrid("getGridParam", "selrow");
                            var userData = $("#grid-users").jqGrid("getGridParam", "userData");
                            var values = _.pluck(userData[selectedRow - 1].skills, "id");
                            $(element).val(values);
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
