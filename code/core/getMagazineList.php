<?php
include("conn.php");
include("time.php");
if(isset($_REQUEST['search']))
{
	$search=$_REQUEST['search'];
	$sql2="SELECT * FROM `magazine` INNER JOIN `series` ON `series`.`id`=`magazine`.`series` INNER JOIN `publisher` ON `series`.`publisher`=`publisher`.`id` INNER JOIN `keyWord` ON `magazine`.`id`=`keyWord`.`mid` WHERE `magazine`.`status`=1 AND `keyWord`.`word` LIKE '%".$search."%' ORDER BY CASE WHEN `keyWord`.`word` like '".$search."%' THEN 0 WHEN `keyWord`.`word` like '".$search."%' THEN 1 WHEN `keyWord`.`word` like '%".$search."' THEN 2 ELSE 3 END, `keyWord`.`word`";
	$result2=mysql_query($sql2,$conn);
	echo "<li><ul class='series'>";
						$start=true;
						while($row2=mysql_fetch_array($result2))
						{
							$sql3="SELECT `pages`.`name` FROM `pages` WHERE `pages`.`magazine`=".$row2[0]."  AND `pages`.`position`=0";
							$result3=mysql_query($sql3,$conn);
							$row3=mysql_fetch_array($result3);
								if($start==true)
								{							
									echo "<li class=\"book book_new\" style='z-index=".$row2['issue']."' data-mid='".$row2[0]."' onClick='ShowPageContainer(this,".$row2[0].",0);' data-size='".$row2['size']."' title=\"".$row1['name'].$row2['issue']."&#10;".$row2[12]."&#10;";
									smartTime(strtotime($row2['createtime']));
									echo "上传\"><img src=\"../magazine/".$row2[0]."/small/".$row3[0]."\"></li>";
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
									echo "上传\"><img src=\"../magazine/".$row2[0]."/small/".$row3[0]."\"></li>";
								}
						}
		echo "</ul></li>";
}
else
{
					$sql1="SELECT * FROM `series` order by `id`";
					$result1=mysql_query($sql1,$conn);
					while($row1=mysql_fetch_array($result1))
					{
						
						$sql2="SELECT * FROM `magazine` INNER JOIN `series` ON `series`.`id`=`magazine`.`series` INNER JOIN `publisher` ON `series`.`publisher`=`publisher`.`id` WHERE `series`='".$row1['id']."' AND `magazine`.`status`=1 order by `issue`";
						$result2=mysql_query($sql2,$conn);
						$num=mysql_num_rows($result2);
						$curr_col=1;
						echo "<li><ul class='series'>";
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
									echo "上传\"><img src=\"../magazine/".$row2[0]."/small/".$row3[0]."\"></li>";
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
									echo "上传\"><img src=\"../magazine/".$row2[0]."/small/".$row3[0]."\"></li>";
								}
						}
						echo "</ul></li>";
					}
}
					mysql_close($conn);
?>