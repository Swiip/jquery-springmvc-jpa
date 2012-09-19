define([
  'bootstrap',
  'underscore',
  'backbone',
  'views/user-skills',
  'collections/users',
  'text!templates/users.html'
], function( $, _, Backbone, UserSkillsView, UsersCollection, UsersTemplate ) {
  
  var UsersView = Backbone.View.extend({
    tagName:  'div',
    model: UsersCollection,
    template: _.template( UsersTemplate ),
    events: {
    },
    initialize: function() {
      console.log( 'UsersView.initialize' );
      this.model.on( 'reset', this.render, this );
      //this.model.on( 'all' , function(event) {
      //  console.log("all event", event);
      //});
    },
    render: function() {
      console.log("UsersView.render", this.model);
      $( '.content' ).html( this.template( { data : this.model } ) );
      this.model.each(function(user) {
        new UserSkillsView({
          el: this.$('[data-anchor="' + user.get( 'login' ) + '"]'),
          model: user.get( 'user.User.skills' )
        });
      });
    }
  });

  return UsersView;

});
