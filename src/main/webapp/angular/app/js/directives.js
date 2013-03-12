'use strict';

/* Directives */

angular.module('skillbrowser.directives', []).
  directive('ngGrid',function () {
    return {
      restrict: 'A',
      scope: true,
      controller: function () {
      },
      link: function (scope, elm, attrs) {
        scope._grid = {
          link: attrs.link
        };
        angular.forEach(["page", "total", "sort", "dir"], function (attr) {
          scope.$watch(attrs[attr], function(value) {
            scope._grid[attr] = value;
          });
        });
      }
    };
  }).
  directive("ngHead",function () {
    var sortTemplate = "<a ng-switch on=\"_grid.sort == key\" ng-href=\"{{_grid.link}}/{{_grid.page}}/{{key}}/{{_grid.sort == key && _grid.dir == 'asc' && 'desc' || 'asc'}}\">" +
      "<div ng-transclude></div><img ng-switch-when=\"true\" ng-class=\"{'icon-chevron-down': _grid.dir == 'asc', 'icon-chevron-up': _grid.dir == 'desc'}\"/></a>";
    var simpleTemplate = "<div ng-transclude></div>";
    return {
      restrict: 'A',
      require: '^ngGrid',
      transclude: true,
      scope: true,
      compile: function (tElement, tAttrs, transclude) {
        if (tAttrs.sort) {
          tElement.html(sortTemplate);
        } else {
          tElement.html(simpleTemplate);
        }
        return function (scope, element, attrs) {
          scope.key = attrs.sort;
        }
      }
    }
  }).
  directive("ngPager",function () {
    return {
      restrict: 'A',
      require: '^ngGrid',
      scope: true,
      template: "<ul><li ng-class=\"{disabled: _grid.page == 1}\"><a ng-href=\"{{_grid.link}}/{{_grid.page == 1 && 1 || _grid.page - 1}}{{_grid.sort && '/' + _grid.sort + '/' + _grid.dir}}\">&lt;</a></li>" +
        "<li ng-repeat=\"page in [] | range:1:_grid.total+1\" ng-class=\"{active: page == _grid.page}\">" +
        "<a ng-href=\"{{_grid.link}}/{{page}}{{_grid.sort && '/' + _grid.sort + '/' + _grid.dir}}\">{{page}}</a></li>" +
        "<li ng-class=\"{disabled: grid.page == grid.total}\"><a ng-href=\"{{_grid.link}}/{{_grid.page == _grid.total && _grid.total || _grid.page + 1}}{{_grid.sort && '/' + _grid.sort + '/' + _grid.dir}}\">&gt;</a></li></ul>"
    }
  }).
  directive("ngModal",function () {
    return {
      restrict: 'A',
      scope: true,
      link: function (scope, elm, attrs, model) {
        scope.$watch(attrs.ngModal, function (value) {
          elm.modal(value && 'show' || 'hide');
        });
      }
    };
  }).
  directive('appVersion', ['version', function (version) {
    return function (scope, elm, attrs) {
      elm.append(version);
    };
  }]);