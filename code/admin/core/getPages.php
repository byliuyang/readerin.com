<?php
include("conn.php");
include("time.php");
$mid=$_REQUEST['mid'];
$sql="SELECT `magazine`.`id`,`magazine`.`issue`,`magazine`.`size`,`series`.`name`,`magazine`.`createtime`  FROM `magazine`  INNER JOIN `series` ON `magazine`.`series`=`series`.`id`  WHERE  `magazine`.`id`=".$mid;
$result=mysql_query($sql,$conn);
$row=mysql_fetch_array($result);
echo "<div><div id='MagazineAttributes' data-title='".$row[3]."' data-mid='".$row[0]."' data-size='".$row[2]."'><div id='MagazineName'>".$row[3]." 第<span contenteditable='true' data-mid='".$row[0]."' onblur='updateIssueName(this)'>".$row[1]."</span>期 </div><div id='MagazineUploadTime'>";
smartTime(strtotime($row[4]));
echo "</div></div><div id='magazineCoverContainer'><ul id='PageList' data-size='".$row[2]."'>";
$sql="SELECT * FROM `pages`  WHERE  `pages`.`magazine`=".$mid." ORDER BY `pages`.`position` ASC";
$result=mysql_query($sql,$conn);
while($row=mysql_fetch_array($result))
{
	echo "<li data-page-id='".$row['id']."'><div><img title='长按编辑页面，拖动页面排序' class='magazinePage' src='../magazine/".$mid."/small/".$row['name']."' onDblClick='ShowPageContainer(this,".$mid.",".$row['position'].");'></div><div class='magazinePageNumber'>".($row['position']+1)."</div><div class='magazineUploadTime'>";
	smartTime(strtotime($row["time"]));
	echo "上传</div><div class='deleteBtnBox' data-page='".$row['id']."'  onClick='removePage(this);'><div class='deleteBtn'></div></div></li>";
}
echo "</ul></div>";
mysql_query($sql,$conn);
mysql_close($conn);
?>