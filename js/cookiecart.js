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
            console.log(1);
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
// function creates(data){
//     var id=window.location.href.split("?")[1].split("=")[1];
//     for(var i=0;i<data.list.length;i++){
//         if(data.list[i].id==id){
//             if(_cart.take()){

//             }else{
//                 if(confirm("你好，请先登录")){
//                     window.location.href="signin.html";
//                 }
//             }
//         }
//     }
// }
class Selectall{
    constructor(_master,_children){
        this.m=_master;
        this.c=_children;
        this.init();
    }
    eventselec(){
        let _me=this;
        this.m.onclick=function(){
            for(var i=0;i<_me.c.length;i++){
                if(_me.c[i].type==="checkbox"){
                    _me.c[i].checked=this.checked;
                }
            }
        }
        for(var n=0;n<_me.c.length;n++){
            
            _me.c[n].onclick=function(){
                let _all=true;
                for(let m=0;m<_me.c.length;m++){
                    if(!_me.c[m].checked && _me.c[m].type==="checkbox"){
                        _all=false;
                        break;
                    }
                }
                _me.m.checked=_all;
            }
                
            }
            
    }
    init(){
        this.eventselec();
    }
}
function events(data){
    let _master=document.getElementById("master"),
    _master1=document.getElementById("master1") ;
    let _children=document.getElementsByClassName("concheck");
    new Selectall(_master,_children);
    new Selectall(_master1,_children);
    var _cart=new Cart();
    $(".cont").children().css({
        float:"left",
        overflow:"hidden"
    });
    $(".box1")[0].children[1].innerHTML=_cart.statistics();
    $(".cm").change(function(){
        _cart.change(this.id,Number(this.value),this.getAttribute("comment"));
    });
    $(".cr").click(function(){
        _cart.push($(this).siblings(".cm")[0].id,1,$(this).siblings(".cm")[0].getAttribute("comment"));
        // _cart.take();
        creates(data);
    });
    $(".cl").click(function(){
        _cart.subtract($(this).siblings(".cm")[0].id,1,$(this).siblings(".cm")[0].getAttribute("comment"));
        // _cart.take();
        creates(data);
    });
    $(".c7").click(function(){
        _cart.remove(this.id,this.getAttribute("comment"));
        creates(data);
    });
   
}
function creates(data){
    var _cart=new Cart(),str="";
    _cart.take();
    for(var j=_cart.cookie.length-1;j>=0;j--){
        for(var i=0;i<data.list.length;i++){
            if(_cart.cookie[j].ID==data.list[i].id){
                str+='<div class="cont"><input type="checkbox" class="selectall concheck" id="suns"/><div class="c1"><img src="'+data.list[i].img[0].深棕配玫粉F58292IMLOQ+'"/></div><div class="c2">'+data.list[i].title+'</div><div class="c3">'+_cart.cookie[j].comment+'</div><div class="c4"><del>'+data.list[i].price[1]+'</del><span>'+data.list[i].price[0]+'</span></div><div class="c5"><span class="cl">-</span><input type="text" class="cm" id="'+data.list[i].id+'" comment="'+_cart.cookie[j].comment+'" value="'+_cart.cookie[j].counter+'"/><span class="cr">+</span></div><div class="c6" sums="'+data.list[i].price[0]+'" id="'+data.list[i].id+'" comment="'+_cart.cookie[j].comment+'" ></div><div class="c7" id="'+data.list[i].id+'" comment="'+_cart.cookie[j].comment+'" >删除</div></div>';
            }
        }
    }
    $(".container").html(str);
    for(var i=0;i<_cart.cookie.length;i++){
        for(var k=0;k<$(".c6").length;k++){
            if($(".c6")[k].id==_cart.cookie[i].ID && _cart.cookie[i].comment===$(".c6")[k].getAttribute("comment")){
            $(".c6")[k].innerHTML=_cart.cookie[i].counter*800;
            }
        }
        
    }
    events(data);
}
$(function(){
    var _cart=new Cart();
    $.ajax({
        url:"../../chenyi_kaola/json/detail.json?_id="+new Date().getTime(),
		success:function(_data){
			console.log(_data);
	        creates(_data);
		}
    });
})