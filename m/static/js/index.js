// JavaScript Document
/*
window.onload=initializeMainPage;
function initializeMainPage()
{
	$("#TabBar").css("left","0px");
	$("#TabBar").css("width","100%");
	
}
function GetMagazineFromServer(mid,msize)
{
	HideBar("#TabBar",1);
	$.post("read.php","mid="+mid+"&msize="+msize,function (data,status){
		$("#ReadView").html(data);
		switchViews("MainView","ReadView","88px");
		initializeReadPage();
		});
}
function GetRanks()
{
	$("#MainViewButton").attr("src","static/img/icon/icon_kwlb_grey.png");
	$("#RankViewButton").attr("src","static/img/icon/icon_llph_blue.png");
	$.post("rank.php",null,function (data,status){
		$("#RankView").html(data);
		switchViews("MainView","RankView","88px");
		});
}
function GetMagazineList()
{
	$("#MainViewButton").attr("src","static/img/icon/icon_kwlb_blue.png");
	$("#RankViewButton").attr("src","static/img/icon/icon_llph_grey.png");
	$.post("main.php",null,function (data,status){
		$("#MainView").html(data);
		BackswitchViews("RankView","MainView","88px");
		});
}
*/