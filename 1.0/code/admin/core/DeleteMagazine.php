<?php
include("conn.php");
$mid=$_REQUEST['mid'];
$sql="SELECT `pages`.`name`,`pages`.`magazine` FROM `pages`  WHERE  `pages`.`magazine`=".$mid;
$result=mysql_query($sql,$conn);
while($row=mysql_fetch_array($result))
{
	unlink("../../magazine/".$row[1]."/".$row[0]);
	unlink("../../magazine/".$row[1]."/small/".$row[0]);
}
$sql="DELETE FROM `pages`  WHERE  `pages`.`magazine`=".$mid;
mysql_query($sql,$conn);
unlink("../../magazine/".$mid."/o.jpg");
rmdir("../../magazine/".$mid."/small");
rmdir("../../magazine/".$mid);
$sql="DELETE FROM `magazine`  WHERE  `magazine`.`id`=".$mid;
mysql_query($sql,$conn);
mysql_close($conn);
?>