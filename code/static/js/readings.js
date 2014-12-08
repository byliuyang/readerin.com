// JavaScript Document
var position=0;
var on=0;
var isMagnified=false;
var onfliping=false;
function initializePageList()
{
	onfliping=false;
	$(window).on("keydown", function(e){
		if (e.keyCode==190)
		{
			
			if(on==true)
			{
				if(onfliping==false)
				{
					if(position>0)
					{
						onfliping=true;
						$("#PageViewer").css("opacity",0);
						showSpinner();
						$.post("core/getPage.php","mid="+$(".current").data("mid")+"&position="+(position-1),function (data,status){
							var img=new Image();
							img.src="../magazine/"+$(".current").data("mid")+"/"+data;
							img.onload=function ()
							{
								$("#PageViewer").attr("src",img.src);
								onfliping=false;
								$("#PageViewer").css("opacity",1);
								hideSpinner();
								
							}
						});
						position--;
						
					}
				}
			}
		}
		else if (e.keyCode==191)
		{
			
			if(on==true)
			{
				if(onfliping==false)
				{
					if(position<$(".current").data("size")-1)
					{
						onfliping=true;
						$("#PageViewer").css("opacity",0);
						showSpinner();
						var img=new Image();
						$.post("core/getPage.php","mid="+$(".current").data("mid")+"&position="+(position+1),function (data,status){
							var img=new Image();
							img.src="../magazine/"+$(".current").data("mid")+"/"+data;
							img.onload=function ()
							{
								$("#PageViewer").attr("src",img.src);
								onfliping=false;
								$("#PageViewer").css("opacity",1);
								hideSpinner();
								
							}
						});
						position++;
						
					}
				}
			}
		}
		else if (e.keyCode==189)
		{
			if(on==true)
			{
				shrink(0.625);
			}
		}
		else if (e.keyCode==187)
		{
			if(on==true)
			{
				magnify(1.6);
			}

		}
		else if (e.keyCode==38)
		{
			if(on==true)
			{
				$("#PageViewer").css({top:$("#PageViewer").position().top-200});
			}

		}
		else if (e.keyCode==40)
		{
			if(on==true)
			{
				$("#PageViewer").css({top:$("#PageViewer").position().top+200});
			}
		}
		else if (e.keyCode==37)
		{
			if(on==true)
			{
				$("#PageViewer").css({left:$("#PageViewer").position().left-200});
			}
		}
		else if (e.keyCode==39)
		{
			if(on==true)
			{
				$("#PageViewer").css({left:$("#PageViewer").position().left+200});
			}
		}
		else if(e.keyCode==27)
		{
			if(on==true)
			{
				HidePageContainer();
			}
		}
			
	});
}
var timeout1;
var timeout2;
function ShowPageContainer(obj,mid,p)
{
	window.clearTimeout(timeout1);
	window.clearTimeout(timeout2);
	$(".book").removeClass("current");
	$(obj).addClass("current");
	var image=document.createElement("img");
	image.setAttribute("id","PageViewer");
	document.body.appendChild(image);
	$("#PageViewer").css({height:$(obj).height(),top:$(obj).position().top,left:$(obj).position().left});
	$.post("core/getPage.php","mid="+$(obj).data("mid")+"&position="+p,function (data,status){
	var img=new Image();
	img.src="../magazine/"+$(obj).data("mid")+"/"+data;
	var bg=new Image();
	bg.src="../data/system/wallpaper/3.jpg";
	bg.onload=function ()
	{
		$("#ShowPageContainer").css({display:"block"}).css({opacity:0,top:0,height:document.documentElement.clientHeight,width:document.documentElement.clientWidth,backgroundImage:"url("+bg.src+")"});
	}
	img.onload=function ()
	{
		position=p;
		on=true;
		$("#PageViewer").attr("src",img.src).css({top:0,height:document.documentElement.clientHeight});
		$("#Background").css({display:"block"}).css({width:$(obj).width(),top:$(obj).position().top,left:$(obj).position().left,height:$(obj).height()});
		$("#Background").css({top:0,left:0,height:document.documentElement.clientHeight,width:document.documentElement.clientWidth});
		timeout1=window.setTimeout(function (){
		$("#ShowPageContainer").css({opacity:1});
			$("#PageViewer").css({left:(document.documentElement.clientWidth-$("#PageViewer").width())/2,height:document.documentElement.clientHeight-60,top:30});
			$("#Background").css({opacity:0});
			timeout2=window.setInterval(function (){
				$("#Background").css({display:"none"});
				$("#PageViewer").focus();
				initializePageList();
				}
				,600);
		},600);
		$("#PageViewer").on("dblclick",function (event){
			//防止事件传播
			event.stopPropagation();
			var dx=(document.documentElement.clientWidth/2)-event.pageX;
			var dy=(document.documentElement.clientHeight/2)-event.pageY;
			$("#PageViewer").css({top:$("#PageViewer").offset().top+dy,left:$("#PageViewer").position().left+dx});
			
		});
		$("#ShowPageContainer").on("dblclick",function (event){
			var dx=event.pageX-($("#PageViewer").offset().left+$("#PageViewer").width()/2);
			var dy=event.pageY-($("#PageViewer").offset().top+$("#PageViewer").height()/2);
			$("#PageViewer").css({top:$("#PageViewer").position().top+dy,left:$("#PageViewer").position().left+dx});
			
		});
		$("#PageViewer").on("taphold", function(){
			if(isMagnified)
			{
				shrink(0.4);
				isMagnified=false;
			}
			else
			{
				magnify(2.5);
				isMagnified=true;
			}
		});
	}
	});
}
function HidePageContainer()
{
	window.clearTimeout(timeout1);
	window.clearTimeout(timeout2);
	position=0;
	on=false;
	$("#PageViewer").css({left:$(".current").position().left,top:0,height:document.documentElement.clientHeight});
	$("#Background").css({display:"block"}).css({opacity:1});
	timeout1=window.setTimeout(function (){
		$("#PageViewer").css({height:$(".current").height(),top:$(".current").position().top+44});
		$("#Background").css({width:$(".current").width(),top:$(".current").position().top+44,left:$(".current").position().left,height:$(".current").height()});
		$("#ShowPageContainer").css({opacity:0}).css({display:"none"});
		timeout2=window.setInterval(function (){
			$("#Background").css({display:"none"});
			$("#PageViewer").remove();
			}
			,600);
		},600);
	
}
function magnify(ratio)
{
	var width=document.getElementById("PageViewer").offsetWidth;
	var height=document.getElementById("PageViewer").offsetHeight;
	var dw=(document.getElementById("PageViewer").offsetWidth*(ratio-1))/2;
	var dh=(document.getElementById("PageViewer").offsetHeight*(ratio-1))/2;
	$('#PageViewer').css({height:height*ratio,left:$('#PageViewer').position().left-dw,top:$('#PageViewer').position().top-dh});
}
function shrink(ratio)
{
	var width=document.getElementById("PageViewer").offsetWidth;
	var height=document.getElementById("PageViewer").offsetHeight;
	var dw=(document.getElementById("PageViewer").offsetWidth*(1-ratio))/2;
	var dh=(document.getElementById("PageViewer").offsetHeight*(1-ratio))/2;
	$('#PageViewer').css({height:height*ratio,left:$('#PageViewer').position().left+dw,top:$('#PageViewer').position().top+dh});
}
function showSpinner()
{
	$(".spinner").css({display:"block",opacity:1})
}
function hideSpinner()
{
	$(".spinner").css({opacity:0});
	document.getElementById("spinner").addEventListener("webkitTransitionEnd",function (){
		$(".spinner").css({display:"none"});
	});
	
}