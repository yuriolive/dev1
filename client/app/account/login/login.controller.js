'use strict';

class LoginController {
  loading = false;

  constructor(Auth, $state) {
    this.user = {};
    this.errors = {};
    this.submitted = false;  

    this.Auth = Auth;
    this.$state = $state;
  }

  login(form) {
    this.submitted = true;
    this.loading = true;

    if (form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        // Logged in, redirect to home
        this.$state.go('agenda');
      })
      .catch(err => {
        this.errors.other = err.message;
        this.loading = false;
      });
    } else {
      this.loading = false;
    } // endif
  }
}

angular.module('dev1App')
  .controller('LoginController', LoginController);