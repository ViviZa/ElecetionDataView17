'use strict';

var app = angular.module('myAppView2', []);

app.controller("HelloController", function ($scope) {
    $scope.bundeslaender = ['Berlin', 'Brandenburg', 'Bayern', 'Baden-Würtemberg', 'Nordrhein-Westfalen'];
    var berlin = ['Berlin-Mitte', 'Berlin-Neukölln', 'Berlin-Pankow'];
    var bayern = ['Ostallgäu', 'Oberallgäu', 'Donau-Ries', 'Aschaffenburg'];
    var defaultVal = ['Wahlkreis1', "Wahlkreis2", "Wahlkreis3"];

    $scope.wahlkreise = [];
    $scope.ergebnisse = [];

    $scope.showDetails = function (value) {
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

    $scope.showDiagram = function (value) {

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

        //TODO display diagrams on click
        console.log(value);
    }
});



