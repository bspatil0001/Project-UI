var app = angular.module("directive2", []);

app.directive("myFilteredPage", function() {
    return {
        restrict: 'EA',
        templateUrl: 'template/myFilteredPage.html',
        transclude: false
    }
});
