function Release(){
    if(location.href.indexOf("?") !== -1){//修改艺术品
        Change(1);
    }
    else{//发布艺术品
        Publish(0);
    }
}




function Publish(is_changed){
    if(check_name() && check_author() && check_price() && check_era() && check_year() && check_genre() && check_length() && check_width() && check_intro()){
        let Name = document.getElementById("Name").value;
        let Author = document.getElementById("Author").value;
        let Price = document.getElementById("Price").value;
        let Intro = document.getElementById("Intro").value;
        let Era = document.getElementById("Era").value;
        let Year = document.getElementById("Year").value;
        let Genre = document.getElementById("Genre").value;
        let Length = document.getElementById("Length").value;
        let Width = document.getElementById("Width").value;
        let Img = document.getElementById("Img").files[0];
        let Pub = GetCookies("id");
        let paint_id = location.href.substring(location.href.indexOf("?")+10 , location.href.length);
        let Form = new FormData();
        Form.append("Name", Name);
        Form.append("Author", Author);
        Form.append("Price", Price);
        Form.append("Intro", Intro);
        Form.append("Era", Era);
        Form.append("Year", Year);
        Form.append("Genre", Genre);
        Form.append("Length", Length);
        Form.append("Width", Width);
        Form.append("Img", Img);
        Form.append("Pub", Pub);
        Form.append("is_changed", is_changed);
        Form.append("paint_id", paint_id);

        //参考https://blog.csdn.net/xiao__jia__jia/article/details/82947652
        $.ajax({
            url: 'http://localhost/release.php',
            type: 'post',
            data: Form,
            processData: false,
            contentType: false,
            dataType: 'json',
            success: function (resp){
                if(resp.msg === "1"){
                    alert("发布成功");
                    document.getElementById("reset_button").click();//清除表单
                }
            }
        })

    }
    else{
        alert("请检查您的表单");
    }
}

