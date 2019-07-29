function listjson(_data){
    var str="";
    for(var i=0;i<_data.list.length;i++){
        str+='<li><div class="goodwrap"><a href="detail.html?id='+_data.list[i].id+'"><img src="'+_data.list[i].bigimg+'" alt=""/></a><div class="middle"><ul>';
        for(var j=0;j<_data.list[i].listimg.length;j++){
            str+='<li><img src="'+_data.list[i].listimg[j]+'"></li>';
        }
        str+='</ul></div><div class="btm"><p class="btm1"><span>'+_data.list[i].price+'</span><del>'+_data.list[i].old+'</del></p>';
        str+='<div class="btm2 active">'+_data.list[i].title+'</div><p class="btm3"><span class="btm3span">'+_data.list[i].cuxiao+'</span></p>';
        str+='<p class="btm4"><a href="#"><span>'+_data.list[i].msg+'</span></a><span class="btm4span">'+_data.list[i].country+'</span></p><p class="btm5">'+_data.list[i].shop+'</p></div></li>';

    }
    $(".moudle").children("ul").html(str);
    $(".middle").children("ul").children("li").mouseover(function(){
        $(this.parentNode.parentNode).siblings("a").children("img")[0].src=$(this).children("img")[0].src;
    });
    // $(".goodwrap").mouseover(function(){
    //     $(".btm2")[0].className="btm2";
    // });
    // $(".goodwrap").mouseout(function(){
    //     $(".btm2")[0].className="btm2  active";
    // });
}
function dd4(){
    console.log(1);
    $(".dd4").children("ul").children("li").click(function(){
        console.log(1);
        $(this).css({
            border:"1px solid red"
        })
        $(this).siblings().css({
            border:"none"
        })
    })
}
$(function(){
    $.ajax({
        url:"../../chenyi_kaola/json/list.json?_id="+new Date().getTime(),
		success:function(_data){
			console.log(_data);
            listjson(_data);
            
		}
    });
});