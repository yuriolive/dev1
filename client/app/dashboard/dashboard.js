'use strict';

angular.module('dev1App')
  .config(function($stateProvider) {
    $stateProvider
      .state('pacientes', {
        url: '/pacientes',
        templateUrl: 'app/dashboard/pacientes/pacientes.html',
        controller: 'PacientesCtrl',
        controllerAs: 'vm',
        authenticate: true
      })
      .state('editarPaciente', {
        url: '/pacientes/editar',
        templateUrl: 'app/dashboard/pacientes/editarPaciente/editarPaciente.html',
        controller: 'EditarPacienteCtrl',
        controllerAs: 'vm',
        authenticate: true
      })
      .state('agenda', {
        url: '/agenda',
        templateUrl: 'app/dashboard/agenda/agenda.html',
        controller: 'AgendaCtrl',
        controllerAs: 'vm',
        authenticate: true        
      });
  });
