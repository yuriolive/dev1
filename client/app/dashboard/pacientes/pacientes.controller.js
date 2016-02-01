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
  /*deletePaciente(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
  pacientesCadastr
  
  */
}

angular.module('dev1App')
  .controller('PacientesCtrl', PacientesCtrl);


