function removeCookie(name){
    setCookie(name, "", -1);
}

function getCookie(name){
    // 格式:    "name1=value1; name2=value2; name3=value3"
    var cookieStr = document.cookie;
    // 将每一对名值对用"; "隔开
    var cookies = cookieStr.split("; "); // ["name1=value1", "name2=value2", "name3=value3"]
    // 遍历上面得到的这个数组
    for(var i = 0;i < cookies.length; i++){
        var detail = cookies[i].split('='); // ["name1", "value1"]
        if(detail[0] === name){
            return decodeURIComponent(detail[1]);
        }
    }
    // 如果查不到, 返回一个空字符串
    return "";
}

function setCookie(name, value, expires){
    // name : cookie名, 字符串
    // value : cookie值, 字符串
    // expires : 失效时间(多少天后失效), 整数值
    var exp = new Date();
    exp.setDate(exp.getDate() + expires);
    var gmtStr = exp.toGMTString();

    // 设置cookie
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + gmtStr;
}
