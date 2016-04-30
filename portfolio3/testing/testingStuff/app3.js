var socket = io.connect();
var app = angular.module('myApp', []);

app.controller('myController', function ($scope)
{
	socket.on('questions', function(data)
	{
		$scope.bookShelves = data;
		console.log(data);
		$scope.$apply();
	});
});