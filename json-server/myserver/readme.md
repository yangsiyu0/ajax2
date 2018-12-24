## Ajax
    - Asyn JavaScript and XML，意思就是用JavaScript执行异步网络请求。

## 创建ajax 
    ```
    // 新建XMLHttpRequest对象
    let xhr = new XMLHttpRequest(); 

    // 发送前配置
    xhr.open('get','url',true,[username],[userpassword])

    // 状态发生变化时，函数被回调
    xhr.onreadystatechange = function(){
       if(xhr.readyState===4 && /^2\d{2}/.test(xhr.status)){
        var val=xhr.responseText;
        }
    }

    // 发送请求：参数是请求主体中传递给服务器的内容
    xhr.send(null);

    ```

## ajax 请求状态码和http响应状态码
    ### xhr.readyState:请求状态码，表示当前处理的进度
        - 0 UNSENT 当前的请求还没有发送
        - 1 OPENED url地址已经打开
        - 2 HEADERS_RECEIVED  响应头信息已经接受
        - 3 LOADING 主要返回的内容在服务端正在处理
        - 4 DONE 响应主体的内容已经成功返回客户端

    ### xhr.status : 网络状态码，描述服务器响应内容状态
        - 200 || /^2\d{2}$/  表示响应主体的内容成功返回
        - 301 永久重定向/永久转移
        - 302 临时重定向/临时转移（用于服务器负载均衡）
        - 304 缓存

        - 400 客户端传递过来的参数出错
        - 401 无权限访问
        - 404  访问的资源文件不存在

        - 500 未知的服务器错误
        - 503 服务器超负荷


## ajax中http请求方式
- GET:一般应用于从服务器获取数据
- POST:一般应用于向服务器推送数据
- PUT:一般应用于给服务器上增加资源文件（我们上传图片功能）
- PATCH:一般局部更新服务器上的资源文件
- DELETE：一般应用于从服务器删除资源文件
- HEAD：一般应用于只获取服务器的响应头信息
 ### GET PK POST
- 大小问题：GET请求传递给服务器得内容在大小得限制，而POST理论上没有限制。因为GET通过URL传参给服务器，而每个浏览器对于URL的长度存在限制，谷歌8kb,火狐7kb,ie2kb的长度限制,如果URL的长度超过限制，浏览器会把超出的部分截取
- 缓存问题：GET请求会出现缓存，一般在URL的末尾追加一个随机数 xhr.open("get","/getList?num=12&_="+Math.random());//目的是使其和上个连接保持不一样
- 安全问题：一般来说GET不安全，而POST相对安全一些


## ajax 同步和异步
 xhr.open('get','url',true); ajax异步，默认为true
 xhr.open('get','url',false); ajax同步，默认为false
 - AJAX中的同步：当Ajax任务开始得时候直到ready STATE===4得时候任务才算结束，此时才可以处理其它的时候
 - Ajax中的异步：当Ajax任务开始的时候（send）,不需要等到READY STATE===4,依然可以继续做其它的任务，并且只有当其它任务完成后，我们再看是否到达4，到达4的时候在做相关的操作
 ```
let xhr = new XMLHttpRequest();
xhr.open('get','./data.txt',true);
xhr.onreadystatechange = function(){
    console.log(xhr.readyState);//???
};   
xhr.send(null); 
 ```

## 仿jq封装ajax（ajax.html）

## $.ajax 和 Promise 封装 (Promise.js)


 ## 举个栗子（水果商店demo）
- 采用json-server 搭建一个json服务 自已模拟测试数据
- json-server把db.json 根节点的每一个key，当作了一个router。我们可以根据这个规则来编写测试数据。
- json-server 默认是 3000 端口，我们也可以自己指定端口 json-server --watch db.json --port 3004，觉得启动服务的这段代码有点长，还可以考虑db.json同级文件夹新建一个package.json，把配置信息写在里头  启动服务 npm run mock
- http://localhost:3004/fruits  //获取所有水果信息
- http://localhost:3004/fruits/1 // 可以得到指定id为1的水果（获取的是对象）
- http://localhost:3004/fruits/?id=1 // 与上面区别是 获取的是数组

类推：还可以通过价格，水果名来获取
- http://localhost:3004/fruits?name=orange

也可以指定多个条件，用&符号连接：
- http://localhost:3004/fruits?name=orange&price=8.88

甚至还可以使用对象取属性值 obj.key 的方式：
- http://localhost:3004/users?name.nickname=ysy

分页：分页采用 _page 来设置页码， _limit 来控制每页显示条数
- http://localhost:3004/fruits?_page=2&_limit=2

排序 _sort 来指定要排序的字段， _order 来指定排序是正排序还是逆排序（asc | desc ，默认是asc）。
- http://localhost:3004/fruits?_sort=id,name&_order=desc,asc

取局部数据 Slice  采用 _start 来指定开始位置， _end 来指定结束位置、或者是用_limit来指定从开始位置起往后取几个数据。
- http://localhost:3004/fruits?_start=2&_end=4

取符合某个范围 Operators  采用 _gte _lte 来设置一个取值范围（range）:
- http://localhost:3004/fruits?id_gte=4&id_lte=6

全文搜索 Full-text search
采用 q 来设置搜索内容:
- http://localhost:3004/fruits?q=oran

- http://localhost:3004/users   // 获取管理员信息


案例中用到的几种比较常见接口(增删改查)
http://localhost:3004/fruits get 
http://localhost:3004/fruits post
http://localhost:3004/fruits/id  put / patch /delete








