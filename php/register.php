<?php
	session_start();
	
	error_reporting(E_ALL | E_WARNING | E_NOTICE);
	ini_set('display_errors', TRUE);

	if (empty($_POST['username']))
	{
		echo "Please enter a username";
		exit(1);
	}

	$servername = "localhost";
	$username = "webmaster";
	$password = "triviadb";
	$dbname = "CXC";
	
	$conn = new mysqli($servername, $username, $password, $dbname);
	
	if ($conn->connect_error) 
	{
		die("Connection failed: ".$conn->connect_error);
	}

	$sql = "INSERT INTO player (ip, username, score) 
	VALUES ('".$_SERVER['REMOTE_ADDR']."', '".$_POST['username']."', 0);";

	if ($conn->query($sql) === TRUE) 
	{
		$msg = $_POST['username']." at ".$_SERVER['REMOTE_ADDR']." Connected successfully.";
		$array = array("status"=>true,"message"=>$msg,"data"=>"/CXC/questions.html");
		$conn->close();
	}
	else
	{
		$msg = "Error: ".$sql."  -- ".$conn->error;
		echo json_encode(array("status"=>false,"message"=>$msg,"data"=>null));
		$conn->close();
		exit(1);
	}

	$_SESSION['valid'] = true;
	$_SESSION['username'] = $_POST['username'];
	$_SESSION['time'] = time();
	$_SESSION['ip'] = $_SERVER['REMOTE_ADDR'];
	$_SESSION['turn'] = 0;

	echo json_encode($array);

	exit(0);
?>
