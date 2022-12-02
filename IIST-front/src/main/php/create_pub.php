<?php
$id = $_POST["id"];
$id = (int)$id;
//初始化返回参数
$number = 0;//总数
$data = array();//重要！！！
//建立连接
$conn = mysqli_connect('localhost', 'root', '123456', 'art');
$sql = "SELECT id, Name, Date FROM painting WHERE Pub = $id";
$ret = mysqli_query($conn, $sql);
$row = mysqli_fetch_all($ret, MYSQLI_ASSOC);
$number = sizeof($row);

for($i = 0; $i < $number; $i++){
    $data[$i]["Name"] = $row[$i]["Name"];
    $data[$i]["Date"] = $row[$i]["Date"];
    $data[$i]["id"] = $row[$i]["id"];
}
echo json_encode(array("number"=>$number,"data"=>$data));