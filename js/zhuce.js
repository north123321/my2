document.addEventListener('DOMContentLoaded',()=>{
    // 获取元素
    let yzm=document.querySelector('.yzm');
    var str='abcdefghijklmnopqrstuvwxyz0123456789';
    yzm.onclick=function(){
        randomCode();
        randomColor();
    }
    // 刷新页面生成随机数
    randomCode();
    // 封装函数随机生成四位数验证码
    function randomCode(){
        var code="";
        for(var i=0;i<4;i++){
            var index=parseInt(Math.random()*str.length);
            code+=str[index];
        }
        // 把字符串全部转换成大写
        yzm.innerHTML=code.toUpperCase();
    }

    
})