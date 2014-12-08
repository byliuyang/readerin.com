<?php
include("conn.php");
$mid=$_REQUEST['mid'];
$position=$_REQUEST['position'];
$sql="SELECT `pages`.`name`  FROM `pages` WHERE  `pages`.`magazine`=".$mid." AND `pages`.`position`=".$position;
$result=mysql_query($sql,$conn);
$row=mysql_fetch_array($result);
echo $row[0];
mysql_close($conn);
?>