<?php
	session_start();

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

	if($turnNum['turn'] != $_SESSION['turn'])
	{
		$_SESSION['turn'] = $turnNum['turn'];
		$request = "SELECT question FROM questions WHERE questionNumber =".$turnNum['turn'];
		$result = $conn->query($request);
		
		$output = $result->fetch_assoc();

		echo json_encode(array("update"=>true,"question"=>$output['question']));
		exit(0);
	}	

	echo json_encode(array("update"=>false,"question"=>$output['question'],"data"=>$_SESSION['turn']." ".$turnNum['turn']));

	exit(0);
?>
