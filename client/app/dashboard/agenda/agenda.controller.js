'use strict';

class AgendaCtrl {
  //start-non-standard
  errors = [];
  submitted = false;
  loading = true;
  patients = {};
  newEvent = {};
  events = [];
  eventSources = [this.events];
  //end-non-standard

  constructor($http) {
    this.$http = $http;
     this.uiConfig = { // Full Calendar Config
      calendar:{
        height: 550,
        editable: true,
        selectable: true,
        eventOverlap: false,
        selectHelper: true,
        timezone: 'local',
        select: (start, end) => {
            this.newEvent.startDate = new Date(start);
            this.newEvent.endDate = new Date(end);
            angular.element('.ui.modal').modal('show');
            //uiCalendarConfig.calendars.myCalendar.fullCalendar('unselect');
        },
        lang: 'pt-br',
        defaultView: 'agendaWeek',
        header:{
          left: 'month agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
        eventResize: this.eventUpdate,
        eventClick: this.eventUpdate,
        eventDrop: this.eventUpdate
      }
    };
    angular.element('.ui.dropdown.agenda').dropdown();

    // Get all the patients
    this.getPatients();
    
    // Get all events
    this.getEvents();
  }

  // TODO Essa funcao se repete em outro arquivo, deve tratar isso
  getPatients() {
    this.$http.get('/api/patients')
    .then(response => {
      this.patients = response.data;
      this.loading = false;
    })
    .catch(err => {
      err = err.data;
      this.errors = {};

      // Do something...
    });
  }

  // Add new event from modal
  addEvent(form) {
    this.submitted = true;
    this.loading = true;


    if(form.$valid && (document.getElementById("patientIndex").value != '') && (this.newEvent.startDate < this.newEvent.endDate)) {
      var eventSubmit = { 
        start: this.newEvent.startDate,
        end: this.newEvent.endDate,
        title: this.patients[document.getElementById("patientIndex").value].name,
        patient: this.patients[document.getElementById("patientIndex").value]._id,
        note: this.newEvent.note
      };

      angular.element('.ui.modal').modal('hide');

      this.$http.post('/api/events', eventSubmit)
      .then(() => {
        this.loading = false;
        this.events.push(eventSubmit);
      })
      .catch(err => {
        err = err.data;
        this.errors = [];
        this.loading = false;

        // Save errors
        angular.forEach(err.errors, (error, field) => {
          this.errors.push(error.message);
        });
      });
    } else {
      this.loading = false;
    }
  }

  // Get events
  getEvents() {
    this.$http.get('/api/events')
    .then(response => {
      this.events.push(...response.data);
    })
    .catch(err => {
      err = err.data;
      this.errors = {};

      // Do something...
    });
  }

  // Update event
  eventUpdate = (event) => {
    this.loading = true;
    this.$http.put('/api/events/'+event._id, event)
    .then(response => {
      this.loading = false;
    })
    .catch(err => {
      err = err.data;
      this.errors = {};
      this.loading = false;

      // Do something...
    });
  }
}

angular.module('dev1App')
  .controller('AgendaCtrl', AgendaCtrl);