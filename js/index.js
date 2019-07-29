function navs(){
	$(".togo").click(function(){
        window.location.href="signIN.html";
    });
	for(var i=0;i<$(".navRight").children().length;i++){
		if(i>=2){
			$(".navRight").children().get(i).onmouseover=function(){
				if($(this).index()>=2){
					$(this).css({
						border :"1px solid #ccc",
						height:"30px",
						borderBottom: "none",background:"white"
					});
					$(this).children()[1].style.display="block";
					$(this.children[0].children[0]).css({
						transform: "rotate(180deg)",
						transition: "all 0.2s ease-in"
					});
				}
			};
			$(".navRight").children().get(i).onmouseout=function(){
				if($(this).index()>=2){
					$(this).css({
						border :"1px solid #000",
						height:"29px",
						borderBottom: "none",background:"#000"
					});
					$(this).children()[1].style.display="none";
					$(this.children[0].children[0]).css({
						transform: "rotate(0deg)",
						transition: "all 0.2s ease-in"
					});
				}
			};
			
		}
	}
}
function createlist(_data){
	var _box,_boxson,_boxa,_length,_namebox;
	for(var i=0;i<_data.list.length;i++){
		_box=document.createElement("div");
		_box.className="listBox";
		for(var _k in _data.list[i].list[0]){
			_boxson=document.createElement("div");
			_boxson.className=_k;
			if(_k!=="name" && _k!=="link"){
				for(var j=0;j<_data.list[i].list[0][_k].length;j++){
				_boxa=document.createElement("a");
				_boxa.innerHTML='<img src="'+_data.list[i].list[0][_k][j]+'" alt=""/>';
				_boxson.appendChild(_boxa);
				}
			}else if(_k==="link"){
				_boxa=document.createElement("a");
				_boxa.innerHTML='<img src="'+_data.list[i].list[0][_k]+'" alt=""/>';
				_boxson.appendChild(_boxa);
			}else if(_k==="name"){
				_length=Math.ceil(_data.list[i].list[0][_k].length/2);
				var _frag=document.createDocumentFragment(),_index=0,_litd,_item,_itemlist;
				for(var k=0;k<_length;k++){
					_namebox=document.createElement("div");
					_namebox.className="namebox";
					_frag.appendChild(_namebox);
					for(var c=_index;c<(_index+2) && c<_data.list[i].list[0][_k].length;c++){
						_litd=document.createElement("div");
						_litd.className="litd";
						_item=document.createElement("a");
						_item.innerHTML=_data.list[i].list[0][_k][c].name;
						_itemlist=document.createElement("div");
						_itemlist.className="itemlist";
						_litd.appendChild(_item);
						_litd.appendChild(_itemlist);
						for(var q=0;q<_data.list[i].list[0][_k][c].list.length;q++){
							for(var key in _data.list[i].list[0][_k][c].list[q]){
								
								_itemlist.innerHTML+='<a href="#" class="'+key+1+'">'+_data.list[i].list[0][_k][c].list[q][key]+'</a>';
							}
						}
						_namebox.appendChild(_litd);
					}
					_index+=2;
				}
				_boxson.appendChild(_frag);
			}
			_box.appendChild(_boxson);
		}
		$(".h2list")[0].children[1].children[i].children[0].appendChild(_box);
		
	}
}
function eventslist(){
	$(".h2list").children("ol").children().mouseover(function(){
		$(this.children[0]).children(".listBox").css({
			display:"block"
		});
	});
	$(".h2list").children("ol").children().mouseout(function(){
		$(this.children[0]).children(".listBox").css({
			display:"none"
		});
	});
}
function lists(){
	$.ajax({
		url:"../../chenyi_kaola/json/mylist.json?_id="+new Date().getTime(),
		success:function(_data){
			console.log(_data);
			createlist(_data);
			middle1(_data);
			middle2(_data);
			createBottom(_data);
			eventslist();
		}
	})
}
class Slider{
	constructor(){
		this.img=$(".bimg");
		this._opacity=0;
		this.timer=0;
		this._index=0;
		this.next=0;
		this.init();
		var _me=this;
	}
	setcolor(){
		$(".col").css({
			background:"white"
		})
		$($(".col")[this._index]).css({
			background:"#ff2337"
		})
	}
	events(){
		var _me=this;
		$(".col").mouseover(function(){
			window.clearInterval(_me.timer);
			$(".col").css({
				background:"white"
			})
			$(this).css({
				background:"#ff2337"
			})
			_me._index=($(this).index()-1);
			for(var i=0;i<_me.img.length;i++){
				if(i!==_me._index){
					_me.img[i].style.opacity=0;
				}
			}
			
			_me.move();
		});
	}
	move(_current,_next){
		var _me=this;
		this.timer=window.setInterval(function(){
			_me.img[_me._index].style.opacity= _me.img[_me._index].style.opacity-0.1;
			_me.img[_me._index+1>_me.img.length-1?0:_me._index+1].style.opacity=_me._opacity+=0.1;
			if(_me._opacity>=0.9){
				_me._opacity=0;
				_me.img[_me._index].style.opacity=0;
				_me.img[_me._index+1>_me.img.length-1?0:_me._index+1].style.opacity=1;
				_me._index++;
				if(_me._index>5){
					_me._index=0;
				}
				_me.setcolor();
				window.clearInterval(_me.timer);
				_me.timer=window.setInterval(function(){
					window.clearInterval(_me.timer);
					_me.move();
				},3000);
			}
		},80);
	}
	init(){
		var _me=this;
		this.timer=window.setTimeout(function(){
			window.clearInterval(_me.timer);
			_me.move();
		},2000);
		this.events();
	}
}
function middle1(_data){
	for(var i=0;i<_data.middle1.length;i++){
		$(".middle1")[0].innerHTML+='<a href="#"><img src="'+_data.middle1[i]+'" alt=""/></a>';
	}
}
function middle2(_data){
	var _li,_a,_div;
	for(var i=0;i<_data.middle2.length;i++){
		if(i<_data.middle2.length-1){
			 _li=document.createElement("li");
				_a=document.createElement("a");
				_a.className="pic";
				_div=document.createElement("div");
				_div.className="details";
				_a.innerHTML='<img src="'+_data.middle2[i].img+'" alt="">';
				_div.innerHTML='<h3 class="a"><a href="#">'+_data.middle2[i].title+'</a></h3><h3 class="b"><a href="#">'+_data.middle2[i].miaoshu+'</a></h3><p class="c">￥'+_data.middle2[i].nowprice+'<span>￥</span><del>'+_data.middle2[i].huajia+'</del></p><div class="process"><p style="width:'+_data.middle2[i].progress+';"></p></div><p class="d">剩余'+_data.middle2[i].num+'件</p><a href="#" class="e">立即抢购</a>';
				_li.appendChild(_a);
				_li.appendChild(_div);
			$(".goodlist")[0].appendChild(_li);
		}else{
			_li=document.createElement("a");
			_li.className="aside";
			_li.innerHTML='<img src="'+_data.middle2[i].img+'" alt="">';
			$(".middle2middle")[0].appendChild(_li);
		}
		
	}
}
function Date1(){
	window.setInterval(function(){
		var timeDiffer=new Date("2019/07/25 08:00:00").getTime()-new Date().getTime();
		var _d=Math.floor(timeDiffer/1000/(24*60*60));
		var _h=Math.floor((timeDiffer-_d*1000*24*60*60)/(60*60*1000));
		var _m=Math.floor((timeDiffer-_d*1000*24*60*60-_h*1000*60*60)/60000);
		var _s=Math.floor((timeDiffer-_d*1000*24*60*60-_h*1000*60*60-_m*1000*60)/1000);
		$(".timebox")[0].innerHTML='<i>'+(_h<10?"0":parseInt(_h/10))+'</i><i class="gewei">'+(_h<10?_h:str(_h))+'</i><span class="split-dot">:</span><i>'+(_m<10?"0":parseInt(_m/10))+'</i><i class="gewei">'+(_m<10?_m:str(_m))+'</i><span class="split-dot">:</span><i>'+(_s<10?"0":parseInt(_s/10))+'</i><i class="gewei">'+(_s<10?_s:str(_s))+'</i>'	
	},1000);
}
function str(a){
	var s=""+a;
	return s.substr(s.length-1,1);
}

