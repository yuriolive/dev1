'use strict';

angular.module('dev1App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('pacientes', {
        url: '/pacientes',
        templateUrl: 'app/pacientes/pacientes.html',
        controller: 'PacientesCtrl',
        controllerAs: 'vm',
        authenticate: true
      });
  });
