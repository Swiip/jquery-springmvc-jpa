define([
  'underscore',
  'backbone'
], function( _, Backbone ) {

  var User = Backbone.Model.extend({
    //url: 'data-rest/users'
  });

  //return new User();
  return User;
  
});