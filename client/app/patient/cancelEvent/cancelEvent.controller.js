'use strict';

class CancelEventCtrl {
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
	this.deleteEvent();
  }

  deleteEvent() {
    this.$http.delete('/api/events/delete/'+this.eventID)
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
  .controller('CancelEventCtrl', CancelEventCtrl);