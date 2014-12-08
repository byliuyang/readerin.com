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
<link rel="stylesheet" href="static/css/readings.css">
<script type="text/javascript" src="static/js/jquery.js"></script>
<script type="text/javascript" src="static/js/jquery.mobile.custom.min.js"></script>
<script type="text/javascript" src="static/js/jquery.sortable.min.js"></script>
<script type="text/javascript" src="static/js/readings.js"></script>
<?php
    echo "<script type=\"text/javascript\">var publisher=".$publisher.";</script>";
	if(isset($_REQUEST['mid']))
	{
		echo "<script type='text/javascript'>mid=".$_REQUEST['mid'].";</script>";
	}
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
        	<ul id="option">
            	<div id="uploadButton" onClick="newSeries();">新建系列</div>
            	<li id="activedOptionItem" class="activedOptionItem" onClick="getList(this,0);">
                        	等待审核
                </li>
                <li id="getCensoredListButton" onClick="getCensoredList(this);">
                        	审核通过
                </li>
                <li id="BlankSeries" onClick="showBlankSeries(this);">
                        	空系列
                </li>
                <div>
                	<div id="subscriptionTitle">订阅用户</div>
                    <ul id="subscriptionList">
                        
                    </ul>
                </div>
            </ul>
            <div id="MessageListBox">
            	<div id="coreArea">
                </div>
            </div>
        </div>
    </div>
    <div id="blackBackground">
    </div>
    <div id="ShowPageContainer">
    </div>
    <div id="spinner" class="spinner">
      <div class="cube1"></div>
      <div class="cube2"></div>
    </div>
    <div id="notification"></div>
    <div id="UploadProgress">
    	<div id="progressTitle">
        </div>
        <div id="progressBar">
        	<div id="progressValue">
            </div>
        </div>
    </div>
</body>
</html>