function slider(){
	var $index = 0;
	var timer = null;
	var $olist = $(".col"); //数字
	var $ulist = $(".bimg"); //图片
	var $ospanl = $(".ospanl");
	var $ospanr= $(".ospanr");
	console.log($ospanl,$ospanr,$ulist)
	timer = window.setInterval(autoPlay,3000);
	function autoPlay(){
		$index++;
		if($index == $ulist.length){
			$index = 0;
		}else if($index<0){
			$index=$ulist.length-1;
		}
		$ulist.eq($index).fadeIn(1000).parent("a").siblings("a").children(".bimg").fadeOut(1000);
		$olist.eq($index).addClass("current").siblings().removeClass("current");
	};

	$olist.bind({
		mouseenter:function(){
			clearInterval(timer);
			$index = $(this).index()-1;
			autoPlay();
		},
		mouseleave:function(){
			timer = window.setInterval(autoPlay,3000);
		}
	})
	$ospanl.bind({
		click:function(){
			clearInterval(timer);
			$index -=2;
			autoPlay();
		}
	});
	$ospanr.bind({
		click:function(){
			clearInterval(timer);
			autoPlay();
		}
	});
}
function createBottom(data){
	var _box,m_w,m_ww,m_a,m_l,m_la,m_cy;
	for(var i=0;i<data.middlelast.length;i++){
		_box=cq("div");
		_box.className="module";
		$(".middlelast")[0].appendChild(_box);
		for(var k in data.middlelast[i]){
			m_w=cq("div");
			m_w.className=""+k;
			_box.appendChild(m_w);
			if(k=="m_top"){
				var str="";
				for(var j=0;j<data.middlelast[i][k][0].m_t_m.length;j++){
					for(var kes in data.middlelast[i][k][0].m_t_m[j]){
						str+='<li><a href="#" class="'+kes+'">'+data.middlelast[i][k][0].m_t_m[j][kes]+'</a></li>';
					}
				}
				m_w.innerHTML='<span class="m_t_l">'+data.middlelast[i][k][0].m_t_l+'</span><ul class="ulul">'+str+'</ul><a href="#">'+data.middlelast[i][k][0].m_t_r+'</a>';				
			}else if(k=="m_bottom"){
				for(q=0;q<data.middlelast[i][k].length;q++){
					m_ww=cq("div");
					m_w.appendChild(m_ww);
					if(q==0){
						m_ww.className="part1";
						var sstr="";
						for(var c=0;c<data.middlelast[i][k][q].imgdesc.length;c++){
							sstr+='<li><a href="#">'+data.middlelast[i][k][q].imgdesc[c]+'</a></li>';
						}
						m_ww.innerHTML='<a href="#"><img src="'+data.middlelast[i][k][q].img+'" alt=""></a><ul>'+sstr+'</ul>';
					}else if(q==1){
						m_ww.className="partm";
						var sstr="";
						for(var jj=0;jj<data.middlelast[i][k][q].ul_li.length;jj++){
							sstr+='<div class="partmdiv"><a href="#"><h3>'+data.middlelast[i][k][q].ul_li[jj].tit+'</h3><p>'+data.middlelast[i][k][q].ul_li[jj].desc+'</p><img src="'+data.middlelast[i][k][q].ul_li[jj].img+'" alt=""/></a></div>';
						}
						m_ww.innerHTML=sstr;
					}else if(q==2){
						m_ww.className="party";
						m_a=cq("h3");
						m_a.innerHTML='<i>'+data.middlelast[i][k][q].h3_title+'</i><div><span></span><span></span><span></span></div>';
						m_ww.appendChild(m_a);
						m_a=cq("div");
						m_a.className="prolist";
						m_ww.appendChild(m_a);
						var ssstr="";
						for(var jjk=0;jjk<data.middlelast[i][k][q].h3_list.length;jjk++){
							m_l=cq("div");m_l.className="itemgroup";m_a.appendChild(m_l);
							for(var jjkk=0;jjkk<data.middlelast[i][k][q].h3_list[jjk].items.length;jjkk++){
								 m_la=cq("div");m_la.className="itemsale";m_l.appendChild(m_la);
								 ssstr='<a href="#"><img src="'+data.middlelast[i][k][q].h3_list[jjk].items[jjkk].item_img+'" alt=""></a>'+
								 '<div class="proinfo"><h3><a href="#">'+data.middlelast[i][k][q].h3_list[jjk].items[jjkk].item_desc[0]+'</a></h3><p class="curprice"><span class="symbol">¥</span><strong >'+data.middlelast[i][k][q].h3_list[jjk].items[jjkk].item_desc[1]+'</strong><span class="item2" >¥<del>'+data.middlelast[i][k][q].h3_list[jjk].items[jjkk].item_desc[2]+'</del></span></p></div>'
								 m_la.innerHTML=ssstr;
						}
					}
				}
			}
			
		}else if(k=="m_b_last"){
			var scytr="";
			for(var cy=0;cy<data.middlelast[i][k][0].img.length;cy++){
				scytr+='<a href="#"><img src="'+data.middlelast[i][k][0].img[cy]+'" alt="" ><span class="follow" ></span><span class="toast" >已关注</span></a>';
			}
			m_w.innerHTML='<div class="cytxt">'+data.middlelast[i][k][0].name+'</div><div class="brandListContainer">'+scytr+'</div>';
		}
	}
}
}
function cq(box){
	return document.createElement(box);
}
$(function(){
	navs();
	lists();
	//new Slider();
	Date1();
	slider();
});
