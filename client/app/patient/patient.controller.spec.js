'use strict';

describe('Controller: PatientCtrl', function () {

  // load the controller's module
  beforeEach(module('dev1App'));

  var PatientCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PatientCtrl = $controller('PatientCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
