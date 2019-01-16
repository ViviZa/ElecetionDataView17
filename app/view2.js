'use strict';

var app = angular.module('myAppView2', []);

app.controller("HelloController", function ($scope, $http) {
    $scope.bundeslaender = [];
    $scope.wahlkreise = [];
    $scope.ergebnisse = [];

    $scope.showDetails = function (value) {
        $scope.ergebnisse = [];

        $http.get("http://localhost:5000/getAllDistrictsOf?id=" + value)
            .then(function(response) {
                $scope.wahlkreise = JSON.parse(response.data);
            });
    };

    $scope.showDiagram = function (value) {

    $http.get("http://localhost:5000/getVotesOf?id=" + 1)
        .then(function(response) {
        console.log(response.data);
            $scope.ergebnisse = JSON.parse(response.data);
        });
    };

    $scope.init = function () {
        $http.get('http://localhost:5000/getAllStates').then(function(response){
            // the success -case
            $scope.bundeslaender = JSON.parse(response.data); }, function(response){
            // the error -case
            console.log(response);
        });
    }
});



