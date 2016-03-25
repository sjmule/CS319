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
	
	$request = "SELECT turn FROM turn WHERE stub = 'k'";
	$curTurn = $conn->query($request);
	$turnNum = $curTurn->fetch_assoc();
	$conn->query("UPDATE turn SET turn=".($turnNum['turn']+1)." WHERE stub = 'k'");
	
	echo $turnNum['turn']+1;
	exit(0);
?>
