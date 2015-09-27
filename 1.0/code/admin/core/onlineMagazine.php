<?php
include("conn.php");
$mid=$_REQUEST['mid'];
$sql="UPDATE `magazine` SET `magazine`.`status`=1  WHERE  `magazine`.`id`=".$mid;
mysql_query($sql,$conn);
$sql="SELECT `series`.`name`,`series`.`id`,`publisher`.`email` FROM `magazine` INNER JOIN `series` ON `magazine`.`series`=`series`.`id` INNER JOIN `publisher` ON `series`.`publisher`=`publisher`.`id`  WHERE `magazine`.`id`=".$mid;
	$result=mysql_query($sql,$conn);
	$row=mysql_fetch_array($result);
	//Notify user through email
	$to = $row[2];
	$subject = "刊物审核通过";
	$message = "
	<html>
	<head>
	</head>
	<body>
	<div>您上传到《".$row[0]."》系列的刊物审核通过，现已上线。</div>
	<div><a href='".$_SERVER['HTTP_HOST']."/?mid=".$mid."'>立即查看</a></div>
	</body>
	</html>
	";
	
	// Always set content-type when sending HTML email
	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
	
	// More headers
	$headers .= 'From: ReaderIn.com<admin@readerin.com>' . "\r\n";
	mail($to,$subject,$message,$headers);
	$sql="SELECT `series`.`name`,`magazine`.`issue`,`user`.`email`,`pages`.`name`,`publisher`.`name`,`magazine`.`id` FROM `user` INNER JOIN `subscription` ON `user`.`id`=`subscription`.`user` INNER JOIN `series` ON `subscription`.`series`=`series`.`id` INNER JOIN `magazine` ON `magazine`.`series`=`series`.`id` INNER JOIN `publisher` ON `series`.`publisher`=`publisher`.`id` INNER JOIN `pages` ON `magazine`.`id`=`pages`.`magazine` WHERE `pages`.`position`=0 AND `magazine`.`id`=".$mid;
	$result=mysql_query($sql,$conn);
	while($row=mysql_fetch_array($result))
	{
		$to = $row["email"];
		$subject = $row[4]."发布了".$row[0].$row[1];
		$message = "
		<html>
		<head>
		</head>
		<body>
		<div><img src='".$_SERVER['HTTP_HOST']."/magazine/".$row[5]."/".$row[3]."'></div>
		<div><a href='".$_SERVER['HTTP_HOST']."/?mid=".$mid."'>立即翻阅</a></div>
		</body>
		</html>
		";
		
		// Always set content-type when sending HTML email
		$headers = "MIME-Version: 1.0" . "\r\n";
		$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
		
		// More headers
		$headers .= 'From: ReaderIn.com<admin@readerin.com>' . "\r\n";
		mail($to,$subject,$message,$headers);
	}
	
mysql_close($conn);
?>