"use strict";

(function() {
    var app = angular.module('myApp', ['ui.router']);

    app.config(configRouter);
    configRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configRouter($stateProvider, $urlRouterProvider) {
         $urlRouterProvider.otherwise('/dashboard');

        $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'partials/dashboard.html',
            controller: 'DashboardCtrl',
            controllerAs: 'vm'
        })
        .state('appointments', {
            url: '/appointments',
            templateUrl: 'partials/appointment.html',
            controller: 'AppointmentCtrl',
            controllerAs: 'vm'
        })
        .state('loanapplication', {
            url: '/loanApplication',
            templateUrl: 'partials/loanApplication.html',
            controller: 'LoanApplicationCtrl',
            controllerAs: 'vm'
        })
        .state('track', {
            url: '/track',
            templateUrl: 'partials/track.html',
            controller: 'TrackCtrl',
            controllerAs: 'vm'
        });
    }
})();
