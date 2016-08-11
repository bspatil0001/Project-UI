'use strict';


var app = angular.module('myApp', ['directive1', 'directive2']);

app.factory('Helpers', function() {
    return {
        uniq: function(data, key) {
            var result = [];

            for (var i = 0; i < data.length; i++) {
                var value = data[i][key];

                if (result.indexOf(value) == -1) {
                    result.push(value);
                }
            }
            return result;
        },
        contains: function(data, obj) {
            for (var i = 0; i < data.length; i++) {
                if (data[i] === obj) {
                    return true;
                }
            }
            return false;
        }
    };
});


app.service('$myService', function($http) {
    this.getHomeDate = function() {
        var req = {
            method: 'GET',
            url: 'http://localhost/polyglotted/data.json',
            headers: {
                'Content-Type': undefined
            }
        }
        console.log($http(req));
        return $http(req);
    };
});

app.controller('myController', function($scope, Helpers, $filter, $http, $q, $myService) {
    $scope.useFacets = {};

    var mainInfo = $http.get('data.json');
    mainInfo.then(function(data) {
        var facetGroupNames = ['type', 'name', 'country'];
        var facetGroupNamesLen = facetGroupNames.length;
        $scope.facetGroups = [];
        $scope.items = data.data;
        console.log($scope.items);
        for (var i = 0; i < facetGroupNamesLen; i++) {
            var facetGroupObj = {
                name: facetGroupNames[i],
                facets: Helpers.uniq($scope.items, facetGroupNames[i])
            };

            $scope.facetGroups.push(facetGroupObj);
        }
        var filterBy = [];

        for (var i = 0; i < facetGroupNamesLen; i++) {
            var thisName = facetGroupNames[i];

            filterBy.push(Object.create(FacetResults));
            filterBy[i].init(i, thisName);
        }

        $scope.activeFacets = [];
        $scope.useFacets = {};
        $scope.$watch('useFacets', function(newVal, oldVal) {
            for (var i = 0; i < facetGroupNamesLen; i++) {
                if (i === 0) {
                    filterBy[0].filterItems($scope.items);
                } else {
                    filterBy[i].filterItems(postFilter[i - 1]);
                }
            }

            $scope.filteredItems = postFilter[facetGroupNamesLen - 1];

        }, true);
    });
    console.log("hello");



    $scope.$watch('query', function(newValue, oldValue) {
        if ((newValue !== oldValue) && $scope.activeFacets.length) {
            $scope.clearAllFacets();
        }
    });

    $scope.clearFacet = function(facet) {
        var i = $scope.activeFacets.indexOf(facet);
        if (i != -1) {
            $scope.activeFacets.splice(i, 1);
            for (var k in $scope.useFacets) {
                if ($scope.useFacets[k]) {
                    $scope.useFacets[k][facet] = false;
                }
            }
        }
    };

    $scope.clearAllFacets = function() {
        $scope.activeFacets = [];
        $scope.useFacets = {};
    };


    var postFilter = [];

    var FacetResults = {
        init: function(facetIndex, facetName) {
            this.facetIndex = facetIndex;
            this.facetName = facetName;
        },
        filterItems: function(filterAfterArray) {
            var postFilterIndex = this.facetIndex;
            postFilter[postFilterIndex] = [];

            var selected = false;

            for (var n in filterAfterArray) {
                var itemObj = filterAfterArray[n],
                    useFacet = $scope.useFacets[this.facetName];

                for (var facet in useFacet) {
                    if (useFacet[facet]) {
                        selected = true;

                        if (!Helpers.contains($scope.activeFacets, facet)) {
                            $scope.activeFacets.push(facet);
                        }

                        if (itemObj[this.facetName] == facet && !Helpers.contains(postFilter[postFilterIndex], itemObj)) {
                            postFilter[postFilterIndex].push(itemObj);
                            break;
                        }
                    } else {
                        selected = false;

                        var facetIndex = $scope.activeFacets.indexOf(facet);

                        if (facetIndex > -1) {
                            $scope.activeFacets.splice(facetIndex, 1);
                        }
                    }
                }
            }

            if (!selected) {
                postFilter[postFilterIndex] = filterAfterArray;
            }
        }
    };

});
