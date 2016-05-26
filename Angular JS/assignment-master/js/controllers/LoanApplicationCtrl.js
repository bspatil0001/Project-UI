"use strict";

(function() {
    angular.module('myApp')
        .controller('LoanApplicationCtrl', LoanApplicationCtrl);
    LoanApplicationCtrl.$Inject = [];

    function LoanApplicationCtrl() {
      var vm = this;
      vm.msg = "Loan";
    }
})();