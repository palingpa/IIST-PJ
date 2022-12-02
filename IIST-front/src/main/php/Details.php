<?php
$id = $_POST["id"];
//建立连接
$conn = mysqli_connect('localhost', 'root', '123456', 'art');
$msg = '';
$Img = '';
$data = '';
//查找id为$id的艺术品
$id = (int)$id;
$sql = "SELECT id FROM painting WHERE id=$id";
$ret = mysqli_query($conn, $sql);
$row = mysqli_fetch_array($ret);
if(!empty($row)){//若该艺术品存在
    $msg = 'success';
    //访问量+1
    $sql_heat = "UPDATE painting SET heat=heat+1 WHERE id=$id";
    $ret_heat = mysqli_query($conn, $sql_heat);
    //获取详细信息
    $sql_t = "SELECT id, Img, Name, Author, Price, Intro, Era, Year, Genre, Length, Width, Pub, Date, Heat, Sold FROM painting WHERE id=$id";
    $ret_t = mysqli_query($conn, $sql_t);
    $row_t = mysqli_fetch_array($ret_t);
    $Img = base64_encode($row_t['Img']);//获得Base64编码
    $sql_t = "SELECT id, Name, Author, Price, Intro, Era, Year, Genre, Length, Width, Pub, Date, Heat, Sold, Intro FROM painting WHERE id=$id";
    $ret_t = mysqli_query($conn, $sql_t);
    $row_t = mysqli_fetch_array($ret_t);
    //根据发布者id查到发布者用户名并赋值给返回表
    $pub_t = $row_t["Pub"];
    $sql_name = "SELECT UserName From user WHERE id='$pub_t'";
    $ret_name = mysqli_query($conn, $sql_name);
    $row_name = mysqli_fetch_array($ret_name);
    $row_t["Pub"] = $row_name["UserName"];
    echo json_encode(array("Img"=>$Img,"data"=>$row_t,"msg"=>$msg));
}
else{//艺术品不存在
    $msg = 'error';
    echo json_encode(array("msg"=>$msg));
    return false;
}



