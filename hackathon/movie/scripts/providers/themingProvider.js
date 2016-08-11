angular.module('myApp')
.config(function($mdThemingProvider, $mdIconProvider){

    $mdIconProvider
        .defaultIconSet("svg/avatars.svg", 128)
        .icon("menu"       , "svg/menu.svg", 24)
        .icon("white-star" , "svg/star_white.svg", 24)
        .icon("black-star" , "svg/star_black.svg", 24)
        .icon("search"     , "svg/search.svg", 24)
        .icon("close"      , "svg/close.svg", 24);

        $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
            .accentPalette('blue');

});
