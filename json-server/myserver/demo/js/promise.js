~function(){
    function ajax(url,type,data){
        return new Promise(function(resolve,reject){
            $.ajax({
                url,
                type,
                data,
                dataType:'json',
                success(data){
                    resolve(data);
                },
                error(err){
                    reject(err);
                }
            })
        });
    }
    window.ajax = ajax;
}();