<?php
$type="login";
$mad_appid="2";
$mad_appkey="readingtimemachine";
$mad_secretkey="184c57bb41950c2496fd87c8b5e361d4";
$mad_callback="http://115.28.175.41/dev/rtm";
header("location:http://115.28.175.41/dev/dbcenter/auth/?type=".$type."&appid=".$mad_appid."&app_key=".$mad_appkey."&secret_key=".$mad_secretkey."&callback=".$mad_callback)
?>