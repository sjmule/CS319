<?php
	
	error_reporting(E_ALL | E_WARNING | E_NOTICE);
	ini_set('display_errors', TRUE);	

	$servername = "localhost";
	$username = "webmaster";
	$password = "triviadb";
	$dbname = "CXC";
	
	$conn = new mysqli($servername, $username, $password, $dbname);
	
	if ($conn->connect_error) 
	{
		die("Connection failed: ".$conn->connect_error);
	}
	
	
	$conn->query("UPDATE turn SET turn=0 WHERE stub = 'k'");

	exit(0);
?>
