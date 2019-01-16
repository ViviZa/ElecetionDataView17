'use strict';

var app = angular.module('myAppView2', []);

app.controller("HelloController", function ($scope) {
    $scope.bundeslaender = [];
    $scope.wahlkreise = [];
    $scope.ergebnisse = [];

    $http.get("http://localhost:5000/getAllStates")
        .then(function(response) {
            $scope.bundeslaender = response.data;
        });


    $scope.showDetails = function (value) {
        $scope.ergebnisse = [];
        if (value === 'Berlin') {
            $scope.wahlkreise = berlin;
        } else if (value === 'Bayern') {
            $scope.wahlkreise = bayern;
        }
        else {
            $scope.wahlkreise = defaultVal;
        }

        return $scope.wahlkreise;
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
    }
});



