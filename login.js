//$(document).ready(function() {
//	$("button").click(function() {
//		login();
//	});
//});

//function login()
//{
//	var user = document.getElementById("username");
//	var pass = document.getElementById("password");
//	$.post("checkLogin.php", {username:user, password:pass},function(data,success) {})
//		.fail(function() {
//			$("#message").text("Incorrect username or password");
//		});
//}
$(document).ready(function() {  var btn1 = $("#login");  btn1.click (function () {  var username = $("#username"); var password = $("#pass"); $.post("checkLogin.php?username=" + username + "&password=" + password,  function(data,status) { if(status == TRUE) { //href=\"05_4_newRequest.php\" 
} else alert("Invalid credentials. Please log in again"); //$("#myDiv").html(data);  
}); });   });
