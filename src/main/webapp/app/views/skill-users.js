/**
 * Define Require module with dependencies
 */
define([
  'bootstrap',
  'underscore',
  'backbone',
  'text!templates/skill-users.html'
], function ($, _, Backbone, SkillUsersTemplate) {
  /**
   * SkillUser view which represents the user list in a skill line
   */
  var SkillUsersView = Backbone.View.extend({
    // Binding the users collection of a skill
    template:_.template(SkillUsersTemplate),
    // No event
    events:{
    },
    // View initialization with trigger resolving and listening of the collection
    initialize:function () {
      console.log('SkillUsersView.initialize', this.model);
      this.model.fetch();
      this.model.on('change', this.render, this);
      this.model.on('reset', function () {
        this.model.each(function (user) {
          user.fetch();
        });
      }, this);
      this.render();
    },
    // View rendering handler
    render:function () {
      console.log("SkillUsersView.render", this.model);
      this.$el.html(this.template({ data:this.model }));
    }
  });

  // Return the view as the Require module
  return SkillUsersView;
});
