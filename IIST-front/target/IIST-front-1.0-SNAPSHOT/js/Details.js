function AddToCart(){
    let Logined = GetCookies("Logined");
    let paint_id = Number(location.href.substring(location.href.indexOf("?")+10 , location.href.length));
    if(Logined === '1'){//用户已登录
        let buyer_id = GetCookies("id");
        $.post("http://localhost/add_to_cart.php", {
            paint_id: paint_id,
            buyer_id: buyer_id
        }, function (resp){
            if(resp.msg === 'sold')
                alert("添加失败，该艺术品已售出");
            if(resp.msg === 'cart')
                alert("添加失败，该艺术品已在您的购物车内");
            if(resp.msg === 'success')
                alert("添加成功");
        }, "json")
    }
    else{//用户未登录
        alert("请先登录");
        window.location.replace("http://localhost:8080/Login.html");
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

function Create(){//进入艺术品详情页时加载
    let paint_id = Number(location.href.substring(location.href.indexOf("?")+10 , location.href.length));//http://localhost:8080/Details.html?paint_id=x
    //alert(paint_id);
    let Img = '';
    $.post("http://localhost/Details.php", {
        id: paint_id
    }, function(resp) {
            Img = "data:image/png;base64," + resp.Img;
            //为前端赋值
            document.getElementById("Img").src = Img;
            document.getElementById("Name").innerText = resp.data["Name"];
            document.getElementById("Heat").innerText = "访问量：" + resp.data["Heat"];
            document.getElementById("Author").innerText = resp.data["Author"];
            document.getElementById("Year").innerText = resp.data["Year"];
            document.getElementById("Price").innerText = "￥" + resp.data["Price"];
            document.getElementById("Pub").innerText = resp.data["Pub"];
            document.getElementById("Date").innerText = resp.data["Date"];
            document.getElementById("Genre").innerText = resp.data["Genre"];
            document.getElementById("Era").innerText = resp.data["Era"];
            document.getElementById("Length").innerText = resp.data["Length"] + " cm";
            document.getElementById("Width").innerText = resp.data["Width"] + " cm";
            if(resp.data["Sold"] === '1'){
                document.getElementById("Sold").innerText = "已售出";
            }
            else if(resp.data["Sold"] === '0'){
                document.getElementById("Sold").innerText = "未售出";
            }

    },"json")

}