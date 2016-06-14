<?php
include("conn.php");
$pid=$_REQUEST['pid'];
$sql="SELECT `pages`.`name`,`pages`.`magazine` FROM `pages`  WHERE  `pages`.`id`=".$pid;
$result=mysql_query($sql,$conn);
$row=mysql_fetch_array($result);
unlink("../../magazine/".$row[1]."/".$row[0]);
unlink("../../magazine/".$row[1]."/small/".$row[0]);
$sql="DELETE FROM `pages`  WHERE  `pages`.`id`=".$pid;
mysql_query($sql,$conn);
$sql="UPDATE `magazine` SET size=size-1 WHERE `magazine`.`id`='".$row[1]."'";
mysql_query($sql,$conn);
mysql_close($conn);
?>