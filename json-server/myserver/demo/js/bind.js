let  oList=document.getElementById("list");
let bind = function (data){
    console.log(1);
    let str = '';
    for(let i = 0; i < data.length; i++){
        let curData = data[i];
        str += '<li>';
        str += '<span class = "w50">' + curData["id"] + '</span>';
        str += '<span class = "w150">' + curData["name"] +'</span>';
        str += '<span class = "w50">' + curData["price"] + '</span>';
        str += '<span class = "w200">' + curData["store"] + '</span>';
        str += '<span class = "w200">' + curData["sale"] + '</span>';
        str += '<span class = "w150 control">';
        str += '<a href = "add.html/?id=' + curData["id"] + '">修改</a>'
        str += '<a href = "javascript:;" id = '+ curData["id"] +'>删除</a>'
        str += '</span>';
        str += '</li>'
    }
   
    oList.innerHTML = str;
    console.log(str)
}

let getAllFruits = ajax('http://localhost:3004/fruits','get');
getAllFruits.then((data=>{
    bind(data);
    remove();
    console.log('get success');
}),(err)=>{
    console.log("get error");
});

// $.ajax({
//     url:"http://localhost:3004/fruits",
//     type:"get",
//     success(jsonData){
//         bind(jsonData);
//         // console.log(jsonData);
//         remove();
//     }
// })