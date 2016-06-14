<?php
include("conn.php");
$publisher=$_REQUEST['publisher'];
$isProcessed=$_REQUEST['processed'];
$sql="SELECT `feedback`.`id`,`feedback`.`email`,`feedback`.`time`,`series`.`name`,`magazine`.`issue` FROM `feedback` INNER JOIN `magazine` ON `feedback`.`magazine`=`magazine`.`id` INNER JOIN `series` ON `magazine`.`series`=`series`.`id` INNER JOIN `publisher` ON `series`.`publisher`=`publisher`.`id`  WHERE `series`.`publisher`=".$publisher." AND `feedback`.`isProcessed`=".$isProcessed;
$result=mysql_query($sql,$conn);
echo mysql_num_rows($result);
mysql_close($conn);
?>