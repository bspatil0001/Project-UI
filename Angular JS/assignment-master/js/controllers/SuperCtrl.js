"use strict";

(function() {
    angular.module('myApp')
        .controller('SuperCtrl', SuperCtrl);

    SuperCtrl.$inject = ['panelConst', 'panelClass', '$state'];

    function SuperCtrl(panelConst, panelClass, $state) {
        var vm = this;
        vm.panelName = panelConst;
        vm.panelClass = panelClass;
        vm.selectedPanelName = vm.panelName[0][0];

        vm.changeFocus = changeFocus;

        function changeFocus(index){
          vm.selectedPanelName = vm.panelName[index][0];
          console.log($state.current.name);
          console.log(vm.selectedPanelName);
          var state = vm.selectedPanelName.split(" ").join("").toLowerCase();
          $state.go(state);
        }
    }
})();
