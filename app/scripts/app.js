'use strict';

/**
 * @ngdoc overview
 * @name visApp
 * @description
 * # visApp
 *
 * Main module of the application.
 */
angular
  .module('visApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngLodash',
    'angular-jqcloud',
    'ui.select',
    'mongolabResourceHttp'
  ])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(false);

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  })
  .constant('MONGOLAB_CONFIG', {DB_NAME: 'interests'})
  .factory('Person', function ($mongolabResourceHttp) {
    return $mongolabResourceHttp('persons');
  });
