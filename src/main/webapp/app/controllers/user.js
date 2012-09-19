define([
  'models/users'
], function() {
  console.log("init user ctrl");
  return function($scope, $routeParams, User) {
    $scope.users = User.query(function(User) {
      console.log("User", User.results);
    });
  };
});