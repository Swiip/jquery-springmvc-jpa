define([
  'bootstrap',
  'underscore',
  'backbone',
  'collections/users',
  'text!templates/users.html'
], function( $, _, Backbone, UsersCollection, UsersTemplate ) {
  
  var UsersView = Backbone.View.extend({
    tagName:  'div',
    model: UsersCollection,
    template: _.template( UsersTemplate ),
    events: {
    },
    initialize: function() {
      console.log( 'UsersView.initialize' );
      this.model.on( 'reset', this.render, this );
      this.model.on( 'all' , function(event) {
        console.log("all event", event);
      });
      this.model.fetchPage();
    },
    render: function() {
      console.log("UsersView.render");
      $( '.content' ).html( this.template( { data : this.model } ) );
    }
  });

  return UsersView;

});
