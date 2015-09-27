<?php
include("conn.php");
$publisher=$_REQUEST['publisher'];
$sql="SELECT `series`.`name`,`user`.`name`,`user`.`profile`,`user`.`id` FROM `series` INNER JOIN `subscription` ON `series`.`id`=`subscription`.`series` INNER JOIN `user` ON `subscription`.`user`=`user`.`id` WHERE `series`.`publisher`=".$publisher;
$result=mysql_query($sql,$conn);
while($row=mysql_fetch_array($result))
{
	echo "<li><div class=\"subscriptionProfileContainer\"><img class=\"profile\"src=\"../data/".$row[3]."/".$row[2]."\"></div><div class=\"subscriptionNameContainer\"><div>".$row[1]."</div><div class=\"subscriptionSeries\">订阅《".$row[0]."》</div></div></li>";
}
mysql_close($conn);
?>