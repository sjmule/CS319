<?php
	session_start();
	$d = array('username' => $_POST['username'], 'password' => $_POST['password']);
	$response = array('data' => $d, 'success' => false);
	//echo json_encode($response);

	if (!empty($_POST['username']) && !empty($_POST['password']))
	{
		if (strpos(file_get_contents("./users.txt"),$_POST['username'].":".$_POST['password']) !== false)
		{	
			$_SESSION['valid'] = true;
			$_SESSION['username'] = $_POST['username'];
			header("Refresh:2; URL = success.html");
			exit;
			//echo json_encode(array('data' => "good"));
		}
	}
?>
