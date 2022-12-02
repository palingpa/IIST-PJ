<?php
$UserName = $_POST["UserName"];
$Pass = $_POST["Pass"];
if (!empty($UserName) && !empty($Pass)) {
    //建立连接
    $conn = mysqli_connect('localhost', 'root', '123456', 'art');
    //查找用户名&密码
    $sql_select_name = "SELECT UserName,Pass FROM user WHERE UserName = '$UserName' AND Pass = '$Pass'";
    $ret_name = mysqli_query($conn, $sql_select_name);
    $row_name = mysqli_fetch_array($ret_name);
    //查找电子邮箱&密码
    $sql_select_email = "SELECT Email,Pass FROM user WHERE Email = '$UserName' AND Pass = '$Pass'";
    $ret_email = mysqli_query($conn, $sql_select_email);
    $row_email = mysqli_fetch_array($ret_email);
    //返回参数
    $msg = '';
    $id = '';

    if(empty($row_name) && empty($row_email)){  //用户名或邮箱匹配失败
        //查找用户名
        $sql_select_name_t = "SELECT UserName FROM user WHERE UserName = '$UserName'";
        $ret_name_t = mysqli_query($conn, $sql_select_name_t);
        $row_name_t = mysqli_fetch_array($ret_name_t);
        //查找电子邮箱
        $sql_select_email_t = "SELECT Email FROM user WHERE Email = '$UserName'";
        $ret_email_t = mysqli_query($conn, $sql_select_email_t);
        $row_email_t = mysqli_fetch_array($ret_email_t);
        if(empty($row_name_t) && empty($row_email_t)){
            //用户名或邮箱不存在,1
            $msg = '1';
        }
        else{
            //密码错误,2
            $msg = '2';
        }
    }
    else{
        if (!empty($row_name) && ($UserName == $row_name['UserName'] && $Pass == $row_name['Pass'])) {//用户名匹配成功
            $msg = '0';//密码正确,登录成功,0
            //查找用户名对应的id
            $sql_select_id = "SELECT UserName,id FROM user WHERE UserName = '$UserName'";
            $ret_id = mysqli_query($conn, $sql_select_id);
            $row_id = mysqli_fetch_array($ret_id);
            $id = $row_id['id'];//返回id，用作cookie
        }
        if (!empty($row_email) && ($UserName == $row_email['Email'] && $Pass == $row_email['Pass'])) {//邮箱匹配成功
            $msg = '0';//密码正确,登录成功,0
            //查找邮箱对应的id
            $sql_select_id = "SELECT Email,id FROM user WHERE Email = '$UserName'";
            $ret_id = mysqli_query($conn, $sql_select_id);
            $row_id = mysqli_fetch_array($ret_id);
            $id = $row_id['id'];//返回id，用作cookie
        }
    }
    //返回参数
    echo json_encode(array("msg"=>$msg, "id"=>$id));
}

