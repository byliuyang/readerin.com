<?php
header("Content-Type:text/html;charset=utf-8"); 
$conn=@mysql_connect("localhost","rtm","tPS4Xj6qqRGGdYSG");
if(!$conn)
{
	die("服务器故障，正在抢修中！");
}
mysql_select_db("rtm",$conn);
mysql_query("SET NAMES UTF8");
?>