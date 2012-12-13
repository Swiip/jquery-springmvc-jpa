'use strict';

/* Directives */

angular.module('skillbrowser.directives', []).
  directive('ngGrid',function () {
    return {
      restrict: 'A',
      scope: { grid: "=ngGrid" },
      controller: function () {}
    };
  }).
  directive("ngHead",function () {
    var sortTemplate = "<a ng-switch on=\"grid.sort == key\" ng-href=\"{{grid.link}}/{{grid.page}}/{{key}}/{{grid.sort == key && grid.dir == 'asc' && 'desc' || 'asc'}}\">" +
      "<div ng-transclude></div><img ng-switch-when=\"true\" ng-class=\"{'icon-chevron-down': grid.dir == 'asc', 'icon-chevron-up': grid.dir == 'desc'}\"/></a>";
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
      template: "<ul><li ng-class=\"{disabled: grid.page == 1}\"><a ng-href=\"{{grid.link}}/{{grid.page == 1 && 1 || grid.page - 1}}{{grid.sort && '/' + grid.sort + '/' + grid.dir}}\">&lt;</a></li>" +
        "<li ng-repeat=\"page in [] | range:1:grid.total+1\" ng-class=\"{active: page == grid.page}\">" +
        "<a ng-href=\"{{grid.link}}/{{page}}{{grid.sort && '/' + grid.sort + '/' + grid.dir}}\">{{page}}</a></li>" +
        "<li ng-class=\"{disabled: grid.page == grid.total}\"><a ng-href=\"{{grid.link}}/{{grid.page == grid.total && grid.total || grid.page + 1}}{{grid.sort && '/' + grid.sort + '/' + grid.dir}}\">&gt;</a></li></ul>"
    }
  }).
  directive('appVersion', ['version', function (version) {
    return function (scope, elm, attrs) {
      elm.append(version);
    };
  }]);