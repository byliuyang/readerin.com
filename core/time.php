<?php
function smartTime($time)
{
	if(date("Y-m")==date("Y-m",$time))
		{
			if((int)date("d")-(int)date("d",$time)==0)
			{
				echo "今天 ".date("H:i:s",$time);
			}
			else if((int)date("d")-(int)date("d",$time)==1)
			{
				echo "昨天 ".date("H:i:s",$time);
			}
			else if((int)date("d")-(int)date("d",$time)==2)
			{
				echo "前天 ".date("H:i:s",$time);
			}
			else
			{
				echo date("今年m月d日 H:i:s",$time);
			}
		}
		else
		{
			echo date("Y-m-d H:i:s",$time);
		}
}
?>