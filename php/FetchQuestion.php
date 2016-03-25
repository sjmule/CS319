<?php
	
	error_reporting(E_ALL | E_WARNING | E_NOTICE);
	ini_set('display_errors', TRUE);	

	$servername = "localhost";
	$username = "webmaster";
	$password = "triviadb";
	$dbname = "CXC";
	$output = "null";
	$conn = new mysqli($servername, $username, $password, $dbname);
	
	if ($conn->connect_error) 
	{
		die("Connection failed: ".$conn->connect_error);
	}	
	
	$request = "SELECT turn FROM turn WHERE stub = 'k'";
	$curTurn = $conn->query($request);
	$turnNum = $curTurn->fetch_assoc();  //grab the turn variable from the db
	
	if($turnNum['turn'] == 0){
		
		$output = "Ready?";
		
	}else{

		$request = "SELECT question FROM questions WHERE questionNumber =".$turnNum['turn'];
		$result = $conn->query($request);
		$output = $result->fetch_assoc()['question'];//fetch the question from the db
	
	}
	echo $output;
	exit(0);
?>
