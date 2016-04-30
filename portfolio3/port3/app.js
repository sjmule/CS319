//var questions;

var socket = io.connect();

// socket.on('questions', function(data)
// {
// 	$questions = data;
// 	console.log(data);
// });

var app = angular.module('myApp', []);

app.controller('myController', function ($scope)
{
	socket.on('questions', function(data)
	{
		console.log(data);
		$scope.bookShelves = data;
		$scope.$apply();
	});
});
