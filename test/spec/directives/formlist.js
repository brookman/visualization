'use strict';

describe('Directive: formList', function () {

  // load the directive's module
  beforeEach(module('visApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<form-list></form-list>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the formList directive');
  }));
});
