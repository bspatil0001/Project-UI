"use strict";

(function() {
    angular.module('myApp')
        .controller('AppointmentCtrl', AppointmentCtrl);
    AppointmentCtrl.$Inject = [];

    function AppointmentCtrl() {
      var vm = this;
      vm.msg = "Appointment";
    }
})();