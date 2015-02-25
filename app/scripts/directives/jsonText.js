'use strict';

angular.module('visApp')
  .directive('jsonText', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attr, ngModel) {

        scope.$watch(attr.ngModel, function (newValue) {
          element[0].value = out(newValue);
        }, true);

        function into(input) {
          return angular.fromJson(input);
        }

        function out(data) {
          return angular.toJson(data, true);
        }

        ngModel.$parsers.push(into);
        ngModel.$formatters.push(out);

      }
    };
  });
