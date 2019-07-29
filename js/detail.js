function expand(){
    var img=$("img1"),son=$(".shadow")[0],ex=$(".bigimg")[0],mother=$(".box")[0];
    mother.onmouseover=function(e){
        e=e||window.event;
        son.style.display="block";
        ex.style.display="block";
    }
    mother.onmouseout=function(e){
        e=e||window.event;
        son.style.display="none";
        ex.style.display="none";
    }
    mother.onmousemove=function(e){
        e=e||window.event;
        var _top=e.offsetY-son.clientHeight/2,
            _left=e.offsetX-son.clientWidth/2;
            if(_top<=0){
                _top=0;
            }else if(_top>=(mother.clientHeight-son.clientHeight)){
                _top=mother.clientHeight-son.clientHeight;
            }else{
                _top=e.offsetY-son.clientHeight/2;
            }
        if(_left<=0){
            _left=0;
        }else if(_left>=(mother.clientWidth-son.clientWidth)){
            _left=mother.clientWidth-son.clientWidth;
        }else{
            _left=e.offsetX-son.clientWidth/2;
        }
        son.style.top=_top+"px";
        son.style.left=_left+"px";
        ex.children[0].style.top=-2*_top+"px";
        ex.children[0].style.left=-2*_left+"px";
    }
}
function eventss(){
    var timer,_step=2,times=80/_step,caltimes=0,_index=0;
    $(".sbox").children("ul").children("li").mouseover(function(){
        $(".box").children("img")[0].src=$(this).children("img")[0].src;
        $(".bigimg").children("img")[0].src=$(this).children("img")[0].src;
    });
    $(".cr").click(function(){
        timer=window.setInterval(function(){
            if(_index>=$(".sbox").children("ul").children("li").length-4){
                window.clearInterval(timer);
                $(".sbox").children("ul")[0].style.left=_index*(-80)+"px";
            }else{
            $(".sbox").children("ul")[0].style.left=$(".sbox").children("ul")[0].offsetLeft-_step+"px";
            caltimes++;
            if(caltimes>=times){
                caltimes=0;
                window.clearInterval(timer);
                _index++;
                $(".sbox").children("ul")[0].style.left=_index*(-80)+"px";
            }
        }
        });
    });
    $(".cl").click(function(){
        timer=window.setInterval(function(){
            if(_index<=0){
                window.clearInterval(timer);
                $(".sbox").children("ul")[0].style.left=0+"px";
            }else{
                $(".sbox").children("ul")[0].style.left=$(".sbox").children("ul")[0].offsetLeft+_step+"px";
                caltimes++;
                if(caltimes>=times){
                    caltimes=0;
                    window.clearInterval(timer);
                    _index--;
                        $(".sbox").children("ul")[0].style.left=_index*(-80)+"px";
                    
            }
            }
            
        });
        
    });
}
function lefts(data){
    var id=window.location.href.split("?")[1].split("=")[1],str="";
    for(var i=0;i<data.list.length;i++){
        if(data.list[i].id===id){
            str='<dl><dt class="dt1"><img src="'+data.list[i].top+'" alt=""></dt>'+
           ' <dt class="dt2">'+data.list[i].title+'</dt>'+
            '<dt class="dt3">'+data.list[i].script+'</dt>'+
            '<dt class="dt4"><div class="m-price"><span class="m-p-s">售价</span><div class="m-price-r"><span>'+data.list[i].price[0]+'</span><del>'+data.list[i].price[1]+'</del></div></div><div class="m-more"><span>更多组合</span><div><span>'+data.list[i].more[0]+'</span><span>'+data.list[i].more[1]+'</span><span>'+data.list[i].more[2]+'</span></div></div></dt>'+
            '<dd class="dd1"><span>税费</span><span>'+data.list[i].税费+'</span></dd>'+
            '<dd class="dd2"><span>运费</span><span>'+data.list[i].contry[0]+'</span><span>至</span><div class="action"></div><span>'+data.list[i].contry[1]+'</span></dd>'+
            '<dd class="dd3"><span>服务</span><span>本商品由</span><a href="#">'+data.list[i].shop+'</a><span>发货</span></dd>'+
            '<dd class="dd4"><span>颜色</span><ul>';
            for(var j=0;j<data.list[i].img.length;j++){
                for(var k in data.list[i].img[j]){
                    str+='<li><img id="'+k+'" src="'+data.list[i].img[j][k]+'"/></li>';
                }
            }
            str+='</ul></dd><dd class="dd5"><p class="selectedImgTit">已选择</p><p class="selectedDesc">深棕配玫粉F58292IMLOQ</p></dd>';
            str+='<dd class="dd6"><span>数量</span><div class="number"><span class="jian">-</span><input type="text" value="1" class="numspan"/><span class="jia">+</span></div></dd>'
            +'<dd class="dd7"><a href="cart.html?id='+id+'" class="buyit" id="'+id+'">立即购物</a><span class="addcast">加入购物车</span></dd>';
        }
    }
    $(".sright")[0].innerHTML=str;
}
function Cart(){
    this.take=function(){
        var _regex=/\b1911ACart\b=\[(\{("\w+":"[\u4e00-\u9fa5\w]+",?)+},?)*]/g;//确定数据格式
        this.cookie=document.cookie;
        // var _tmp='123456 1911ACart=[{"ID":"20190702144800125","counter":"8","comment":"123456ert"},{"ID":"20190702144800125","counter":"8","comment":"123456ert"},{"ID":"20190702144800125","counter":"8","comment":"123456ert"}]; 23456789';
        // 确定数据格式
        // /\w/
        // /\b1911ACart\b=\[({("\w+":"\w+",?)+},?)+]/;
        // var _tmp2='{"ID":"20190702144800125","counter":"8","comment":"123456ert"}';
        if(_regex.test(this.cookie)){//判断cookie中是否有将要购买的商品信息
            _regex.lastIndex=-1;//强制将正则表达式下次继续字符串的头部开始匹配
            this.cookie=this.cookie.match(_regex)[0].replace(/1911ACart=/g,"");
            this.cookie=window.eval("("+this.cookie+")");
        }else{
            
            this.cookie=[];
        }
        console.log(this.cookie);
    };
    this.date=function(){
        return new Date(new Date().getTime()+7*24*3600000);
    };
    this.save=function(){
        document.cookie="1911ACart="+JSON.stringify(this.cookie)+";path=/;expires="+this.date();
    };
    this.push=function(_identify,_counter,_comment){//向购物车中添加商品时，会有几种情况？
        /**
         * 1.购物车中没有该产品
         * 2.购物车中已经有该产品
         */
        var _exist=0;
        this.take();
        for(var i=0;i<this.cookie.length;i++){
            if(this.cookie[i].ID===_identify && this.cookie[i].comment===_comment){
                _exist=1;
                this.cookie[i].counter=Number(this.cookie[i].counter)+_counter+"";
                break;
            }
        }
        if(!_exist){//如果没有执行第60行代码，也就表示购物车中没有此产品，
            // 所以_exist依然为0；!0===true，也就是说非零表示需要向购物车中添加商品
            this.cookie.push({//这个是数组的push
                "ID":_identify,
                "counter":_counter+"",
                "comment":_comment
            });
        }
        this.save();
    };
    this.subtract=function(_identify,_counter,_comment){//向购物车中添加商品时，会有几种情况？
        /**
         * 1.该商品是否存在
         * 2.该商品存在
         *      2.1:要减去的数量是否大于购物车中的数量
         *      2.2:如果要减去的数量小于购物车中的该商品数量时，就可以执行减
         */
        this.take();//先将cookie中的数据读到内存中（this.cookie)
        for(var i=0;i<this.cookie.length;i++){
            if(this.cookie[i].ID===_identify && this.cookie[i].comment===_comment){
                if(Number(this.cookie[i].counter)>_counter){
                    this.cookie[i].counter=this.cookie[i].counter-_counter+"";
                }else{
                    this.cookie.splice(i,1);
                }
                break;
            }
        }
        this.save();
    };
    this.remove=function(_identify,_comment){
        this.take();//先将cookie中的数据读到内存中（this.cookie)
        for(var i=0;i<this.cookie.length;i++){
            if(this.cookie[i].ID===_identify && this.cookie[i].comment===_comment){
                this.cookie.splice(i,1);
                break;
            }
        }
        this.save();
    };
    this.change=function(_identify,_counter,_comment){
        if(/^[1-9]\d*$/.test(_counter+"")) {
            this.take();
            for (var i = 0; i < this.cookie.length; i++) {
                if (this.cookie[i].ID === _identify && this.cookie[i].comment === _comment) {
                    this.cookie[i].counter = _counter + "";
                    break;
                }
            }
            this.save();
        }
    };
    this.statistics=function(){
        var _sum=0;
        this.take();
        for(var i=0;i<this.cookie.length;i++){
            _sum+=Number(this.cookie[i].counter);
        }
        return _sum;
    }
}
function events(_data){
    var _cart=new Cart();
    $(".buyit").click(function(){
            _cart.push(this.id,$(".numspan")[0].value,$(".selectedDesc")[0].innerText);
            dd4();
    });
    $(".addcast").click(function(){
             _cart.push( $(".buyit")[0].id,Number($(".numspan")[0].value),$(".selectedDesc")[0].innerText);
             dd4();
            });
     console.log(  $(".dd4"));
     $(".dd4").children("ul").children("li").click(function(){
        console.log(1);
        $(this).css({
            border:"1px solid red"
        })
        $(this).siblings().css({
            border:"none"
        })
        $(".selectedDesc").html(this.children[0].id);
        $(".box")[0].children[0].src=this.children[0].src;
        $(".bigimg")[0].children[0].src=this.children[0].src;
    });
    $(".cart").click(function(){
        window.location.href="cart.html";
    })
    $(".jian").click(function(){
        if(Number($(".numspan")[0].value)>1){
             $(".numspan")[0].value=Number($(".numspan")[0].value)-1;
        }
    })
    $(".jia").click(function(){
        $(".numspan")[0].value=Number($(".numspan")[0].value)+1;
    })
   
}
function dd4(){
    var _cart=new Cart();
    _cart.take();
    if(_cart.cookie.length>0){
        $(".cartnum").css({
            display:"block"
        });$(".cartnum").html(_cart.statistics());
        if(_cart.statistics()>99){
            $(".cartnum").html("99+");
        }
        
    }
}
$(function(){
    expand();
    eventss();
    $.ajax({
        url:"../../chenyi_kaola/json/detail.json?_id="+new Date().getTime(),
		success:function(_data){
			console.log(_data);
            lefts(_data);
            events(_data);
            dd4();
		}
    });
});