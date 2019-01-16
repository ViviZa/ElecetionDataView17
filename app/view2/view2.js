'use strict';

var app = angular.module('myAppView2', []);

app.controller("HelloController", function ($scope) {
    $scope.bundeslaender = ["Bayern"];
    $scope.wahlkreise = [];
    $scope.ergebnisse = [];

    $scope.showDetails = function (value) {
        $scope.ergebnisse = [];

        $http.get("http://localhost:5000/getAllDistrictsOF" + value)
            .then(function(response) {
                $scope.wahlkreise = response.data;
            });

        // return $scope.wahlkreise;
    };

    $scope.showDiagram = function () {
        $scope.ergebnisse = [];

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

        $scope.ergebnisse = result;
    };

    $scope.init = function () {
        $http.get("http://localhost:5000/getAllStates")
            .then(function (response) {
                $scope.bundeslaender = response.data;
            });
    }
});



