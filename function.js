(function() {
    let app = angular.module('myApp', ['ui.router']);

    app.run(function($rootScope, $location, $state, LoginService) {
        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams) {
                console.log('Changed state to: ' + toState);
            });

        if (!LoginService.isAuthenticated()) {
            $state.transitionTo('login');
        }
    });

    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'login.html',
                controller: 'LoginController'
            })
            .state('home', {
                url: '/home',
                templateUrl: 'home.html',
                controller: 'HomeController'
            });
    }]);
    //"head"-anmeed to the commit at thetip of branch 

    app.controller('LoginController', function($scope, $rootScope, $stateParams, $state, LoginService) {
        $rootScope.title = "AngularJS Login Sample";

        $scope.formSubmit = function() {
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

    app.controller('HomeController', function($scope, $rootScope, $stateParams, $state, LoginService) {
        $rootScope.title = "AngularJS Login Sample";

    });

    app.factory('LoginService', function() {
        let admin = 'admin';
        let pass = 'pass';
        let isAuthenticated = false;

        return {
            login: function(username, password) {
                isAuthenticated = username === admin && password === pass;
                return isAuthenticated;
            },
            isAuthenticated: function() {
                return isAuthenticated;
            }
        };

    });

})();