<?php
session_start();
header('Content-Type: text/html; charset=utf-8');
$_SESSION['login']=true;
$_SESSION['publisher']=1;
if($_SESSION['login']!=true)
{
	header("Location:login.php");
}
$publisher=$_SESSION['publisher'];
include("core/conn.php");
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>ReaderIn Admin</title>
<link rel="stylesheet" href="static/css/index.css"/>
<script type="text/javascript" src="static/js/jquery.js"></script>
<?php
    echo "<script type=\"text/javascript\">var publisher=".$publisher.";</script>";
?>
</head>

<body>
	<div id="navigationBar">
    	<div id="navBarCenter">
        	<div id="logo"></div>
            <ul id="navList">
            	<li>
                	<a href="index.php">统计</a>
                </li>
                <li>
                	<a href="feedback.php">反馈</a>
                </li>
                <li class="activedNavTab">
                	<a href="readings.php">刊物</a>
                </li>
                <li>
                	<a href="privilege.php">权限</a>
                </li>
                <li>
                	<a href="advertisement.php">广告</a>
                </li>
                <li>
                	<a href="censor.php">审核</a>
                </li>
                <li>
                	<a href="setting.php">设置</a>
                </li>
            </ul>
        </div>
    </div>
    <div id="mainContent">
    	<div id="mainContentCenter">
        </div>
    </div>
</body>
</html>