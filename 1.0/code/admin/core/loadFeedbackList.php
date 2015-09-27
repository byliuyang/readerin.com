<?php
include("conn.php");
include("time.php");
$isProcessed=$_REQUEST['processed'];
$publisher=$_REQUEST['publisher'];
$page=$_REQUEST['page'];
$sql="SELECT `feedback`.`id`,`feedback`.`email`,`feedback`.`time`,`series`.`name`,`magazine`.`issue` FROM `feedback` INNER JOIN `magazine` ON `feedback`.`magazine`=`magazine`.`id` INNER JOIN `series` ON `magazine`.`series`=`series`.`id` INNER JOIN `publisher` ON `series`.`publisher`=`publisher`.`id`  WHERE `series`.`publisher`=".$publisher." AND `feedback`.`isProcessed`=".$isProcessed." ORDER BY `feedback`.`time` DESC LIMIT ".($page*3).",3";
$result=mysql_query($sql,$conn);
echo "<ul id='MessageList'>";

if(mysql_num_rows($result)>0)
{
	while($row=mysql_fetch_array($result))
	{
		echo "<li><input class=\"notProcessed\" type=\"checkbox\" ";
		if($isProcessed)
		{
			echo "checked  onclick=\"itemCheckFeedback(".$row[0].",".$isProcessed.",this)\"";
		}
		else
		{
			echo "onclick=\"itemCheckFeedback(".$row[0].",0,this)\"";
		}
		echo " ><span onClick=\"loadFeedback(".$row[0].")\">".$row[1]."对《<span>".$row[3].$row[4]."</span>》的反馈<div class=\"feedbackTime\">";
		$t=strtotime($row[2]);
		smartTime($t);
		echo "</div></span></li>";
	}
}
else
{
	if($isProcessed==true)
	{
		echo "1";
	}
	else
	{
		echo "2";
	}
}
echo "</ul>";
mysql_close($conn);
?>