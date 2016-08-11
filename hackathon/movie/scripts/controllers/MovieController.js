(function(){
  'use strict';
  angular
       .module('myApp')
       .controller('MovieController', [
          '$q', '$http', 'GenreService', '$mdSidenav', '$mdDialog', '$rootScope',
          MovieController
       ]);

  function MovieController( $q, $http, GenreService, $mdSidenav, $mdDialog, $rootScope ) {
    var vm = this;

    vm.selected      = null;
    vm.genres        = [];
    vm.movies        = [];
    vm.selectGenre   = selectGenre;
    vm.toggleSideNav = toggleSideNav;
    vm.getMovie      = getMovieFromLocal;
    vm.caption       = "Genre Selected - All";

    function getMovies(){
      var deferred = $q.defer();
      var movies = JSON.parse(localStorage.getItem("movies"));
      vm.noOfMovies = movies ? movies.length : 0;
      deferred.resolve(movies);
      return deferred.promise;
    }

    function checkIfMovieExists() {
      $rootScope.ajaxLoader = true;
      var check = getMovies();
      var deferred = $q.defer();
      check.then(function(movies) {
        if(movies){
          angular.forEach(movies, function(movie, i){
            if(movie.Title.toLowerCase() === vm.title.toLowerCase()){
              vm.movies = [];
              vm.movies.push(movie);
              deferred.resolve(true);
              $rootScope.ajaxLoader = false;
            }
            else if(i === movies.length-1){
              $rootScope.ajaxLoader = false;
              deferred.resolve(false);
            }
          });
        }
        else{
          $rootScope.ajaxLoader = false;
          deferred.resolve(false);
        }
      });
      return deferred.promise;
    }

    function init(){
      var check = getMovies();
      check.then(function(movies) {
        if(movies)
          vm.movies = movies;
      });
    }
    init();

    GenreService
          .loadAllUsers()
          .then( function( genres ) {
            vm.genres   = genres;
            vm.selected = genres[0];
          });

    function toggleSideNav() {
      $mdSidenav('left').toggle();
    }

    function selectGenre(item) {
      vm.selected = item;
      vm.caption = "Genre Selected - "+ item;
      var check = getMovies();
      check.then(function(movies) {
        if(movies)
          vm.movies = movies;
          if(item !== "All"){
            angular.forEach(vm.movies, function(movie, i){
              if(movie.Genre.split(', ').indexOf(item) === -1){
                delete vm.movies[i];
                vm.noOfMovies = Object.keys(vm.movies).length;
              }
            });
          }
      });
    }

    function get(url, encodedString) {
      $rootScope.ajaxLoader = true;
      var deferred = $q.defer();
      url = encodedString ? url + encodedString : url;
      $http.get(url)
        .success(function(rdata) {
          deferred.resolve(rdata);
          $rootScope.ajaxLoader = false;
        }).error(function(err) {
          deferred.reject(err);
          $rootScope.ajaxLoader = false;
        });
      return deferred.promise;
    }

    function getMovieFromLocal() {
      if(vm.title){
        vm.caption = "Searched Movie - "+ vm.title;
        var check = checkIfMovieExists();
        check.then(function(exists) {
          if(!exists){
            getMovieFromApi();
          }
        });
      }
    }

    function getMovieFromApi(){
      var urlString = "https://www.omdbapi.com/?t=" +vm.title+ "&plot=short&r=json";
      $q.when(get(urlString))
        .then(function(data) {
          if(data.Response === "True"){
            addMovie(data);
            checkIfMovieExists();
          }
          else {
            showAlert('movie not found');
          }
        });
    }

    vm.getRating = function(rating){
      var ratingDetails = [];
      var rate = Math.floor(rating/2);
      for(var i=0; i<5; i++){
        ratingDetails.push(i < rate ? "black-star" : "white-star");
      }
      return ratingDetails;
    };

    function addMovie(movie) {
      movie.Poster = movie.Poster.replace("http", "https");
      console.log(movie);
  		vm.movies.push(movie);
  		vm.search = '';
  		localStorage.setItem('movies', JSON.stringify(vm.movies));
      vm.noOfMovies++;
  	}

    var showAlert = function(text) {
      alert = $mdDialog.alert()
        .title('Attention!')
        .textContent(text)
        .ok('Close');
      $mdDialog
        .show(alert)
        .finally(function() {
          alert = undefined;
        });
    };

    var showCustomDialog = function(movie, ratingData, index, templateUrl) {
      $mdDialog.show({
          controller: ['$mdDialog', '$mdMedia', '$q', DialogController],
          controllerAs: "sd",
          templateUrl: templateUrl,
          parent: angular.element(document.querySelector('body')),
          clickOutsideToClose: true
        })
        .then(function(ok) {
          status = 'You said the information was "' + ok + '".';
        }, function() {
          status = 'You cancelled the dialog.';
        });

      function DialogController($mdDialog, $mdMedia, $q) {

        this.movie = movie;
        this.rating = ratingData;

        this.hide = function() {
          $mdDialog.hide();
        };

        this.getMovies = function(){
          var deferred = $q.defer();
          deferred.resolve(JSON.parse(localStorage.getItem("movies")));
          return deferred.promise;
        };

        this.editMovie = function(movie) {
          var check = this.getMovies();
          check.then(function(movies) {
            if(movies){
              movies[index] = movie;
              localStorage.setItem('movies', JSON.stringify(movies));
              $mdDialog.hide();
            }
          });
        };

        this.reset = function() {
          var check = this.getMovies();
          check.then(function(movies) {
            if(movies){
              var master = movies[index];
              angular.copy(master, movie);
            }
          });
        };

        this.cancel = function() {
          $mdDialog.cancel();
        };
      }

    };

    vm.editMovie = function(movie, index){
      var ratingData = vm.getRating(movie.imdbRating);
      showCustomDialog(movie, ratingData, index, 'partials/editMovie.html');
    };

  }

})();
