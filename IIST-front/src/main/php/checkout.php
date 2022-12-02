<?php
//1.将购物车中艺术品的状态设置为“已售出”
//2.为每件购买的艺术品生成一个订单（即记录艺术品名称、订单金额（即该艺术品售价）并生成订单编号与订单时间）
//3.清空购物车
//4.扣款
//5.出售者账户余额需增加
$id = $_POST["id"];
$id = (int)$id;
$msg = '';
$conn = mysqli_connect('localhost', 'root', '123456', 'art');
$sql = "SELECT paint_id FROM cart WHERE buyer_id = $id";
$ret = mysqli_query($conn, $sql);
while($row = mysqli_fetch_array($ret, MYSQLI_ASSOC)){//朴素的写法，爱来自菜鸟教程
    //获取该艺术品基本信息
    $temp_id = $row["paint_id"];
    $sql_temp = "SELECT Name, Price, Pub FROM painting WHERE id = $temp_id";
    $ret_temp = mysqli_query($conn, $sql_temp);
    $row_temp = mysqli_fetch_array($ret_temp);
    $temp_Name = $row_temp["Name"];
    $temp_Price = $row_temp["Price"];
    $temp_Pub = $row_temp["Pub"];
    //1.将艺术品的状态设置为“已售出”
    $sql_1 = "UPDATE painting SET Sold = 1 WHERE id = $temp_id";
    $ret_1 = mysqli_query($conn, $sql_1);
    //我恨order我恨order我恨order我恨order我恨order我恨order我恨order我恨order我恨order我恨order我恨order我恨order我恨order我恨order
    //2.为艺术品生成一个订单,即记录艺术品名称、订单金额并生成订单编号与订单时间
    $temp_time = date("Y-m-d H:i:s");
    $sql_2 = "INSERT INTO orders(order_time, paint_id, buyer_id, pub_id) VALUES ('$temp_time', '$temp_id', '$id', '$temp_Pub')";
    $ret_2 = mysqli_query($conn, $sql_2);
    //3.清空购物车
    $sql_3 = "DELETE FROM cart WHERE paint_id = $temp_id AND buyer_id = $id";
    $ret_3 = mysqli_query($conn, $sql_3);
    //4.扣款
    $sql_4 = "UPDATE user SET Balance = (Balance - $temp_Price) WHERE id = $id";
    $ret_4 = mysqli_query($conn, $sql_4);
    //5.出售者账户余额需增加
    $sql_5 = "UPDATE user SET Balance = (Balance + $temp_Price) WHERE id = $temp_Pub";
    $ret_5 = mysqli_query($conn, $sql_5);
}
$msg = 'success';
echo json_encode(array("msg"=>$msg));