'use strict';

var app = angular.module('myAppView2', []);

app.controller("HelloController", function ($scope, $http) {
    $scope.states = [];
    $scope.districts = [];
    $scope.votes = [];

    $scope.showDetails = function (value) {
        $scope.votes = [];

        $http.get("http://localhost:5000/getAllDistrictsOf?id=" + value)
            .then(function (response) {
                $scope.districts = JSON.parse(response.data);
            }, function (response) {
                // the error -case
                console.log(response);
                $scope.districts = exampleDistricts;
            });
    };

    $scope.showPartyTable = function (value) {
        $http.get("http://localhost:5000/getVotesOf?id=" + value)
            .then(function (response) {
                console.log(response.data);
                $scope.votes = JSON.parse(response.data);
            }, function (response) {
                // the error -case
                console.log(response);
                $scope.votes = exampleVotes;
            });
    };

    function calculateTotal(type) {
        var total = 0;
        $scope.votes.forEach(function(result) {
            if(type === 'first') total = total + result.first_vote;
            if(type === 'second') total = total + result.second_vote;
        });
        return total;
    };

    $scope.calculatePercentage = function (absolute, type) {
        $scope.percentage = (absolute * 100)/calculateTotal(type) + '%';
    };

    $scope.init = function () {
        $http.get('http://localhost:5000/getAllStates').then(function (response) {
            $scope.states = JSON.parse(response.data);
        }, function (response) {
            // the error -case
            console.log(response);
            $scope.states = exampleStates;
        });
    };


    var exampleStates = [
        {"id": 1, "name": "Berlin"},
        {"id": 2, "name": "Bayern"}
    ];
    var exampleDistricts = [{"id": 1, "name": "Berlin-Mitte"},
        {"id": 2, "name": "Berlin-Pankow"},
        {"id": 3, "name": "Berlin-Reinickendorf"}];
    var exampleVotes = [{"party": "Die Linke", "first_vote": 23200, "second_vote": 26068},
        {"party": "Piraten Partei Deutschland", "first_vote": 5463, "second_vote": 6608}];

});