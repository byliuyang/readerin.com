<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="static/css/index.css">
<link rel="stylesheet" href="static/css/common.css">
<title>ReaderIn校园传媒</title>
<script type="text/javascript" src="static/js/checkExplorer.js"></script>
<script type="text/javascript" src="static/js/jquery.js"></script>
<script type="text/javascript" src="static/js/jquery.mobile.custom.min.js"></script>
<script type="text/javascript" src="static/js/jquery.qrcode.min.js"></script>
<script type="text/javascript" src="static/js/index.js"></script>
<script type="text/javascript" src="static/js/common.js"></script>
<script type="text/javascript" src="static/js/readings.js"></script>
</head>

<body>
	<div id="searchBox" onMouseOver="showSearchBox();" onMouseOut="hideSearchBox();" onBlur="hideSearchBox();">
    	<input type="text" placeholder="请输入搜索关键字" id="searchInput">
    </div>
<!--
这里是开始
1）你们增加了校刊流量排行
-->
    <div id="school_rank">
    	<div id="sr_title">
            校刊流量排行
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
            ?>
        </ul>
    </div>
    <!--这里是结束-->
    <!--
    登陆
    -->
    <div id="login">
    </div>
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
                <?php
					$sql1="SELECT * FROM `series` order by `id`";
					$result1=mysql_query($sql1,$conn);
					while($row1=mysql_fetch_array($result1))
					{
						$sql2="SELECT * FROM `magazine` INNER JOIN `series` ON `series`.`id`=`magazine`.`series` INNER JOIN `publisher` ON `series`.`publisher`=`publisher`.`id` WHERE `series`='".$row1['id']."' AND `magazine`.`status`=1 order by `issue`";
						$result2=mysql_query($sql2,$conn);
						$num=mysql_num_rows($result2);
						$curr_col=1;
						echo "<li>
						<ul class='series'>";
						$start=true;
						while($row2=mysql_fetch_array($result2))
						{
							$sql3="SELECT `pages`.`name` FROM `pages` WHERE `pages`.`magazine`=".$row2[0]." AND `pages`.`position`=0";
							$result3=mysql_query($sql3,$conn);
							$row3=mysql_fetch_array($result3);
								if($start==true)
								{							
									echo "<li class=\"book book_new\" style='z-index=".$row2['issue']."' data-mid='".$row2[0]."' onClick='ShowPageContainer(this,".$row2[0].",0);' data-size='".$row2['size']."' title=\"".$row1['name'].$row2['issue']."&#10;".$row2[12]."&#10;";
									smartTime(strtotime($row2['createtime']));
									echo "上传\">
								<img src=\"magazine/".$row2[0]."/small/".$row3[0]."\">
						</li>";
									$start=false;
								}
								else
								{
									echo "<li class=\"book book_new\" style='z-index=".$row2['issue'];
									if($num>=3)
									{
										echo ";margin-left:-110px";
									}
									echo "'  data-mid='".$row2[0]."' data-size='".$row2['size']."' onClick='ShowPageContainer(this,".$row2[0].",0);' title=\"".$row1['name'].$row2['issue']."&#10;".$row2[12]."&#10;";
									smartTime(strtotime($row2['createtime']));
									echo "上传\">
								<img src=\"magazine/".$row2[0]."/small/".$row3[0]."\">
						</li>";
								}
						}
						echo "</ul>
						</li>";
					}
					mysql_close($conn);
                ?>
            </ul>
            <!--版权与备案信息-->
            <div id="copyright">
            <a href="http://www.illumer.org">illumer社区</a>&nbsp;|&nbsp;<a href="http://git.illumer.org/illumercompany/rtm">Source Code</a>&nbsp;|&nbsp;京ICP备14014159</div>
            <div id="login" onClick="OpenLogin();">
            	登录
            </div>
             <div id="Background">
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
