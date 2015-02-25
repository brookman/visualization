'use strict';

/**
 * @ngdoc function
 * @name visApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the visApp
 */
angular.module('visApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
