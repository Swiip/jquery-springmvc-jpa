/**
 * Define Require module with dependencies
 */
define([
  'underscore',
  'backbone',
  'collections/Hateoas'
], function (_, Backbone, Hateoas) {
  /**
   * Users Collection which only extends Hateoas generic collection with the url binding
   */
  var UsersCollection = Hateoas.PageableCollection.extend({
    url:'data-rest/user'
  });

  // Return the view as the Require module
  return new UsersCollection();
});
