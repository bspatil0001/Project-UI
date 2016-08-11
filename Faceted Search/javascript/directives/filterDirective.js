var app = angular.module("directive1", []);

app.directive("myFilters", function() {
    return {
        restrict: 'EA',
        templateUrl: 'template/filterPage.html',
        transclude: false
    }
});
