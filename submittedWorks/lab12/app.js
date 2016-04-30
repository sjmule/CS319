var socket = io.connect();
var app = angular.module('myApp', ['ngRoute']);

app.controller('posts', function ($scope, $rootScope)
{
	socket.on('loginResponse', function(data)
	{
		if(data.authenticationToken === true)
		{
			$rootScope.boardPosts = data;
			$scope.boardPosts = $rootScope.posts;
			if($scope.boardPosts !== null)
			{
	 			$scope.$apply();
	 		}
	 	}
	});
});

app.config(function ($routeProvider) {
    $routeProvider.when("/posts", {
        controller: "posts",
        templateUrl: "posts.html"
    })
    .otherwise( {
    	redirectTo: '/login.html'
    });
});