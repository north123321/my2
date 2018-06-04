<?php
    $page = isset($_GET['page']) ? $_GET['page'] : 1;
    $qty = isset($_GET['qty']) ? $_GET['qty'] : 1;

    // 文件路径
    $path = '../data/liebiao.json';

    // 打开文件（只读）
    $file = fopen($path,'r');

    // 读取文件内容
    $content = fread($file,filesize($path));

    // json->array
    $data = json_decode($content);


    // $data = array_slice($data,$qty*($page-1),$qty);

    // 格式化数据
    $res = array(
        "total" => count($data),
        "data" => array_slice($data,$qty*($page),$qty),
        "qty" => $qty*1,
        "page" => $page*1
    );

    echo json_encode($res,JSON_UNESCAPED_UNICODE);

    
?>