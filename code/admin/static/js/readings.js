// JavaScript Document
var position=0;
var on=0;
var hidding1=false;
var hidding2=false;
var isMagnified=false;
var SeriesName;
var notification;
var fileListLength;
var currentFile;
var fileList;
$(window).ready(function(e) {
	$(document).on({ 
        dragleave:function(e){    //拖离 
            e.preventDefault(); 
        }, 
        drop:function(e){  //拖后放 
            e.preventDefault(); 
        }, 
        dragenter:function(e){    //拖进 
            e.preventDefault(); 
        }, 
        dragover:function(e){    //拖来拖去 
            e.preventDefault(); 
        } 
    }); 
	$("#mainContentCenter").css("minHeight",$("#option").height());
   
	//Drag Upload Magazine
	
	$("#activedOptionItem").click();
	$("#notification").css("top",-($("#notification").height()+30));
	$("#UploadProgress").css("top",-($("#UploadProgress").height()+30));
	notification=false;
	document.getElementById("notification").addEventListener("webkitTransitionEnd",function ()
	{
		if(notification)
		{
			setTimeout(function() {
			$("#notification").css("top",-($("#notification").height()+30));
			notification=false;
			}, 3000);
			
		}
	});
	if(mid!=null)
	{
		OpenIssue(mid);
	}
});
function noitifaction(msg)
{
	notification=true;
	$("#notification").html(msg).css("top",0);
}
function initializeMagazineList()
{
	$(".magazineCover").on("taphold", function(event){
			noitifaction("开始编辑刊物");
			$(this).parent().parent().parent().addClass("shaking").attr("title","点击这里停止编辑");
	});
	$(".magazineList").on("click",function (event)
	{
		event.stopPropagation();
		$(event.target).removeClass("shaking");
		$(event.target).attr("title",null);
	});
	$(".magazineList").on("dragleave",function () {
		$(this).removeClass("uploadFile");
		});
	$(".magazineList").on("dragover",function () {
		$(this).addClass("uploadFile");
		var obj=$(this).parent().children(".seriesTitle");
		noitifaction("给"+obj.data("title")+"传本新刊物");
		
		});
	$(".magazineList").on("drop",function (e) {
		e.preventDefault();
		$(this).removeClass("uploadFile");
		var series=$(this).data("series");
		fileList = e.originalEvent.dataTransfer.files;
		if(fileList.length>0)
		{
			var isPDF=true;
			for(var i=0;i<fileList.length;i++)
			{
				if(fileList[i].type.indexOf("pdf")==-1)
				{
					isPDF=false;
				}
			}
			
			if(!isPDF)
			{
				noitifaction("我们目前只支持上传PDF文档，感谢理解！");
			}
			else
			{
				fileListLength=fileList.length;
				currentFile=1;
				$("#progressTitle").html("正在上传"+fileListLength+"个文档中的第1个文档");
				$("#UploadProgress").css("top",0);
				uploadFile(fileList[0],series,"core/upload.php");
			}
		}
		});
}
function uploadFile(file,series,uploadURL)
{
	var formData = new FormData();
	formData.append('file', file);
	formData.append('publisher', publisher);
	formData.append('series', series);
	
    $.ajax({
            xhr: function() {
            var xhrobj = $.ajaxSettings.xhr();
            if (xhrobj.upload) {
                    xhrobj.upload.addEventListener('progress', function(event) {
                       var pc = event.loaded/event.total;
					   
					   var width=(1/fileListLength)*$("#progressBar").width();
						$("#progressValue").css("width",width*(currentFile-1)+(width*pc));
                    }, false);
					xhrobj.upload.addEventListener("loadend", function(e)
					{
						if(currentFile<fileListLength)
						{
							$("#progressTitle").html("正在上传"+fileListLength+"个文档中的第"+(currentFile+1)+"个文档");
							uploadFile(fileList[currentFile],series,uploadURL);
							currentFile++;
							
						}
						else
						{
							$("#progressTitle").html("正在处理数据");
						}
					}, false);
                }
            return xhrobj;
        },
    url: uploadURL,
    type: "POST",
    contentType:false,
    processData: false,
        cache: false,
        data: formData,
        success: function(data){
		$("#progressTitle").html("文档数据转换完成");
		setTimeout(function() {
			$("#UploadProgress").css("top",-($("#UploadProgress").height()+30));
			var uploadEndEvent=function (){
				$("#progressValue").css("width",0);
				document.getElementById("UploadProgress").removeEventListener("webkitTransitionEnd",uploadEndEvent);
			}
			document.getElementById("UploadProgress").addEventListener("webkitTransitionEnd",uploadEndEvent);
			notification=false; 
		},3000);
        }
    });
}
function uploadPageFile(file,mid,uploadURL)
{
	var formData = new FormData();
	formData.append('file', file);
	formData.append('mid', mid);
	
    $.ajax({
            xhr: function() {
            var xhrobj = $.ajaxSettings.xhr();
            if (xhrobj.upload) {
                    xhrobj.upload.addEventListener('progress', function(event) {
                       var pc = event.loaded/event.total;
					   
					   var width=(1/fileListLength)*$("#progressBar").width();
						$("#progressValue").css("width",width*(currentFile-1)+(width*pc));
                    }, false);
					xhrobj.upload.addEventListener("loadend", function(e)
					{
						if(currentFile<fileListLength)
						{
							$("#progressTitle").html("正在上传"+fileListLength+"个页面中的第"+(currentFile+1)+"个页面");
							uploadFile(fileList[currentFile],series,uploadURL);
							currentFile++;
							
						}
						else
						{
							$("#progressTitle").html("正在处理数据");
						}
					}, false);
                }
            return xhrobj;
        },
    url: uploadURL,
    type: "POST",
    contentType:false,
    processData: false,
        cache: false,
        data: formData,
        success: function(data){
		console.log(data);
		$("#progressTitle").html("页面数据转换完成");
		setTimeout(function() {
			$("#UploadProgress").css("top",-($("#UploadProgress").height()+30));
			var uploadEndEvent=function (){
				$("#progressValue").css("width",0);
				document.getElementById("UploadProgress").removeEventListener("webkitTransitionEnd",uploadEndEvent);
			}
			document.getElementById("UploadProgress").addEventListener("webkitTransitionEnd",uploadEndEvent);
			notification=false; 
		},3000);
        }
    });
}
function initializePageList()
{
	$("#PageList").on("click",function (event)
	{
		$(event.target).removeClass("shaking");
		$(event.target).attr("title",null);
		noitifaction("已保存新的页面顺序");
		$("#PageList>li").each(function(index, element) {
			$(element).children(".magazinePageNumber").html(index+1);
            $.get("core/changePageOrder.php","pid="+$(element).data("pageId")+"&position="+index);
        });
	});
	$(".magazinePage").on("taphold", function(event){
			noitifaction("正在编辑页面");
			$(".magazinePage").parent().parent().parent().addClass("shaking").attr("title","点击这里停止编辑");
	});
	$("#PageList").on("dragleave",function () {
		$(this).removeClass("uploadFile");
		});
	$("#PageList").on("dragover",function () {
		$(this).addClass("uploadFile");
		var obj=$("#MagazineAttributes");
		noitifaction("给"+obj.data("title")+"传张新页面");
		
		});
	$("#PageList").on("drop",function (e) {
		e.preventDefault();
		$(this).removeClass("uploadFile");
		var mid=$("#MagazineAttributes").data("mid");
		fileList = e.originalEvent.dataTransfer.files;
		if(fileList.length>0)
		{
			var isImage=true;
			for(var i=0;i<fileList.length;i++)
			{
				if(fileList[i].type.indexOf("image")==-1)
				{
					isImage=false;
				}
			}
			
			if(!isImage)
			{
				noitifaction("我们目前只支持上传图片，感谢理解！");
			}
			else
			{
				fileListLength=fileList.length;
				currentFile=1;
				$("#progressTitle").html("正在上传"+fileListLength+"张图片中的第1张图片");
				$("#UploadProgress").css("top",0);
				uploadPageFile(fileList[0],mid,"core/uploadPage.php");
			}
		}
		});
	//Make PageList sortable
	$("#PageList").sortable().bind('sortupdate');
	$("#ShowPageContainer").css({opacity:0,top:document.documentElement.clientHeight,marginLeft:0,width:0,height:document.documentElement.clientHeight});
	$("#blackBackground").css("top",document.documentElement.clientHeight);
	$("#blackBackground").height(document.documentElement.clientHeight);
	$("#PageViewer").css({width:0,opacity:0,top:document.documentElement.clientHeight,left:(document.documentElement.clientWidth/2)});
	$(window).on("keydown", function(e){
		if (e.keyCode==190)
		{
			if(on==true)
			{
				if(position>0)
				{
					showSpinner();
					$.post("core/getPage.php","mid="+$("#MagazineAttributes").data("mid")+"&position="+(position-1),function (data,status){
						var img=new Image();
						img.src="../magazine/"+$("#MagazineAttributes").data("mid")+"/"+data;
						img.onload=function ()
						{
							$("#PageViewer").attr("src",img.src);
							hideSpinner();
						}
					});
					position--;
					
				}
			}
		}
		else if (e.keyCode==191)
		{
			if(on==true)
			{
				if(position<$("#MagazineAttributes").data("size")-1)
				{
					showSpinner();
					var img=new Image();
					$.post("core/getPage.php","mid="+$("#MagazineAttributes").data("mid")+"&position="+(position+1),function (data,status){
						var img=new Image();
						img.src="../magazine/"+$("#MagazineAttributes").data("mid")+"/"+data;
						img.onload=function ()
						{
							$("#PageViewer").attr("src",img.src);
							hideSpinner();
							
						}
					});
					position++;
					
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
				$("#PageViewer").css({top:$("#PageViewer").position().top-120});
			}

		}
		else if (e.keyCode==40)
		{
			if(on==true)
			{
				$("#PageViewer").css({top:$("#PageViewer").position().top+120});
			}
		}
		else if (e.keyCode==37)
		{
			if(on==true)
			{
				$("#PageViewer").css({left:$("#PageViewer").position().left-120});
			}
		}
		else if (e.keyCode==39)
		{
			if(on==true)
			{
				$("#PageViewer").css({left:$("#PageViewer").position().left+120});
			}
		}
		else if(e.keyCode==27)
		{
			if(on==true)
			{
				HidePageContainer();
			}
			else if(on==2)
			{
				HideUploadContainer();
			}
		}
			
	});
}
function removeMagazine(obj)
{
	$.post("core/DeleteMagazine.php","mid="+$(obj).data("mid"),function (data,status)
	{
		$(obj).parent().animate({opacity:0},200,"swing",function (){
			obj.parentNode.parentNode.removeChild(obj.parentNode);
		});
	});
		
}
function removePage(obj)
{
	$.post("core/DeletePage.php","pid="+$(obj).data("page"),function (data,status)
	{
		$(obj).parent().animate({opacity:0},200,"swing",function (){
			obj.parentNode.parentNode.removeChild(obj.parentNode);
		});
	});
}
function ShowPageContainer(obj,mid,p)
{
	$("#ShowPageContainer").html("<img id='PageViewer'>");
	$("#PageViewer").css({width:0,top:document.documentElement.clientHeight,marginLeft:0,opacity:0});
	$.post("core/getPage.php","mid="+$("#MagazineAttributes").data("mid")+"&position="+p,function (data,status){
	var img=new Image();
	img.src="../magazine/"+$("#MagazineAttributes").data("mid")+"/"+data;
	img.onload=function ()
	{
		position=p;
		on=true;
		$("#blackBackground").css({display:"block"}).css({top:0,height:document.documentElement.clientHeight,backgroundColor:"rgba(0,0,0,0.6)"});
		$("#ShowPageContainer").css({display:"block"}).css({opacity:1,top:0,height:document.documentElement.clientHeight,width:document.documentElement.clientWidth,marginLeft:-((document.documentElement.clientWidth)/2)});
		$("#PageViewer").attr("src",img.src).css({marginLeft:-500,top:50,width:1000,opacity:1});
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
function HideContainer()
{
	on=false;
	hidding1=true;
	hidding2=true;
	document.getElementById("blackBackground").addEventListener("webkitTransitionEnd",function (){
		if(hidding1==true)
		{
			$("#blackBackground").css({display:"block"})
			hidding1=false;
		}
	});
	document.getElementById("ShowPageContainer").addEventListener("webkitTransitionEnd",function (){
		if(hidding2==true)
		{
			$("#ShowPageContainer").css({display:"block"});
			position=0;
			$(document.body).css("overflow","auto");
			hidding2=false;
		}
		});
	document.getElementById("ShowPageContainer").addEventListener("webkitTransitionEnd",function (){$("#ShowPageContainer").css({display:"block"})});
	$("#blackBackground").css({top:document.documentElement.clientHeight,height:document.documentElement.clientHeight,backgroundColor:"rgba(0,0,0,0)"});
	
	$("#ShowPageContainer").css({opacity:0,top:document.documentElement.clientHeight,width:0,height:0,marginLeft:0});
}
function HidePageContainer()
{
	
	HideContainer();
	$("#PageViewer").css({width:0,top:document.documentElement.clientHeight,marginLeft:0,opacity:0});
	
}
function magnify(ratio)
{
	var width=document.getElementById("PageViewer").offsetWidth;
	var height=document.getElementById("PageViewer").offsetHeight;
	var dw=(document.getElementById("PageViewer").offsetWidth*(ratio-1))/2;
	var dh=(document.getElementById("PageViewer").offsetHeight*(ratio-1))/2;
	$('#PageViewer').css({width:width*ratio,left:$('#PageViewer').position().left-dw,top:$('#PageViewer').position().top-dh});
}
function shrink(ratio)
{
	var width=document.getElementById("PageViewer").offsetWidth;
	var height=document.getElementById("PageViewer").offsetHeight;
	var dw=(document.getElementById("PageViewer").offsetWidth*(1-ratio))/2;
	var dh=(document.getElementById("PageViewer").offsetHeight*(1-ratio))/2;
	$('#PageViewer').css({width:width*ratio,left:$('#PageViewer').position().left+dw,top:$('#PageViewer').position().top+dh});
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
function getList(obj,ListType)
{
	switchOption(obj);
	$.post("core/getList.php","listType="+ListType+"&publisher="+publisher,function (data,status)
	{
		$("#coreArea").html(data);
		if(data!="<ul id='seriesList'></ul>")
		{
			initializeMagazineList();
		}
		else
		{
			
			switch(ListType)
			{
				case 0:
					noitifaction("您的刊物全都审核完啦！");
					break;
				case 1:
					noitifaction("馆理猿在加班审阅您的刊物，辛苦再等会儿吧！");
					break;
			}
			
		}
	});
}
function getCensoredList(obj)
{
	$("#getCensoredListButton").removeClass("alarm");
	getList(obj,1);
	
}
function switchOption(obj)
{
		$("#option>li").removeClass("activedOptionItem");
		$(obj).addClass("activedOptionItem");
}
function deleteSeries(obj,listType)
{
	var series=$(obj).data("series");
	$.post("core/DeleteSeries.php","series="+series+"&listType="+listType,function (data,status)
	{
		removeSeries(obj);
	});
}
function removeSeries(obj)
{
	obj.parentNode.parentNode.addEventListener("webkitTransitionEnd",function (){
		obj.parentNode.parentNode.parentNode.removeChild(obj.parentNode.parentNode);
		noitifaction("已删除系列");
		});
	$(obj).parent().parent().css("opacity",0);
}
function OpenIssue(mid)
{
	noitifaction("正在加载刊物页面");
	$.post("core/getPages.php","mid="+mid,function (data,status)
	{
		$("#coreArea").html(data);
		initializePageList();
	});
	return false;
}
function newSeries()
{
	$.get("core/newSeries.php",null,function (data,status){
		if($("#seriesList").html()!="")
		{
			$("#seriesList").html(data+$("#seriesList").html());
		}
		else
		{
			$("#seriesList").html(data);
		}
		noitifaction("一个新系列诞生啦");
		initializeMagazineList();
		$(".newSeries").focus();
	});
	
}
function showBlankSeries(obj)
{
	switchOption(obj);
	$.get("core/getBlankSeries.php","publisher="+publisher,function (data,status){
		$("#coreArea").html(data);
		if(data!="<ul id='seriesList'></ul>")
		{
			initializeMagazineList();
		}
		else
		{
			noitifaction("系列全都满满哒！");
		}
		
	});
}
function trashSeries(obj)
{
	$.get("core/trashSeries.php","series="+$(obj).data("series"),function (data,status){
		removeSeries(obj);
		noitifaction("正在删除系列");
	});
}
function updateSeriesName(obj)
{
	$(obj).data("title",$(obj).html());
	$.get("core/updateSeriesName.php","series="+$(obj).data("series")+"&name="+encodeURIComponent($(obj).html()),function (data,status){
		noitifaction("系列的新名字存下啦");
	});
}
function updateIssueName(obj)
{
	$.get("core/updateIssueName.php","mid="+$(obj).data("mid")+"&"+"issue="+$(obj).html(),function (data,status){
		noitifaction("已更新期刊信息");
	});
}