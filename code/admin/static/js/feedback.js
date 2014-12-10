// JavaScript Document
var page=0;
var process=0;
var flag=false;
var notification;
$(window).ready(function(e) {
	loadFeedbackList(0);
	$("#mainContentCenter").css("minHeight",$("#option").height());
	$("#notification").css("top",-($("#notification").height()+30));
	notification=false;
	document.getElementById("notification").addEventListener("webkitTransitionEnd",function ()
	{
		if(notification)
		{
			setTimeout(function() {
			$("#notification").css("top",-($("#notification").height()+30));
			notification=false;
			}, 1500);
			
		}
	});
});
function loadFeedbackList()
{
	if(flag==false)
	{
		flag=true;
	$.get("core/loadFeedbackList.php?publisher="+publisher+"&processed="+process+"&page="+page,function (data,status){

		switch (data)
		{
			case "<ul id='MessageList'>1</ul>":
				noitifaction("反馈全都处理完了");
				break;
			case "<ul id='MessageList'>2</ul>":
				noitifaction("您还没有收到反馈呢");
				break;
			default:
				$("#controls").css("display","block");
				$("#coreArea").html(data);
				 setCurrentMsgBox();
				break;
		}
		flag=false;
		
		
		});
	}
}
function switchOption(obj)
{
	$("#option>li").removeClass("activedOptionItem");
	$(obj).addClass("activedOptionItem");
}
function getNotProcessedList(obj)
{
	page=0;
	process=0;
	switchOption(obj);
	loadFeedbackList();
	
}

function getProcessedList(obj)
{
	page=0;
	process=1;
	switchOption(obj);
	loadFeedbackList();
}
function loadFeedback(feedback)
{
	$("#controls").css("display","none");
	$("#currentMsgBox").html("");
	$.get("core/loadFeedback.php?feedback="+feedback,function (data,status){
		 $("#coreArea").html(data);
		});
}
function setCurrentMsgBox()
{
	$.get("core/getTotalFeedback.php?publisher="+publisher+"&processed="+process+"&page"+page,function (data,status){
		if(data!=0)
		{
			 if(data<=3)
			{
				$("#NextPageBtn").css("opacity",0);
				$("#LastPageBtn").css("opacity",0);
				$("#NextPageBtn").unbind("click");
				$("#LastPageBtn").unbind("click");
				$("#NextPageBtn").css("borderLeft","1px solid rgb(240,240,240)");
				$("#currentMsgBox").html("0-"+data+"/"+data);
			}
			else
			{
				if(3+page*3<data)
				{
					if(page==0)
					{
						$("#LastPageBtn").css({opacity:0,cursor:"default"});
						$("#LastPageBtn").unbind("click");
						$("#NextPageBtn").bind("click",function (){
						gotoNextPage();
						});
						$("#NextPageBtn").css({opacity:1,cursor:"pointer"});
						$("#NextPageBtn").css("borderLeft","1px solid rgb(240,240,240)");
					}
					else
					{
						$("#controls>li").css({opacity:1,cursor:"pointer"});
						$("#LastPageBtn").bind("click",function (){
						gotoLastPage();
						});
						$("#NextPageBtn").bind("click",function (){
						gotoNextPage();
						});
						$("#NextPageBtn").css("borderLeft",null);
					}
					$("#currentMsgBox").html((page*3)+"-"+(3+page*3)+"/"+data);
				}
				else
				{
					$("#LastPageBtn").css("opacity",1);
					$("#LastPageBtn").bind("click",function (){
										gotoLastPage();
										});
					$("#NextPageBtn").css({opacity:0,cursor:"default"});
					$("#NextPageBtn").unbind("click");
					$("#currentMsgBox").html((page*3)+"-"+data+"/"+data);
				}
			}
		}
		else
		{
			$("#controls>li").css("opacity",0);
			$("#currentMsgBox").html("");
		}
	});
	
}

function gotoNextPage()
{
	if(flag==false)
	{
		page++;
		loadFeedbackList();
	}
}
function gotoLastPage()
{
	if(flag==false)
	{
		page--;
		loadFeedbackList();
	}
}
function checkFeedback(feedbackID,status)
{
	$.get("core/checkFeedback.php?id="+feedbackID+"&status="+(!status),function (data,status){
	});
}
function itemCheckFeedback(feedbackID,status,obj)
{
	obj.parentNode.parentNode.removeChild(obj.parentNode);
	checkFeedback(feedbackID,status);
	$.get("core/checkFeedback.php?id="+feedbackID+"&status="+(!status),function (data,status){
		loadFeedbackList();
	});
}
function noitifaction(msg)
{
	notification=true;
	$("#notification").html(msg).css("top",0);
}