'use strict';

/* Filters */

angular.module('skillbrowser.filters', []).
  filter('range',function () {
    return function (input, start, total) {
      start = parseInt(start);
      total = parseInt(total);
      for (var i = start; i < total; i++) {
        input.push(i);
      }
      return input;
    };
  }).
  filter('interpolate', ['version', function (version) {
    return function (text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]);
