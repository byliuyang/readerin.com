<?php
session_start();
header('Content-Type: text/html; charset=utf-8');
$_SESSION['login']=true;
if($_SESSION['login']!=true)
{
	header("Location:login.php");
}
include("core/conn.php");
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>ReaderIn Admin</title>
<link rel="stylesheet" href="static/css/index.css"/>
<link rel="stylesheet" href="static/css/readings.css">
<link rel="stylesheet" href="static/css/censor.css">
<script type="text/javascript" src="static/js/jquery.js"></script>
<script type="text/javascript" src="static/js/jquery.mobile.custom.min.js"></script>
<script type="text/javascript" src="static/js/jquery.sortable.min.js"></script>
<script type="text/javascript" src="static/js/censor.js"></script>
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
                <li>
                	<a href="readings.php">刊物</a>
                </li>
                <li>
                	<a href="privilege.php">权限</a>
                </li>
                <li>
                	<a href="advertisement.php">广告</a>
                </li>
                <li class="activedNavTab">
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
                    <ul id="subscriptionList">
                        <div id="subscriptionTitle">订阅用户</div>
                        <li>
                            <div class="subscriptionProfileContainer"><img class="profile" src="../data/0/1.jpeg"></div>
                            <div class="subscriptionNameContainer">
                            	<div>梦幻男孩</div>
                                <div class="subscriptionSeries">昨天 10:20:30</div>
                            </div>
                        </li>
                        <li>
                            <div><img class="profile" src="../data/0/1.jpeg"></div>
                        </li>
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