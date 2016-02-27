'use strict';

angular.module('dev1App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('patient', {
        url: '/patient',
        templateUrl: 'app/patient/patient.html',
        controller: 'PatientCtrl',
        controllerAs: 'vm'
      })      
      .state('confirmEvent', {
        url: '/patient/confirm/:eventID',
        templateUrl: 'app/patient/confirmEvent/confirmEvent.html',
        controller: 'ConfirmEventCtrl',
        controllerAs: 'vm'
      })
      .state('cancelEvent', {
        url: '/patient/cancel/:eventID',
        templateUrl: 'app/patient/cancelEvent/cancelEvent.html',
        controller: 'CancelEventCtrl',
        controllerAs: 'vm'
      });
  });
