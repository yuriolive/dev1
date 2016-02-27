'use strict';

class ConfirmEventCtrl {
  //start-non-standard
  errors = [];
  eventID = null;
  loading = true;
  patientName = null;
  //end-non-standard

  constructor($http, $state) {
    this.$http = $http;
    this.eventID = $state.params.eventID;

    // Set event status to confirmed
	this.setEventStatus();
  }

  setEventStatus() {
    this.$http.put('/api/events/setstatus/'+this.eventID)
    .then(response => {
      console.log(response);
      this.patientName = response.data.title;
      this.loading = false;
    })
    .catch(err => {
      err = err.data;
      this.errors = {};

      // Do something...
    });
  }

}

angular.module('dev1App')
  .controller('ConfirmEventCtrl', ConfirmEventCtrl);