define([
  'angular'
], function(angular) {
  console.log("init User model");
  return angular.module('usersService', ['ngResource']).factory('User', function($resource) {
    return $resource('data-rest/user/:id', {}, {
      query: {
        method: 'GET',
        isArray: false
      }
    });
  });
});
