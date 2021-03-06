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

(function()
{
	credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf-8'));
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
		var good = false;
		for(var i = 0; i < credentials.length; i++)
		{
			if(credentials[i].username === data.username && credentials[i].password === data.password)
			{
				good = true;
				socket.emit('loginResponse', {'authenticationToken': true, 'username': data.username});
			}
			return;
		}
		if(!good)
		{
			socket.emit('loginResponse', {'authenticationToken': false, 'message': 'Bad username or password'});
		}
	});
});
