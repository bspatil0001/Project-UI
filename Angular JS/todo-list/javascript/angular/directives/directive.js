var app = angular.module("myApp");

app.directive("datepicker", function() {
  return {
    restrict: "A",
    require: 'ngModel',
    link: function(scope, element, attrs, ngModelCtrl) {
      element.datepicker({
        dateFormat: "dd-mm-yy",
        onSelect: function(date) {
          ngModelCtrl.$setViewValue(date);
          scope.$apply();
        }
      });
    }
  };
});
