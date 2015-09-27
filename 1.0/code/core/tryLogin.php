<?php
session_start();
include("conn.php");
$email=$_REQUEST["email"];
$password=md5($_REQUEST["password"]);
$sql="SELECT `user`.`id`,`admin`.`publisherSuperAdmin`,`admin`.`systemSuperAdmin`,`admin`.`publisher` FROM `user` INNER JOIN `admin` ON `admin`.`user`=`user`.`id` WHERE `user`.`email`='".$email."' AND password='".$password."'";
$result=mysql_query($sql,$conn);
if(mysql_num_rows($result)>0)
{
	$row=mysql_fetch_array($result);
	$_SESSION['login']=true;
	$_SESSION['uid']=$row[0];
	$_SESSION['publisherSuperAdmin']=$row[1];
	$_SESSION['systemSuperAdmin']=$row[2];
	$_SESSION['publisher']=$row[3];
	if($row[1]==true || $row[2]==true )
	{
		echo "2";
	}
	else
	{
		echo "1";
	}
	
}
else
{
	echo "0";
}
?>