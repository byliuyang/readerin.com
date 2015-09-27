<?php
include("core/checkLogin.php");
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>ReaderIn Admin</title>
<link rel="stylesheet" href="static/css/index.css"/>
<script type="text/javascript" src="static/js/d3.js"></script>
<script type="text/javascript" src="static/js/jquery.js"></script>
<script type="text/javascript" src="static/js/charts.min.js"></script>
<script type="text/javascript" src="static/js/index.js"></script>
</head>

<body>
	<div id="navigationBar">
    	<div id="navBarCenter">
        	<div id="logo"></div>
            <ul id="navList">
            	<li>
                	<a href="../">主页</a>
                </li>
            	<li class="activedNavTab">
                	<a href="index.php">统计</a>
                </li>
                <li>
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
        		<div>
                	<h1>
                    	<?php
							
							$sql="SELECT `name` FROM `publisher` WHERE `id`=".$publisher;
							$result=mysql_query($sql,$conn);
							$row=mysql_fetch_array($result);
							echo $row['name']."的刊物流量";
						?>
                    </h1>
                    	<canvas id="SchoolVisitor" width="984" height="300"></canvas>
                        <script type="text/javascript">
                        	<?php
							$sql="SELECT `magazine`.`issue`,`series`.`name`,SUM(`visitor`.`count`) FROM `magazine` INNER JOIN `series` ON `series`.`id`=`magazine`.`series` INNER JOIN `publisher` ON `series`.`publisher`=`publisher`.`id` INNER JOIN `visitor` ON `magazine`.`id`=`visitor`.`magazine` WHERE `series`.`publisher`=".$publisher." GROUP BY `magazine`.`id` ORDER BY SUM(`visitor`.`count`) DESC";
							$result=mysql_query($sql,$conn);
							$sum=0;
							$i=0;
							$dataList="";
							$nameList="";
							while($row=mysql_fetch_array($result))
							{
								
								$dataList[$i]=$row[2];
								$nameList[$i]=$row[1].$row[0];
								$sum+=$row[2];
								$i++;
							}
							echo "var data = {labels: eval(".json_encode($nameList)."),datasets: [{label: 'visitors',fillColor: 'rgba(48,167,187,0.5)',strokeColor: 'rgba(48,167,187,0.8)',highlightFill: 'rgba(48,167,187,0.75)',highlightStroke: 'rgba(48,167,187,1)',data: eval(".json_encode($dataList).")}]};";
						 ?>
                    </script>
                    
        	</div>
    </div>
</body>
</html>