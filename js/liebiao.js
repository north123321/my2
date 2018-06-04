document.addEventListener('DOMContentLoaded',function(){
    let box = document.querySelector('.box');
    let page = document.querySelector('.page');
    let qty = 24;

    let xhr = new XMLHttpRequest();
    //2.处理服务器返回数据 回调函数
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            let res = JSON.parse(xhr.responseText);
            // 创建ul
            let ul = document.createElement('ul');

            // 根据数据生成html结构
            ul.innerHTML = res.data.map(item=>{
                return `<li data-guid="${item.id}">
                        <a href="../html/datails.html">
                            <img src="${item.imgurl}" />
                        </a>
                        <span class="span1">${item.price}</span>
                        <span class="span2">${item.off}</span>
                        <p>${item.title}</p>
                    </li>`
            }).join('\n');
            box.innerHTML = '';
            box.appendChild(ul);


            // 创建分页
            let pageLen = Math.ceil(res.total/res.qty);
            page.innerHTML = "";
            
            for(let i=1;i<=pageLen;i++){

                let span = document.createElement("span");
                span.innerText = i;
                // 高亮分页
                if(i === res.page){
                    span.className = "active";
                }
                page.appendChild(span);
            }
        }
    }

    //3.设置请求参数，建立与服务器连接 get/post 客户端 服务端nodejs
    //利用GET请求 向服务端发送后端url 第三个参数代表同步和异步，一般我们使用异步，同步页面会刷新，异步局部刷新
    xhr.open("get", "../php/liebiao.php?qty="+qty, true);

    //4.向服务器发送请求
    xhr.send();

    // 点击切换分页
    page.onclick = e=>{
        if(e.target.tagName.toLowerCase() === 'span'){
            let pageNo = e.target.innerText;
            xhr.open("get", "../php/liebiao.php?qty="+qty+'&page='+pageNo, true);
            xhr.send();
        }
    }

    // // 创建ul
    // let fenye2 = document.createElement('ul');
    // fenye2.className = "fenye2";
    // // 根据数据生成html结构
    // fenye2.innerHTML = {
    //     return`<li>共<span>3</span>页</li><li>到第<input type="text" value="1" />页</li><li><button>确定</button></li>`
    // }).join('\n');
    // page.innerText = '';
    // page.appendChild(fenye2);


})