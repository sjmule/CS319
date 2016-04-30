//Server-side Code for checking login data

var fileSystem = require("fs");
var to = require("./portNumbers");

var io = require("socket.io").listen(to.socketPort());

var usersFile = "users.txt";
var postsFile = "post.txt";
var count = 0;

io.sockets.on("connection", function(socket) {
	var username = "";
	
	socket.on("checkLogin", function(content) {
		//Note: if I were conscious about security, I'd sanitize this input
		var usr = content['username'];
		var pss = content['password'];
		
		//Check to see if username and password are correct
		if(usr == null || usr === "") {
			socket.emit("loginResponse", "Invalid Username");
			return;
		}
		if(pss == null || pss === "") {
			socket.emit("loginResponse", "Invalid Password");
			return;
		}
		
		var redirect = "<a id='link' onclick='removeCover()'>Click Here to Start Chatting</a>";
		
		try {
			//Open the user file and decode it.
			var file = fileSystem.readFileSync(usersFile);
			var usersObject = JSON.parse(file.toString());
			var promptToEmit = "";
			
			//Check to see if user already has an account
			if(typeof usersObject[usr] === "undefined") {
				//Add the user to the JSON array
				usersObject[usr] = pss;
				
				//Write the new JSON array to the file
				var jsonStr = JSON.stringify(usersObject);
				fileSystem.writeFile(usersFile, jsonStr);
				
				promptToEmit =  "Welcome to the chat room.<br>" + redirect;
				username = usr;
				//Tell other users that a user has joined the chat room.
				socket.broadcast.emit("add to table", "<tr class='textTableRow'>" +
						"<td class='name'></td>"+
						"<td class='server text'>"+usr+" has just joined the server! (be nice, they're new)</td>" +
					"</tr>");
			}
			
			//Check to see if the username and password match
			else if(usersObject[usr] === pss) {
				promptToEmit = "Welcome back.<br>" + redirect;
				username = usr;
				
				//Tell other users that a user has joined the chat room.
				socket.broadcast.emit("add to table", "<tr class='textTableRow'>" +
						"<td class='name'></td>"+
						"<td class='server text'>"+usr+" has just joined the server!</td>" +
					"</tr>");
			} else {
				 promptToEmit = "The password entered is incorrect.";
			}
			
			socket.emit("loginResponse", promptToEmit);
		} catch(err) {
			socket.emit("loginResponse", "Internal Server Error: " + err);
		}
	});
	
	socket.on("disconnect", function() {
		if(typeof username === "string" && username != "")
            logout(username, socket);
		console.log("User " + username + " disconnected.");
	});
	
	socket.on("send post", function(message) {
		console.log("Adding to Table.");
		
		//Note: users can put html in the chat and it will execute on everyone. I'm too lazy to implement security measures
		
		//Get the array of all posts
		var o_posts = JSON.parse(fileSystem.readFileSync(postsFile).toString()); //o for object
		var currentTime = new Date().getTime();
		
		//Get the username
		var usrnm = username;
		
		//Add post to the array
		o_posts[currentTime] = {"user": usrnm, "text": message};
		
		//Write post to the file. This errors if the file is open.
		fileSystem.writeFile(postsFile, JSON.stringify(o_posts), function(err) {
			console.log("---------Failed to write to file---------");
		});;
		
		//Create a new table row entry
		var tableRows = "<tr class='textTableRow'>" +
						"<td class='name' id='" + usrnm + "u'>" + usrnm + "</td>"+
						"<td class='text' id='"+currentTime+"' onclick='updatePost(id)'>" + message + "</td>" +
					"</tr>";
					
		//Emit to all users the updated post
		io.emit("add to table", tableRows);
		
	});
	
	socket.on("update post", function(updatedObject) {
		//Get parameters
		var userID = updatedObject['user'];
		var textToUpdate = updatedObject['text'];
		
		if(typeof userID === "undefined" || typeof textToUpdate === "undefined") {
			//Error: do nothing because someone is messing with my program >:(
			return;
		}
		
		console.log("Updating Table.");
		
		//Get the array of all posts
		var o_posts = JSON.parse(fileSystem.readFileSync(postsFile).toString()); //o for object
		
		if(o_posts[userID].user === username)
		{
			o_posts[userID].text = textToUpdate;
				
			io.emit("update table", buildTable(o_posts));
		}
	});
	
	socket.on("get table", function() {
		console.log("Getting table.");
		var o_posts = JSON.parse(fileSystem.readFileSync(postsFile).toString()); //Read the File and convert it to an object
		socket.emit("update table", buildTable(o_posts));
	});
	
	socket.on("logout", function() {
		if(username != "")
           logout(username, socket);
		username = "";
	});
	
});

function buildTable(jsonObject) {
	var table = "";
	
	for(var index in jsonObject) {
		var currentPost = jsonObject[index];
		
		table += "<tr class='textTableRow'>" +
						"<td class='name' id='" + currentPost['user'] + "u'>" + currentPost['user'] + "</td>"+
						"<td class='text'  id='"+index+"' onclick='updatePost(id)'>" + currentPost['text'] + "</td>" +
					"</tr>";
		
	}
	
	return table;
}

function logout(username, socket)
{
	console.log("Logging out " +username + ".");
		
	socket.broadcast.emit("add to table", "<tr class='textTableRow'>" +
						"<td class='name'></td>"+
						"<td class='server text'>"+username+" has left the server.</td>" +
					"</tr>");
}