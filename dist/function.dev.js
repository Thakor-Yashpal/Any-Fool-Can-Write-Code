"use strict";

(function () {
  var app = angular.module('myApp', ['ui.router']);
  app.run(function ($rootScope, $location, $state, LoginService) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      console.log('Changed state to: ' + toState);
    });

    if (!LoginService.isAuthenticated()) {
      $state.transitionTo('login');
    }
  });
  app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider.state('login', {
      url: '/login',
      templateUrl: 'login.html',
      controller: 'LoginController'
    }).state('home', {
      url: '/home',
      templateUrl: 'home.html',
      controller: 'HomeController'
    });
  }]); //"head"-anmeed to the commit at thetip of branch  add this  on site 
  // barncha A on main barnch but if you change thius barnch it can reload at sam timeline

  app.controller('LoginController', function ($scope, $rootScope, $stateParams, $state, LoginService) {
    $rootScope.title = "AngularJS Login Sample";

    $scope.formSubmit = function () {
      if (LoginService.login($scope.username, $scope.password)) {
        $scope.error = '';
        $scope.username = '';
        $scope.password = '';
        $state.transitionTo('home');
      } else {
        $scope.error = "Incorrect username/password !";
      }
    };
  });
  app.controller('HomeController', function ($scope, $rootScope, $stateParams, $state, LoginService) {
    $rootScope.title = "AngularJS Login Sample";
  });
  app.factory('LoginService', function () {
    var admin = 'admin';
    var pass = 'pass';
    var _isAuthenticated = false;
    return {
      login: function login(username, password) {
        _isAuthenticated = username === admin && password === pass;
        return _isAuthenticated;
      },
      isAuthenticated: function isAuthenticated() {
        return _isAuthenticated;
      }
    };
  });
})(); ///function


var as = 23;
var da = 12;
var vs = 'yashpal';
console.log(as + '' + da);
//# sourceMappingURL=function.dev.js.map
