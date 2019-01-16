'use strict';

var app = angular.module('myAppView2', []);

app.controller("HelloController", function ($scope, $http) {
    $scope.bundeslaender = [];
    $scope.wahlkreise = [];
    $scope.ergebnisse = [];

    $scope.showDetails = function (value) {
        $scope.ergebnisse = [];

        $http.get("http://localhost:5000/getAllDistrictsOf?id=" + value)
            .then(function (response) {
                $scope.wahlkreise = JSON.parse(response.data);
            });
    };

    $scope.showPartyTable = function (value) {
        $http.get("http://localhost:5000/getVotesOf?id=" + value)
            .then(function (response) {
                console.log(response.data);
                $scope.ergebnisse = JSON.parse(response.data);
            });
    };

    function calculateTotal(type){
        var total = 0;
        $scope.ergebnisse.forEach(function(result) {
            if(type === 'first') total = total + result.first_vote;
            if(type === 'second') total = total + result.second_vote;
        });
        return total;
    };

    $scope.calculatePercentage = function (absolute, type){
        $scope.percentage = (absolute * 100)/calculateTotal(type) + '%';
    };

    $scope.init = function () {
        $http.get('http://localhost:5000/getAllStates').then(function (response) {
            $scope.bundeslaender = JSON.parse(response.data);
        }, function (response) {
            // the error -case
            console.log(response);
        });
    }
});



