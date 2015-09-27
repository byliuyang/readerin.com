<?php
	include("conn.php");
    include("security.php");
	include("getIPAddress.php");
	$email = Antixss($_REQUEST["email"]);
	$content = Antixss($_REQUEST['content']);
	$mid = check_num($_REQUEST['mid']);
	$IP=get_client_ip();
	$sql="INSERT INTO feedback (magazine,email,content,IPAddress,isProcessed) VALUES(".$mid.",'".$email."','".$content."','".$IP."',0)";
	mysql_query($sql,$conn);
	mysql_close($conn);
	//应该加个验证来防止邮件轰炸，你们说对不对呀！
?>