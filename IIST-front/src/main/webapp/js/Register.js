function Register(){
    let UserName = document.getElementById("UserName").value;
    let Pass = document.getElementById("Pass").value;
    let Email = document.getElementById("Email").value;
    let Phone = document.getElementById("Phone").value;
    let Addr = document.getElementById("Addr").value;
    if(check_username() && check_password() && check_repass() && check_email() && check_phone() && check_address()){
        $.post("http://localhost/register.php",{
            UserName: UserName,
            Pass: Pass,
            Email: Email,
            Phone: Phone,
            Addr: Addr
        },function(resp){
            if(resp.msg === "success"){
                alert("注册成功");
                window.location.replace("http://localhost:8080/Login.html");
            }
            else if(resp.msg === "err_name"){
                alert("注册失败，用户名已存在");
            }else if(resp.msg === "err_email"){
                alert("注册失败，邮箱已存在");
            }
        },"json")
    }
    else{
        alert("请检查您的表单")
    }
}

function check_username(){
    //初始化错误提示
    document.getElementById("username_null").style.cssText = "display: none";
    document.getElementById("username_wrong").style.cssText = "display: none";

    let UserName = document.getElementById("UserName").value;
    let Reg = new RegExp(/^[A-Za-z0-9-_]+$/);//大小写字母、数字、"_"、"-" 正则表达式还是不太懂，反正最后试出来了
    if(UserName === ''){//用户名为空
        document.getElementById("username_null").style.cssText = "display: block; font-size: 13px; color: red; position: relative; bottom: 25px; left: 132px;";
        return false;
    }
    else if(!Reg.test(UserName)){//用户名不合规范
        document.getElementById("username_wrong").style.cssText = "display: block; font-size: 13px; color: red; position: relative; bottom: 25px; left: 132px;";
        return false;
    }
    else{//用户名格式正确
        return true;
    }
}

function check_password(){
    //初始化错误提示
    document.getElementById("password_null").style.cssText = "display: none";
    document.getElementById("password_wrong").style.cssText = "display: none";
    document.getElementById("password_length").style.cssText = "display: none";
    document.getElementById("password_number").style.cssText = "display: none";
    document.getElementById("password_same").style.cssText = "display: none";

    let UserName = document.getElementById("UserName").value;
    let Pass = document.getElementById("Pass").value;
    let Reg = new RegExp("^[A-Za-z0-9-!_%&=?$\x22]+$");//大小写字母、数字与其他特殊符号
    let Reg_length = new RegExp("^.{6,}$");//长度须大于等于6位
    let Reg_number = new RegExp("^[0-9]*$");//为纯数字
    let flag = true;//返回标志
    if(Pass === ''){//密码为空
        document.getElementById("password_null").style.cssText = "display: block; font-size: 13px; color: red; position: relative; bottom: 25px; left: 132px;";
        flag = false;
    }
    else{
        if(!Reg.test(Pass)){//密码只能包含大小写字母、数字与其他特殊符号
            document.getElementById("password_wrong").style.cssText = "display: block; font-size: 13px; color: red; position: relative; bottom: 25px; left: 132px;";
            flag = false;
        }
        if(!Reg_length.test(Pass)){//密码长度须大于等于6位
            document.getElementById("password_length").style.cssText = "display: block; font-size: 13px; color: red; position: relative; bottom: 25px; left: 132px;";
            flag = false;
        }
        if(Reg_number.test(Pass)){//密码不能为纯数字
            document.getElementById("password_number").style.cssText = "display: block; font-size: 13px; color: red; position: relative; bottom: 25px; left: 132px;";
            flag = false;
        }
        if(Pass === UserName){//密码与用户名相同
            document.getElementById("password_same").style.cssText = "display: block; font-size: 13px; color: red; position: relative; bottom: 25px; left: 132px;";
            flag = false;
        }
    }
    return flag;
}

function check_repass(){
    //初始化错误提示
    document.getElementById("repass_null").style.cssText = "display: none";
    document.getElementById("repass_same").style.cssText = "display: none";

    let Pass = document.getElementById("Pass").value;
    let RePass = document.getElementById("RePass").value;
    if(RePass === ''){//确认密码为空
        document.getElementById("repass_null").style.cssText = "display: block; font-size: 13px; color: red; position: relative; bottom: 25px; left: 132px;";
        return false;
    }
    if(Pass !== RePass){//确认密码与密码不同
        document.getElementById("repass_same").style.cssText = "display: block; font-size: 13px; color: red; position: relative; bottom: 25px; left: 132px;";
        return false;
    }
    return true;
}

function check_email(){
    //初始化错误提示
    document.getElementById("email_null").style.cssText = "display: none";
    document.getElementById("email_wrong").style.cssText = "display: none";

    let Email = document.getElementById("Email").value;
    let Reg = new RegExp("^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$");//邮箱格式
    if(Email === ''){//电子邮箱为空
        document.getElementById("email_null").style.cssText = "display: block; font-size: 13px; color: red; position: relative; bottom: 25px; left: 132px;";
        return false;
    }
    if(!Reg.test(Email)){//格式错误
        document.getElementById("email_wrong").style.cssText = "display: block; font-size: 13px; color: red; position: relative; bottom: 25px; left: 132px;";
        return false;
    }
    return true;
}

function check_phone(){
    //初始化错误提示
    document.getElementById("phone_null").style.cssText = "display: none";

    let Phone = document.getElementById("Phone").value;
    if(Phone === ''){//电话号码为空
        document.getElementById("phone_null").style.cssText = "display: block; font-size: 13px; color: red; position: relative; bottom: 25px; left: 132px;";
        return false;
    }
    return true;
}

function check_address(){
    //初始化错误提示
    document.getElementById("address_null").style.cssText = "display: none";

    let Addr = document.getElementById("Addr").value;
    if(Addr === ''){//电话号码为空
        document.getElementById("address_null").style.cssText = "display: block; font-size: 13px; color: red; position: relative; bottom: 25px; left: 132px;";
        return false;
    }
    return true;
}

function Reset(){
    //初始化错误提示
    document.getElementById("username_null").style.cssText = "display: none";
    document.getElementById("username_wrong").style.cssText = "display: none";
    document.getElementById("password_null").style.cssText = "display: none";
    document.getElementById("password_wrong").style.cssText = "display: none";
    document.getElementById("password_length").style.cssText = "display: none";
    document.getElementById("password_number").style.cssText = "display: none";
    document.getElementById("password_same").style.cssText = "display: none";
    document.getElementById("repass_null").style.cssText = "display: none";
    document.getElementById("repass_same").style.cssText = "display: none";
    document.getElementById("email_null").style.cssText = "display: none";
    document.getElementById("email_wrong").style.cssText = "display: none";
    document.getElementById("phone_null").style.cssText = "display: none";
    document.getElementById("address_null").style.cssText = "display: none";
}
