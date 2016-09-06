window.$=HTMLElement.prototype.$=function(selector){
	var elems=(this==window?document:this).querySelectorAll(selector);
	return elems.length==0?null:elems.length==1?elems[0]:elems;
}
window.onload=function(){
	$(".app_jd").addEventListener("mouseover",showItems);
	$(".app_jd").addEventListener("mouseout",hideItems);
	$(".service").addEventListener("mouseover",showItems);
	$(".service").addEventListener("mouseout",hideItems);
	$("#category").addEventListener("mouseover",showAll);
	$("#category").addEventListener("mouseout",hideAll);
	$("#cate_box").addEventListener("mouseover",showSub);
	$("#cate_box").addEventListener("mouseout",hideSub);
	$("#product_detail>.main_tabs").addEventListener("click",showTab);
	zoom.init();
}
var zoom={
	LIWIDTH:0,
	moved:0,
	OFFSET:0,
	MAX:0,
	MSIZE:0,
	init:function(){
		this.MSIZE=parseFloat(getComputedStyle($("#mask")).width);
		this.MAX=parseFloat(getComputedStyle($("#superMask")).width)-this.MSIZE;
		$("#superMask").addEventListener("mouseover",function(){
			$("#mask").style.display="block";
			this.showLarge();
		});
		$("#superMask").addEventListener("mouseout",function(){
			$("#mask").style.display="none";
			$("#largeDiv").style.display="none";
		});
		this.LIWIDTH=parseFloat(getComputedStyle($("#icon_list>li:first-child")).width);
		this.OFFSET=parseFloat(getComputedStyle($("#icon_list")).left);
		$("a[class^='forward']").addEventListener("click",this.move.bind(this));
		$("a[class^='backward']").addEventListener("click",this.move.bind(this));
		$("#icon_list").addEventListener("mouseover",this.showMImg);
		$("#superMask").addEventListener("mousemove",this.moveMask.bind(this));
	},
	showLarge:function(){
		var src=$("#mImg").src;
		var i=src.lastIndexOf(".");
		$("#largeDiv").style.backgroundImage=url(src.slice(0,i-1)+"l"+src.slice(i));
		$("largeDiv")
	},
	moveMask:function(e){
		var x=e.offsetX,y=e.offsetY;
		var left=x-this.MSIZE/2;
		var top=y-this.MSIZE/2;
		left=left<0?0:left>this.MAX?this.MAX:left;
		top=top<0?0:top>this.MAX?this.MAX:top;
		$("#mask").style.top=top+"px";
		$("#mask").style.left=left+"px";
		$("#largeDiv").style.backgroundPositionX=-16/7*left+"px";
		$("#largeDiv").style.backgroundPositionY=-16/7*top+"px";
	},
	showMImg:function(e){
		var target=e.target;
		if(target.nodeName=="IMG"){
			var src=target.src;
			var i=src.lastIndexOf(".");
			$("#mImg").src=src.slice(0,i)+"-m"+src.slice(i); 
		}
	},
	move:function(e){
		var target=e.target;
		if(target.className.indexOf("_disabled")==-1){
			this.moved+=target.className=="forward"?1:-1;
			$("#icon_list").style.left=-(this.moved*this.LIWIDTH)+this.OFFSET+"px";
			this.checkA();
		}
	},
	checkA:function(){
		var liCount=$("#icon_list>li").length;
		if(this.moved==0){
			$(".backward").className+="_disabled";
		}else if(this.moved==liCount-5){
			$(".forward").className+="_disabled"; 
		}else{
			$("a[class^='forward']").className="forward";
			$("a[class^='backward']").className="backward";
		}
	},
}
function showTab(e){
	var target=e.target;
	if(target.nodeName!="UL"){
		target.nodeName=="A"&&(target=target.parentNode);
		if(target.className!="current"){
			target.parentNode.$(".current").className="";
			target.className="current";
			var curr=$("#product_detail>.show");
			curr!=null&&(curr.className="");
			var i=target.dataset.i;
			i!=-1&&($("#product_detail>[id^='product_']:nth-child("+i+")").className="show");
		}
	}
}
function showItems(){
	this.$("[id$='_items']").style.display="block";
	$("."+this.className+">a").className="hover";
}
function hideItems(){
	this.$("[id$='_items']").style.display="none";
	$("."+this.className+">a").className="";
}
function showAll(){
	$("#cate_box").style.display="block";
}
function hideAll(){
	$("#cate_box").style.display="none";
}
function toggleSub(e,display){
	var target=e.target;
	if(target.id!="cate_box"){
		while(target.parentNode!=$("#cate_box")){
			target=target.parentNode;
		}
		target.$(".sub_cate_box").style.display=display;
		target.$("h3").className=(display=="block"?"hover":"");
	}
}
function showSub(e){
	toggleSub(e,"block");
}
function hideSub(e){
	toggleSub(e,"none");
}



