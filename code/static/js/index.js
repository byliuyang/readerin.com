// JavaScript Document
var isBG1load=false;
var isBG2load=false;
var speechIndex=0;
$(window).resize(function() {
	sizeElements();
});
$(window).ready(function(e) {
	booting();
});
function booting()
{
	sizeElements();
	var BGLoader1=new Image();
	BGLoader1.src="../../data/system/wallpaper/4.jpg";
	BGLoader1.onload=function ()
	{
		$("html").css("background-image","url("+BGLoader1.src+")");
		isBG1load=true;
		if(isBG2load==true)
		{
			removeLoadingSpinner();
			
		}
	};
	var BGLoader2=new Image();
	BGLoader2.src="../../data/system/wallpaper/2.jpg";
	BGLoader2.onload=function ()
	{
		$("#mainContent").css("background-image","url("+BGLoader2.src+")");
		isBG2load=true;
		if(isBG1load==true)
		{
			removeLoadingSpinner();
			
		}
	};
	
	$("#school_rank").bind("mouseout",function (){
		$("#school_rank").css("bottom",-($("#school_rank").height()-$("#sr_title").height()-16));
		});
	$("#school_rank").bind("mouseover",function (){
		$("#school_rank").css("bottom",0);
		});
	initializePageList();
	$(window).on("keydown", function(e){
		if (e.keyCode==91)
		{
			showSearchBox();
		}
		else if(e.keyCode==18)
		{
			hideSearchBox();
		}
		else if(e.keyCode==17)
		{
			
			if($("#adminEntry").length)
			{
				$("#adminEntry").click();
			}
		}
		else if(e.keyCode==221)
		{
			var recognition = new webkitSpeechRecognition();
			recognition.continuous = true;
			recognition.interimResults = true;
			recognition.lang = "zh-CN";
			recognition.onstart=function ()
			{
				speechIndex=0;
			}
			recognition.onresult = function(event) { 
				if(event.results[speechIndex])
				{
					  switch($.trim(event.results[speechIndex][0].transcript))
					  {
						  case "search":
						  	showSearchBox();
							break;
						  case "搜索":
						  	showSearchBox();
							break;
						  case "ok":
						  	hideSearchBox();
						  	break;
						  case "好的":
						  	hideSearchBox();
						  	break;
						  case "login":
						  	OpenLogin();
						  	break;
						  case "登录":
						  	OpenLogin();
						  	break;
						  case "logout":
						  	logout()
						  	break;
						  case "登出":
						  	logout();
						  	break;
						  case "code":
						  	getCode();
						  	break;
						  case "源码":
						  	getCode();
						  	break;
						  case "done":
						  	recognition.stop();
						  	break;
						  case "结束":
						  	recognition.stop();
						  	break;
					  }
					  speechIndex++;
				}
			}
			recognition.start();
		}
		else if(e.keyCode==9)
		{
			e.preventDefault();
			openBookShelf();
		}
	});
	$("html").focus();
	getDefaultMagazineList();
	$("#loginBoxUsernameEditText").on("keydown", function(e){
		if(e.keyCode==40 || e.keyCode==13)
		{
			$("#loginBoxPasswordEditText").focus();
		}
	});
	$("#loginBoxPasswordEditText").on("keydown", function(e){
		if (e.keyCode==13)
		{
			e.preventDefault();
			$("#loginBoxLoginButton").click();
		}
		else if(e.keyCode==38)
		{
			$("#loginBoxUsernameEditText").focus();
		}
	});
	
}
function sizeElements()
{
	$("#LoadingScreen").css({width:document.documentElement.clientWidth,height:document.documentElement.clientHeight});
	$("#mainContent").css({width:document.documentElement.clientWidth,height:document.documentElement.clientHeight});
	$("#UserBookShelf").css({width:document.documentElement.clientWidth,height:document.documentElement.clientHeight});
	$("#school_rank").css("bottom",-($("#school_rank").height()-$("#sr_title").height()-16));
	$("#book_shelf").height(document.documentElement.clientHeight-110);
	$("#SubscriptionShelf").css({height:document.documentElement.clientHeight});
	$("#CherishShelf").css({width:document.documentElement.clientWidth-$("#SubscriptionShelf").width(),height:document.documentElement.clientHeight});
}
function removeLoadingSpinner()
{
	$("#LoadingScreen").animate({opacity:0},1000,"easeOutQuad",function (){
				$("#LoadingScreen").remove();
				});
}
function getCode()
{
	window.open($("#sourceCodeLink").attr("href"),'_blank');
}
var searchOpen=false;
function showSearchBox()
{
	if(searchOpen==false)
	{
		searchOpen=true;
		$("#searchBox").css("top","-15px");
		$("#searchInput").focus();
	}
}
function hideSearchBox()
{
	if(searchOpen==true)
	{
		searchOpen=false;
		$("#searchBox").css("top","-74px");
		$("#searchInput").blur();
		$("html").focus();
	}
}
function OpenLogin()
{
	$("#loginBG").css({width:document.documentElement.clientWidth,height:document.documentElement.clientHeight,display:"block"}).animate({opacity:1},600,'easeInBack',function (){});
	$(".box").css({display:"block",opacity:0}).animate({opacity:1},600,'easeInBack',function (){});
}
function closeLogin()
{
	$("#loginBG").animate({opacity:0},600,'easeInBack',function (){
		$("#loginBG").css({display:"none"});
		});
	$(".box").animate({opacity:0},600,'easeInBack',function (){
		$(".box").css({display:"none"});
		});
}
function getDefaultMagazineList()
{
	$.post("core/getMagazineList.php",null,function (data,status)
	{
		$("#book_shelf").html(data);
	});
}
function searchMagazine(obj)
{
	if($(obj).val()!="")
	{
		$.post("core/getMagazineList.php","search="+encodeURIComponent($(obj).val()),function (data,status)
		{
			$("#book_shelf").html(data);
		});
	}
	else
	{
		getDefaultMagazineList();
	}
}
function createQRCode(mid)
{
	$("#ShareBoxTitleQRCode").html("");
	$("#ShareBox").css({display:"block",top:document.documentElement.clientHeight/2});
	$("#ShareBoxTitleQRCode").qrcode({ 
    render: "table",
    width: 200, 
    height:200, 
    text: "https://www.readerin.com/m/?mid="+mid, 
	}); 
}
function destoryQRCode()
{
	$("#ShareBox").css({display:"none"});
}
function tryLogin()
{
	var email=$("#loginBoxUsernameEditText").val();
	var passwd=$("#loginBoxPasswordEditText").val();
	if(validateEmail(email))
	{
		if(passwd!="")
		{
			$(".box").animate({opacity:0},600,'easeInBack',function (){
			$(".box").css({display:"block"});
			showSpinner();
			$.post("core/tryLogin.php","email="+encodeURIComponent(email)+"&password="+encodeURIComponent(passwd),function (data,status){
				switch(data)
				{
					case "1":
						loginSucceed();
						break;
					case "2":
						loginSucceed();
						var div1=document.createElement("div");
						$(div1).attr("id","adminEntry");
						$(div1).html("管理");
						$(div1).on("click",gotoAdmin);
						$(div1).css("display","block");
						document.getElementById("mainContent").appendChild(div1);
						break;
					case "0":
						alert("您的邮箱和密码好像不匹配哦～");
						hideSpinner();
						$(".box").css({display:"block"}).animate({opacity:1},600,'easeInBack',function (){
							$("#loginBoxPasswordEditText").val("");
							$("#loginBoxPasswordEditText").focus();
						});
						break;
				}
				});
			});
		}
		else
		{
			alert("没有密码怎么登录呀～");
			$("#loginBoxPasswordEditText").val("");
			$("#loginBoxPasswordEditText").focus();
		}
	}
	else
	{
		alert("您输入和好像不是邮箱哦～");
		$("#loginBoxUsernameEditText").val("");
		$("#loginBoxUsernameEditText").focus();
	}
}
function loginSucceed()
{
	$("#login").remove();
	var div=document.createElement("div");
	$(div).attr("id","login");
	$(div).html("登出");
	$(div).on("click",logout);
	$(div).css("display","block");
	document.getElementById("mainContent").appendChild(div);
	hideSpinner();
	closeLogin();
}
function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 
function logout()
{
	$.post("core/logout.php",null,function (){
			$("#login").remove();
			var div=document.createElement("div");
			$(div).attr("id","login");
			$(div).html("登录");
			$(div).on("click",OpenLogin);
			$(div).css("display","block");
			document.getElementById("mainContent").appendChild(div);
			$("#adminEntry").remove();
			$("#loginBoxUsernameEditText").val("");
			$("#loginBoxPasswordEditText").val("");
		});
}
function gotoAdmin()
{
	window.location='admin';
}
var BookShelf=false;
function openBookShelf()
{
	if(!BookShelf)
	{
		BookShelf=true;
		$("#mainContent,#searchBox,#copyright,#school_rank").animate({left:document.documentElement.clientWidth-100},1000,"easeOutQuart");
		$("#adminEntry,#login").css({opacity:0});
	}
	else
	{
		BookShelf=false;
		$("#mainContent,#searchBox,#copyright,#school_rank").animate({left:0},1000,"easeOutQuart");
		$("#adminEntry,#login").css({opacity:1});
	}
}