<?php
include("conn.php");
$series=$_REQUEST['series'];
$listType=$_REQUEST['listType'];
$sql="SELECT `magazine`.`id` FROM `magazine`  WHERE  `magazine`.`series`=".$series." AND `magazine`.`status`=".$listType;
$result=mysql_query($sql,$conn);
while($row=mysql_fetch_array($result))
{
	$sql1="SELECT `pages`.`name` FROM `pages`  WHERE  `pages`.`magazine`=".$row[0];
	$result1=mysql_query($sql1,$conn);
	while($row1=mysql_fetch_array($result1))
	{
		unlink("../../magazine/".$row[0]."/".$row1[0]);
		unlink("../../magazine/".$row[0]."/small/".$row1[0]);	
	}
	$sql2="DELETE FROM `pages`  WHERE  `pages`.`magazine`=".$row[0];
	mysql_query($sql2,$conn);
	unlink("../../magazine/".$row[0]."/o.jpg");
	rmdir("../../magazine/".$row[0]."/small");
	rmdir("../../magazine/".$row[0]);
}
$sql="DELETE FROM `magazine`  WHERE  `magazine`.`series`=".$series." AND `magazine`.`status`=".$listType;
mysql_query($sql,$conn);
mysql_close($conn);
?>