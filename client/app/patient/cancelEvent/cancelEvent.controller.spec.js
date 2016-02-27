'use strict';

describe('Controller: CancelEventCtrl', function () {

  // load the controller's module
  beforeEach(module('dev1App'));

  var CancelEventCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CancelEventCtrl = $controller('CancelEventCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
