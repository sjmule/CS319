$(document).ready(function() {
	$("button").click(function() {
		login();
	});
});

function login()
{
	var user = document.getElementById("username").text;
	var pass = document.getElementById("password").text;
	$("#message").text(user + " " + pass);
	//$.post("checkLogin.php", {username:user, password:pass},function(data,success) {})
	//	.fail(function() {
	//		$("#message").text("Incorrect username or password");
	//	});
}
