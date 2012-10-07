define([
    'underscore',
    'backbone',
    'collections/Hateoas'
], function (_, Backbone, Hateoas) {
    var UsersCollection = Hateoas.PageableCollection.extend({
        url:'data-rest/user'
    });
    return new UsersCollection();
});
