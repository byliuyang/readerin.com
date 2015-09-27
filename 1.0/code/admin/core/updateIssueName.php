<?php
include("conn.php");
$mid=$_REQUEST['mid'];
$issue=$_REQUEST['issue'];
$sql="UPDATE `magazine` SET `magazine`.`issue`=".$issue."  WHERE  `magazine`.`id`=".$mid;
mysql_query($sql,$conn);
mysql_close($conn);
?>