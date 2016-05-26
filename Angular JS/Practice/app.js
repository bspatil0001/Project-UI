angular.module('myApp', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
  $routeProvider


   .when('/',{
    templateUrl : 'views/main.html',
    controller : 'mainController',
    })

  .when('/view',{
      templateUrl  : 'views/view.html',
      controller   : 'viewController'
    })
    .when('/update/:id',{
      templateUrl :'views/update.html',
      controller  : 'updateController'
    })


  .otherwise({
    redirectTo : '/'
  })

})
