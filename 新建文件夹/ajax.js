// 参数:
//  1. method   请求方式, 是GET还是POST, 字符串
//  2. url   要请求的数据或资源的位置url, 字符串
//  3. data  要发送给服务器的数据, 对象字面量
//  4. sucFn  数据成功返回之后, 该如何处理的函数
//  5. errFn  服务端http状态码报错, 该如何处理的函数
function ajax(method, url, data, sucFn, errFn){
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
    }

    // {name:"zhengrf", age:18}
    // 对传递进来的数据, 进行一个字符串的格式化
    // var data = "name=zhengrf&age=18";
    var dataStr = "";
    for(var key in data){
        if(dataStr){
            dataStr += "&";
        }
        dataStr += key + "=" + data[key];
    }

    method = method.toUpperCase();
    if(method == "GET"){
        url += "?" + dataStr;
    }

    xhr.open(method, url, true);

    xhr.onreadystatechange = function (){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                // xhr.responseText
                // if(sucFn){
                //   sucFn(xhr.responseText);
                // }
                // 上面这个if相当于
                sucFn && sucFn(xhr.responseText);
            } else {
                errFn && errFn(xhr.status);
            }
        }
    };

    if(method == "POST"){
        // 设置请求头
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(dataStr);
    } else {
        xhr.send();
    }
}
