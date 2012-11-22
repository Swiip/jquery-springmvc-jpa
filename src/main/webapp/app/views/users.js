/**
 * Define Require module with dependencies
 */
define([
  'bootstrap',
  'underscore',
  'backbone',
  'views/user-skills',
  'collections/users',
  'text!templates/datagrid.html'
], function ($, _, Backbone, UserSkillsView, UsersCollection, DataGridTemplate) {
  /**
   * User view which represents the user data grid
   */
  var UsersView = Backbone.View.extend({
    // The view generate a div tag
    tagName:'div',
    // Binding the users collection
    model:UsersCollection,
    // Binding the DataGridTemplate loaded by text plugin of Require
    template:_.template(DataGridTemplate),
    // No events
    events:{
    },
    // View initialization with listening of the collection
    initialize:function () {
      console.log('UsersView.initialize');
      this.model.on('reset', this.render, this);
    },
    // View rendering handler
    render:function () {
      console.log("UsersView.render", this.model);
      $('.content').html(this.template({
        link:'#users',
        columns:[
          {
            title:'Login',
            key:'login',
            sort:true
          },
          {
            title:'Full Name',
            key:'fullname',
            sort:true
          },
          {
            title:"Skills",
            anchor:'login'
          }
        ],
        collection:this.model
      }));
      this.model.each(function (user) {
        new UserSkillsView({
          el:this.$('[data-anchor="' + user.get('login') + '"]'),
          model:user.get('user.User.skills')
        });
      });
    }
  });

  // Return the view as the Require module
  return UsersView;
});
