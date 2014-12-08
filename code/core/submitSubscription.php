<?php
    include("security.php");
	$date=date("Y-m-d h:i:s");
	$email = Antixss($_REQUEST["email"]);
	$sid = Antixss($_REQUEST['sid']);
	include('conn.php');
	$sql2="INSERT INTO subscription (email,seriesID,subscriptTime)VALUES('".$email."','".$sid."','".date("Y-m-d h:i:s")."');";
	mysql_query($sql2,$conn);
	mysql_close($conn);
?>