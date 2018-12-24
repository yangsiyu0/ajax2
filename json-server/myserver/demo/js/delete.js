let remove = function(){
    
    oList.onclick = function(e){
        console.log(1);
        e = e || window.event;
        let tar = e.target || e.srcElement;
        let tarTag = tar.tagName.toUpperCase();
        if(tarTag === "A" && tar.innerHTML === "删除"){
           
            let id = tar.getAttribute('id');
            let flag = window.confirm("确定删除编号为["+ id +"]吗？");
            if(flag){
                let deleteFruit = ajax(`http://localhost:3004/fruits/${id}`,'delete');
                deleteFruit.then((data)=>{
                    console.log("del success");
                    // 此时db.json数据发送变化，需重新渲染
                    ajax('http://localhost:3004/fruits','get').then((data)=>{
                        bind(data);
                    })
                },(err)=>{
                    console.log('delete error');
                });
            }
            
        };
        }
        
}