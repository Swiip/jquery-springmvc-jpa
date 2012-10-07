define([
    'bootstrap',
    'underscore',
    'backbone',
    'text!templates/user-skills.html'
], function ($, _, Backbone, UserSkillsTemplate) {

    var UserSkillsView = Backbone.View.extend({
        template:_.template(UserSkillsTemplate),
        events:{
        },
        initialize:function () {
            console.log('UserSkillsView.initialize', this.model);
            this.model.fetch();
            this.model.on('change', this.render, this);
            this.model.on('reset', function () {
                this.model.each(function (skill) {
                    skill.fetch();
                });
            }, this);
            //this.model.on( 'all' , function(event) {
            //  console.log("all event", event);
            //});
            this.render();
        },
        render:function () {
            console.log("UserSkillsView.render");
            this.$el.html(this.template({ data:this.model }));
        }
    });

    return UserSkillsView;

});
