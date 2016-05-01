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

app.controller('buzz', function ($scope, $rootScope)
{

	$scope.login = function()
	{
		socket.emit('buzz', {"username": $scope.username});
	};
});

app.controller('myController', function ($scope, questionCollection) {
	$scope.categories = questionCollection.getCategories();
});

app.controller('players', function($scope, $routeParams, playerCollection){
	$scope.players = playerCollection.getCategories();
});

app.config(function ($routeProvider) {
    $routeProvider.when("/game", {
        templateUrl: "Game.html"
    })
    .when("/login", {
    	controller: "login",
    	templateUrl: "login.html"
    })
    .when("/question", {
    	controller: "cell",
    	templateUrl: "Cell.html"
    })
    .otherwise( {
    	redirectTo: '/login'
    });
});



app.controller('cell', function ($scope, $routeParams, questionCollection) {
	$scope.category = $routeParams.category;
	$scope.value = $routeParams.value;
	var cataQuestions = angular.fromJson(questionCollection.getCategories());
	var found = false;
	for ( i = 0; i < cataQuestions.length; i++)
	{
		if (cataQuestions[i].name == $routeParams.category )
		{
			for ( j = 0; j < cataQuestions[i].Questions.length; j++)
			{
				if (cataQuestions[i].Questions[j].value == $routeParams.value)
				{
					$scope.answer = cataQuestions[i].Questions[j].answer;
					$scope.question = cataQuestions[i].Questions[j].question;
					$scope.DD = cataQuestions[i].Questions[j].DD;
					found = true;
					break;
				}else
				$scope.answer = "Val not found";
			}
			if ( found == true )
				break;
			
		}else
			$scope.answer = "Category not found";
	}
	
});
