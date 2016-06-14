// JavaScript Document
$(window).ready(function(e) {
        $("#readingLableList").css({left:$("#PageViewer").position().left+$("#PageViewer").width()-20,top:$("#PageViewer").position().top+20});
		$("#reviewBox").height(document.documentElement.clientHeight);
		$("#replyBoxLayer").css({top:document.documentElement.clientHeight-$("#replyBox").height(),height:document.documentElement.clientHeight});
		$("#reviewBox>ul").height(document.documentElement.clientHeight-$("#replyBox").height()-$("#reviewBoxTitle").height()-20);
		initializeLabel();
		$(".reviewOptionReplyBtn").on("click",function (){
			if(!$(this).hasClass("reviewOptionReplyBtnActive"))
			{
				$(".reviewOptionReplyBtn").removeClass("reviewOptionReplyBtnActive");
				$(this).addClass("reviewOptionReplyBtnActive");
				$("#replyBoxLayer").css({top:$(this).parent().parent().parent().offset().top+$(this).parent().parent().parent().height()+20});
			}
			else
			{
				$(this).removeClass("reviewOptionReplyBtnActive");
				$("#replyBoxLayer").css({top:document.documentElement.clientHeight-$("#replyBox").height()});
			}
			});
			$("#readingLableList>li").each(function(index,element) {
				setTimeout(function (){
					$(element).css("marginLeft",-180).delay(600);
					},index*300);
			});
			$("#shareBox>li").on("mouseenter",function (){
				$("#shareBoxArrow").css({left:$(this).position().left+30});
			});
			$("#shareBox>li").on("mouseleave",function (){
				$("#shareBoxArrow").css({left:$("#shareWechat").position().left+30});
			});
			$("#shareBox").css({bottom:-$("#shareBox").height()-20});
			$("#shareBoxArrow").css({borderTop:"0px solid rgba(203,27,69,1)"});
			$("#shareBox>li").mouseleave();
			$("#shareBtn").on("click",function (){
				if($("#shareBtn").hasClass("active"))
				{
					$("#shareBtn").removeClass("active");
					$("#shareBoxArrow").css({borderTop:"0px solid rgba(203,27,69,1)"});
					window.setTimeout(function (){
						$("#shareBox").css({bottom:-$("#shareBox").height()-20});
						},600);
				}
				else
				{
					$("#shareBtn").addClass("active");
					$("#shareBox").css({bottom:0});
					window.setTimeout(function (){
						$("#shareBoxArrow").css({borderTop:"10px solid rgba(203,27,69,1)"});
						},600);
				}
				});
				$("#qrcodeBox").qrcode({ 
								// render method: 'canvas', 'image' or 'div'
					render: 'canvas',
				
					// version range somewhere in 1 .. 40
					minVersion: 1,
					maxVersion: 40,
				
					// error correction level: 'L', 'M', 'Q' or 'H'
					ecLevel: 'H',
				
					// offset in pixel if drawn onto existing canvas
					left: 0,
					top: 0,
				
					// size in pixel
					size: 240,
				
					// code color or image element
					fill: '#000',
				
					// background color or image element, null for transparent background
					background: null,
				
					// content
					text: 'http://www.baidu.com',
				
					// corner radius relative to module width: 0.0 .. 0.5
					radius: 0.5,
				
					// quiet zone in modules
					quiet: 0,
				
					// modes
					// 0: normal
					// 1: label strip
					// 2: label box
					// 3: image strip
					// 4: image box
					mode: 0,
				
					mSize: 0.1,
					mPosX: 0.5,
					mPosY: 0.5,
					fontname: 'sans',
					fontcolor: '#000',
				});
				/*
				var msg = new SpeechSynthesisUtterance('What can I do for you?');
   			 	window.speechSynthesis.speak(msg);
				*/
    });
		function commentOnMagazine(obj)
		{
			if(!$(obj).hasClass("Active"))
			{
				$(obj).addClass("Active");
				$("#reviewBox").css("left",0);
				$("#replyBoxLayer").css("left",0);
			}
			else
			{
				$(obj).removeClass("Active");
				$("#reviewBox").css("left",-350);
				$("#replyBoxLayer").css("left",-350);
			}
		}
		function showNotification(msg)
		{
			$("#NotificationBox").html(msg);
			$("#NotificationBox").css({visibility:"visible",marginLeft:-$("#NotificationBox").width()/2-20,marginTop:-$("#NotificationBox").height()/2-20})
			$("#NotificationBox").animate({opacity:1},600,"easeOutExpo",function (){
				window.setTimeout(function (){
					$("#NotificationBox").animate({opacity:0},600,"easeOutExpo",function (){
						$("#NotificationBox").css({visibility:"hidden"});
						});
					},3500);
				});
			
		}
		function cherishMagazine()
		{
			showNotification("刊物已收藏");
		}
		function createNewLabel()
		{
			console.log("a");
			var li=document.createElement("li");
			$(li).attr({contenteditable:true});
			$(li).addClass("brownLabel");
			$(li).css({marginLeft:0,opacity:1});
			document.getElementById("readingLableList").appendChild(li);
			initializeLabel();
			$(li).focus();
		}
		function initializeLabel()
		{
			$("#readingLableList>li").on("mouseleave",function (){
			$(this).css({marginLeft:-180,opacity:0.4});
			if($(this).html()=="")
			{
				this.addEventListener("webkitTransitionEnd",function (){
					$(this).remove();
					});
				$(this).css("marginLeft",-210);
			}
			else
			{
				$(this).blur();
			}
			});
			
		$("#readingLableList>li").on("mouseenter",function (){
			$(this).css({marginLeft:0,opacity:1});
			$(this).focus();
			});
		}
		function showWeChatBox()
		{
		}