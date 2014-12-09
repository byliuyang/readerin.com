// JavaScript Document
$(window).ready(function(e) {
	$("#school_rank").css("bottom",-($("#school_rank").height()-$("#sr_title").height()-16));
	$("#school_rank").bind("mouseout",function (){
		$("#school_rank").css("bottom",-($("#school_rank").height()-$("#sr_title").height()-16));
		});
	$("#school_rank").bind("mouseover",function (){
		$("#school_rank").css("bottom",0);
		});
	$("#book_shelf").height(document.documentElement.clientHeight-110);
	initializePageList();
	$(window).on("keydown", function(e){
		if (e.keyCode==13)
		{
			showSearchBox();
		}
		else if(e.keyCode==18)
		{
			hideSearchBox();
		}
	});
	$("html").focus();
	getDefaultMagazineList();
});
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
		$("#loginBG").css({display:"none"});
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
						document.body.appendChild(div1);
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
	document.body.appendChild(div);
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
			document.body.appendChild(div);
			$("#adminEntry").remove();
		});
}
function gotoAdmin()
{
	window.location='admin';
}