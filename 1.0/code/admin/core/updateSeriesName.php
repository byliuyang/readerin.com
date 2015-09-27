<?php
include("conn.php");
$series=$_REQUEST['series'];
$name=$_REQUEST['name'];
$sql="UPDATE `series` SET `series`.`name`='".$name."'  WHERE  `series`.`id`=".$series;
mysql_query($sql,$conn);
mysql_close($conn);
?>