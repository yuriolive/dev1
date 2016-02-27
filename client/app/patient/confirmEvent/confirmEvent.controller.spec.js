'use strict';

describe('Controller: ConfirmEventCtrl', function () {

  // load the controller's module
  beforeEach(module('dev1App'));

  var ConfirmEventCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConfirmEventCtrl = $controller('ConfirmEventCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
