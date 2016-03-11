<?php
//	$msg = '';
//
//	if (isset(!empty($_POST['username']) && !empty($_POST['password']))
//	{
//		if(strpos(file_get_cont
//	}
if ($_POST)){  $username = $_POST['username'];  $password = $_POST['password'];   $text = file_get_contents("users.txt");  if (stripos($text, $username . ":" . $password) !== false) { echo json_encode(array('success' => TRUE, 'message' => 'You logged in')); }  else { echo json_encode(array('success' => FALSE, 'message' => 'You did not log in')); }  exit; // to make sure you arn't getting nothing else  } else { // so you can access the error message in jQuery echo json_encode(array('errror' => TRUE, 'message' => 'a problem occured')); exit; }
?>
