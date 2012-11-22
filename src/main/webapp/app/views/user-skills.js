/**
 * Define Require module with dependencies
 */
define([
  'bootstrap',
  'underscore',
  'backbone',
  'text!templates/user-skills.html'
], function ($, _, Backbone, UserSkillsTemplate) {
  /**
   * UserSkill view which represents the skill list in a user line
   */
  var UserSkillsView = Backbone.View.extend({
    // Binding the skills collection of a user
    template:_.template(UserSkillsTemplate),
    // No event
    events:{
    },
    // View initialization with trigger resolving and listening of the collection
    initialize:function () {
      console.log('UserSkillsView.initialize', this.model);
      this.model.fetch();
      this.model.on('change', this.render, this);
      this.model.on('reset', function () {
        this.model.each(function (skill) {
          skill.fetch();
        });
      }, this);
      this.render();
    },
    // View rendering handler
    render:function () {
      console.log("UserSkillsView.render");
      this.$el.html(this.template({ data:this.model }));
    }
  });

  // Return the view as the Require module
  return UserSkillsView;
});
