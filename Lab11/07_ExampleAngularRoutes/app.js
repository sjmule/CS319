var app = angular.module('myApp', ['ngRoute']);

app.config(function ($routeProvider) {

    $routeProvider.when("/view1", {
        controller: "view1Controller",
        templateUrl: "view1.html"
    });

    $routeProvider.when("/view2", {
        controller: "view2Controller",
        templateUrl: "view2.html"
    });
});

app.controller('view2Controller', function($scope) {
	$scope.name = "View2";
	$scope.message = "HelloWorld from View2";
});

app.controller('view1Controller', function($scope) {
	$scope.name = "View1";
	$scope.message = "HelloWorld from View1";
});

app.controller('indexController', function($scope) {
});

