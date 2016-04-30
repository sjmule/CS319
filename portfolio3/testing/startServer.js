var util = require('util');
var path = require('path');
var http = require('http');
var url = require('url');
var fs = require('fs');
var io = require('socket.io');

//----------------------------------------
// What follows is to set up the http
// server to handle requests
//----------------------------------------

var server = http.createServer();

var questions;
var players = [ {name:"Sean Connery", score: 1337},
		 {name:"John Travolta", score: 1337},
		 {name:"Keanu Reeves", score: 1337}];

(function()
{
		questions= JSON.parse(fs.readFileSync('questions.json', 'utf-8'));
})();

// attach handler
server.on('request', function (req,res)
{
	var file = path.normalize('.' + req.url);
	fs.exists(file, function(exists)
	{
		if (exists)
		{
			var rs = fs.createReadStream(file);

			rs.on('error', function()
			{
				res.writeHead(500); // error status
				res.end('Internal Server Error');
			});

			res.writeHead(200); // ok status

			// PIPE the read stream with the RESPONSE stream
			rs.pipe(res);
		} 
		else
		{
			res.writeHead(404); // error status
			res.end('NOT FOUND');
		}
	});
}); // end server on handler

server.listen(1337, function() {
	console.log("Server listening on: http://localhost:1337");
});

//----------------------------------------
// What follows is to set up the websockets
// to handle communication between the server
// and its clients
//----------------------------------------

var listener = io.listen(server);

listener.sockets.on('connection', function(socket)
{
	socket.emit('questions', questions);
	socket.emit('players', players);

	socket.on('register', function(data)
	{
		players.push({"name": data.name, "score": 0});
		socket.emit('players', players);
	});

	socket.on('updateScore', function(data)
	{
		for(var i = 0; i < players.length; i++)
		{
			if(players[i]["name"] === data.name)
			{
				if(date.action === "add")
				{
					players[i]["score"] = players[i]["score"] + data.score;
				}
				else
				{
					players[i]["score"] = players[i]["score"] - data.score;
				}
				break;
			}
		}
		socket.emit('players', players);
	});
});
