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

// attach handler
server.on('request', function (req,res)
{
	var file = path.normalize('.' + req.url);
	// var obj = fs.readFile('./questions.json');
	// console.log(obj);
  
	// if (file == './')
	// {
	// 	var rs = fs.createReadStream('index.html');
	// 	res.writeHead(200);
	// 	rs.pipe(res);
	// }
	// else
	// {
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
	//}
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
	var obj = JSON.parse(fs.readFileSync('questions.json', 'utf-8'));
	console.log(obj);
	socket.emit('questions', obj);
});
