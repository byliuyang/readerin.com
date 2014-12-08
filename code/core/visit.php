<?php
header("Content-Type:text/html;charset=utf-8"); 
include("conn.php");
include("security.php");
include("getIPAddress.php");
$mid = check_num($_REQUEST['mid']);
$client=md5($_REQUEST['client']);
$IP=get_client_ip();
$sql="SELECT time FROM visitor WHERE IP='".$IP."' AND magazine='".$mid."' AND client='".$client."' ORDER BY time DESC";
$result=mysql_query($sql,$conn);
if(mysql_num_rows($result)>0)
{
	$row=mysql_fetch_array($result);
	if(time()-strtotime($row['time'])>86400)
	{
		$sql="INSERT INTO visitor (magazine,IP,client,time) VALUES(".$mid.",'".$IP."','".$client."','".date("Y-m-d H:i:s")."')";//我说咱能不这样吗
		mysql_query($sql,$conn);
	}
}
else
{
	$sql="INSERT INTO visitor (magazine,IP,client,time) VALUES(".$mid.",'".$IP."','".$client."','".date("Y-m-d H:i:s")."')";//我说咱能不这样吗
	mysql_query($sql,$conn);
}
mysql_close($conn);


?>