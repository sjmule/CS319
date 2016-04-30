angular.module('myApp', ['ngRoute'])
.config(function ($routeProvider) {
    $routeProvider.when("/book", {
        controller: "book",
        templateUrl: "book.html"
    });
});

app.controller('book', function($scope) {
	$scope.name = "View1";
	$scope.message = "HelloWorld from View1";
});

app.controller('indexController', function($scope) {
});

