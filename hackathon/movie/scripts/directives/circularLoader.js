angular.module('myApp')

.directive('circularLoader', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/circularLoader.html',
      transclude: false
    };
});
