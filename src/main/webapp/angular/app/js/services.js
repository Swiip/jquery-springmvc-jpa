'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('skillbrowser.services', ["ngResource"]).
  value('version', '0.1').
  factory('Login', function($resource){
    return $resource('../../data-rest/login', {}, {});
  }).
  factory('User', function($resource){
    return $resource('../../data-rest/user', {}, {});
  }).
  factory('Skill', function($resource){
    return $resource('../../data-rest/skill', {}, {});
  });