angular.module('myApp', [])
.controller('myController', function($scope) {
	$scope.books =
		[ {title: "Book1", status: "Available" },
		  {title: "Book2", status: "Checked out"},
		  {title: "Book3", status: "Checked out" },
		  {title: "Book4", status: "Available" },
		  {title: "Book5", status: "Checked out"},
		  {title: "Book6", status: "Available" },
		  {title: "Book7", status: "Available"},
		  {title: "Book8", status: "Checked out" },
		  {title: "Book9", status: "Available" },
		  {title: "Book10", status: "Checked out"},
		  {title: "Book11", status: "Available"} ];
});