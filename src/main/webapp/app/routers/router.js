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
      'skills' : 'skills'
    },
    
    initialize: function() {
      this.usersView = null;
      this.skillsView = null;
    },

    users : function( param ) {
      console.log("router users ", param);
      if( !this.usersView ) {
        this.usersView = new UsersView();
      }
      if( !param ) {
        param = 1;
      }
      UsersCollection.page = param;
      UsersCollection.fetchPage();
    }
  });

  return Workspace;
});
