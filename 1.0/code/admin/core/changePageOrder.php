<?php
$pid=$_REQUEST["pid"];
$position=$_REQUEST["position"];
include("conn.php");
$sql="UPDATE `pages` SET position='".$position."' WHERE `pages`.`id`=".$pid;
mysql_query($sql,$conn);
mysql_close($conn);
?>