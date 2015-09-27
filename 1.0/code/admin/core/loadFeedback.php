<?php
include("conn.php");
include("time.php");
$feedback=$_REQUEST['feedback'];
$sql="SELECT `feedback`.`id`,`feedback`.`email`,`feedback`.`time`,`series`.`name`,`magazine`.`issue`,`feedback`.`content`,`feedback`.`isProcessed` FROM `feedback` INNER JOIN `magazine` ON `feedback`.`magazine`=`magazine`.`id` INNER JOIN `series` ON `magazine`.`series`=`series`.`id` INNER JOIN `publisher` ON `series`.`publisher`=`publisher`.`id`  WHERE `feedback`.`id`=".$feedback;
$result=mysql_query($sql,$conn);
$row=mysql_fetch_array($result);
$isProcessed=$row[6];
echo "<div id=\"FeedbackContentBox\"><div id=\"FeedbackTitle\"><a href=\"mailto:".$row[1]."\" title=\"给用户回邮件\">".$row[1]."</a>"."对《<span>".$row[3].$row[4]."</span>》的反馈<div class=\"feedbackTime\">";
$t=strtotime($row[2]);
smartTime($t);
echo "</div></div><div id=\"FeedbackContent\">".$row[5]."</div><div id=\"FeedbackProcess\"><div><input class=\"notProcessed\" type=\"checkbox\" ";
if($isProcessed)
{
	echo "checked  onclick=\"checkFeedback(".$row[0].",".$isProcessed.")\"";
}
else
{
	echo "onclick=\"checkFeedback(".$row[0].",0)\"";
}
echo">已处理</div></div></div>";
mysql_close($conn);
?>