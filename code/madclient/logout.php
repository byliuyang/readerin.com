<?php
session_start();
$_SESSION['mad_user_id']="";
$_SESSION['mad_appid']="";
$_SESSION['mad_token']="";
$_SESSION['login']=false;
header("Location:../index.php");
?>