angular.module('myApp')
.config(function($mdThemingProvider, $mdIconProvider){

    $mdIconProvider
        .defaultIconSet("svg/avatars.svg", 128)
        .icon("send"       , "svg/send.svg", 24)
        .icon("message"    , "svg/message.svg", 24)
        .icon("close"      , "svg/close.svg", 24);

        $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
            .accentPalette('red');

});
