# 工业互联网软件技术PJ
 
电子商城系统：建立商城的商品档案（包含商品属性、搜索排序项）基础数据，用户管理；商品展示、购物车、立刻购买、结算、支付方式接口（了解）、订单查询管理。分为用户端的功能界面，以及商城平台管理端的功能界面实现。
还需要完善的部分为：改前端 + 商城平台管理端的用户管理、订单管理，其他的基本都实现了
 
## 环境
 
* HTML+CSS+JS
* PHP 8.1
* 开发于IDEA
* 用且仅用火狐浏览器测试过，在chrome上会变丑

## 前置工作

1. 上学期做PJ的时候解决跨域问题的方式很偷懒，是直接使用一个叫CORS Everywhere的火狐插件实现的（是不是要改一下？？）
 
```
安装并启动火狐插件CORS Everywhere
```
 
2. 数据库的连接是在每个.php里单独写的（是不是要改一下？？），大家运行的时候可能要自行手动改一下用户名和密码，数据库文件我也一起传上来了
 
```
用 /环境配置/art.sql生成一下数据库，并更改源代码中数据库连接语句的用户名和密码
```
 
3. 分别运行一下后端和前端
 
```
按照 /环境配置 里的图片调一下IDEA的调试配置？？我从来没试过自己的工程文件在别人的电脑上打开这部分会不会变orz
```

## 其他
放了一点现在的页面截图，展示一下现有的功能。