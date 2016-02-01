'use strict';

describe('Controller: EditarPacienteCtrl', function () {

  // load the controller's module
  beforeEach(module('dev1App'));

  var EditarPacienteCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditarPacienteCtrl = $controller('EditarPacienteCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
