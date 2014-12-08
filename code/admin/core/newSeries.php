<?php
include("conn.php");
$publisher=$_REQUEST['publisher'];
$publisher=1;
$sql="INSERT INTO `series` (name, publisher) VALUES ('新系列',".$publisher.")";
$result=mysql_query($sql,$conn);
$id=mysql_insert_id($conn);
echo "<li><div><div class='seriesTitle' data-title='新系列' data-series='".$id."' contenteditable='true' onblur='updateSeriesName(this)'>新系列</div><div class='deleteSeriesBox' title='不要这个系列了' onclick='trashSeries(this);' data-series='".$id."'><div class='deleteSeries' src='static/img/delete.png'></div></div><ul class='magazineList' data-series='".$id."'></ul></div></li>";
?>