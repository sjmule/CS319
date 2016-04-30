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
var credentials;
var posts;

(function()
{
	var data = JSON.parse(fs.readFileSync('credentials.json', 'utf-8'));
	credentials = data.credentials;
	posts = fs.readFileSync('posts.json', 'utf-8');
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
	socket.on('login', function(data)
	{
		console.log(data);
		var good = false;
		console.log(credentials);
		console.log(credentials.length);
		for(var i = 0; i < credentials.length; i++)
		{
			console.log(credentials[i]);
			if(credentials[i].username === data.username && credentials[i].password === data.password)
			{
				good = true;
				console.log(good);
				console.log(posts);
				socket.emit('loginResponse', {'authenticationToken': true, 'username': data.username, 'posts': posts});
			}
			return;
		}
		if(!good)
		{
			socket.emit('loginResponse', {'authenticationToken': false, 'message': 'Bad username or password'});
		}
	});
});
