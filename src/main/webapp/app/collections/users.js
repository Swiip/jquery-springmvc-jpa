define([
	'underscore',
	'backbone',
	'models/user',
  'collections/Hateoas'
], function(_, Backbone, User, Hateoas ) {
  var UsersCollection = Hateoas.PageableCollection.extend({
    url: 'data-rest/user'
  });
  return new UsersCollection();
});
