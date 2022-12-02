let total_sum = 0;
let sold = 0;

function Create(){
    if(GetCookies("Logined") !== '1'){//用户未登录
        alert("请先登录");
        window.location.replace("http://localhost:8080/Login.html");
    }
    else{//用户已登录
        let id = GetCookies("id");
        $.post("http://localhost/Cart.php", {
            id: id
        }, function (resp){
            let number = resp.number;
            if(number !== '0'){//若购物车不为空
                //隐藏cart_null
                document.getElementById("cart_null").style.cssText = "display: none;"
                //循环创建n个新piece
                let sourceNode = document.getElementById("clone"); //获得被克隆的节点对象
                for (let i=0; i < resp.number; i++) {
                    let clonedNode = sourceNode.cloneNode(true); //克隆节点
                    clonedNode.setAttribute("id", "clone-" + (i+1));
                    clonedNode.style.cssText = "display:block";
                    //给每一项详细信息赋值
                    clonedNode.getElementsByClassName("artwork_name")[0].innerText = resp.data[i]["Name"];
                    clonedNode.getElementsByClassName("artwork_img")[0].src = "data:image/png;base64," + resp.data[i]["Img"];
                    clonedNode.getElementsByClassName("artwork_author")[0].innerText = resp.data[i]["Author"];
                    clonedNode.getElementsByClassName("introduction")[0].innerText = resp.data[i]["Intro"];
                    clonedNode.getElementsByClassName("price")[0].innerText = "￥" + resp.data[i]["Price"];
                    //判定是否需要显示提示信息
                    if(resp.data[i]["Sold"] === '0')//该艺术品未售出
                        clonedNode.getElementsByClassName("is_sold")[0].style.cssText = "display: none;";
                    if(resp.data[i]["Changed"] === '0')//该艺术品不曾改动
                        clonedNode.getElementsByClassName("is_changed")[0].style.cssText = "display: none;";
                    //对sold赋值，帮助结账时判断能否结账（表达能力正在急剧下降）
                    if(resp.data[i]["Sold"] === '1')
                        sold = 1;
                    //给删除按钮提供参数
                    clonedNode.getElementsByClassName("button")[0].onclick = function(){DeleteCart(resp.data[i]["id"])};
                    //在父节点插入克隆的节点
                    sourceNode.parentNode.appendChild(clonedNode);
                }

                //购物车总价
                document.getElementById("total").innerText = "￥" + resp.total;
                total_sum = resp.total;
            }
        }, "json")
    }
}

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

function DeleteCart(paint_id){
    if(confirm("是否要将该艺术品移出购物车？")){
        $.post("http://localhost/delete_cart.php", {
            paint_id: paint_id,
            id: GetCookies("id")
        },function (resp){
            if(resp.msg === 'success'){
                window.location.replace("http://localhost:8080/Cart.html");
            }
        }, "json")
    }
}

function check_out(){
    $.post("http://localhost/personal.php", {
        id: GetCookies("id")
    }, function (resp){
        let Balance = resp.data["Balance"];
        let Phone = resp.data["Phone"];
        let Addr = resp.data["Addr"];
        if(confirm("订单总价：" + total_sum +" 元\n账户余额：" + Balance + " 元\n电话号码：" + Phone + "\n收件地址：" + Addr)){//点击确认按钮后
            if(sold === 1){//有其他用户买了
                alert("购物车中存在已被其他用户购买的艺术品，请检查您的购物车");
            }
            else{
                if(Balance >= total_sum){//若用户余额充足
                    $.post("http://localhost/checkout.php", {
                        id: GetCookies("id")
                    }, function (resp){
                        if(resp.msg === 'success'){
                            alert("购买成功");
                            window.location.replace("http://localhost:8080/Cart.html");
                        }
                    }, "json")
                }
                else{
                    alert("您的余额不足，请充值");
                    return false;
                }
            }

        }












    }, "json")

}