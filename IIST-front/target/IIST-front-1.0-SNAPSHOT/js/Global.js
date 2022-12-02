function fake_search(){//非搜索页面点击搜索按钮的假搜索
    window.location.replace("http://localhost:8080/Search.html");
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

function LogOut(){
    if (confirm("是否要退出登录？")) {
        let expires = new Date();
        expires.setTime(expires.getTime() - 1);
        document.cookie = 'id=0;expires=' + expires.toUTCString();
        document.cookie = 'Logined=0;expires=' + expires.toUTCString();
        window.location.href="../HomePage.html";
    }
}
