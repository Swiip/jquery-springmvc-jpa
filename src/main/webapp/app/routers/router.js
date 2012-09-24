define([
	'jquery',
	'backbone',
	'collections/users',
	'views/users',
	'views/skills'
], function($, Backbone, UsersCollection, UsersView, SkillsView) {

  var Workspace = Backbone.Router.extend({
    routes : {
      'users' : 'users',
      'users/:page' : 'users',
      'users/:page/:sort/:dir' : 'users',
      'skills' : 'skills'
    },
    
    initialize: function() {
      this.usersView = null;
      this.skillsView = null;
    },

    users : function( page, sort, dir ) {
      console.log("router users ", page, sort, dir);
      if( !this.usersView ) {
        this.usersView = new UsersView();
      }
      if( !page ) {
        page = 1;
      }
      UsersCollection.page = page;
      UsersCollection.sort = sort;
      UsersCollection.dir = dir;
      UsersCollection.fetchPage();
    }
  });

  return Workspace;
});
