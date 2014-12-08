// JavaScript Document
var m;
var position=0;
$(window).ready(function() {
	$("#ShareBox").css("top",document.documentElement.clientHeight/2);
    $("#ShareBoxTitleQRCode").qrcode({ 
    render: "div",
    width: 200, 
    height:200, 
    text: "m/?mid="+$("#magazine").data("mid")+"&position="+position, 
	}); 
		$('#magazine').css("left",document.documentElement.clientWidth/2-495)
		$('#magazine').turn({
							display: 'double',
							acceleration: true,
							gradients: !$.isTouch,
							elevation:50,
							when: {
								turned: function(e, page) {
									/*console.log('Current view: ', $(this).turn('view'));*/
								}
							}
						});
						$('#magazine').bind('turned', turned_page);
	});
	$(window).on("keydown", function(e){
		if (e.keyCode==190)
		{
			if(on==true)
			{
				if(position>1)
				{
					showSpinner();
					$.post("core/getPage.php","mid="+$("#magazine").data("mid")+"&position="+(position-2),function (data,status){
						var img=new Image();
						img.src="../magazine/"+$("#magazine").data("mid")+"/"+data;
						img.onload=function ()
						{
							$("#magazine").html("src","<div style='background-image:url(magazine/"+img.src+")'></div>"+$("#magazine").html);
							hideSpinner();
							$('#magazine').turn('previous');
						}
					});
					position--;
					
				}
				else if(position==1)
				{
					$('#magazine').turn('previous');
				}
			}
		}
		else if (e.keyCode==191)
		{
			if(on==true)
			{
				if(position<$("#magazine").data("size")-2)
				{
					showSpinner();
					var img=new Image();
					$.post("core/getPage.php","mid="+$("#magazine").data("mid")+"&position="+(position+1),function (data,status){
						var img=new Image();
						img.src="../magazine/"+$("#magazine").data("mid")+"/"+data;
						img.onload=function ()
						{
							$("#magazine").html("src",$("#magazine").html+"<div style='background-image:url(magazine/"+img.src+")'></div>");
							hideSpinner();
							
						}
					});
					position++;
					
				}
				else if(position==$("#magazine").data("size")-2)
				{
					$('#magazine').turn('next');
				}
			}
		}
		else if (e.keyCode==189)
		{
			if(on==true)
			{
				shrink(0.9);
			}
		}
		else if (e.keyCode==187)
		{
			if(on==true)
			{
				magnify(1.1);
			}

		}
		else if (e.keyCode==38)
		{
			if(on==true)
			{
				$("#magazine").css({top:$("#magazine").position().top-120});
			}

		}
		else if (e.keyCode==40)
		{
			if(on==true)
			{
				$("#magazine").css({top:$("#magazine").position().top+120});
			}
		}
		else if (e.keyCode==37)
		{
			if(on==true)
			{
				$("#magazine").css({left:$("#magazine").position().left-120});
			}
		}
		else if (e.keyCode==39)
		{
			if(on==true)
			{
				$("#magazine").css({left:$("#magazine").position().left+120});
			}
		}
	});
	function turned_page(e,new_page,view)
	{
		if((new_page+3>=$('#magazine').turn('pages'))&&(new_page+2<msize))
		{
			var page_div=document.createElement("div");
			page_div.setAttribute("style","background-image:url(magazine/"+mid+"/"+(new_page+1)+".jpg)");
			$('#magazine').turn('addPage',page_div,new_page+2);
			page_div=document.createElement("div");
			page_div.setAttribute("style","background-image:url(magazine/"+mid+"/"+(new_page+2)+".jpg)");
			$('#magazine').turn('addPage',page_div,new_page+3);
		}
	}
	function progress_active(page)
	{
		if((page!=1)&&(page!=msize))
		{
			document.getElementById("progress_box").style.opacity=1;
		}
		else
		{
			document.getElementById("progress_box").style.opacity=0;
		}
		document.getElementById("progress_bar").style.width=(page/msize*document.getElementById("progress_box").offsetWidth)+"px";
	}
function magnify(ratio)
{
	var width=document.getElementById("magazine").offsetWidth;
	var height=document.getElementById("magazine").offsetHeight;
	var dw=(document.getElementById("magazine").offsetWidth*(ratio-1))/2;
	var dh=(document.getElementById("magazine").offsetHeight*(ratio-1))/2;
	$('#magazine').css({width:width*ratio,left:$('#magazine').position().left-dw,top:$('#magazine').position().top-dh});
}
function shrink(ratio)
{
	var width=document.getElementById("magazine").offsetWidth;
	var height=document.getElementById("magazine").offsetHeight;
	var dw=(document.getElementById("magazine").offsetWidth*(1-ratio))/2;
	var dh=(document.getElementById("magazine").offsetHeight*(1-ratio))/2;
	$('#PageViewer').css({width:width*ratio,left:$('#magazine').position().left+dw,top:$('#magazine').position().top+dh});
}
function newVisitor()
{
	if(!window.localStorage.getItem("visited_mid_"+mid))
		{
			$.get("core/visit.php",{mid:mid},function (){});
			window.localStorage.setItem("visited_mid_"+mid,Math.random()*10000+new Date().now()+Math.random()*10000);	
		}
		$.get("core/visit.php",{mid:mid, client:window.localStorage.getItem("visited_mid_"+mid)},function (){});
}
function getPage(obj,mid,p)
{
	$("#magazine").css({width:0,top:document.documentElement.clientHeight,marginLeft:0,opacity:0});
	$.post("core/getPage.php","mid="+$("#magazine").data("mid")+"&position="+p,function (data,status){
	var img=new Image();
	img.src="../magazine/"+$("#magazine").data("mid")+"/"+data;
	img.onload=function ()
	{
		position=p;
		on=true;
		
		$("#blackBackground").css({display:"block"}).css({top:0,height:document.documentElement.clientHeight,backgroundColor:"rgba(0,0,0,0.6)"});
		$("#ShowPageContainer").css({display:"block"}).css({opacity:1,top:0,height:document.documentElement.clientHeight,width:document.documentElement.clientWidth,marginLeft:-((document.documentElement.clientWidth)/2)});
		$("#magazine").html("src",$("#magazine").html+"<div style='background-image:url(magazine/"+img.src+")'></div>").css({marginLeft:-500,top:50,width:1000});
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
				shrink(0.5);
				isMagnified=false;
			}
			else
			{
				magnify(2);
				isMagnified=true;
			}
		});
	}
	});
}
function showSpinner()
{
	$(".spinner").css({display:"block",opacity:1})
}
