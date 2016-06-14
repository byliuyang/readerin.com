<?php
include("conn.php");
$kid=$_REQUEST['kid'];
$sql="DELETE FROM `keyWord` WHERE `keyWord`.`id` = ".$kid;
mysql_query($sql,$conn);
mysql_close($conn);
?>