<?php
include("conn.php");
$mid=$_REQUEST['mid'];
$sql="UPDATE `magazine` SET `magazine`.`status`=1  WHERE  `magazine`.`id`=".$mid;
mysql_query($sql,$conn);
$sql="SELECT `series`.`name`,`series`.`id` FROM `magazine` INNER JOIN `series` ON `magazine`.`series`=`series`.`id`  WHERE `series`.`publisher`=".$publisher." AND `magazine`.`status`=".$listType." GROUP BY `magazine`.`series` ORDER BY `magazine`.`createtime`";
$sql="SELECT email FROM `publisher` INNER JOIN `series`   WHERE id='".$publisher."'";
	$result=mysql_query($sql,$conn);
	$row=mysql_fetch_array($result);
	//Notify user through email
	$to = $row[0];
	$sql="SELECT name FROM `series` WHERE id='".$series."'";
	$result=mysql_query($sql,$conn);
	$row=mysql_fetch_array($result);
	$subject = "刊物上传成功";
	
	$message = "
	<html>
	<head>
	</head>
	<body>
	<div>您上传到《".$row[0]."》系列的刊物上传成功，已提交至管理员审核，请尽快期刊信息。</div>
	<div><a href='".$_SERVER['HTTP_HOST']."/admin/readings.php?mid=".$id."'>立即完善信息</a></div>
	</body>
	</html>
	";
	
	// Always set content-type when sending HTML email
	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
	
	// More headers
	$headers .= 'From: ReaderIn.com<admin@readerin.com>' . "\r\n";
	mail($to,$subject,$message,$headers);
mysql_close($conn);
?>