<?php
$id = $_POST["id"];
$id = (int)$id;
//初始化返回参数
$total = 0;//总价
$number = 0;//总数
$data = array();//重要！！！
//建立连接
$conn = mysqli_connect('localhost', 'root', '123456', 'art');
$sql = "SELECT paint_id FROM cart WHERE buyer_id = $id";
$ret = mysqli_query($conn, $sql);
$row = mysqli_fetch_all($ret, MYSQLI_ASSOC);//debug了好久，fetch_all!!!
if(empty($row)){//该用户购物车为空
    echo json_encode(array("total"=>$total,"number"=>$number));
    return false;
}
else{
    $number = sizeof($row);
    for($i = 0; $i < $number; $i++){
        $temp = (int)$row[$i]["paint_id"];
        $sql_t = "SELECT Img, Name, Author, Intro, Price, Sold, Changed, id FROM painting WHERE id = $temp";
        $ret_t = mysqli_query($conn, $sql_t);
        $row_t = mysqli_fetch_array($ret_t);
        $data[$i]["Img"] = base64_encode($row_t['Img']);
        $data[$i]["Name"] = $row_t["Name"];
        $data[$i]["Author"] = $row_t["Author"];
        $data[$i]["Intro"] = $row_t["Intro"];
        $data[$i]["Price"] = $row_t["Price"];
        $data[$i]["Sold"] = $row_t["Sold"];
        $data[$i]["Changed"] = $row_t["Changed"];
        $data[$i]["id"] = $row_t["id"];
        $total = $total + (int)$row_t["Price"];
    }
    echo json_encode(array("total"=>$total,"number"=>$number,"data"=>$data));
}




