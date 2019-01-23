'use strict';

var app = angular.module('myAppView2', ['chart.js']);

app.controller("HelloController", function ($scope, $http) {

    $scope.showDetails = function (value) {
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

        $scope.totalFirst = calculateTotal('first');
        $scope.totalSecond = calculateTotal('second');

        var percentage = 0;

        if (type === 'first') percentage = Math.round((absolute * 100) / $scope.totalFirst) + '%';
        if (type === 'second') percentage = Math.round((absolute * 100) / $scope.totalSecond) + '%';

        return percentage;
    };

    function calculateTotal(type) {
        var total = 0;

        $scope.votes.forEach(function (result) {
            if (type === 'first' && result.first_vote) total = total + parseInt(result.first_vote);
            if (type === 'second' && result.second_vote) total = total + parseInt(result.second_vote);
        });

        return total;
    }

    function getCanvasData(){

        //collect chart data
        var labelArray = [];
        var firstVotesDataArray = [];
        var secondVotesDataArray = [];
        $scope.votes.forEach((function (vote) {
            labelArray.push(vote.party);
            firstVotesDataArray.push(vote.first_vote);
            secondVotesDataArray.push(vote.second_vote);
        }));

        $scope.colors =  ['#000000', '#e3000f' , '#DF0404', '#579541', '#ECECEE', '#e5007d', '#009ee0'];

        //set data for pie charts
        $scope.canvasLabels = labelArray;
        $scope.canvasFirstVotes = firstVotesDataArray;
        $scope.canvasSecondVotes = secondVotesDataArray;

        //pie 1
        $scope.optionsFirstVotes =  {
            title: {
                display: true,
                responsive: true,
                text: 'Verteilung Erststimmen'
            }
        };

        //pie 2
        $scope.optionsSecondVotes =  {
            title: {
                display: true,
                responsive: true,
                text: 'Verteilung Zweitstimmen'
            }
        };


        //set data for bar chart
        $scope.labels = labelArray;
        $scope.series = ['Erststimmen', 'Zweitstimmen'];

        $scope.barChartData = [
            $scope.canvasFirstVotes,
            $scope.canvasSecondVotes
        ];
        $scope.barchartOptions =  {
            title: {
                display: true,
                responsive: true,
                text: 'Übersicht Erststimmen und Zweitstimmen'
            }
        };
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