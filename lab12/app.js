var socket = io.connect();
var app = angular.module('myApp', ['ngRoute']);

app.run(function($rootScope)
{
	$rootScope.boardPosts = "i";
});

app.controller('posts', function ($scope, $rootScope)
{
	$scope.boardPosts = $rootScope.boardPosts;
	$scope.$apply();
});

app.controller('login', function ($scope, $rootScope)
{
	$scope.username = '';
	$scope.password = '';

	$scope.login = function()
	{
		console.log($scope.username);
		console.log($scope.password);
		socket.emit('login', {"username": $scope.username, "password": $scope.password});
	};

	socket.on('loginResponse', function(data, $rootScope)
	{
		console.log(data);
		if(data.authenticationToken === true)
		{
			$rootScope.boardPosts = angular.fromJson(data.posts);
			window.location.href = 'posts';
	 	}
	});

});

app.config(function ($routeProvider) {
    $routeProvider.when("/posts", {
        controller: "posts",
        templateUrl: "posts.html"
    })
    .when("/login", {
    	controller: "login",
    	templateUrl: "login.html"
    })
    .otherwise( {
    	redirectTo: '/login'
    });
});