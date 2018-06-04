
document.addEventListener('DOMContentLoaded',()=>{
    // 轮播图
    let banner = document.querySelector("#banner");
    let ul = banner.children[0];
    ul.appendChild(ul.children[0].cloneNode(true));
    let len = ul.children.length;
    let index = 0;
    let page = document.createElement('div');
    page.className = 'page';
    var content = '';
    for(let i=1;i<len;i++){
        content += `<span>${i}</span>`
    }
    page.innerHTML = content;
    page.children[index].className = 'active';
    banner.appendChild(page);
    let timer = setInterval(autoPlay,3000);
    banner.onmouseover = function(){
        clearInterval(timer);
    }
    banner.onmouseout = function(){
        timer = setInterval(autoPlay,3000);
    }
    banner.onclick = e=>{
        if(e.target.className === 'iconfont icon-xiangzuo1 zuo'){
            index--;
            show();
        };
        if(e.target.className === 'iconfont icon-xiangyou1 you'){
            index++;
            show();
        };
        if(e.target.parentNode.className === 'page'){
            index = e.target.innerText-1;
            show();
        }
    }
    function autoPlay(){
        index++;
        show();
    }
    function show(){
        if(index>=len){
            ul.style.left = 0;
            index = 1;
        }else if(index<0){
            index = len - 1;
        }
        let target = -index*banner.clientWidth;
        animate(ul,{left:target});
        for(let i=0;i<len-1;i++){
            if(i===index){
                page.children[i].className = 'active';
            }else{
                page.children[i].className = '';
            }
        }
        if(index === len-1){
            page.children[0].className = 'active';
        }
    }


    // 二级导航
    var xuanting = document.querySelector('.xuanting');
    xuanting.onmouseover=function(){
        fenlei.style.display="block";
    }
    var fenlei = document.querySelector('.fenlei');
    var zhonglei = fenlei.querySelector('.zhonglei');
    var pinpai = fenlei.querySelector('.pinpai');
    var zhonglei_s = zhonglei.children;
    var pinpai_s = pinpai.children;
    zhonglei_s[0].className = 'active';
    for(var i=0;i<zhonglei_s.length;i++){
        if(i>0){
            pinpai_s[i].style.display = 'none';
        }
    
        zhonglei_s[i].onmouseover = function(){
            var idx;
            for(var i=0;i<zhonglei_s.length;i++){
                if(zhonglei_s[i] === this){
                    idx = i;
                }
                zhonglei_s[i].className = '';
                pinpai_s[i].style.display = 'none';
            }
            this.className = 'active';
            pinpai_s[idx].style.display = 'block';
        }
    }


    // 导航条下划线
    // $(function(){
    //     $('.nav_bl li').hover(function(){
    //         $('span',this).stop().css('height','2px');
    //         $('span',this).animate({
    //         left:'0',
    //         width:'100%',
    //         right:'0'
    //         },200);
    //     }
    //     function(){
    //         $('span',this).stop().animate({
    //         left:'50%',
    //         width:'0'
    //         },200);
    //     });
    // });
    
});