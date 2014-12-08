<?php
session_start();
$token=$_SESSION['mad_token'];
$user_id=$_SESSION['mad_user_id'];
$appid=$_SESSION['mad_appid'];
$mad_dbc_user=json_decode(file_get_contents("http://115.28.144.219/dbcenter/core/controller.php?api=get_user&user_id=".$user_id."&appid=".$appid."&token=".$token));
?>