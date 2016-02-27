function validate()
{

	if (document.getElementById("name").value == "")
	{
		alert("Please provide your name");
		return false;
	}
	else
	{
		var name = document.getElementById("name").value;
		var regex = /^[a-z0-9]+$/i;
		console.log(name);
		if(!regex.test(name))
		{
			console.log("bad name");
			alert("Please enter only alphanumeric characters into name field");
		}
	}
	
	if (document.getElementById("gender").value == "")
	{
		alert("Please provide your gender");
		return false;
	}

	if (document.getElementById("address").value == "")
	{
		alert("Please provide your address");
		return false;
	}

	if (document.getElementById("email").value == "")
	{
		alert("Please provide your email");
		return false;
	}
	else
	{
		var email = document.getElementById("email").value;
		var regex = /[a-z0-9]+@[a-z0-9]+.[a-z0-9]+/i;
		if (!regex.test(email))
			alert("Please enter only alphanumeric characters in xxx@xxx.xxx format into the email field");
	}
	
	if (document.getElementById("phone").value == "")
	{
		alert("Please provide your phone")
		return false;
	}
	else
	{
		var phone = document.getElementById("phone").value;
		var regex1 = /[0-9]{3}-[0-9]{3}-[0-9]{4}/;
		var regex2 = /[0-9]{10}/;
		if (!regex1.test(phone))
			if (!regex2.test(phone))
				alert("Please enter phone number in either xxxxxxxxxx or xxx-xxx-xxxx format");
	}
}
