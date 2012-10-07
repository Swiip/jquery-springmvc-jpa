define([
    'bootstrap',
    'underscore',
    'backbone',
    'views/skill-users',
    'collections/skills',
    'text!templates/datagrid.html'
], function ($, _, Backbone, SkillUsersView, SkillsCollection, DataGridTemplate) {

    var SkillsView = Backbone.View.extend({
        tagName:'div',
        model:SkillsCollection,
        template:_.template(DataGridTemplate),
        events:{
        },
        initialize:function () {
            console.log('SkillsView.initialize');
            this.model.on('reset', this.render, this);
            //this.model.on( 'all' , function(event) {
            //  console.log("all event", event);
            //});
        },
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

    return SkillsView;

});
