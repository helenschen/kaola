function change(){
    $(".phonesign").click(function(){
        this.style.color="#e31436";
        $(".mailsign")[0].style.color="#333";
        $(".r22")[0].style.display="none";
        $(".r2")[0].style.display="block";
    });
    $(".mailsign").click(function(){
        this.style.color="#e31436";
        $(".phonesign")[0].style.color="#333";
        $(".r22")[0].style.display="block";
        $(".r2")[0].style.display="none";
    });
    $(".fastsign").click(function(){
        $(".signin")[0].style.display="block";
        $(".sign")[0].style.display="none";
    });
    $(".span333").click(function(){
        $(".sign")[0].style.display="block";
        $(".signin")[0].style.display="none";
    });
}
class Sign{
    constructor(){
        this.auto();
        this.events();
    }
    cookies(_a,_p){
        document.cookie="account="+_a+";path=/;expires="+new Date(new Date().getTime()+10*24*3600000);
        document.cookie="password="+_p+";path=/;expires="+new Date(new Date().getTime()+10*24*3600000);
    }
    events(){
        var _me=this;
        document.getElementById("pin").onclick=function(){
            var _account=document.getElementById("paccount").value;
            var _pwd=document.getElementById("ppwd").value;
            Ajax.request({
                method:"post",
                url:"http://localhost:8080/cyWWW/myphp/signIn.php",
                data:"account="+_account+"&password="+_pwd,
                success:function(_data){
                    _data=window.eval("("+_data+")");
                    console.log(_data);
                    if(_data.code===2000){
                        window.location.href="index.html";
                        if(document.getElementById("ptenday").checked){
                            _me.cookies(_account,_pwd);
                        }
                    }
                }
            });
            
        }
        document.getElementById("zhuce").onclick=function(){
            var _account=document.getElementById("pzhuce").value;
            var _pwd=document.getElementById("pwdzhuce").value;
            var _name=document.getElementById("mzhuce").value;
            Ajax.request({
                method:"post",
                url:"http://localhost:8080/cyWWW/myphp/insert.php",
                data:"phone="+_account+"&pwd="+_pwd+"&name="+_name,
                success:function(_data){
                    _data=window.eval("("+_data+")");
                    console.log(_data);
                    if(_data.code===2000){
                        window.location.href="index.html";
                       
                    }
                }
            });
            
        }
    }
    auto(){
        var _co=document.cookie,_list=null;
        _co=_co.split(";");
        console.log(_co);
        for(var i=0;i<_co.length;i++){
            _list=_co[i].split("=");
            if(_list[0].indexOf("account")>=0){
                var _account=_list[1];
            }
            if(_list[0].indexOf("password")>=0){
                var _pwd=_list[1];
            }
        }
        if(_account&&_pwd){
            Ajax.request({
            method:"post",
            url:"http://localhost:8080/cyWWW/myphp/signIn.php",
            data:"account="+_account+"&password="+_pwd,
            success:function(_data){
                _data=window.eval("("+_data+")");
                console.log(_data);
                if(_data.code===2000){
                    window.location.href="success.html";
                }
            }
        });
        }
    }
}
class Ajax{
	static create(){
		try{
			return new XMLHttpRequest();
		}catch(e){
			try{
				return new ActiveXObject("Microsoft.XMLHTTP");
			}catch(e){
				if(window.confirm("浏览器版本过低")){
					window.location.href="https://dl.google.com/tag/s/appguid%3D%7B8A69D345-D564-463C-AFF1-A69D9E530F96%7D%26iid%3D%7BD6579F6B-871A-DF6A-5F90-43784291C5A5%7D%26lang%3Dzh-CN%26browser%3D4%26usagestats%3D1%26appname%3DGoogle%2520Chrome%26needsadmin%3Dprefers%26ap%3Dx64-stable-statsdef_1%26installdataindex%3Dempty/update2/installers/ChromeSetup.exe";
				}
				return null;
			}
		}
	}
	static request(_config){
		let _xhr=this.create();
		if(_xhr){
			_xhr.onreadystatechange=function(){
				if(_xhr.status===200 && _xhr.readyState===4){
					_config.success(_xhr.responseText);
				}
			};
			var _async=_config.async?true:(_config.async!==false);
			var _method=(_config.method+"").toUpperCase()==="POST"?"POST":"GET";
			var _url=_method==="GET"?_config.url+"?"+_config.data:_config.url;
			_xhr.open(_method,_url,_async);
			_xhr.setRequestHeader("content-type","application/x-www-form-urlencoded;charset=utf-8");//post 方式向服务传递参数时，必须要这句话
			_xhr.send(_method==="GET"?null:_config.data);
		}else{
			alert("你的浏览器版本太低");
			window.location.href="www.baidu.com";
		}
	}
}
$(function(){
    change();
    new Sign();
});