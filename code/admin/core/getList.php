<?php
include("conn.php");
include("time.php");
$listType=$_REQUEST['listType'];
if(isset($_REQUEST['publisher']))
{
	$publisher=$_REQUEST['publisher'];
	$sql="SELECT `series`.`name`,`series`.`id` FROM `magazine` INNER JOIN `series` ON `magazine`.`series`=`series`.`id`  WHERE `series`.`publisher`=".$publisher." AND `magazine`.`status`=".$listType." GROUP BY `magazine`.`series` ORDER BY `magazine`.`createtime`";
}
else
{
	$sql="SELECT `series`.`name`,`series`.`id` FROM `magazine` INNER JOIN `series` ON `magazine`.`series`=`series`.`id`  WHERE `magazine`.`status`=".$listType." GROUP BY `magazine`.`series` ORDER BY `magazine`.`createtime`";
}
	$result=mysql_query($sql,$conn);
	echo "<ul id='seriesList'>";
	if(mysql_num_rows($result)>0)
	{
		while($row=mysql_fetch_array($result))
		{
			echo "<li><div><div class='seriesTitle' data-title='".$row[0]."' data-series='".$row[1]."' contenteditable='true' onblur='updateSeriesName(this)'>".$row[0]."</div><div class='deleteSeriesBox' title='不要这个系列了' onClick='";
			switch($listType)
			{
				case 0:
					echo "deleteSeries(this,0);";
					break;
				case 1:
					echo "deleteSeries(this,1);";
					break;
			}
			echo "' data-series='".$row[1]."'><div class='deleteSeries' src='static/img/delete.png'/></div><ul class='magazineList' data-series='".$row[1]."'>";
			$sql2="SELECT `magazine`.`id`,`magazine`.`issue`,`magazine`.`createtime` FROM `magazine` WHERE `magazine`.`series`=".$row[1]." AND `magazine`.`status`=".$listType." ORDER BY `magazine`.`issue` DESC";
			$result2=mysql_query($sql2,$conn);
			while($row2=mysql_fetch_array($result2))
			{
				$sql3="SELECT `pages`.`name` FROM `pages` WHERE `pages`.`magazine`=".$row2[0]." AND `pages`.`position`=0";
				$result3=mysql_query($sql3,$conn);
				$row3=mysql_fetch_array($result3);
				echo "<li><div><img title='长按编辑刊物' class='magazineCover' src='../magazine/".$row2[0]."/".$row3[0]."' onDblClick='OpenIssue(".$row2[0].")'></div><div class='magazineIssue'>第".$row2[1]."期</div><div class='magazineUploadTime'>";
				smartTime(strtotime($row2[2]));
				echo " 上传</div><div class='deleteBtnBox'  data-mid='".$row2[0]."' onClick='removeMagazine(this);'><div class='deleteBtn'></div></div>";
				if(!isset($_REQUEST['publisher']) && $listType==0)
				{
					echo "<div class='onlineBtnBox'  data-mid='".$row2[0]."' onClick='onlineMagazine(this);'><div class='onlineBtn'></div></div>";
				}
				echo "</li>";
			}
			echo "</ul></div></li>";
		}
	}
	echo "</ul>";
	mysql_close($conn);
?>