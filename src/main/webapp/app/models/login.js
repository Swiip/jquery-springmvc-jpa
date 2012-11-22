/**
 * Define Require module with dependencies
 */
define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  /**
   * LoginStatus Model
   */
  var LoginStatus = Backbone.Model.extend({
    // Defining default values on a not connected anonymous user
    defaults:{
      loggedIn:null,
      username:'',
      password:'',
      rememberMe:false
    },
    // Shortcut method
    isNew:function () {
      return false;
    },
    // Url binding of the REST service
    url:'rest/login'
  });

  // Return the view as the Require module
  return new LoginStatus();
});