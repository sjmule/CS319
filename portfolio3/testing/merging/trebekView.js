var socket = io.connect();
var app = angular.module('myApp', ['ngRoute']);

app.service('questionCollection', function() {
	var categories =
		[ {name: "Therapists",
			Questions: [ {value: 200, status: "none", question: "1984", answer: "George Orwell", DD: false},
					 {value: 400, status: "none", question: "1984", answer: "George Orwell", DD: false},
					 {value: 600, status: "none", question: "1984", answer: "George Orwell", DD: false},
					 {value: 800, status: "hidden", question: "1984", answer: "George Orwell", DD: false},
					 {value: 1000, status: "none", question: "1984", answer: "George Orwell", DD: false}]
		  },
		  {name: "Catch These Men",
			Questions: [ {value: 200, status: "none", question: "1984", answer: "George Orwell", DD: false},
					 {value: 400, status: "none", question: "1984", answer: "George Orwell", DD: false},
					 {value: 600, status: "none", question: "1984", answer: "George Orwell", DD: false},
					 {value: 800, status: "none", question: "1984", answer: "George Orwell", DD: true},
					 {value: 1000, status: "none", question: "1984", answer: "George Orwell", DD: false}]
		  },
		  {name: "Famous Horsemen",
			Questions: [ {value: 200, status: "none", question: "1984", answer: "George Orwell", DD: false},
					 {value: 400, status: "none", question: "1984", answer: "George Orwell", DD: false},
					 {value: 600, status: "none", question: "1984", answer: "George Orwell", DD: false},
					 {value: 800, status: "none", question: "1984", answer: "George Orwell", DD: false},
					 {value: 1000, status: "none", question: "1984", answer: "George Orwell", DD: false}]
		  },
		  {name: "The Pen Is Mightier",
			Questions: [ {value: 200, status: "none", question: "1984", answer: "George Orwell", DD: false},
					 {value: 400, status: "none", question: "1984", answer: "George Orwell", DD: false},
					 {value: 600, status: "none", question: "1984", answer: "George Orwell", DD: false},
					 {value: 800, status: "none", question: "1984", answer: "George Orwell", DD: false},
					 {value: 1000, status: "none", question: "1984", answer: "George Orwell", DD: false}]
		  },
		  {name: "An Album Cover",
			Questions: [ {value: 200, status: "none", question: "1984", answer: "George Orwell", DD: false},
					 {value: 400, status: "none", question: "1984", answer: "George Orwell", DD: false},
					 {value: 600, status: "hidden", question: "1984", answer: "George Orwell", DD: false},
					 {value: 800, status: "none", question: "1984", answer: "George Orwell", DD: false},
					 {value: 1000, status: "none", question: "1984", answer: "George Orwell", DD: false}]
		  }]
	this.getCategories = function() {
		return categories;
	}
});

app.service('playerCollection', function() {
	var players = 
		[ {name:"Sean Connery", score: 1337},
		 {name:"John Travolta", score: 1337},
		 {name:"Keanu Reeves", score: 1337}]
	this.getPlayers = function() {
		return players;
	}
});

app.controller('login', function ($scope, $rootScope)
{
	$scope.username = '';

	$scope.login = function()
	{
		socket.emit('login', {"username": $scope.username});
	};

	socket.on('loginResponse', function(data)
	{
		if(data.authenticationToken === true)
		{
			$rootScope.boardPosts = angular.fromJson(data.posts);
			$rootScope.user = data.username;
			window.location.href = '#/posts';
	 	}
	});
});


app.controller('myController', function ($scope, questionCollection) {
	$scope.categories = questionCollection.getCategories();
});

app.controller('players', function($scope, $routeParams, playerCollection){
	$scope.players = playerCollection.getCategories();
});

app.config(function ($routeProvider) {
    $routeProvider.when("/table", {
    	controller: "myController",
    	templateUrl: "table.html"
    })
    .when("/question/:value/:category", {
    	controller: "cell",
    	templateUrl: "trebekCell.html"
    })
    .otherwise( {
    	redirectTo: '/table'
    });
});

app.controller('cell', function ($scope, $routeParams, $rootScope) {
	var pos = ($routeParams.value/200)-1;
	$scope.answer = $rootScope.questions[$routeParams.category]["Questions"][pos]["answer"];
	$scope.question = $rootScope.questions[$routeParams.category]["Questions"][pos]["question"];
	
	$scope.yes = function()
	{
		socket.emit('updateScore', {"username": $rootScope.username, "action": "add", "score":$routeParams.value, "category": $routeParams.category});
	};
	$scope.no = function()
	{
		socket.emit('updateScore', {"username": $rootScope.username, "action": "awh hell naw", "score":$routeParams.value, "category": $routeParams.category});
	};
	$scope.timeOut = function()
	{
		socket.emit('updateScore', {"score":$routeParams.value, "category": $routeParams.category});
	};
	
	
});

