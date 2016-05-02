var socket = io.connect();
var app = angular.module('myApp', ['ngRoute']);

// route handler
app.config(function ($routeProvider) {
    $routeProvider.when("/cell/:value/:category", {
        controller: "cell",
        templateUrl: "Cell.html"
    })
	.when("/table", {
        controller: "myController",
        templateUrl: "table.html"
    })
	.otherwise( {
    	redirectTo: '/table'
    });
});

// controller for the default view, loads the table
app.controller('myController', function ($scope, $rootScope)
{
	$scope.categories = $rootScope.questions;

	socket.on('questions', function(data)
	{
		$rootScope.questions = data;
		$scope.categories = $rootScope.questions;
		if($scope.categories !== null)
		{
	 		$scope.$apply();
	 	}
	});

	socket.on('displayTable', function(data)
	{
		$rootScope.questions = data;
		window.location.href = "#/table";
	});
});

// controller for displaying the player table
app.controller('playerController', function($scope)
{
	if($scope.players === undefined)
		socket.emit('getPlayers', 'get');
	socket.on('players', function(data)
	{
		$scope.players = data;
		$scope.$apply();
	});
});

// controller for when a question is displayed instead of the table
app.controller('cell', function ($scope, $routeParams, $rootScope)
{
	var pos = ($routeParams.value/200)-1;
	$scope.question = $rootScope.questions[$routeParams.category]["Questions"][pos]["question"];
});

// switches the view to the 'cell' view when Trebek selects a question
socket.on('displayQuestion', function(data)
{
	window.location.href = "#/cell/" + data.value + "/" + data.category;
});