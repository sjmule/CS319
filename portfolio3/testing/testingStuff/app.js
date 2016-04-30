var socket = io.connect();
var app = angular.module('myApp', []);

app.controller('myController', function ($scope, $rootScope)
{
	
	$scope.bookShelves = $rootScope.questions;
	console.log($scope.bookShelves);

	socket.on('questions', function(data)
	{
		$rootScope.questions = data;
		console.log(data);
		$scope.bookShelves = $rootScope.questions;
		if($scope.bookShelves !== null)
		{
			//$scope.bookShelves = questions;
	 		$scope.$apply();
			console.log('not null');
			console.log($scope.bookShelves);
	 	}
	});
});
