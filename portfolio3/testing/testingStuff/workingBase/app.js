var socket = io.connect();
var app = angular.module('myApp', []);

app.controller('myController', function ($scope, $rootScope)
{
	$scope.bookShelves = $rootScope.questions;

	socket.on('questions', function(data)
	{
		$rootScope.questions = data;
		$scope.bookShelves = $rootScope.questions;
		if($scope.bookShelves !== null)
		{
	 		$scope.$apply();
	 	}
	});
});
