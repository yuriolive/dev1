'use strict';

class PacientesCtrl {
  //start-non-standard
  errors = {};
  submitted = false;
  loading = false;
  patients = {};
  //end-non-standard

  constructor($http) {
    this.$http = $http;
    this.getPatients();
    angular.element('.ui.dropdown.checkbox-paciente').dropdown();
  }

  getPatients() {
    this.$http.get('/api/patients')
    .then(response => {
      this.patients = response.data;
    })
    .catch(err => {
      err = err.data;
      this.errors = {};

      // Do something...
    });
  }


  // Function to delete selected patients
  deletePatients() {
    this.$http.post(
      '/api/patients/delete/bulk', 
      this.patients.filter(function(p) {
        return p.selected;
      }))
    .then(response => {
      this.loading = false;
      // TODO Seria interessante fazer so 1 filter
      this.patients = this.patients.filter(function(p) {
        return p.selected == false;
      });
    })
    .catch(err => {
      err = err.data;
      this.errors = {};

      // Do something...
    });
  }
}

angular.module('dev1App')
  .controller('PacientesCtrl', PacientesCtrl);


