<?php
//建立连接
$conn = mysqli_connect('localhost', 'root', '123456', 'art');
$msg = '';
$Img_1 = '';
$Img_2 = '';
$Img_3 = '';

$sql = "SELECT Img FROM painting ORDER BY id desc LIMIT 3";//按id降序查询
$ret = mysqli_query($conn, $sql);
$row = mysqli_fetch_all($ret,MYSQLI_ASSOC);
$row_1 = $row[0];
$row_2 = $row[1];
$row_3 = $row[2];

//获得Base64编码
$Img_1 = base64_encode($row_1['Img']);
$Img_2 = base64_encode($row_2['Img']);
$Img_3 = base64_encode($row_3['Img']);

$sql = "SELECT id, Name, Author, Date, Price, Year FROM painting ORDER BY id desc LIMIT 3";//按id降序查询
$ret = mysqli_query($conn, $sql);
$row = mysqli_fetch_all($ret,MYSQLI_ASSOC);
$row_1 = $row[0];
$row_2 = $row[1];
$row_3 = $row[2];

$msg = 'success';
echo json_encode(array("Img_1"=>$Img_1, "data_1"=>$row_1, "Img_2"=>$Img_2,"data_2"=>$row_2, "Img_3"=>$Img_3,"data_3"=>$row_3, "msg"=>$msg));
