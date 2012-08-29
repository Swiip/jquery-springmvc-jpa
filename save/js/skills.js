/**
 * Define the skill module which act as the controller of the skills view
 * 
 * It uses the Require JS text plugin in order to load a needed template for the view. The file content is in argument for the module function and can
 * be used with the underscore template renderer everywhere in the module
 */
define([ "jquery", "underscore", "text!grid.html", "jqgrid" ], function($, _, grid) {
    return {
        init : function() {
            /**
             * Update the content anchor with the template in dependency
             */
            $(".content").html(_.template(grid, {
                id : "skills"
            }));

            /**
             * Start a jqGrid grid on the just inserted anchor
             */
            $("#grid-skills").jqGrid({
                url : "rest/skill",
                editurl : "rest/skill",
                caption : "Skills",
                colNames : [ "Id", "Name" ],
                colModel : [ {
                    name : "id",
                    editable : false
                }, {
                    name : "name",
                    editable : true
                } ],
                pager : "#pager-skills"
            }).jqGrid("navGrid", "#pager-skills", {
                add : {},
                edit : {},
                del : {}
            });
        }
    };
});
