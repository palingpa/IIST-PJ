<?php
$paint_id = $_POST["paint_id"];
$paint_id = (int)$paint_id;
$buyer_id = $_POST["buyer_id"];
$buyer_id = (int)$buyer_id;
//建立连接
$conn = mysqli_connect('localhost', 'root', '123456', 'art');
$msg = '';
//不允许添加已在当前用户购物车内的艺术品，或“已售出”的艺术品
$sql = "SELECT id,Sold FROM painting WHERE id=$paint_id";
$ret = mysqli_query($conn, $sql);
$row = mysqli_fetch_array($ret);
if($row["Sold"] === '1'){//该艺术品已售出
    $msg = "sold";
    echo json_encode(array("msg"=>$msg));
    return false;
}
else{//该艺术品未售出
    $sql = "SELECT paint_id,buyer_id FROM cart WHERE paint_id=$paint_id AND buyer_id = $buyer_id";
    $ret = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($ret);
    if(!empty($row)){//该艺术品已在该用户购物车内
        $msg = "cart";
        echo json_encode(array("msg"=>$msg));
        return false;
    }
    else{//添加成功
        $sql = "INSERT INTO cart(paint_id, buyer_id) VALUES ('$paint_id', '$buyer_id')";
        $ret = mysqli_query($conn, $sql);
        $msg = "success";
        echo json_encode(array("msg"=>$msg));
    }
}