'use strict';

/* Services */

var bind = function(scope1, watch1, scope2, watch2) {
  angular.forEach([
    {scope: scope1, watch: watch1},
    {scope: scope2, watch: watch2}
  ], function(value) {
    value.scope.$watch(value.watch, function(value) {

    })
  });
};


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('skillbrowser.services', ["ngResource"]).
  value('version', '0.1').
  factory('$hateoas', function($http){
    return function(url) {
      var edit = function(method, data) {
        console.log("edit", method, url, data);
        if(data._links) {
          var selfUrl = null;
          angular.forEach(data._links, function(value) {
            if(value.rel == "self") {
              selfUrl = value.href;
            }
          });
          var dataToTransfer = angular.copy(data);
          delete dataToTransfer._links;
          console.log("save links", selfUrl, dataToTransfer);
          $http({
            method: method,
            url: selfUrl,
            data: dataToTransfer
          });
        } else {
          $http({
            method: method,
            url: url,
            data: data
          });
        }
      };
      var loadRelation = function(linkString, anchor) {
        if(!angular.isArray(linkString)) {
          linkString = [linkString];
        } else if(linkString.length == 0) {
          return;
        }
        var linkString = angular.copy(linkString);
        var relation = linkString.shift();
        var relationLink = null;
        angular.forEach(anchor._links, function(link) {
          if(link.rel == relation){
            relationLink = link;
          }
        });
        anchor[relation] = [];
        if(relationLink) {
          $http.get(relationLink.href).success(function(relationData){
            angular.forEach(relationData._links, function(link) {
              $http.get(link.href).success(function(data){
                var index = anchor[relation].push(data);
                loadRelation(linkString, anchor[relation][index - 1]);
              });
            });
          });
        }
      };
      var loadAllRelations = function(relations, data) {
        if(relations) {
          if(!angular.isArray(relations)) {
            relations = [relations];
          }
          angular.forEach(relations, function(linkString) {
            angular.forEach(data.results ? data.results : data, function(anchor) {
              loadRelation(linkString, anchor);
            });
          });
        }
      };
      return {
        'get': function(params) {
          var result = {
            results: null,
            currentPage: null,
            totalPages: null
          };
          $http
            .get(url + "?page=" + encodeURI(params.page) + "&limit=" + encodeURI(params.limit))
            .success(function(data){
              angular.extend(result, data);
              loadAllRelations(params.relations, data);
            });
          return result;
        },
        'post': function(data) {
          return edit('post', data);
        },
        'put': function(data) {
          return edit('put', data)
        }
      }
    }
  }).
  factory('Login', function($resource){
    return $resource('../../data-rest/login');
  }).
  factory('User', function($hateoas){
    return $hateoas('../../data-rest/user');
  }).
  factory('Skill', function($hateoas){
    return $hateoas('../../data-rest/skill');
  });