<?php
$type = $_POST["type"];
$order = $_POST["order"];
$value = $_POST["value"];
$all = $_POST["all"];
$mode = 0;//搜索模式
//返回参数
$msg = 'dddd';
$total_page = 0;
$number = 0;
$row = array();

if($all == 1){
    switch ($order){
        case "price":
            $mode = 7;
            break;
        case "name":
            $mode = 8;
            break;
        case "heat":
            $mode = 9;
            break;
    }
}
else{
    if($type === 'Name'){
        switch ($order){
            case "price":
                $mode = 1;
                break;
            case "name":
                $mode = 2;
                break;
            case "heat":
                $mode = 3;
                break;
        }
    }
    else if($type === 'Author'){
        switch ($order){
            case "price":
                $mode = 4;
                break;
            case "name":
                $mode = 5;
                break;
            case "heat":
                $mode = 6;
                break;
        }
    }
}
//建立连接
$conn = mysqli_connect('localhost', 'root', '123456', 'art');
switch($mode){
    case 1:{//按姓名搜索，价格排序
        $sql = "SELECT id FROM painting WHERE Name LIKE '%$value%' ORDER BY Price DESC";
        $ret = mysqli_query($conn, $sql);
        $row = mysqli_fetch_all($ret, MYSQLI_ASSOC);
        $number = sizeof($row);
        $total_page = ceil($number/6);
        break;
    }
    case 2:{
        $sql = "SELECT id FROM painting WHERE Name LIKE '%$value%' ORDER BY Name";
        $ret = mysqli_query($conn, $sql);
        $row = mysqli_fetch_all($ret, MYSQLI_ASSOC);
        $number = sizeof($row);
        $total_page = ceil($number/6);
        break;
    }
    case 3:{
        $sql = "SELECT id FROM painting WHERE Name LIKE '%$value%' ORDER BY Heat DESC";
        $ret = mysqli_query($conn, $sql);
        $row = mysqli_fetch_all($ret, MYSQLI_ASSOC);
        $number = sizeof($row);
        $total_page = ceil($number/6);
        break;
    }
    case 4:{
        $sql = "SELECT id FROM painting WHERE Author LIKE '%$value%' ORDER BY Price DESC";
        $ret = mysqli_query($conn, $sql);
        $row = mysqli_fetch_all($ret, MYSQLI_ASSOC);
        $number = sizeof($row);
        $total_page = ceil($number/6);
        break;
    }
    case 5:{
        $sql = "SELECT id FROM painting WHERE Author LIKE '%$value%' ORDER BY Name";
        $ret = mysqli_query($conn, $sql);
        $row = mysqli_fetch_all($ret, MYSQLI_ASSOC);
        $number = sizeof($row);
        $total_page = ceil($number/6);
        break;
    }
    case 6:{
        $sql = "SELECT id FROM painting WHERE Author LIKE '%$value%' ORDER BY Heat DESC";
        $ret = mysqli_query($conn, $sql);
        $row = mysqli_fetch_all($ret, MYSQLI_ASSOC);
        $number = sizeof($row);
        $total_page = ceil($number/6);
        break;
    }
    case 7:{
        $sql = "SELECT id FROM painting ORDER BY Price DESC";
        $ret = mysqli_query($conn, $sql);
        $row = mysqli_fetch_all($ret, MYSQLI_ASSOC);
        $number = sizeof($row);
        $total_page = ceil($number/6);
        break;
    }
    case 8:{
        $sql = "SELECT id FROM painting ORDER BY Name";
        $ret = mysqli_query($conn, $sql);
        $row = mysqli_fetch_all($ret, MYSQLI_ASSOC);
        $number = sizeof($row);
        $total_page = ceil($number/6);
        break;
    }
    case 9:{
        $sql = "SELECT id FROM painting ORDER BY Heat DESC";
        $ret = mysqli_query($conn, $sql);
        $row = mysqli_fetch_all($ret, MYSQLI_ASSOC);
        $number = sizeof($row);
        $total_page = ceil($number/6);
        break;
    }
}
echo json_encode(array("number"=>$number,"data"=>$row,"total_page"=>$total_page));
