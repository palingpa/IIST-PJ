let cur_page = 1;
let total_page = 1;


function clear_page(){
    if(document.getElementsByName("piece_delete").length !== 0){
        let temp_number = document.getElementsByName("piece_delete").length;
        for(let i=0; i<temp_number; i++){
            document.getElementsByName("piece_delete")[0].remove();
        }
    }
}

function first_page(){
    cur_page = 1;
    search();
}
function last_page(){
    cur_page = total_page;
    search();
}
function pre_page(){
    if(cur_page === 1)
        cur_page = total_page;
    else
        cur_page--;
    search();
}
function next_page(){
    if(cur_page === total_page)
        cur_page = 1;
    else
        cur_page++;
    search();
}
function jump(where){
    cur_page = where;
    search();
}




function search(){
    clear_page();
        let all = 1;
        let order = document.getElementById("search_order").value;//判断根据艺术品访问量、名称还是价格对搜索结果进行排序
        let value = document.getElementById("HeaderSearch").value;
        let type = document.getElementById("search_type").value;//判断是根据艺术品名称还是作者姓名进行搜索
        if(value !== '' && value != null)
            all = 0;
        $.post("http://localhost/create_search.php", {
            type: type,
            order: order,
            value: value,
            all: all
        }, function (resp){
            if(resp.number === 0){//没有符合条件的搜索结果
                document.getElementById("piece_null").style.cssText = "display: block;"
                // document.getElementById("page_null").style.cssText = "display: none;"
            }
            else{
                //隐藏piece_null
                document.getElementById("piece_null").style.cssText = "display: none;"

                total_page = resp.total_page;

                //清空分页栏
                if(document.getElementById("page_list").getElementsByTagName("li").length !== 0){
                    let a = document.getElementById("page_list").getElementsByTagName("li").length;
                    let temp_list = document.getElementById("page_list").getElementsByTagName("li");
                    for(let i=0; i<a; i++)
                        temp_list[0].parentNode.removeChild(temp_list[0]);
                }
                //创建分页栏
                for(let i=1; i<=total_page; i++){
                    let temp = document.createElement("li");
                    if(i === cur_page) {
                        temp.style.color = "blue";
                        temp.style.fontWeight = "bolder";
                        temp.style.fontFamily = "微软雅黑";
                    }
                    temp.innerText = i.toString();
                    temp.onclick = function (){jump(i);};
                    document.getElementById("page_list").appendChild(temp);
                }

                //循环创建n个新piece
                let begin = (cur_page-1)*6;
                let end = ((begin+6)<resp.number)?(begin+6):resp.number;
                for(let i=begin; i<end; i++){
                    $.post("http://localhost/Details.php", {
                        id: resp.data[i]["id"]
                    }, function(resp) {
                        //为前端赋值
                        let sourceNode = document.getElementById("piece_clone");//获得被克隆的节点对象
                        let clonedNode = sourceNode.cloneNode(true); //克隆节点
                        clonedNode.setAttribute("id", "piece_clone-" + (i+1));
                        clonedNode.setAttribute("name", "piece_delete");
                        clonedNode.style.cssText = "display: inline-block; margin-left: 158px; margin-top: 50px; height: 300px; width: 300px; background-color: white; box-shadow: 5px 5px 10px gray;";
                        clonedNode.getElementsByClassName("artwork_img")[0].src = "data:image/png;base64," + resp.Img;
                        clonedNode.getElementsByClassName("artwork_link")[0].href = "http://localhost:8080/Details.html?paint_id=" + resp.data["id"];
                        clonedNode.getElementsByClassName("artwork_name")[0].innerText = resp.data["Name"];
                        clonedNode.getElementsByClassName("artwork_author")[0].innerText = resp.data["Author"];
                        clonedNode.getElementsByClassName("artwork_comment")[0].innerText = resp.data["Intro"];
                        clonedNode.getElementsByClassName("artwork_price")[0].innerText = "￥" + resp.data["Price"];
                        clonedNode.getElementsByClassName("artwork_heat")[0].innerText = "访问量：" + resp.data["Heat"];
                        //在父节点插入克隆的节点
                        sourceNode.parentNode.appendChild(clonedNode);
                    },"json")
                }
            }
        }, "json")
}