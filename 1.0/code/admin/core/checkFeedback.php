<?php
include("conn.php");
include("time.php");
$id=$_REQUEST['id'];
$status=$_REQUEST['status'];
if($status==true)
{
	$sql="SELECT `feedback`.`email`,`feedback`.`time`,`series`.`name`,`magazine`.`issue`,`feedback`.`content`,`publisher`.`name`, FROM `feedback` INNER JOIN `magazine` ON `feedback`.`magazine`=`magazine`.`id` INNER JOIN `series` ON `magazine`.`series`=`series`.`id` INNER JOIN `publisher` ON `series`.`publisher`=`publisher`.`id`  WHERE `feedback`.`ID`=".$id;
	$result=mysql_query($sql,$conn);
	$row=mysql_fetch_array($result);
	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
	$headers .= 'From: ReaderIn<admin@readerin.com>' . "\r\n";
	$time=strtotime($row[2]);
	if(date("Y-m")==date("Y-m",$time))
		{
			if((int)date("d")-(int)date("d",$time)==0)
			{
				$t="今天 ".date("H:i:s",$time);
			}
			else if((int)date("d")-(int)date("d",$time)==1)
			{
				$t="昨天 ".date("H:i:s",$time);
			}
			else if((int)date("d")-(int)date("d",$time)==2)
			{
				$t="前天 ".date("H:i:s",$time);
			}
			else
			{
				$t=date("今年m月d日 H:i:s",$time);
			}
		}
		else
		{
			$t=date("Y-m-d H:i:s",$time);
		}
	$msg=$row[5]."已处理您在".$t."对".$row[2].$row[3]."的反馈，感谢您的宝贵建议!";
	mail ($row[0],"已处理对".$row[2].$row[3]."的反馈","",$headers);
}
$sql="UPDATE `feedback` SET `feedback`.`isProcessed`=".$status." WHERE `feedback`.`ID`=".$id;
mysql_query($sql,$conn);
mysql_close($conn);
?>