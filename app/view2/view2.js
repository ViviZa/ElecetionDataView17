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

    $scope.showDiagram = function () {

        var result = [
            {
                "partei" : "Die Linke",
                "erststimme" : 10000,
                "zweitstimme" : 10000
            },
            {
                "partei" : "CDU",
                "erststimme" : 8989,
                "zweitstimme" : 1234
            }
        ];

        $http.get("http://localhost:5000//getVotesOf?id=" + value)
            .then(function(response) {
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



