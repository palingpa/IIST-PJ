<?php
$UserName = $_POST["UserName"];
$Pass = $_POST["Pass"];
$Email = $_POST["Email"];
$Phone = $_POST["Phone"];
$Addr = $_POST["Addr"];
if(!empty($UserName) && !empty($Pass) && !empty($Email) && !empty($Phone) && !empty($Addr)){
    //建立连接
    $conn = mysqli_connect('localhost', 'root', '123456', 'art');
    //返回参数
    $msg = '';
    //用户名已存在
    $sql_select_name = "SELECT UserName FROM user WHERE UserName = '$UserName'";
    $ret_name = mysqli_query($conn, $sql_select_name);
    $row_name = mysqli_fetch_array($ret_name);
    if(!empty($row_name)){
        $msg = 'err_name';
        echo json_encode(array("msg"=>$msg));
        return false;
    }
    //邮箱已存在
    $sql_select_email = "SELECT Email FROM user WHERE Email = '$Email'";
    $ret_email = mysqli_query($conn, $sql_select_email);
    $row_email = mysqli_fetch_array($ret_email);
    if(!empty($row_email)){
        $msg = 'err_email';
        echo json_encode(array("msg"=>$msg));
        return false;
    }
    //注册成功
    $sql = "INSERT INTO user(UserName, Pass, Email, Phone, Addr, Balance) VALUES ('$UserName', '$Pass', '$Email', '$Phone', '$Addr', '0')";
    $ret = mysqli_query($conn, $sql);
    $msg = 'success';

    //返回参数
    echo json_encode(array("msg"=>$msg));
}
