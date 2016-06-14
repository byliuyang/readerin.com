<?php
include("conn.php");
include("time.php");
$publisher=$_REQUEST['publisher'];
$sql="SELECT `series`.`name`,`series`.`id` FROM `series` WHERE `series`.`publisher`=".$publisher." ORDER BY time DESC";
$result=mysql_query($sql,$conn);
echo "<ul id='seriesList'>";
if(mysql_num_rows($result)>0)
{
	while($row=mysql_fetch_array($result))
	{
		$sql2="SELECT * FROM `magazine` WHERE `magazine`.`series`=".$row[1];
		$result2=mysql_query($sql2,$conn);
		if(mysql_num_rows($result2)<=0)
		{
			echo "<li><div><div class='seriesTitle' data-title='".$row[0]."' data-series='".$row[1]."' contenteditable='true' onblur='updateSeriesName(this)'>".$row[0]."</div><div class='deleteSeriesBox' title='不要这个系列了' onClick='trashSeries(this);' data-series='".$row[1]."'><div class='deleteSeries' src='static/img/delete.png'/></div><ul class='magazineList' data-series='".$row[1]."'></ul></div></li>";
		}
	}
}
echo "</ul>";
mysql_close($conn);
?>