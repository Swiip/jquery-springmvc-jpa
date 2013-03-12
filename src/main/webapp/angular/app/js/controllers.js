'use strict';

/* Controllers */

function WelcomeController() {
  console.log("WelcomeController");
}

function LoginController($scope, Login) {
  console.log("LoginController");

  Login.get(function(loginStatus) {
    $scope.loginStatus = loginStatus;
    $scope.modal = !loginStatus.loggedIn;
  });

  $scope.login = function () {
    Login.save($scope.loginStatus, function (loginStatus) {
      $scope.loginStatus = loginStatus;
      $scope.modal = !loginStatus.loggedIn;
    });
  }
}

function UsersController($scope, $routeParams, User) {
  console.log("UsersController", $routeParams);

  var page = $routeParams.page || 1;
  var limit = 10;
  $scope.sort = $routeParams.sort || null;
  $scope.dir = $routeParams.dir || null;

  var requestParams = {
    page: page,
    limit: limit
  };
  if($scope.sort) {
    requestParams.sort = $scope.sort;
    requestParams[$scope.sort + '.dir'] = $scope.dir;
  }

  $scope.edit = function(user) {
    $scope.modal = true;
    $scope.user = user;
  };

  $scope.save = function() {
    console.log("save", $scope);
    User.put($scope.user);
    $scope.modal = false;
  };

  $scope.data = User.get({
    page: page,
    limit: limit,
    relations: [["user.User.skills"]]
  });

  window.toto = $scope;
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

