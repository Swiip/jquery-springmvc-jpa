define([ "order!jquery", "order!libs/i18n/grid.locale-en", "order!jqgrid-lib" ], function($) {
    $.extend(true, $.jgrid, {
        defaults : {
            height : "auto",
            autowidth : true,
            rowNum : 10,
            rowList : [ 10, 20, 30 ],
            mtype : "GET",
            serializeGridData : function(data) {
                return {
                    "page.page" : data.page,
                    "page.size" : data.rows,
                    "page.sort" : data.sidx,
                    "page.sort.dir" : data.sord
                };
            },
            datatype : "json",
            jsonReader : {
                root : "content",
                page : function(obj) {
                    return obj.number + 1;
                },
                total : "totalPages",
                records : "size",
                repeatitems : false,
                id : "0",
                userdata : "content"
            }
        },

        edit : {
            mtype : "PUT",
            recreateForm : true,
            closeAfterAdd : true,
            closeAfterEdit : true,
            ajaxEditOptions : {
                contentType : "application/json"
            },
            serializeEditData : function(data) {
                if (data.id == "_empty") {
                    delete data.id;
                }
                if (data.skills) {
                    var skills = data.skills.split(",");
                    data.skills = new Array();
                    _.each(skills, function(item) {
                        data.skills.push({
                            id : item
                        });
                    });
                }
                return JSON.stringify(data);
            }
        },

        del : {
            mtype : "DELETE",
            ajaxDelOptions : {
                contentType : "application/json"
            },
            serializeDelData : function(data) {
                return JSON.stringify(data);
            }
        }
    });

    return $;
});
