<?php
session_start();
?>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="static/css/index.css">
<link rel="stylesheet" href="static/css/common.css">
<title>ReaderIn校园传媒</title>
<script type="text/javascript" src="static/js/checkExplorer.js"></script>
<script type="text/javascript" src="static/js/jquery.js"></script>
<script type="text/javascript" src="static/js/jquery.easing.js"></script>
<script type="text/javascript" src="static/js/jquery.easing.compatibility.js"></script>
<script type="text/javascript" src="static/js/jquery.mobile.custom.min.js"></script>
<script type="text/javascript" src="static/js/jquery.qrcode.min.js"></script>
<script type="text/javascript" src="static/js/index.js"></script>
<script type="text/javascript" src="static/js/common.js"></script>
<script type="text/javascript" src="static/js/readings.js"></script>
<?php
if(isset($_REQUEST['mid']))
{
	echo "<script type='text/javascript'>
			$(window).ready(function (){
				var mid=".$_REQUEST['mid'].";
				openMagazineNow(mid);
				});
		</script>";
}
?>
</head>

<body>
	<div id="mainContent">
        <div id="searchBox" onMouseOver="showSearchBox();" onMouseOut="hideSearchBox();" onBlur="hideSearchBox();" onBlur="hideSearchBox()">
            <input type="text" placeholder="请输入搜索关键字" id="searchInput" onKeyUp="searchMagazine(this);" onBlur="hideSearchBox()">
        </div>
    <!--
    这里是开始
    1）你们增加了校刊流量排行
    -->
        <div id="school_rank">
            <div id="sr_title">
                校园刊物争霸
            </div>
            <ul>
                <?php
                    include("core/conn.php");
                    include("core/time.php");			
                    $sql="SELECT `school`.`school`,SUM(`visitor`.`count`) FROM `magazine` INNER JOIN `series` ON `series`.`id`=`magazine`.`series` INNER JOIN `publisher` ON `series`.`publisher`=`publisher`.`id` INNER JOIN `school` ON `publisher`.`school`=`school`.`id` INNER JOIN `visitor` ON `magazine`.`id`=`visitor`.`magazine` GROUP BY `school`.`school` ORDER BY SUM(`visitor`.`count`) DESC LIMIT 10";
                    $result=mysql_query($sql,$conn);
                    $i=1;
                    while($row=mysql_fetch_array($result))
                    {
                        echo "<li>
                    <div><span class=\"rank_top\">TOP".($i++)."</span>".$row['school']."</div>
                    <div class=\"visited\">阅读量：".$row['SUM(`visitor`.`count`)']."</div>
                </li>";
                    }
                    mysql_close($conn);
                ?>
            </ul>
        </div>
        <!--这里是结束-->
        <!--
        登陆
        -->
        <div id="ShareBox">
            <div id="ShareBoxTitle">
            </div>
            <div id="ShareBoxTitleQRCode" title="扫描二维码分享到微信朋友圈">
            </div>
        </div>
        <!--这里是开始
        2）你们重构了刊物选中特效
        3）针对多本刊物，重进设计了布局
        -->
        <ul id="book_shelf">
                </ul>
                <!--版权与备案信息-->
                <div id="copyright">
                <a href="http://www.illumer.org">illumer</a>&nbsp;|&nbsp;<a id="sourceCodeLink" href="http://git.presagers.com/harryliu/readerin">源代码</a>&nbsp;|&nbsp;京ICP备14014159</div>
                <?php
                if(isset($_SESSION['login']))
                {
                    if($_SESSION['login']==true)
                    {
                        echo "<div id='login' onClick='logout();'>登出</div>";
                    }
                    else
                    {
                        echo "<div id='login' onClick='OpenLogin();'>登录</div>";
                    }
                }
                else
                {
                    echo "<div id='login' onClick='OpenLogin();'>登录</div>";
                }
                if(isset($_SESSION['publisherSuperAdmin']) || isset($_SESSION['systemSuperAdmin']))
                {
                    if($_SESSION['publisherSuperAdmin']==true || $_SESSION['systemSuperAdmin']==true)
                    {
                        echo "<div id='adminEntry' onClick='gotoAdmin();'>管理</div>";
                    }
                }
                ?>
                <!--登录框-->
                <div id="loginBox" class="box show">
                    <div id="loginBoxTitle">
                        ReaderIn.com
                    </div>
                    <div id="loginBoxContent">
                        <div id="loginBoxContentInputBox">
                            <div>
                                <input type="text" placeholder="Email" id="loginBoxUsernameEditText" class="EditText"/>
                            </div>
                            <div>
                                <input type="password" placeholder="密码" id="loginBoxPasswordEditText" class="EditText"/>
                            </div>
                            <div id="ForgetPasswordIcon" title="忘记密码">
                            </div>
                        </div>
                        <div id="loginBoxLoginButton" class="submitButton" onClick="tryLogin()">立即登录</div>
                    </div>
                </div>
                <div id="loginBG" onClick="closeLogin();" title="回到主界面">
                </div>
                 <div id="Background">
                </div>
                <div id="ShowPageContainer">
                </div>
                <div id="spinner" class="spinner">
                  <div class="cube1"></div>
                  <div class="cube2"></div>
                </div>
                <div id="Progress">
                    <div id="progressBar">
                        <div id="progressValue">
                        </div>
                    </div>
                </div>
       </div>
       <div id="UserBookShelf">
       		<ul id="SubscriptionShelf"></ul>
            <ul id="CherishShelf"></ul>
       </div>
       <div id="LoadingScreen">
       		<svg id='bootLoader' width="50" height="50" viewBox="0 0 105 105" xmlns="http://www.w3.org/2000/svg" fill="#fff">
				<circle cx="12.5" cy="12.5" r="12.5">
					<animate attributeName="fill-opacity"
					 begin="0s" dur="1s"
					 values="1;.2;1" calcMode="linear"
					 repeatCount="indefinite" />
				</circle>
				<circle cx="12.5" cy="52.5" r="12.5" fill-opacity=".5">
					<animate attributeName="fill-opacity"
					 begin="100ms" dur="1s"
					 values="1;.2;1" calcMode="linear"
					 repeatCount="indefinite" />
				</circle>
				<circle cx="52.5" cy="12.5" r="12.5">
					<animate attributeName="fill-opacity"
					 begin="300ms" dur="1s"
					 values="1;.2;1" calcMode="linear"
					 repeatCount="indefinite" />
				</circle>
				<circle cx="52.5" cy="52.5" r="12.5">
					<animate attributeName="fill-opacity"
					 begin="600ms" dur="1s"
					 values="1;.2;1" calcMode="linear"
					 repeatCount="indefinite" />
				</circle>
				<circle cx="92.5" cy="12.5" r="12.5">
					<animate attributeName="fill-opacity"
					 begin="800ms" dur="1s"
					 values="1;.2;1" calcMode="linear"
					 repeatCount="indefinite" />
				</circle>
				<circle cx="92.5" cy="52.5" r="12.5">
					<animate attributeName="fill-opacity"
					 begin="400ms" dur="1s"
					 values="1;.2;1" calcMode="linear"
					 repeatCount="indefinite" />
				</circle>
				<circle cx="12.5" cy="92.5" r="12.5">
					<animate attributeName="fill-opacity"
					 begin="700ms" dur="1s"
					 values="1;.2;1" calcMode="linear"
					 repeatCount="indefinite" />
				</circle>
				<circle cx="52.5" cy="92.5" r="12.5">
					<animate attributeName="fill-opacity"
					 begin="500ms" dur="1s"
					 values="1;.2;1" calcMode="linear"
					 repeatCount="indefinite" />
				</circle>
				<circle cx="92.5" cy="92.5" r="12.5">
					<animate attributeName="fill-opacity"
					 begin="200ms" dur="1s"
					 values="1;.2;1" calcMode="linear"
					 repeatCount="indefinite" />
				</circle>
			</svg>
       </div>
</body>
</html>
