<?php
include("core/security.php");
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>ReaderIn</title>

<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1"/>

<link rel="stylesheet" href="static/css/common.css">
<link rel="stylesheet" href="static/css/index.css">
<script type="text/javascript" src="static/js/jquery.js"></script>
<script type="text/javascript" src="static/js/jquery.mobile.min.js"></script>
<script type="text/javascript" src="static/js/common.js"></script>
</head>

<body>
	<?php
	if(isset($_REQUEST['mid']))
	{
		 echo "<script>var MagazineID=".$_REQUEST['mid'].";var msize=".$_REQUEST['msize'].";</script>";
	}
	else
	{
		 echo "<script>var MagazineID=0;var msize=0;</script>";
	}
    ?>
    <div id="MainView" class="Activity">
    	<div class="TitleBar">
        	RT校园传媒<?php
			echo urldecode(Antixss($_REQUEST['mname']));
            ?>
        </div>
        <div class="MenuButton" onClick="FlipMenu();"></div>
            <?php
				include("main.php");
            ?>      
    </div>
    <div id="blackbackground"></div>
    <div id="blackbackground2"></div>
    <img id="pageBox">
    <img id="pageBoxLast">
    <img id="pageBoxNext">
    <div class="spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
    <div id="MenuView">
    	<div id="SchoolRank">
            <div id="SchoolRanktitle">
                <div>校刊流量排行</div>
            </div>
            <ul id="SchoolRankList">
                <?php
                    include("core/conn.php");
                    $sql="SELECT `school`.`school`,SUM(`visitor`.`count`) FROM `magazine` INNER JOIN `series` ON `series`.`id`=`magazine`.`series` INNER JOIN `publisher` ON `series`.`publisher`=`publisher`.`id` INNER JOIN `school` ON `publisher`.`school`=`school`.`id` INNER JOIN `visitor` ON `magazine`.`id`=`visitor`.`magazine` GROUP BY `school`.`school` ORDER BY SUM(`visitor`.`count`) DESC LIMIT 10";
                    $result=mysql_query($sql,$conn);
                    $i=1;
                    while($row=mysql_fetch_array($result))
                    {
                        echo "<li>
                    <div><span class=\"ranks\">TOP".($i++)."</span>".$row['school']."</div>
                    <div class=\"visited\">累积流量：".$row['SUM(`visitor`.`count`)']."</div>
                </li>";
                    }
                ?>
            </ul>
    	</div>
    </div>
</body>
</html>
