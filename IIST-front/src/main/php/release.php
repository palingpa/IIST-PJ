<?php
$is_changed = $_POST["is_changed"];//0为发布，1为修改
$Name = $_POST["Name"];
$Author = $_POST["Author"];
$Price = $_POST["Price"];
$Intro = $_POST["Intro"];
$Era = $_POST["Era"];
$Year = $_POST["Year"];
$Genre = $_POST["Genre"];
$Length = $_POST["Length"];
$Width = $_POST["Width"];
$Pub = $_POST["Pub"];
$Pub = (int)$Pub;
$paint_id = $_POST["paint_id"];
$paint_id = (int)$paint_id;
$Date = date("Y-m-d");
if($is_changed == '0'){//发布艺术品
    $Img = addslashes(file_get_contents($_FILES["Img"]["tmp_name"]));//把整个文件读入一个字符串，用addslashes为存在字符串做准备
    if(!empty($Img) && !empty($Name) && !empty($Author) && !empty($Price) && !empty($Intro) && !empty($Era) && !empty($Year) && !empty($Genre) && !empty($Length) && !empty($Width) && !empty($Pub)){
        //建立连接
        $conn = mysqli_connect('localhost', 'root', '123456', 'art');
        $msg = '';
        //发布成功
        $sql = "INSERT INTO painting(Img, Name, Author, Price, Intro, Era, Year, Genre, Length, Width, Pub, Heat, Sold, Date, Changed) VALUES ('$Img', '$Name', '$Author', '$Price', '$Intro', '$Era', '$Year', '$Genre', '$Length', '$Width', '$Pub', '0', '0', '$Date', '0')";
        $ret = mysqli_query($conn, $sql);
        $msg = '1';
        //返回参数
        echo json_encode(array("msg"=>$msg));
    }
}
else if($is_changed == '1'){//修改艺术品
    if(!empty($Name) && !empty($Author) && !empty($Price) && !empty($Intro) && !empty($Era) && !empty($Year) && !empty($Genre) && !empty($Length) && !empty($Width) && !empty($Pub)){
        //建立连接
        $conn = mysqli_connect('localhost', 'root', '123456', 'art');
        $msg = '';
        //是否为本人发布艺术品
        $sql = "SELECT Pub From painting WHERE id=$paint_id";
        $ret = mysqli_query($conn, $sql);
        $row = mysqli_fetch_array($ret);
        $row["Pub"] = (int)$row["Pub"];
        if($row["Pub"] !== $Pub){//不是本人发布的艺术品
            $msg = 'not';
        }
        else{
            //修改成功
            $sql = "UPDATE painting SET Name='$Name', Author='$Author', Price='$Price', Intro='$Intro', Era='$Era', Year='$Year', Genre='$Genre', Length='$Length', Width='$Width', Changed=1 WHERE id=$paint_id";
            $ret = mysqli_query($conn, $sql);
            $msg = '2';
        }
        //返回参数
        echo json_encode(array("msg"=>$msg));
    }
}
