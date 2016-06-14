<?php
 if(isset($_SESSION['publisherSuperAdmin']) || isset($_SESSION['systemSuperAdmin']))
				{
					if($_SESSION['publisherSuperAdmin']==true || $_SESSION['systemSuperAdmin']==true)
					{
						echo "<li id='privilegeTab'><a href='privilege.php' >权限</a></li>";
						if($_SESSION['systemSuperAdmin']==true)
						{
							echo "<li id='censorTab'><a href='censor.php' >审核</a></li>";
						}
						else
						{
							echo "<li id='readingsTab'><a href='readings.php'>刊物</a></li>";
						}
					}
				}
?>