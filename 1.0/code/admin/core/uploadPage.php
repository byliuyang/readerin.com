<?php
ignore_user_abort(true);
set_time_limit(0);
// pixel cache max size
IMagick::setResourceLimit(imagick::RESOURCETYPE_MEMORY, 256);
// maximum amount of memory map to allocate for the pixel cache
IMagick::setResourceLimit(imagick::RESOURCETYPE_MAP, 256);
$mid=$_REQUEST['mid'];
mkdir("../upload/");
$fname=md5($file_name[1].date().rand (0,100000)).".jpg";
while(file_exists("../../magazine/".$mid."/".$fname))
{
	$fname=md5($file_name[1].date().rand (0,100000)).".jpg";
}
move_uploaded_file($_FILES["file"]["tmp_name"],"../upload/".$fname);
$img = new imagick();
$img->setResolution(500,500);
$img->readimage("../upload/".$fname);
$img->scaleImage(1000, 0);
$img->writeImage("../../magazine/".$mid."/".$fname);
$img->scaleImage(200, 0);
$img->writeImage("../../magazine/".$mid."/small/".$fname);
include("conn.php");
$sql="SELECT `magazine`.`size` FROM `magazine` WHERE `magazine`.`id`=".$mid."";
$result=mysql_query($sql,$conn);
$row=mysql_fetch_array($result);
$sql="INSERT INTO `pages` (`magazine`, `name`, `position`) VALUES (".$mid.", '".$fname."', '".$row[0]."');";
mysql_query($sql,$conn);
$sql="UPDATE `magazine` SET size=size+1 WHERE `magazine`.`id`='".$mid."'";
mysql_query($sql,$conn);
echo mysql_insert_id($conn);
mysql_close($conn);
?>