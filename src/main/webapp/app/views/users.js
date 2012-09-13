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
      console.log("init");
      UsersCollection.fetch();
    },
    render: function() {
      console.log("coucou");
      $(".content").html( this.template( UsersTemplate ) );
    }
  });

  return UsersView;

});
