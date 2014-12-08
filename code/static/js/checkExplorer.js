// JavaScript Document
var explorer=window.navigator.userAgent;
	if(explorer.indexOf("MSIE 7.0")!=-1 || explorer.indexOf("MSIE 8.0")!=-1 || explorer.indexOf("MSIE 6.0")!=-1)
	{
		window.location.href="browser.php";
    }
	else if(explorer.indexOf("Mobile")!=-1 || explorer.indexOf("MicroMessenger")!=-1)
	{
		window.location.href="m";
	}