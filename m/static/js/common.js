// JavaScript Document
var explorer=window.navigator.userAgent;
if(explorer.indexOf("Mobile")==-1 && explorer.indexOf("MicroMessenger")==-1)
	{
		window.location.href="../";
	}
var ClientHeight=document.documentElement.clientHeight;
var ClientWidth=document.documentElement.clientWidth;
var MenuView;
var MainView;
var onWhichPage=0;
var MSize=0;
var MID=0;
var heightP=0;
var widthP=0;
var topP=0;
var leftP=0;
var PageTop=0;
var PageLeft=0;
var PageWidth=0;
var PageHeight=0;
var PageX=0;
var PageY=0;
var diffX=0;
var diffY=0;
window.onload=function ()
{
	MainView=$("#MainView");
	MenuView=$("#MenuView");
	MainView.css("height",ClientHeight);
	MainView.css("width",ClientWidth);
	MenuView.css("top",$(".TitleBar").outerHeight());
	MenuView.css("height",document.documentElement.clientHeight-$(".TitleBar").outerHeight());
	$("#blackbackground").css("width",ClientWidth).css("height",document.documentElement.clientHeight-$(".TitleBar").outerHeight()).css("left",-ClientWidth).css("top",$(".TitleBar").outerHeight());
	$("#blackbackground2").css("width",ClientWidth).css("height",document.documentElement.clientHeight).css("left",-ClientWidth);
	$("#MagazineList").css("marginTop",$(".TitleBar").outerHeight());
	MenuView.on("swipeleft",function(){
		hideMenu();
		});
	MainView.on("swiperight",function(){
		showMenu();
		});
	$("#pageBoxNext").css("left",ClientWidth);
	initialize();
	if($("#MagazineID_"+MagazineID).length>0)
	{
		MainView.animate({scrollTop:$("#MagazineID_"+MagazineID).offset().top},500,"swing",function (){
			OpenMagazine(document.getElementById("MagazineID_"+MagazineID),MagazineID,msize);
			});
	}
}
function initialize()
{
	document.getElementById("pageBox").addEventListener("touchstart",function (event) {
		if(event.targetTouches.length==2)
		{
		  	var touch = event.targetTouches[0];
		  	PageX = touch.pageX;
		  	PageY = touch.pageY;
		}
          event.preventDefault();
	});
	document.getElementById("pageBox").addEventListener("touchend",function (event) {
		if(event.targetTouches.length==2)
		{
			$("#pageBox").css({left:diffX,top:diffY});
		}
          event.preventDefault();
	});
	document.getElementById("pageBox").addEventListener("touchmove",function (event){
		if(event.targetTouches.length==2)
		{
			var touch = event.targetTouches[0];
      		var offset = $("#pageBox").offset();
      		diffX = touch.pageX - PageX + offset.left;
      		diffY = touch.pageY - PageY + offset.top;
			event.stopPropagation();
			event.preventDefault();
		}
	  });
	$("#pageBox").on("swiperight",function(){
		LastPage();
		});

	$("#pageBox").on("swipeleft",function(){
		NextPage();
		});
	$("#pageBox").on("taphold",function (){
		CloseMagazine();
		});
}
function FlipMenu()
{
	if($("#MenuView").offset().left<0)
	{
		showMenu();
	}
	else
	{
		hideMenu();
	}
}
function showMenu()
{
		MainView.css("overflow","hidden");
		$(".MenuButton").animate({left:"-6px"},150,"swing");
		MenuView.animate({left:"0%"},400,"swing");
		$("#blackbackground").css("left","0px");
}
function hideMenu()
{
		$(".MenuButton").animate({left:"0px"},150,"swing");
		MenuView.animate({left:"-90%"},400,"swing");
		$("#blackbackground").css("left",-ClientWidth);
		MainView.css("overflow","auto");
}
function OpenMagazine(obj,id,size)
{
	onWhichPage=0;
	MSize=size;
	MID=id;
	flag=true;
	var object=$(obj);
	heightP=object.height();
	widthP=object.width();
	topP=object.offset().top;
	leftP=object.offset().left;
	if((((ClientWidth*0.92)/widthP)*heightP)<ClientHeight)
	{
		PageWidth=ClientWidth*0.92;
		PageHeight=(((ClientWidth*0.92)/widthP)*heightP);
		PageTop=((ClientHeight-PageHeight)/2);
		PageLeft=ClientWidth*0.04;	
	}
	else
	{
		
		PageWidth=(((ClientHeight*0.92)/heightP)*widthP);
		PageHeight=ClientHeight*0.92;
		PageTop=ClientHeight*0.04;
		PageLeft=((ClientWidth-PageWidth)/2);
	}
	//Setup Spinner
	$(".spinner").css("top",topP+((heightP-30)/2)).css("left",leftP+((widthP-50)/2)).css("opacity",1).css("display","block");
	object.animate({opacity:0.7},200,"swing");
	// Load Images
	var tmpImage1 = new Image();
	tmpImage1.src="https://www.readerin.com/magazine/"+id+"/"+onWhichPage+".jpg";
	var tmpImage2 = new Image();
	tmpImage2.src="https://www.readerin.com/magazine/"+MID+"/"+(onWhichPage+1)+".jpg";
	tmpImage1.onload=function()
	{
		document.getElementById("pageBox").src=tmpImage1.src;
		$("#blackbackground2").css("left","0px");
		$("#blackbackground2").animate({opacity:1},300,"swing");		
		$("#pageBox").css("height", heightP).css("width",widthP).css("top",topP).css("left",leftP);
		$("#pageBoxNext").css("height", PageHeight).css("width",PageWidth).css("top",PageTop).css("left",ClientWidth);
		$("#pageBoxLast").css("height", PageHeight).css("width",PageWidth).css("top",PageTop).css("left",-ClientWidth);
		$("#pageBox").animate({top:PageTop,left:PageLeft,width:PageWidth,height:PageHeight},300,"swing");
		flag1=true;
		flag2=true;
		$(".spinner").css("opacity",0).css("display","block");
		object.animate({opacity:1},200,"swing");
	};
	
	tmpImage2.onload=function()
	{
		document.getElementById("pageBoxNext").src=tmpImage2.src;
		$(".spinner").css("opacity",0).css("display","none");
		$("#pageBox").css("opacity",1);
	};
}
function CloseMagazine()
{	$("#pageBoxLast").css("height",0).css("width",0).css("top",0).css("left",0);
	document.getElementById("pageBoxLast").src=null;
	$("#pageBoxNext").css("height",0).css("width",0).css("top",0).css("left",0);
	document.getElementById("pageBoxNext").src=null;
	$("#pageBox").animate({top:topP,left:leftP,width:widthP,height:heightP},200,"swing",function (){
		$("#pageBox").css("height",0).css("width",0).css("top",0).css("left",0);
		document.getElementById("pageBox").src=null;
		});
	$("#blackbackground2").animate({opacity:0},150,"swing",function (){
		$("#blackbackground2").css("left",-ClientWidth);
		});
}

