define([
  'underscore',
  'backbone'
], function( _, Backbone ) {

  var LoginStatus = Backbone.Model.extend({
    defaults: {
      loggedIn: null,
      username: '',
      password: '',
      rememberMe: false  
    },
    isNew: function() {
      return false;
    },
    url: 'rest/login'
  });

  return new LoginStatus();
  
});