<?php
$id = $_POST["id"];
$id = (int)$id;
//建立连接
$conn = mysqli_connect('localhost', 'root', '123456', 'art');
$msg = '';
$data = '';
$sql = "SELECT UserName, Phone, Email, Addr, Balance FROM user WHERE id=$id";
$ret = mysqli_query($conn, $sql);
$row = mysqli_fetch_array($ret);
if(!empty($ret)){
    $msg = 'success';
    echo json_encode(array("data"=>$row,"msg"=>$msg));
}
else{
    $msg = 'error';
    echo json_encode(array("msg"=>$msg));
    return false;
}