function Login(){
    let UserName = document.forms["login_form"]["UserName"].value;
    let Pass = document.forms["login_form"]["Pass"].value;

    if(UserName === '' && Pass === ''){
        alert("用户名与密码为空");
    }
    else if(UserName === ''){
        alert("用户名为空");
    }
    else if(Pass === ''){
        alert("密码为空");
    }
    else{
        $.post("http://localhost/login.php", {
            UserName: UserName,
            Pass: Pass
        }, function(resp){
            if(resp.msg === '0'){
                alert("登录成功");

                //创建cookie
                document.cookie = "Logined=1;path=/";
                document.cookie = "id=" + resp.id + ";path=/";//用户id

                window.location.replace("http://localhost:8080/HomePage.html");
            }
            else if(resp.msg === '1'){
                alert("用户名或邮箱不存在");
            }else if(resp.msg === '2'){
                alert("密码错误");
            }
        },"json")
    }

}