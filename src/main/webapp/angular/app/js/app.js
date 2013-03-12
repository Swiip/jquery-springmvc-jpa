'use strict';


// Declare app level module which depends on filters, and services
angular.module('skillbrowser', ['skillbrowser.filters', 'skillbrowser.services', 'skillbrowser.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/welcome.html', controller: WelcomeController});
    $routeProvider.when('/users', {templateUrl: 'partials/users.html', controller: UsersController});
    $routeProvider.when('/users/:page', {templateUrl: 'partials/users.html', controller: UsersController});
    $routeProvider.when('/users/:page/:sort/:dir', {templateUrl: 'partials/users.html', controller: UsersController});
    $routeProvider.when('/skills', {templateUrl: 'partials/skills.html', controller: SkillsController});
    $routeProvider.when('/skills/:page', {templateUrl: 'partials/skills.html', controller: SkillsController});
    $routeProvider.when('/skills/:page/:sort/:dir', {templateUrl: 'partials/skills.html', controller: SkillsController});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);


/*
Voir sil est possible de faire passer les controllers dans le système d'injection
Voir sil est possible de créer un service pour factoriser les controllers
Créer un service pour les services REST Hateoas
- Permettre le save en virant les jointures et en utilisant le lien self
- Reproduire les fonctionnalités de base type get
- Trouver une façon pratique de résoudre les jointures
- Voir s'il est possible de faire un système de references
*/