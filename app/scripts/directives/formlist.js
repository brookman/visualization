'use strict';

/**
 * @ngdoc directive
 * @name visApp.directive:formList
 * @description
 * # formList
 */
angular.module('visApp')
  .directive('formList', function (lodash, $routeParams, $location, Person) {
    return {
      templateUrl: 'views/formlist.html',
      restrict: 'E',
      link: function (scope) {
        var toRemove = [];
        Person.all().then(function (persons) {
          var sorted = lodash.sortBy(persons, 'name');
          scope.list = sorted;
        });

        scope.wordCloud = [{text: 'Word Cloud', weigth: 1}];
        scope.avaliableInterests = ['computer', 'tv', 'hello world'];
        scope.selectedInterests = [];
        scope.list = [];

        scope.$watch('list', function (newValue, oldValue) {
          var newList = allInterests(newValue);
          var oldList = allInterests(oldValue);
          if (!angular.equals(newList, oldList)) {
            updateWordCloud(newList);

          }
        }, true);

        scope.selected = function (person) {
          person.interests = lodash.sortBy(person.interests, function (string) {
            return string.toLowerCase();
          });
        };

        scope.addPerson = function () {
          var person = new Person();
          person.name = name;
          person.interests = [];
          scope.list.push(person);
        };

        scope.save = function () {
          angular.forEach(scope.list, function (person) {
            person.$saveOrUpdate();
          });
          angular.forEach(toRemove, function (person) {
            person.$remove();
          });
          toRemove = [];
        };

        scope.deletePerson = function (target) {
          toRemove.push(target);
          scope.list = lodash.reject(scope.list, function (item) {
            return target === item;
          });
        };

        scope.allInterestsDistinct = function () {
          var list = [];
          angular.forEach(scope.list, function (person) {
            list = lodash.union(list, person.interests);
          });
          return lodash.sortBy(list, function (string) {
            return string.toLowerCase();
          });
        };

        function allInterests(data) {
          var list = [];
          angular.forEach(data, function (person) {
            list = list.concat(person.interests);
          });
          return lodash.sortBy(list, function (string) {
            return string.toLowerCase();
          });
        }

        function updateWordCloud(list) {
          scope.wordCloud = [];
          angular.forEach(lodash.countBy(list), function (entry, key) {
            scope.wordCloud.push({text: key, weight: entry});
          });
        }

        updateWordCloud(allInterests(scope.list));
      }
    };
  });
