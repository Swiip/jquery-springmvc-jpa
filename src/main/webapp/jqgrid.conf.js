define([ "order!jquery", "order!libs/i18n/grid.locale-en", "order!jqgrid-lib" ], function($) {
    $.extend($.jgrid, {
        defaults : {
            height : "auto",
            autowidth : true,
            rowNum : 10,
            rowList : [ 10, 20, 30 ],
            mtype : "GET",
            serializeGridData : function(data) {
                return {
                    page : data.page,
                    "page.size" : data.rows,
                    "page.sort" : data.sidx,
                    "page.sort.dir" : data.sord
                };
            },
            datatype : "json",
            jsonReader : {
                root: "content", 
                page: "number", 
                total: "totalElements", 
                records : "size", 
                repeatitems: false, 
                id: "0"
            }
        }
    });

    return $;
});
