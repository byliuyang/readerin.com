<?php
include("conn.php");
$mid=$_REQUEST['mid'];
$keyword=urldecode($_REQUEST['keyword']);
$sql="INSERT INTO `keyWord` (`mid`, `word`) VALUES ('".$mid."', '".$keyword."');";
mysql_query($sql,$conn);
$id=mysql_insert_id($conn);
echo "<li class='labelItem'><div class='labelConetent'>".$keyword."</div><div class='deleteLabelBtn' title='移除标签' data-keyword='".$id."' onclick='removeLabel(this)'></div></li>";
mysql_close($conn);
?>