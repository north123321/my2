<?php
//连接数据库
require("connect.php");
$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM `stu` WHERE username = '$username'";

//执行sql语句,查询结果
$result = $conn -> query($sql);
$row = $result -> fetch_all(MYSQLI_ASSOC);

if($row[0]['username']===$username){
    echo "登录成功";
}else{
    $sql = "INSERT INTO `stu`(`username`) VALUES ('$username')";
    $conn -> query($sql);
    echo "登录失败";
}
$conn -> close();
// 关闭数据库，避免资源浪费

?>