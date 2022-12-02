<?php
$id = $_POST["id"];
$id = (int)$id;
$paint_id = $_POST["paint_id"];
$paint_id = (int)$paint_id;
$msg = '';
//建立连接
$conn = mysqli_connect('localhost', 'root', '123456', 'art');
$sql = "SELECT Sold FROM painting WHERE Pub = $id AND id = $paint_id";
$ret = mysqli_query($conn, $sql);
$row = mysqli_fetch_array($ret);
if($row["Sold"] === '1'){//该艺术品已售出
    $msg = 'sold';
    echo json_encode(array("msg"=>$msg));
    return false;
}
else{
    $sql = "DELETE FROM painting WHERE Pub = $id AND id = $paint_id";
    $ret = mysqli_query($conn, $sql);
    $msg = 'success';
    echo json_encode(array("msg"=>$msg));
}



