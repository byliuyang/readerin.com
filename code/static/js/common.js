// JavaScript Document
//增加了浏览器检测，升级浏览器
function sug_box_close()
{
	document.getElementById("sug_box").style.top="-250px";
	var bg=document.getElementById("blackBg");
	document.body.removeChild(bg);
	bg.style.backgroundColor="rgba(0,0,0,0)";
}
//修改了建议箱弹出效果
function sug_box_open()
{
	var bg=document.createElement("div");
	bg.setAttribute("id","blackBg");
	bg.style.height=document.documentElement.clientHeight+"px";
	bg.style.width=document.documentElement.clientWidth+"px";
	bg.setAttribute("onclick","sug_box_close()");
	bg.style.display="block";
	document.body.appendChild(bg);
	document.getElementById("blackBg").style.backgroundColor="rgba(0,0,0,0.4)";
	document.getElementById("sug_box").style.top=(document.documentElement.clientHeight/2)+"px";
}
