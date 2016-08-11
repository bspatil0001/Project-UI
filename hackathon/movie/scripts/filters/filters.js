(function() {
  'use strict';

  angular.module('myApp')
  .filter("limitLength", function() {
    return function(str) {
      if(!str) return;
      if(str.length > 19)  return str.slice(0, 19) + '...';
      return str;
    };
  });

})();
