/**
 * Define Require module with dependencies
 */
define([
  'bootstrap',
  'underscore',
  'backbone',
  'views/skill-users',
  'collections/skills',
  'text!templates/datagrid.html'
], function ($, _, Backbone, SkillUsersView, SkillsCollection, DataGridTemplate) {
  /**
   * Skill view which represents the skill data grid
   */
  var SkillsView = Backbone.View.extend({
    // The view generate a div tag
    tagName:'div',
    // Binding the skills collection
    model:SkillsCollection,
    // Binding the DataGridTemplate loaded by text plugin of Require
    template:_.template(DataGridTemplate),
    // No events
    events:{
    },
    // View initialization with listening of the collection
    initialize:function () {
      console.log('SkillsView.initialize');
      this.model.on('reset', this.render, this);
    },
    // View rendering handler
    render:function () {
      console.log("UsersView.render", this.model);
      $('.content').html(this.template({
        link:'#skills',
        columns:[
          {
            title:'Name',
            key:'name',
            sort:true
          },
          {
            title:"Users",
            anchor:'name'
          }
        ],
        collection:this.model
      }));
      this.model.each(function (skill) {
        new SkillUsersView({
          el:this.$('[data-anchor="' + skill.get('name') + '"]'),
          model:skill.get('skill.Skill.users')
        });
      });
    }
  });

  // Return the view as the Require module
  return SkillsView;
});
