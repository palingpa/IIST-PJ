<?php
$id = $_POST["id"];
$amount = $_POST["amount"];
$amount = (int)$amount;
//建立连接
$conn = mysqli_connect('localhost', 'root', '123456', 'art');
$msg = '';
$sql = "UPDATE user SET Balance = $amount+Balance WHERE id=$id";
$ret = mysqli_query($conn, $sql);
$sql = "SELECT Balance FROM user WHERE id=$id";
$ret = mysqli_query($conn, $sql);
$row = mysqli_fetch_array($ret);
$msg = 'success';
echo json_encode(array("data"=>$row,"msg"=>$msg));