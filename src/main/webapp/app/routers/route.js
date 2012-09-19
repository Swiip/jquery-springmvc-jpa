define([
  'angular',
  'controllers/user',
  'models/users'
], function( angular, UserController ) {
  console.log("route", UserController);
  
  return angular.module('app', ['usersService']).config(function($routeProvider) {
    $routeProvider.when('/users', {
      controller: UserController,
      templateUrl: 'app/templates/users.html'
    }).
    when('/users/:page', {
      controller: UserController,
      templateUrl: 'app/templates/users.html'
    });
  });
});