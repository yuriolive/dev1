'use strict';

angular.module('dev1App.auth', [
  'dev1App.constants',
  'dev1App.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
