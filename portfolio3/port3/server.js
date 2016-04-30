// Import HTTP module
var http = require('http');

// Port for server to listen on
const PORT = 1337;

// Function that handles requests and sends response
function handleRequest(request, response)
{
	response.end('It Works! Path Hit: ' + request.url);
}

// Create server
var server = http.createServer(handleRequest);

// Start server
server.listen(PORT, function()
{
	// Callback, triggered when server is listening
	console.log("Server listening on: http://localhost:%s", PORT);
});