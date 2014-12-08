<?php
	ignore_user_abort(true);
	set_time_limit(0);
	// pixel cache max size
	IMagick::setResourceLimit(imagick::RESOURCETYPE_MEMORY, 256);
	// maximum amount of memory map to allocate for the pixel cache
	IMagick::setResourceLimit(imagick::RESOURCETYPE_MAP, 256);
	include("conn.php");
	mkdir("../upload/");
	$series=$_REQUEST['series'];
	$publisher=$_REQUEST['publisher'];
	$file_name=explode(".",$_FILES['file']['name']);
	$fname=md5($file_name[1].date().rand (0,100000)).".".$file_name[1];
	while(file_exists("../upload/".$fname))
	{
		$fname=md5($file_name[1].date().rand (0,100000)).".".$file_name[1];
	}
	move_uploaded_file($_FILES["file"]["tmp_name"],"../upload/".$fname);
    $img = new imagick();
	$img->setResolution(600,600);
	$img->readimage("../upload/".$fname); 
    $pdfLength = $img->getNumberImages();
	$sql="INSERT INTO `magazine` (`size`, `series`, `issue`, `createtime`, `isnew`, `status`) VALUES (".$pdfLength.",".$series.",0, '".date("Y-m-d h:i:s")."', 1, 0)";
	mysql_query($sql,$conn);
	$id=mysql_insert_id($conn);
	if(!file_exists("../../magazine/"))
	{
		mkdir("../../magazine/");
	}
	mkdir("../../magazine/".$id);
   	mkdir("../../magazine/".$id."/small");
	$img->setImageFormat('jpeg');
    for($i = 0;$i < $pdfLength; $i++) {         
        $img->setIteratorIndex($i);
		$img->scaleImage(1000, 0);
		$fname=md5($file_name[1].date().rand (0,100000)).".jpg";
		while(file_exists("../../magazine/".$id."/".$fname))
		{
			$fname=md5($file_name[1].date().rand (0,100000)).".jpg";
		}
		$sql="INSERT INTO `pages` (`magazine`, `name`, `position`) VALUES (".$id.", '".$fname."',".$i.")";
		mysql_query($sql,$conn);
        $img->writeImage("../../magazine/".$id."/".$fname);
		$img->scaleImage(200, 0);
		$img->writeImage("../../magazine/".$id."/small/".$fname);
    }
	$img->clear(); 
	$img->destroy();
	recursiveRemoveDirectory("../upload/");
	function recursiveRemoveDirectory($directory)
	{
		foreach(glob("{$directory}/*") as $file)
		{
			if(is_dir($file)) { 
				recursiveRemoveDirectory($file);
			} else {
				unlink($file);
			}
		}
		rmdir($directory);
	}
	$sql="SELECT email FROM `publisher` WHERE id='".$publisher."'";
	$result=mysql_query($sql,$conn);
	$row=mysql_fetch_array($result);
	//Notify user through email
	$to = $row[0];
	$sql="SELECT name FROM `series` WHERE id='".$series."'";
	$result=mysql_query($sql,$conn);
	$row=mysql_fetch_array($result);
	$subject = "刊物上传成功";
	
	$message = "
	<html>
	<head>
	</head>
	<body>
	<div>您上传到《".$row[0]."》系列的刊物上传成功，已提交至管理员审核，请尽快期刊信息。</div>
	<div><a href='".$_SERVER['HTTP_HOST']."/admin/readings.php?mid=".$id."'>立即完善信息</a></div>
	</body>
	</html>
	";
	
	// Always set content-type when sending HTML email
	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
	
	// More headers
	$headers .= 'From: ReaderIn.com<admin@readerin.com>' . "\r\n";
	mail($to,$subject,$message,$headers);
	mysql_close($conn);
?>