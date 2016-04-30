var util = require('util');
var path = require('path');
var http = require('http');
var url = require('url');
var fs  = require('fs');

var server = http.createServer(function(request, response)
{
	var path = url.parse(request.url).pathname;

	switch(path)
	{
		case '/':
			var rs = fs.createReadStream('index2.html');
			
			rs.on('error', function()
			{
				response.writeHead(500);
				response.end('Internal Server Error');
			});

			response.writeHead(200);
			rs.pipe(response);
			break;

		case '/app.js':
			var rs = fs.createReadStream('app.js');
			
			rs.on('error', function()
			{
				response.writeHead(500);
				response.end('Internal Server Error');
			});

			response.writeHead(200);
			rs.pipe(response);
			break;

		default:
			response.writeHead(404);
			response.write("Opps, we can't seem to find what you are looking for...");
			response.end();
			break;
	}
});

server.listen(1337, function() {
	console.log("Server listening on: http://localhost:1337");
});
