<?php
include("conn.php");
$series=$_REQUEST['series'];
$sql="DELETE FROM `series`  WHERE  `series`.`id`=".$series;
mysql_query($sql,$conn);
mysql_close($conn);
?>