function Change(is_changed){
    if(check_name() && check_author() && check_price() && check_era() && check_year() && check_genre() && check_length() && check_width() && check_intro()){
        let Name = document.getElementById("Name").value;
        let Author = document.getElementById("Author").value;
        let Price = document.getElementById("Price").value;
        let Intro = document.getElementById("Intro").value;
        let Era = document.getElementById("Era").value;
        let Year = document.getElementById("Year").value;
        let Genre = document.getElementById("Genre").value;
        let Length = document.getElementById("Length").value;
        let Width = document.getElementById("Width").value;
        // let Img = document.getElementById("Img").files[0];
        let Pub = GetCookies("id");
        let paint_id = location.href.substring(location.href.indexOf("?")+10 , location.href.length);
        let Form = new FormData();
        Form.append("Name", Name);
        Form.append("Author", Author);
        Form.append("Price", Price);
        Form.append("Intro", Intro);
        Form.append("Era", Era);
        Form.append("Year", Year);
        Form.append("Genre", Genre);
        Form.append("Length", Length);
        Form.append("Width", Width);
        // Form.append("Img", Img);
        Form.append("Pub", Pub);
        Form.append("is_changed", is_changed);
        Form.append("paint_id", paint_id);
        //参考https://blog.csdn.net/xiao__jia__jia/article/details/82947652
        $.ajax({
            url: 'http://localhost/release.php',
            type: 'post',
            data: Form,
            processData: false,
            contentType: false,
            dataType: 'json',
            success: function (resp){
                if(resp.msg === "not"){
                    alert("不能修改非自己发布的艺术品");
                    location.reload();
                }
                if(resp.msg === "2"){
                    alert("修改成功");
                    location.reload();
                }
            }
        })

    }
    else{
        alert("请检查您的表单");
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

function Reset(){
    //初始化错误提示
    document.getElementById("name_null").style.cssText = "display: none";
    document.getElementById("author_null").style.cssText = "display: none";
    document.getElementById("price_null").style.cssText = "display: none";
    document.getElementById("price_wrong").style.cssText = "display: none";
    document.getElementById("era_null").style.cssText = "display: none";
    document.getElementById("year_null").style.cssText = "display: none";
    document.getElementById("year_wrong").style.cssText = "display: none";
    document.getElementById("genre_null").style.cssText = "display: none";
    document.getElementById("length_null").style.cssText = "display: none";
    document.getElementById("length_wrong").style.cssText = "display: none";
    document.getElementById("width_null").style.cssText = "display: none";
    document.getElementById("width_wrong").style.cssText = "display: none";
    document.getElementById("intro_null").style.cssText = "display: none";
    document.getElementById("preview").src = "";
}

function Load(){
    let Img = document.getElementById("Img");
    let preview = document.getElementById("preview");
    let fr = new FileReader();
    //读取图片
    fr.readAsDataURL(Img.files[0]);//不是很懂，CSDN抄的
    fr.onload = function (e){
        preview.src = e.target.result;
        // var SRC = e.target.result;
    }
}

function check_name(){
    //初始化错误提示
    document.getElementById("name_null").style.cssText = "display: none";
    let Name = document.getElementById("Name").value;
    if(Name === ''){
        document.getElementById("name_null").style.cssText = "display: inline-block; font-size: 13px; color: red; width: 100%; position: relative; right: 10px;";
        return false;
    }
    return true;
}

function check_author(){
    //初始化错误提示
    document.getElementById("author_null").style.cssText = "display: none";
    let Author = document.getElementById("Author").value;
    if(Author === ''){
        document.getElementById("author_null").style.cssText = "display: inline-block; font-size: 13px; color: red; width: 100%; position: relative; right: 10px;";
        return false;
    }
    return true;
}

function check_price(){
    //初始化错误提示
    document.getElementById("price_null").style.cssText = "display: none";
    document.getElementById("price_wrong").style.cssText = "display: none";
    let Price = document.getElementById("Price").value;
    let Reg = new RegExp("^[0-9]*$");
    if(Price === ''){
        document.getElementById("price_null").style.cssText = "display: inline-block; font-size: 13px; color: red; width: 100%; position: relative; right: 10px;";
        return false;
    }
    if(!Reg.test(Price)){
        document.getElementById("price_wrong").style.cssText = "display: inline-block; font-size: 13px; color: red; width: 100%; position: relative; right: 10px;";
        return false;
    }
    return true;
}

function check_era(){
    //初始化错误提示
    document.getElementById("era_null").style.cssText = "display: none";
    let Era = document.getElementById("Era").value;
    if(Era === ''){
        document.getElementById("era_null").style.cssText = "display: inline-block; font-size: 13px; color: red; width: 100%; position: relative; right: 10px;";
        return false;
    }
    return true;
}

function check_year(){
    //初始化错误提示
    document.getElementById("year_null").style.cssText = "display: none";
    document.getElementById("year_wrong").style.cssText = "display: none";
    let Year = document.getElementById("Year").value;
    let Reg = new RegExp("^[0-9]*$");
    if(Year === ''){
        document.getElementById("year_null").style.cssText = "display: inline-block; font-size: 13px; color: red; width: 100%; position: relative; right: 10px;";
        return false;
    }
    if(!Reg.test(Year)){
        document.getElementById("year_wrong").style.cssText = "display: inline-block; font-size: 13px; color: red; width: 100%; position: relative; right: 10px;";
        return false;
    }
    return true;
}

function check_genre(){
    //初始化错误提示
    document.getElementById("genre_null").style.cssText = "display: none";
    let Genre = document.getElementById("Genre").value;
    if(Genre === ''){
        document.getElementById("genre_null").style.cssText = "display: inline-block; font-size: 13px; color: red; width: 100%; position: relative; right: 10px;";
        return false;
    }
    return true;
}

function check_length(){
    //初始化错误提示
    document.getElementById("length_null").style.cssText = "display: none";
    document.getElementById("length_wrong").style.cssText = "display: none";
    let Length = document.getElementById("Length").value;
    let Reg = new RegExp("^[0-9.]*$");
    if(Length === ''){
        document.getElementById("length_null").style.cssText = "display: inline-block; font-size: 13px; color: red; width: 100%; position: relative; right: 10px;";
        return false;
    }
    if(!Reg.test(Length)){
        document.getElementById("length_wrong").style.cssText = "display: inline-block; font-size: 13px; color: red; width: 100%; position: relative; right: 10px;";
        return false;
    }
    return true;
}

function check_width(){
    //初始化错误提示
    document.getElementById("width_null").style.cssText = "display: none";
    document.getElementById("width_wrong").style.cssText = "display: none";
    let Width = document.getElementById("Width").value;
    let Reg = new RegExp("^[0-9.]*$");
    if(Width === ''){
        document.getElementById("width_null").style.cssText = "display: inline-block; font-size: 13px; color: red; width: 100%; position: relative; right: 10px;";
        return false;
    }
    if(!Reg.test(Width)){
        document.getElementById("width_wrong").style.cssText = "display: inline-block; font-size: 13px; color: red; width: 100%; position: relative; right: 10px;";
        return false;
    }
    return true;
}

function check_intro(){
    //初始化错误提示
    document.getElementById("intro_null").style.cssText = "display: none";
    let Intro = document.getElementById("Intro").value;
    if(Intro === ''){
        document.getElementById("intro_null").style.cssText = "display: inline-block; font-size: 13px; color: red; width: 100%; position: relative; right: 332px;";
        return false;
    }
    return true;
}



