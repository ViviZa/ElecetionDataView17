'use strict';

var app = angular.module('myAppView2', ['chart.js']);

app.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
        chartColors: ['#FF5252', '#FF8A80'],
        responsive: true
    });
    // Configure all line charts
    ChartJsProvider.setOptions('line', {
        showLines: false
    });
}]);

app.controller("HelloController", function ($scope, $http) {
    $scope.states = [];
    $scope.districts = [];
    $scope.votes = [];
    $scope.canvasLabels = [];
    $scope.canvasFirstVotes = [];
    $scope.canvasSecondVotes = [];

    $scope.showDetails = function (value) {
        $scope.votes = [];
        $scope.districts = [];

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

    $scope.calculatePercentage = function (absolute, type) {
        getCanvasData();
        $scope.percentage = (absolute * 100) / calculateTotal(type) + '%';
    };

    function getCanvasData(){
        //pie chart
        var labelArray = [];
        var firstVotesDataArray = [];
        var secondVotesDataArray = [];
        $scope.votes.forEach((function (vote) {
            labelArray.push(vote.party);
            firstVotesDataArray.push(vote.first_vote);
            secondVotesDataArray.push(vote.second_vote);
        }));
        //set data for pie charts
        $scope.canvasLabels = labelArray;
        $scope.canvasFirstVotes = firstVotesDataArray;
        $scope.canvasSecondVotes = secondVotesDataArray;

        $scope.optionsFirstVotes =  {
            title: {
                display: true,
                text: 'Verteilung Erststimmen'
            }
        };
        $scope.optionsSecondVotes =  {
            title: {
                display: true,
                text: 'Verteilung Zweitstimen'
            }
        };


        //bar chart
        $scope.labels = labelArray;
        $scope.series = ['First Votes', 'Second Votes'];

        $scope.barChartData = [
            $scope.canvasFirstVotes,
            $scope.canvasSecondVotes
        ];
        $scope.barchartOptions =  {
            title: {
                display: true,
                text: 'Übersicht Erststimmen und Zweitstimmen'
            }
        };
    }

    function calculateTotal(type) {

        var total = 0;
        $scope.votes.forEach(function (result) {
            if (type === 'first') total = total + result.first_vote;
            if (type === 'second') total = total + result.second_vote;
        });
        return total;
    }

    $scope.init = function () {
        $http.get('http://localhost:5000/getAllStates').then(function (response) {
            $scope.states = JSON.parse(response.data);
        }, function (response) {
            // the error -case
            console.log(response);
            $scope.states = exampleStates;
        });
    };

    //for local testing
    var exampleStates = [
        {"id": 1, "name": "Berlin"},
        {"id": 2, "name": "Bayern"}
    ];
    var exampleDistricts = [{"id": 1, "name": "Berlin-Mitte"},
        {"id": 2, "name": "Berlin-Pankow"},
        {"id": 3, "name": "Berlin-Reinickendorf"}];
    var exampleVotes = [{"party": "Die Linke", "first_vote": 23200, "second_vote": 26068},
        {"party": "Piraten Partei Deutschland", "first_vote": 5463, "second_vote": 6608},
        {"party": "Alternative für Deutschland", "first_vote": 4212, "second_vote": 7443}];

});