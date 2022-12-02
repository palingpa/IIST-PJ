<?php
$id = $_POST["id"];
$id = (int)$id;
//初始化返回参数
$number = 0;//总数
$data = array();//重要！！！
//建立连接
$conn = mysqli_connect('localhost', 'root', '123456', 'art');
$sql = "SELECT paint_id, buyer_id, order_time FROM orders WHERE pub_id = $id";
$ret = mysqli_query($conn, $sql);
$row = mysqli_fetch_all($ret, MYSQLI_ASSOC);//debug了好久，fetch_all!!!
$number = sizeof($row);

for($i = 0; $i < $number; $i++){
    $temp = (int)$row[$i]["paint_id"];
    $temp_user = $row[$i]["buyer_id"];
    $sql_t = "SELECT UserName FROM user WHERE id = $temp_user";
    $ret_t = mysqli_query($conn, $sql_t);
    $row_t = mysqli_fetch_array($ret_t);
    $data[$i]["buyer_id"] = $row_t["UserName"];
    $data[$i]["order_time"] = $row[$i]["order_time"];
    $sql_t = "SELECT Name, Price FROM painting WHERE id = $temp";
    $ret_t = mysqli_query($conn, $sql_t);
    $row_t = mysqli_fetch_array($ret_t);
    $data[$i]["Name"] = $row_t["Name"];
    $data[$i]["Price"] = $row_t["Price"];
    $data[$i]["paint_id"] = $row[$i]["paint_id"];
}
echo json_encode(array("number"=>$number,"data"=>$data));