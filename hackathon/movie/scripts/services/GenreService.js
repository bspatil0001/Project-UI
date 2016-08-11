(function(){
  'use strict';

  angular.module('myApp')
         .service('GenreService', ['$q', GenreService]);

  function GenreService($q){
    var genres = [ 'All', 'Action', 'Crime', 'Drama', 'Mystery', 'Sci-Fi', 'Adventure' ];

    return {
      loadAllUsers : function() {
        return $q.when(genres);
      }
    };
  }

})();
