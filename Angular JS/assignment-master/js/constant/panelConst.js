"use strict";

(function() {
    angular.module('myApp')
        .constant('panelConst', [
            ['Dashboard'],
            ['Leads'],
            ['Appointments', ['Schedule', 'Reschedule']],
            ['Loan Application', ['New Form', 'Applications']],
            ['Tasks'],
            ['Track'],
            ['Sanctions'],
            ['Disbursements'],
            ['Messages']
        ])
        .constant('panelClass', [
            'fa fa-qrcode',
            'fa fa-rocket',
            'fa fa-list',
            'fa fa-pencil-square-o',
            'fa fa-tasks',
            'fa fa-exclamation',
            'fa fa-puzzle-piece',
            'fa fa-bullhorn',
            'glyphicon glyphicon-envelope'
          ]);
})();
