<?php
  session_start();
  $_SESSION["username"] = user;
?>

<!DOCTYPE html>
<html>
  <body>

    <table border = "1" style = "width:100%" id="postsTable">
      
    </table>
    
    
  </body>
</html> 

// ??insert post into session??

<?php
  $encodedPosts = file_get_contents(posts.txt);
  $postArr = json_decode(encodedPosts);
  $table = document.getElementByID("postsTable");
  foreach($postArr as $post) {
    $row = $table.insertRow();
	$cell = $row.insertCell(0);
	$cell.innerHTML = $post;
	//insert js to update post
  }
  //$table.refresh();
?>