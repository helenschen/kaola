<?php
/*php代码的推荐语法格式:<?php coding ?>，以尖括号问号php开头，问好尖括号结束，coding表示php代码区。*/
header("content-type:text/html;charset=utf-8");         //设置编码
header('Access-Control-Allow-Origin:*');

function main(){
    $connection=new mysqli("127.0.0.1","root","root","Students1911a");//创建MySQL链接
    if($connection->error){
        die("connection error!");
    }else{
        $request=$_POST;
        if($_SERVER["REQUEST_METHOD"]=="GET"){
            $request=$_GET;
        }
        if($connection->query("insert into students1911 (s_name,s_pwd,s_phone) values ('".$request["name"]."','".$request["pwd"]."','".$request["phone"]."');")){
            echo "{code:2000,comment:'success'}";
        }else{
            echo "{code:1000,comment:'failed'}";
        }
        $connection->close();
    }
}
main();
?>