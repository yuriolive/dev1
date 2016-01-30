'use strict';

describe('Controller: PacientesCtrl', function () {

  // load the controller's module
  beforeEach(module('dev1App'));

  var PacientesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PacientesCtrl = $controller('PacientesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
