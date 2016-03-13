$(document).ready(function() {
	$("button").click(function() {
		login();
	});
});

function login()
{
	var user = $("#username").val();
	var pass = $("#password").val();
	$.post("checkLogin.php", {username : user,  password : pass}, function() {
		}).fail(function() {
			$("#message").text("Incorrect username or password");
		});
}
