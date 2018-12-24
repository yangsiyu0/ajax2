 //->createXHR:创建AJAX对象，兼容所有的浏览器
 function createXHR(){
    var xhr=null,
    flag=false,
    ary=[
        function(){
            return new XMLHttpRequest;
        },
        function(){
            return new ActiveXObject("Microsoft.XMLHTTP");
        }, 
        function(){
            return new ActiveXObject("Msxml2.XMLHTTP");
        },
        function(){
            return new ActiveXObject("Msxml3.XMLHTTP");
        }

        ];
        for(var i=0,len=ary.length;i<len;i++){
            var curFn=ary[i];
            try{
                xhr=curFn();
                //->本次循环获取的方法执行没有出现错误：说明此方法是我想要的，我们下一次直接执行这个小方法即可，这就需要我们把
                //createXHR重写为小方法（完成后不需要在判断下面的了，直接的退出循环即可）
                createXHR=curFn;
                flag=true;
                break;
            }catch(e){
                //->本次循环获取的方法执行出现错误：继续执行下一次的循环 
            }
        }
        if(!flag){
            throw new Error("your browser is not support ajax,please change your browser,try again");
        }
        return xhr;
}
//利用惰性思想，把可能的四种情况都封装在一个数组里，接下来循环数组中的每一个方法，让方法执行，如果当前方法执行，没有报错，那么就让crateXHR重新覆盖，
//以后只用执行这个方法，就可以创建一个xhr,并且第二次执行无需判断兼容，直接执行小方法就可以了。


//->ajax:实现AJAX请求的公共方法
// function ajax(){
//     var xhr=createXHR();
//     xhr.open("","",true);
//     xhr.onreadystatechange=function(){
//         if(/^2\d{2}$/.test(xhr.status)){
//             //->想要readyState===2的时候做一些操作，需要保证Ajax是异步请求
//             if(xhr.readyState===2){

//             }
//             if(xhr.readyState===4){

//             }
//         }
//     };
// };
// xhr.send(null);
//问题：在实现这个公共方法中，我请求的地址不知，请求的方式不知，同步还是异步不知，当readyState===2做什么事情不知，当readyState===4的时候做什么事情不知，
//send的时候，post请求的参数要放到请求主体send中传递，而get则是放在请求链接后面传递，


~function(){
    //我需要给这个方法传递的参数太多，那我们只传一个形参，只不过这个形参是对象数据类型.当一个方法传递的参数值过多，而且还不固定，我们使用对象统一传值法（把需要
//传递的参数值先放在一个对象中，一起传递进去即可）
function ajax(options){
    //->把需要使用的参数值设定一个规则和初始值
    var _default={
        url:"",//->请求的地址
        dataType:"json",//->设置请求回来的内容格式，“json”:就是JSON格式的对象，如果是“txt”:返回的是字符串或者json格式的字符串
        type:"get",//->请求的方式
        async:"true",//默认异步
        data:null,//如果用post请求,则把要传递的放入data中，放入send里面即可（放在请求主体中的内容）
        getHead:null,//函数数据类型，当readyState===2的时候，执行的回调方法
        success:null//函数数据类型，当readyState===4的时候，执行的回调方法
    };

    //->使用用户自己传递进来的值覆盖我们的默认值
    for(var key in options){
        if(options.hasOwnProperty(key)){//只遍历对象私有属性，在原型上定义的那些公有属性不遍历
            _default[key]=options[key];
        }
    }

    //->如果当前的请求方式是GET，我们需要在URL的末尾加随机数清除缓存
    if(_default.type==="get"){
        //如果人家原有的/getList?name=zhufeng&/
        _default.url.indexOf("?")>=0?_default.url+="&":_default.url+="?";
        _default.url+="_="+Math.random();
    }

    //->SEND ajax
    var xhr=createXHR();
    xhr.open(_default.type,_default.url,_default.async);
    xhr.onreadystatechange=function(){
        if(/^2\d{2}$/.test(xhr.status)){
            //->想要readyState===2的时候做一些操作，需要保证Ajax是异步请求
            if(xhr.readyState===2){
                if(typeof _default.getHead==="function"){
                    _default.getHead.call(xhr);
                }
            }
            if(xhr.readyState===4){
                var val=xhr.responseText;
                //如果传递的参数值是json,说明获取的应该是JSON格式的对象
                if(_default.dataType==="json"){
                    val="JSON" in window?JSON.parse(val):eval("("+ val+")");
                }
                _default.success&&_default.success.call(xhr,val);//逻辑与  和上面那种getHead方式一样
            }
        }
    };
    xhr.send(_default.data);
}

    window.ajax=ajax;
}();


ajax({
    url:"data.txt",
    type:"get",
    dataType:"json",
    async:false,//采用同步
    getHead:function(){
        //this->当前Ajax对象
    },
    success:function(data){
        //this->xhr当前Ajax对象
        //data:我们从服务器获取的主体内容
    }
});