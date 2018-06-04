
document.addEventListener('DOMContentLoaded',function(){
    //点击图片进入商品详情页
    var status = [200,304];
    var box = document.querySelector('.box');
    console.log(box);
    
    //使用匿名函数，避免环境污染
    (function(){
        var xhr = new XMLHttpRequest();
        xhr.onload = function(){
            // console.log(666);
            if(status.includes(xhr.status)){
                // console.log(xhr.responseText);
                var res = JSON.parse(xhr.responseText);

                console.log(res);

                // 购物车添加商品飞入动画效果代码开始
                ul.onclick=function(e){
                    e = e || window.event;
                    var target = e.target || e.srcElement;
                    if(target.tagName.toLowerCase()==='button'){
                        // 1、先获取button所在的当前行li
                        var currentLi = target.parentNode;

                        // 2、复制当前行的图片元素
                        var cloneimg = currentLi.children[0].children[0].cloneNode();
                        console.log(cloneimg);
                        // 2-1给复制的图片元素添加类名，使其定位为absolute，不然无法实现动画效果
                        cloneimg.classList.add('clone-img');

                        // 3、把复制的图片定位到与当前商品的图片一致
                        
                        var myleft = cloneimg.style.left = (currentLi.offsetLeft)+'px';
                        var mytop = cloneimg.style.top = (currentLi.offsetTop)+'px';
                        console.log(myleft);
                        console.log(mytop);
                    
                        //3 把复制的图片写入页面
                        currentLi.appendChild(cloneimg); 
                        // console.log(cloneimg);
                        animation(cloneimg,{left:520,top:-180,width:12},function(){
                            // 4、利用回调函数将复制的图片去除
                            currentLi.removeChild(cloneimg); 
                        });
                    }
                    // 购物车添加商品飞入动画效果代码结束
                    
                    //实现显示商品详情页面代码开始：
                    if(target.tagName.toLowerCase()==='img'){
                        var currentguid = target.parentNode.parentNode.getAttribute('data-guldId');
                        var currentgoods = res.data.filter(function(item){
                            return item.guldId === currentguid;
                            //注意这里item.guldId的'guldId'必须与数据库数据命名一致才行
                        })[0];
                        console.log(currentgoods);
                        //将产品信息写入cookie传递到详情页面
                        var now = new Date();
                        now.setHours(now.getHours()+1);
                        document.cookie = 'currentgoods=' + JSON.stringify(currentgoods) + ';expires=' + now;   
                    }
                    // 实现显示商品详情页面代码结束：
                }
            }
        }
        xhr.open('post','../api/goods.php',true);
        xhr.setRequestHeader('content-type',"application/x-www-form-urlencoded");
        xhr.send('pageNo='+pageNo+'&qty='+qty);
        //实现点击切换内容的功能
        //每次点击页码就发起对应的新的ajax请求，加载指定页数的内容
        //注意：必须放在for循环里面才能获取对应的category的值
        page_lzf.onclick = function(e){
            if(e.target.tagName.toLowerCase()==='i'){
                pageNo = e.target.innerText*1;
                xhr.open('post','../api/goods.php',true);
                xhr.setRequestHeader('content-type',"application/x-www-form-urlencoded");   
                xhr.send('pageNo='+pageNo+'&qty='+qty);
            }
        }  
    }) ();
})