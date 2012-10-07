define([
	'jquery',
	'backbone',
	'collections/users',
  'collections/skills',
	'views/users',
	'views/skills'
], function($, Backbone, UsersCollection, SkillsCollection, UsersView, SkillsView) {

  var Workspace = Backbone.Router.extend({
    routes : {
      'users' : 'users',
      'users/:page' : 'users',
      'users/:page/:sort/:dir' : 'users',
      'skills' : 'skills',
      'skills/:page' : 'skills',
      'skills/:page/:sort/:dir' : 'skills'
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
    },

    skills : function( page, sort, dir ) {
      console.log("router skills ", page, sort, dir);
      if( !this.skillsView ) {
        this.skillsView = new SkillsView();
      }
      if( !page ) {
        page = 1;
      }
      SkillsCollection.page = page;
      SkillsCollection.sort = sort;
      SkillsCollection.dir = dir;
      SkillsCollection.fetchPage();
    }
  });

  return Workspace;
});
