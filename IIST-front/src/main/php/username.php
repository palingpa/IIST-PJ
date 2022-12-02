<?php
$id = $_POST["id"];
$id = (int)$id;
//建立连接
$conn = mysqli_connect('localhost', 'root', '123456', 'art');
$UserName = '';
//查找用户名&密码
$sql_select_name = "SELECT UserName FROM user WHERE id = $id";
$ret_name = mysqli_query($conn, $sql_select_name);
$row_name = mysqli_fetch_array($ret_name);
$UserName = $row_name["UserName"];
echo json_encode(array("UserName"=>$UserName));