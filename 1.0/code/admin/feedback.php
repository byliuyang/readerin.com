<?php
include("core/checkLogin.php");
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"/>
<meta http-equiv="Pragma" content="no-cache"/>
<meta http-equiv="Expires" content="0"/>
<title>ReaderIn Admin</title>
<link rel="stylesheet" href="static/css/index.css"/>
<link rel="stylesheet" href="static/css/feedback.css"/>
<script type="text/javascript" src="static/js/jquery.js"></script>
<script type="text/javascript" src="static/js/feedback.js"></script>
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
                	<a href="../">主页</a>
                </li>
            	<li>
                	<a href="index.php">统计</a>
                </li>
                <li class="activedNavTab">
                	<a href="feedback.php">反馈</a>
                </li>
                <?php
                include("core/checkPrivillege.php");
				?>
                <li>
                	<a href="setting.php">设置</a>
                </li>
            </ul>
        </div>
    </div>
    <div id="mainContent">
    	<div id="mainContentCenter">
                    <ul id="option">
                    	<li class="activedOptionItem" onClick="getNotProcessedList(this);">
                        	待处理
                        </li>
                        <li onClick="getProcessedList(this);">
                        	已处理
                        </li>
                    </ul>
                    <div id="MessageListBox">
                    	
                        <ul id="controls">
                            <li id="NextPageBtn">
                            	<img src="static/img/next.png"/>
                            </li>
                        	<li id="LastPageBtn">
                            	<img src="static/img/last.png"/>
                            </li>
                            <div id="currentMsgBox">
                            </div>
                        </ul>
                        <div id="coreArea">
                            
                        </div>
                    </div>
        </div>
    </div>
    <div id="notification"></div>
</body>
</html>