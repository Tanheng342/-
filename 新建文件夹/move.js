function move(dom, target, fn){
    clearInterval(dom.timer);
    dom.timer = setInterval(function (){
        // 给一个标记, 用于标示是否所有属性都到达了终点
        //  true 代表都到了, false代表没有都到
        var isOk = true; // 在循环之前姑且认为都到了
        // 用下面这个循环去检测, 看看有没有可能有一个没到
        for(var property in target){
            // 1. 获取当前值
            if(property == "opacity"){
                var current = Math.round(parseFloat(getStyle(dom, property))*100);
            } else {
                var current = parseInt(getStyle(dom, property)); // "100px"
            }
            // 2. 算速度
            var speed = (target[property] - current) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            // 3. 判断是否到达终点
            if(current != target[property]){
                isOk = false;
            } else {
                // 在当前属性到到达终点时, 直接跳过运动, 进行下一个属性
                continue;
            }

            // 4. 如果没有到达终点, 那么再做一次运动
            if(property == "opacity"){
                dom.style.opacity = "" + (current + speed) / 100;
                dom.style.filter = "alpha(opacity=" + (current + speed) + ")";
            } else {
                dom.style[property] = current + speed + "px";
                }
            }
            // 在循环结束之后, 去检测isOk的状态
            if(isOk){
                clearInterval(dom.timer);
                fn && fn();
            }
        }, 30);
    }

    // 封装一个函数, 用于获取非行内样式
    function getStyle(dom, property){
        if(dom.currentStyle){
            return dom.currentStyle[property];
        } else {
            return window.getComputedStyle(dom)[property];
        }
    }