var flag2;
function LastPage()
{
	if(flag2==true)
	{
		console.log("L1:"+onWhichPage);
		PageBox=$("#pageBox");
		NextBox=$("#pageBoxNext");
		LastBox=$("#pageBoxLast");
		flag2=false;
		if(onWhichPage>1)
		{
			$(".spinner").css("top",PageTop+((PageHeight-30)/2)).css("left",PageLeft+((PageWidth-50)/2)).css("display","block").css("opacity",1);
			$("#pageBox").css("opacity",0.7);
			PageBox.animate({left:ClientWidth},300,"swing",function (){
				PageBox.attr("id","pageBoxNext");
				});
			LastBox.animate({left:PageLeft},300,"swing",function (){
				LastBox.attr("id","pageBox");
				NextBox.css("left",-ClientWidth);
				NextBox.attr("id","pageBoxLast");
				NextBox.css("height", PageHeight).css("width",PageWidth).css("top",PageTop);
				initialize();
				NextBox.attr("src",null);
				onWhichPage--;
				console.log("L2:"+onWhichPage);
				var tmpImageNext = new Image();
				tmpImageNext.src="https://www.readerin.com/magazine/"+MID+"/"+(onWhichPage-1)+".jpg";
				tmpImageNext.onload=function()
				{
					NextBox.attr("src",tmpImageNext.src);
					$(".spinner").css("opacity",0).css("display","none");
					PageBox.css("opacity",1);
					flag2=true;
				}
				});
				
		}
		else if(onWhichPage==1)
		{
				PageBox.animate({left:ClientWidth},300,"swing");
				LastBox.animate({left:PageLeft},300,"swing",function (){
					PageBox.attr("id","pageBoxNext");
					LastBox.attr("id","pageBox");
				    NextBox.attr("id","pageBoxLast");
					onWhichPage--;
					flag2=true;
					console.log("L3:"+onWhichPage);
					});
		}
		else
		{
			CloseMagazine();
			console.log("L4:"+onWhichPage);
		}
		
	}
}
var PageBo;
var NextBox;
var LastBox;
var flag1;
function NextPage()
{
	if(flag1==true)
	{
		console.log("N1:"+onWhichPage);
		PageBox=$("#pageBox");
		NextBox=$("#pageBoxNext");
		LastBox=$("#pageBoxLast");
		flag1=false;
		if(onWhichPage+1<MSize-1)
		{
			$(".spinner").css("top",PageTop+((PageHeight-30)/2)).css("left",PageLeft+((PageWidth-50)/2)).css("display","block").css("opacity",1);
			$("#pageBox").css("opacity",0.7);
			PageBox.animate({left:-ClientWidth},300,"swing",function (){
				PageBox.attr("id","pageBoxLast");
				});
			NextBox.animate({left:PageLeft},300,"swing",function (){
				NextBox.attr("id","pageBox");
				LastBox.css("left",ClientWidth);
				LastBox.attr("id","pageBoxNext");
				LastBox.css("height", PageHeight).css("width",PageWidth).css("top",PageTop);
				initialize();
				LastBox.attr("src",null);
				onWhichPage++;
				console.log("N2:"+onWhichPage);
				var tmpImageNext = new Image();
				tmpImageNext.src="https://www.readerin.com/magazine/"+MID+"/"+(onWhichPage+1)+".jpg";
				tmpImageNext.onload=function()
				{
					LastBox.attr("src",tmpImageNext.src);
					$(".spinner").css("opacity",0).css("display","none");
					PageBox.css("opacity",1);
					flag1=true;
				}
				});
				
		}
		else if(onWhichPage+1==MSize-1)
		{
				PageBox.animate({left:-ClientWidth},300,"swing");
				NextBox.animate({left:PageLeft},300,"swing",function (){
					PageBox.attr("id","pageBoxLast");
					NextBox.attr("id","pageBox");
				    LastBox.attr("id","pageBoxNext");
					onWhichPage++;
					flag1=true;
					console.log("N3:"+onWhichPage);
					});
				
		}
		else
		{
			CloseMagazine();
			console.log("N4:"+onWhichPage);
		}
		
	}
}