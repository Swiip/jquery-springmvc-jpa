'use strict';


// Declare app level module which depends on filters, and services
angular.module('skillbrowser', ['ui', 'skillbrowser.filters', 'skillbrowser.services', 'skillbrowser.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/welcome.html', controller: WelcomeController});
    $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: LoginController});
    $routeProvider.when('/users', {templateUrl: 'partials/users.html', controller: UsersController});
    $routeProvider.when('/users/:page', {templateUrl: 'partials/users.html', controller: UsersController});
    $routeProvider.when('/users/:page/:sort/:dir', {templateUrl: 'partials/users.html', controller: UsersController});
    $routeProvider.when('/skills', {templateUrl: 'partials/skills.html', controller: SkillsController});
    $routeProvider.when('/skills/:page', {templateUrl: 'partials/skills.html', controller: SkillsController});
    $routeProvider.when('/skills/:page/:sort/:dir', {templateUrl: 'partials/skills.html', controller: SkillsController});
    $routeProvider.otherwise({redirectTo: '/'});
  }]).run(function(Login, $location) {
      Login.get(function(loginStatus) {
        if(!loginStatus.loggedIn) {
          $location.url("/login");
        }
      })
  });
