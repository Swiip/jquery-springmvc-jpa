'use strict';

/* Controllers */

function WelcomeController() {
  console.log("WelcomeController");
}

function LoginController($scope, Login) {
  console.log("LoginController", $scope.modalShown);

  $scope.loginStatus = {
    username: "",
    password: ""
  };
  $scope.modalShown = true;

  $scope.login = function () {
    Login.save($scope.loginStatus, function (loginStatus) {
      $scope.loginStatus = loginStatus;
      if (loginStatus.loggedIn) {
        $scope.modalShown = false;
      }
    });
  }
}

function UsersController($scope, $routeParams, $http, User) {
  console.log("UsersController", $routeParams);

  var page = $routeParams.page || 1;
  var limit = 10;
  var sort = $routeParams.sort || null;
  var dir = $routeParams.dir || null;

  var requestParams = {
    page: page,
    limit: limit
  };
  if(sort) {
    requestParams.sort = sort;
    requestParams[$scope.sort + '.dir'] = dir;
  }

  User.get(requestParams, function (data) {
    $scope.users = {
      link: "#users",
      data: data.results,
      page: data.currentPage,
      total: data.totalPages,
      sort: sort,
      dir: dir
    };
    angular.forEach(data.results, function(element) {
      angular.forEach(element._links, function(link) {
        if(link.rel == "user.User.skills") {
          $http.get(link.href).success(function(data){
            angular.forEach(data._links, function(link) {
              element.skills = [];
              $http.get(link.href).success(function(data){
                element.skills.push(data);
              });
            });
          });
        }
      });
    });
  });
}

function SkillsController($scope, $routeParams, $http, Skill) {
  var page = $routeParams.page || 1;
  var limit = 10;
  var sort = $routeParams.sort || null;
  var dir = $routeParams.dir || null;

  var requestParams = {
    page: page,
    limit: limit
  };
  if(sort) {
    requestParams.sort = sort;
    requestParams[$scope.sort + '.dir'] = dir;
  }

  Skill.get(requestParams, function (data) {
    $scope.skills = {
      link: "#skills",
      data: data.results,
      page: data.currentPage,
      total: data.totalPages,
      sort: sort,
      dir: dir
    };
    angular.forEach(data.results, function(element) {
      angular.forEach(element._links, function(link) {
        if(link.rel == "skill.Skill.users") {
          $http.get(link.href).success(function(data){
            angular.forEach(data._links, function(link) {
              element.users = [];
              $http.get(link.href).success(function(data){
                element.users.push(data);
              });
            });
          });
        }
      });
    });
  });
}

