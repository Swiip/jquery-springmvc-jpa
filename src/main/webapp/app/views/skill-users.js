define([
    'bootstrap',
    'underscore',
    'backbone',
    'text!templates/skill-users.html'
], function ($, _, Backbone, SkillUsersTemplate) {

    var SkillUsersView = Backbone.View.extend({
        template:_.template(SkillUsersTemplate),
        events:{
        },
        initialize:function () {
            console.log('SkillUsersView.initialize', this.model);
            this.model.fetch();
            this.model.on('change', this.render, this);
            this.model.on('reset', function () {
                this.model.each(function (user) {
                    user.fetch();
                });
            }, this);
//            this.model.on( 'all' , function(event) {
//              console.log("all event", event);
//            });
            this.render();
        },
        render:function () {
            console.log("SkillUsersView.render", this.model);
            this.$el.html(this.template({ data:this.model }));
        }
    });

    return SkillUsersView;

});
