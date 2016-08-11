(function() {
    'use strict';

    angular.module('myApp').controller('myController', ['$interval', function($interval) {

        var vm = this;

        vm.width = "0%";
        var stop,timer = {};

        vm.startTimer = function() {
          if (!angular.isDefined(stop)) {
            var time = vm.time.split(':');
            console.log();
            timer.hours = parseInt(time[0]);
            timer.min = parseInt(time[1]);
            timer.sec = parseInt(time[2]);


            timer.totalSec = timer.sec + (timer.min * 60) + (timer.hours * 60 * 60);

            if ( angular.isDefined(stop) ) return;
            var secCount = 0;
            stop = $interval(function() {
              secCount++;
              if(timer.sec % 5 === 0){
                vm.width = Math.round(secCount / timer.totalSec * 100) + '%';
              }

              if (timer.sec === -1) {
                timer.sec = 59;
                timer.min--;
              }

              if (timer.min === -1) {
                timer.min = 59;
                timer.hours--;
              }

              if (timer.hours === 0 && timer.min === 0 && timer.sec === 0){
                vm.time = "00:00:00";
                vm.width = "100%";
                vm.stopFight();
              }
              else {
                vm.time = (timer.hours < 10 ? '0'+timer.hours : timer.hours)+ ':' +(timer.min < 10 ? '0'+timer.min : timer.min)+ ':' +(timer.sec < 10 ? '0'+timer.sec-- : timer.sec--);
              }
            }, 1000);
          }
      };

      vm.stopFight = function() {
        if (angular.isDefined(stop)) {
          $interval.cancel(stop);
          stop = undefined;
        }
      };

    }]);

})();
