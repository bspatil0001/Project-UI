"use strict";

(function() {
    angular.module('myApp')
        .controller('TrackCtrl', TrackCtrl);
    TrackCtrl.$Inject = [];

    function TrackCtrl() {
      var vm = this;
      vm.msg = "track";
    }
})();
