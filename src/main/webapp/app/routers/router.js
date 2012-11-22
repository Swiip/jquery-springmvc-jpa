/**
 * Define Require module with dependencies
 */
define([
  'jquery',
  'backbone',
  'collections/users',
  'collections/skills',
  'views/users',
  'views/skills'
], function ($, Backbone, UsersCollection, SkillsCollection, UsersView, SkillsView) {
  /**
   * Url router for the applications. Defines routes with url and handlers
   */
  var Router = Backbone.Router.extend({
    // List all the routes possibles and bind them to a handler
    routes:{
      'users':'users',
      'users/:page':'users',
      'users/:page/:sort/:dir':'users',
      'skills':'skills',
      'skills/:page':'skills',
      'skills/:page/:sort/:dir':'skills'
    },
    // Constructor
    initialize:function () {
      this.usersView = null;
      this.skillsView = null;
    },
    // User handler with list, paging and sorting handling
    users:function (page, sort, dir) {
      console.log("router users ", page, sort, dir);
      if (!this.usersView) {
        this.usersView = new UsersView();
      }
      if (!page) {
        page = 1;
      }
      UsersCollection.page = page;
      UsersCollection.sort = sort;
      UsersCollection.dir = dir;
      UsersCollection.fetchPage();
    },
    // Skill handler with list, paging and sorting handling
    skills:function (page, sort, dir) {
      console.log("router skills ", page, sort, dir);
      if (!this.skillsView) {
        this.skillsView = new SkillsView();
      }
      if (!page) {
        page = 1;
      }
      SkillsCollection.page = page;
      SkillsCollection.sort = sort;
      SkillsCollection.dir = dir;
      SkillsCollection.fetchPage();
    }
  });

  // Return the view as the Require module
  return Router;
});
