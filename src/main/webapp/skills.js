define([ "jquery", "underscore", "text!grid.html", "jqgrid" ], function($, _, grid) {
    return {
        init : function() {
            $(".content").html(_.template(grid, {
                id : "skills"
            }));

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
