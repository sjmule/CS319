$(document).ready(function() {
	$("button").click(function() {
		login();
	});
});

function login()
{
	var user = $("#username").val();
	var pass = $("#password").val();
	$("#message").text(user + " " + pass);
	$.post("checkLogin.php", {username : user,  password : pass}, function(data,success) {})
		.fail(function() {
			$("#message").text("Incorrect username or password");
		});
}
