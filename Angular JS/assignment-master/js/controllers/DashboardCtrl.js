"use strict";

(function() {
    angular.module('myApp')
        .controller('DashboardCtrl', DashboardCtrl);
    DashboardCtrl.$inject = [];

    function DashboardCtrl() {
        var vm = this;
        vm.persons = [
          {
            name: "Suraj Jadhav",
            bank: 'ICICI',
            loanAmount: '9000000',
            project: 'Aristo',
            contact: '9876543210'
          },
          {
            name: "Nikit Vira",
            bank: 'Axis',
            loanAmount: '7000000',
            project: 'Lodha',
            contact: '9876543210'
          },
          {
            name: "Sachin Tendulkar",
            bank: 'HDFC',
            loanAmount: '10000000',
            project: 'Aristo',
            contact: '9876543210'
          },
          {
            name: "Sweta Saundarava",
            bank: 'ICICI',
            loanAmount: '5000000',
            project: 'Chauhan',
            contact: '9876543210'
          },
          {
            name: "Manjusa Wagh",
            bank: 'Axis',
            loanAmount: '7500000',
            project: 'Lodha',
            contact: '9876543210'
          },
          {
            name: "Chris Demello",
            bank: 'HDFC',
            loanAmount: '8000000',
            project: 'Boulevard',
            contact: '9876543210'
          },
          {
            name: "Suraj Jadhav",
            bank: 'ICICI',
            loanAmount: '9000000',
            project: 'Aristo',
            contact: '9876543210'
          }
        ];
    }

})();
