// JavaScript Document
$(window).ready(function(e) {
	$("#ShareBox").css("top",document.documentElement.clientHeight/2);
    $("#ShareBoxTitleQRCode").qrcode({ 
    render: "div",
    width: 200, 
    height:200, 
    text: "https://www.readerin.com" 
	});
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
});
function showSearchBox()
{
	$("#searchBox").css("top","-15px");
	$("#searchInput").focus();
}
function hideSearchBox()
{
	$("#searchBox").css("top","-74px");
	$("#book_shelf").focus();
}
function OpenLogin()
{
	window.location="login.php";
}