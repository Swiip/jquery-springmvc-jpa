/**
 * Define the jqGrid module which substitute itself to the actual library for adding a step of configuration
 * 
 * The Require JS order plugin is used to force the three dependencies to be loaded in the right order which is needed by the library
 * 
 * Data mapping between the client representation and the server's are needed. It was a choice to make to handle this mapping on server side or on
 * client side. The two way are possible, but I chose the client side way in order to keep a Java source code and a REST api as clean as possible
 * 
 * This jqGrid configuration main goal is to map data exchange between jqGrid read and write methods and the server REST api.
 */
define([ "order!jquery", "order!libs/i18n/grid.locale-en", "order!jqgrid-lib" ], function($) {
    $.extend(true, $.jgrid, {
        defaults : {
            /**
             * Main grid layout parameters
             */
            height : "auto",
            autowidth : true,
            rowNum : 10,
            rowList : [ 10, 20, 30 ],

            /**
             * This parameters handle read request. The request is designed to match with awaited parameters from Spring Data JPA web pagination
             */
            mtype : "GET",
            serializeGridData : function(data) {
                return {
                    "page.page" : data.page,
                    "page.size" : data.rows,
                    "page.sort" : data.sidx,
                    "page.sort.dir" : data.sord
                };
            },

            /**
             * This parameters handle the data reader. It chooses JSON format and map Spring Data JPA pagination parameters
             */
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

        /**
         * This block handle create and update operations.
         * 
         * It chooses HTTP PUT method, JSON content type and define a serialization function which will clean the data to be read by Jackson reader
         */
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

        /**
         * This block handle delete operation.
         * 
         * It chooses HTTP DELETE method, JSON content type and define a serialization function
         */
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
