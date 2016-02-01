'use strict';

class EditarPacienteCtrl {
  //start-non-standard
  patient = {};
  errors = {};
  submitted = false;
  loading = false;
  //end-non-standard

  constructor($http, $state) {
    this.$http = $http;
    this.$state = $state;
  }

  addPaciente(form) {
  	this.submitted = true;
    this.loading = true;

    if (form.$valid) {
      this.$http.post('/api/patients', { 
      	name: this.patient.name,
      	birthday: this.patient.birthday,
      	email: this.patient.email,
      	phones: {
      		mobile: this.patient.phones.mobile,
      		home: this.patient.phones.home
      	},
      	note: this.patient.note
      })
      .then(() => {
        // Logged in, redirect to home
        this.$state.go('pacientes');
      })
      .catch(err => {
        this.loading = false;
        err = err.data;
        this.errors = {};

        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, (error, field) => {
          form[field].$setValidity('mongoose', false);
          this.errors[field] = error.message;
        });
      });
    } else {
      this.loading = false;
    }
  }
}

angular.module('dev1App')
  .controller('EditarPacienteCtrl', EditarPacienteCtrl);