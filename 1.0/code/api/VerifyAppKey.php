<?php
include("security.php");
$AppKey=Antixss($_REQUEST['appkey']);
include("conn.php");
$sql="SELECT * FROM `appkey` WHERE appkey='".$AppKey."'";
?>