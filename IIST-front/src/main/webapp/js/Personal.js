function GetCookies(cname){//整个函数均copy from菜鸟教程，我还没搞懂
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i=0; i<ca.length; i++)
    {
        let c = ca[i].trim();
        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
}

function Recharge(){
    let id = GetCookies("id");
    let amount = prompt("请输入充值金额：","");
    let Reg = new RegExp("^[0-9]*$")
    if(amount != null){
        if (Reg.test(amount)) {
            if (confirm("充值金额为：" + amount + " 元")) {
                $.post("http://localhost/recharge.php", {
                    id: id,
                    amount: amount
                }, function (resp) {
                    if (resp.msg === 'success') {
                        alert("充值成功");
                        document.getElementById("Balance").innerText = "余额：" + resp.data["Balance"];
                    }
                }, "json")
            }
        } else {
            alert("充值失败，请输入整数金额");
        }
    }



}

function Create(){
    if(GetCookies("Logined") !== '1'){//用户未登录
        alert("请先登录");
        window.location.replace("http://localhost:8080/Login.html");
    }
    else{//用户已登录
        GetUserInfo();
        create_order();
        create_pub();
        create_sold();
    }
}

function GetUserInfo(){
    let id = GetCookies("id");
    $.post("http://localhost/personal.php", {
        id: id
    }, function(resp) {
        //为前端赋值
        document.getElementById("UserName").innerText = "用户：" + resp.data["UserName"];
        document.getElementById("Phone").innerText = "电话：" + resp.data["Phone"];
        document.getElementById("Email").innerText = "邮箱：" + resp.data["Email"];
        document.getElementById("Addr").innerText = "地址：" + resp.data["Addr"];
        document.getElementById("Balance").innerText = "余额：" + resp.data["Balance"];
    },"json")
}

function create_order(){
    let id = GetCookies("id");
    $.post("http://localhost/create_order.php", {
        id: id
    }, function(resp) {
        let number = resp.number;
        if(number !== '0'){//若订单列表不为空
            //隐藏order_null
            document.getElementById("order_null").style.cssText = "display: none;"
            //循环创建n个新piece
            let sourceNode = document.getElementById("order_clone"); //获得被克隆的节点对象
            for (let i=0; i < resp.number; i++) {
                let clonedNode = sourceNode.cloneNode(true); //克隆节点
                clonedNode.setAttribute("id", "order_clone-" + (i+1));
                clonedNode.style.cssText = "display:block";
                //给每一项详细信息赋值
                clonedNode.getElementsByClassName("order_id")[0].innerText = " 订单编号：" + resp.data[i]["id"];
                clonedNode.getElementsByClassName("order_name")[0].innerText = " 艺术品名称：" + resp.data[i]["Name"];
                clonedNode.getElementsByClassName("order_time")[0].innerText = " 订单时间：" + resp.data[i]["time"];
                clonedNode.getElementsByClassName("order_price")[0].innerText = " 订单金额：" + resp.data[i]["Price"] + " 元";
                //给跳转链接提供参数
                clonedNode.onclick = function(){window.location.replace("http://localhost:8080/Details.html?paint_id=" + resp.data[i]["paint_id"]);};
                //在父节点插入克隆的节点
                sourceNode.parentNode.appendChild(clonedNode);
            }
        }
    },"json")
}

function create_pub(){
    let id = GetCookies("id");
    $.post("http://localhost/create_pub.php", {
        id: id
    }, function(resp) {
        let number = resp.number;
        if(number !== '0'){//若订单列表不为空
            //隐藏order_null
            document.getElementById("pub_null").style.cssText = "display: none;"
            //循环创建n个新piece
            let sourceNode = document.getElementById("pub_clone"); //获得被克隆的节点对象
            for (let i=0; i < resp.number; i++) {
                let clonedNode = sourceNode.cloneNode(true); //克隆节点
                clonedNode.setAttribute("id", "pub_clone-" + (i+1));
                clonedNode.style.cssText = "display:block";
                //给每一项详细信息赋值
                clonedNode.getElementsByClassName("pub_name")[0].innerText = " 艺术品名称：" + resp.data[i]["Name"];
                clonedNode.getElementsByClassName("pub_date")[0].innerText = " 发布日期：" + resp.data[i]["Date"];
                //给跳转链接提供参数
                let bt1=document.createElement('input');
                bt1.className = "pub_modify";
                bt1.type = "button";
                bt1.onclick = function(){modify_art(resp.data[i]["id"])};
                bt1.value = "修改";
                let bt2=document.createElement('input');
                bt2.className = "pub_delete";
                bt2.type = "button";
                bt2.onclick = function(){delete_art(resp.data[i]["id"])};
                clonedNode.getElementsByClassName("pub_date")[0].appendChild(bt1);
                clonedNode.getElementsByClassName("pub_date")[0].appendChild(bt2);
                bt2.value = "删除";
                //在父节点插入克隆的节点
                sourceNode.parentNode.appendChild(clonedNode);
            }
        }
    },"json")
}

function modify_art(paint_id){
    window.location.replace("http://localhost:8080/Release.html?paint_id=" + paint_id);
}

function delete_art(paint_id){
    let id = GetCookies("id");
    if(confirm("是否要删除该艺术品")){
        $.post("http://localhost/delete_art.php", {
            id: id,
            paint_id: paint_id
        }, function (resp){
            if(resp.msg === 'sold'){//该艺术品已被售出
                alert("该艺术品已售出，无法删除")
            }
            else{
            }
        }, "json")
    }
}

function create_sold(){
    let id = GetCookies("id");
    $.post("http://localhost/create_sold.php", {
        id: id
    }, function(resp) {
        let number = resp.number;
        if(number !== '0'){//若订单列表不为空
            //隐藏order_null
            document.getElementById("sold_null").style.cssText = "display: none;"
            //循环创建n个新piece
            let sourceNode = document.getElementById("sold_clone"); //获得被克隆的节点对象
            for (let i=0; i < resp.number; i++) {
                let clonedNode = sourceNode.cloneNode(true); //克隆节点
                clonedNode.setAttribute("id", "sold_clone-" + (i+1));
                clonedNode.style.cssText = "display:block";
                //给每一项详细信息赋值
                clonedNode.getElementsByClassName("sold_name")[0].innerText = " 艺术品名称：" + resp.data[i]["Name"];
                clonedNode.getElementsByClassName("sold_buyer")[0].innerText = " 购买用户：" + resp.data[i]["buyer_id"];
                clonedNode.getElementsByClassName("sold_date")[0].innerText = " 订单时间：" + resp.data[i]["order_time"];
                clonedNode.getElementsByClassName("sold_price")[0].innerText = " 订单金额：" + resp.data[i]["Price"] + " 元";
                //给跳转链接提供参数
                clonedNode.onclick = function(){window.location.replace("http://localhost:8080/Details.html?paint_id=" + resp.data[i]["paint_id"]);};
                //在父节点插入克隆的节点
                sourceNode.parentNode.appendChild(clonedNode);
            }
        }
    },"json")
}