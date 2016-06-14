<?php
session_start();
header('Content-Type: text/html; charset=utf-8');
if($_SESSION['login']!=true || ($_SESSION['publisherSuperAdmin']!=true && $_SESSION['systemSuperAdmin']!=true))
{
	header("Location:../../index.php");
}
$publisher=$_SESSION['publisher'];
include("conn.php");
?>