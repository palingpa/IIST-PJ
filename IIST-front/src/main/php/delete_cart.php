<?php
$id = $_POST["id"];
$id = (int)$id;
$paint_id = $_POST["paint_id"];
$paint_id = (int)$paint_id;
$msg = '';
//建立连接
$conn = mysqli_connect('localhost', 'root', '123456', 'art');
$sql = "DELETE FROM cart WHERE buyer_id = $id AND paint_id = $paint_id";
$ret = mysqli_query($conn, $sql);
$msg = 'success';
echo json_encode(array("msg"=>$msg));

