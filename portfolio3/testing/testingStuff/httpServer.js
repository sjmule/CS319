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
	var obj =
		[ {name: "Shelf1",
			books: [ {name: "Book1", status: "Available", title: "1984", author: "George Orwell"},
					 {name: "Book2", status: "Checked out", title: "A Brief History of Time", author: "Stephen Hawking"},
					 {name: "Book3", status: "Checked out", title: "A Heartbreaking Work of Staggering Genius", author: "Dave Eggers"},
					 {name: "Book4", status: "Available", title: "Alice's Adventures in Wonderland & Through the Looking-Glass", author: "Lewis Carroll"},
					 {name: "Book5", status: "Checked out", title: "All the President's Men", author: "Bob Woodward, Carl Bernstein"},
					 {name: "Book6", status: "Available", title: "Angela's Ashes: A Memoir", author: "Frank McCourt"},
					 {name: "Book7", status: "Available", title: "Breath, Eyes, Memory", author: "Edwidge Danticat"},
					 {name: "Book8", status: "Checked out", title: "Catch-22", author: "Joseph Heller"},
					 {name: "Book9", status: "Available", title: "Charlie and the Chocolate Factory", author: "Roald Dahl"},
					 {name: "Book10", status: "Checked out", title: "Diary of a Wimpy Kid", author: "Jeff Kinney"},
					 {name: "Book11", status: "Available", title: "Dune", author: "Frank Herbert"} ]
		  },
		  {name: "Shelf2",
		  	books: [ {name: "Book12", status: "Available", title: "Fahrenheit 451", author: "Ray Bradbury"},
					 {name: "Book13", status: "Available", title: "Guns, Germs, and Steel: The Fates of Human Societies", author: "Jared Diamond"},
					 {name: "Book14", status: "Checked out", title: "Harry Potter and the Sorcerer's Stone", author: "J. K. Rowling"},
					 {name: "Book15", status: "Checked out", title: "In Cold Blood", author: "Truman Capote"},
					 {name: "Book16", status: "Checked out", title: "Life After Life: A Novel", author: "Kate Atkinson"},
					 {name: "Book17", status: "Checked out", title: "Little House on the Prairie", author: "Laura Ingalls Wilder"},
					 {name: "Book18", status: "Available", title: "Lolita", author: "Vladimir Nabokov"},
					 {name: "Book19", status: "Checked out", title: "Me Talk Pretty One Day", author: "David Sedaris"},
					 {name: "Book20", status: "Available", title: "Middlesex: A Novel", author: "Jeffery Eugenides"},
					 {name: "Book21", status: "Available", title: "Midnight's Children: A Novel", author: "Salman Rushdie"},
					 {name: "Book22", status: "Available", title: "Persepolis: The Story of a Childhood", author: "Marjane Satarpi"} ]
		  },
		  {name: "Shelf3",
		  	books: [ {name: "Book23", status: "Available", title: "Portnoy's Complaint", author: "Philip Roth"},
					 {name: "Book24", status: "Available", title: "Pride and Prejudice", author: "Jane Austen"},
					 {name: "Book25", status: "Checked out", title: "The Amazing Adventures of Kavalier & Clay", author: "Michael Chabon"},
					 {name: "Book26", status: "Available", title: "The Autobiography of Malcolm X: As Told to Alex Haley", author: "Malcolm X, Alex Haley"},
					 {name: "Book27", status: "Checked out", title: "The Book Thief", author: "Markus Zusak"},
					 {name: "Book28", status: "Checked out", title: "The Corrections: A Novel", author: "Jonathan Franzen"},
					 {name: "Book39", status: "Available", title: "The Devil in the White City: Murder, Magic, and Maddness at the Fair That Changed America", author: "Erik Larson"},
					 {name: "Book40", status: "Available", title: "The Diary of a Young Girl", author: "Anne Frank, Otto H. Frank"} ]
		  } ]
	//var obj = JSON.parse(fs.createReadStream('questions.json'));
	console.log(obj);
	//var obj = JSON.parse(fs.readFile('questions.json'));
	socket.emit('questions', obj);
});
