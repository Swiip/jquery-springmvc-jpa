define([ "jquery", "underscore", "text!skills.html", "jqgrid" ], function($, _, skills) {
    return {
        init : function() {
            $(".content").html(_.template(skills));

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
