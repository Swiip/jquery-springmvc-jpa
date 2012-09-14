define([
	'underscore',
	'backbone',
	'models/user'
], function(_, Backbone, User) {

  var UsersCollection = Backbone.Collection.extend({
    model : User,
    url : 'data-rest/user',
    initialize : function() {
      this.totalCount = 0;
      this.totalPages = 0;
      this.currentPage = 0;
      this.page = 1;
      this.limit = 10;
      this.sort = {};
    },
    parse : function(data) {
      this.totalCount = data.totalCount;
      this.totalPages = data.totalPages;
      this.currentPage = data.currentPage;
      return data.results;
    },
    fetchPage : function() {
      this.fetch({
        data : {
          page : this.page,
          limit : this.limit
        }
      });
    }
  });

  return new UsersCollection();
});
