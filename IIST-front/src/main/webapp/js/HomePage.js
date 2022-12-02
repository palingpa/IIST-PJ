function Create(){
    GetArtwork();
}
function GetArtwork(){
    $.post("http://localhost/homepage.php", {
    }, function (resp){
        if(resp.msg === 'success'){
            //为前端赋值
            document.getElementById("Details_1").href = "http://localhost:8080/Details.html?paint_id=" + resp.data_1["id"];
            document.getElementById("Img_1").src = "data:image/png;base64," + resp.Img_1;
            document.getElementById("Name_1").innerText = resp.data_1["Name"];
            document.getElementById("Author_1").innerText = resp.data_1["Author"];
            document.getElementById("Date_1").innerText = resp.data_1["Date"];
            document.getElementById("Price_1").innerText = "￥" + resp.data_1["Price"];

            document.getElementById("Details_2").href = "http://localhost:8080/Details.html?paint_id=" + resp.data_2["id"];
            document.getElementById("Img_2").src = "data:image/png;base64," + resp.Img_2;
            document.getElementById("Name_2").innerText = resp.data_2["Name"];
            document.getElementById("Author_2").innerText = resp.data_2["Author"];
            document.getElementById("Date_2").innerText = resp.data_2["Date"];
            document.getElementById("Price_2").innerText = "￥" + resp.data_2["Price"];

            document.getElementById("Details_3").href = "http://localhost:8080/Details.html?paint_id=" + resp.data_3["id"];
            document.getElementById("Img_3").src = "data:image/png;base64," + resp.Img_3;
            document.getElementById("Name_3").innerText = resp.data_3["Name"];
            document.getElementById("Author_3").innerText = resp.data_3["Author"];
            document.getElementById("Date_3").innerText = resp.data_3["Date"];
            document.getElementById("Price_3").innerText = "￥" + resp.data_3["Price"];
        }

    }, "json")
}

window.addEventListener('load', function() {//参考资料 https://blog.csdn.net/qq_43126471/article/details/101010356?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-101010356-blog-122936580.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-1-101010356-blog-122936580.pc_relevant_default&utm_relevant_index=1
    let leftArrow = this.document.querySelector('.lf');
    let rightArrow = this.document.querySelector('.lr');
    //悬停时更改展示的图片位置，达到高亮效果
    leftArrow.addEventListener('mouseenter', function() {
        this.style.backgroundPosition = '0 0';
    });
    leftArrow.addEventListener('mouseleave', function() {
        this.style.backgroundPosition = '-83px 0';
    });
    rightArrow.addEventListener('mouseenter', function() {
        this.style.backgroundPosition = '-42px 0';
    });
    rightArrow.addEventListener('mouseleave', function() {
        this.style.backgroundPosition = '-123px 0';
    });
    let imgs = this.document.querySelectorAll('.img');
    let dots = this.document.querySelector('.dots').querySelectorAll('span');
    // 给图片设置index属性
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].setAttribute('data-index', i);
    }
    // 获取当前图片与其index
    let current = this.document.querySelector('.current');
    let currentIndex = current.getAttribute('data-index');
    //左箭头点击事件
    leftArrow.addEventListener('click', function() {
        if (currentIndex > 0) {
            imgs[currentIndex].classList.remove('current');
            dots[currentIndex].classList.remove('square');
            imgs[--currentIndex].classList.add('current');
            dots[currentIndex].classList.add('square');
        } else {//如果当前图片为第一张那么需要更换到最后一张图片
            imgs[currentIndex].classList.remove('current');
            dots[currentIndex].classList.remove('square');
            currentIndex = 4;
            imgs[currentIndex].classList.add('current');
            dots[currentIndex].classList.add('square');
        }
    });
    //右箭头点击事件
    rightArrow.addEventListener('click', changeImage);
    function changeImage() {//如果当前为第五张图片，那么切换回第一张图片
        if (currentIndex < 4) {
            imgs[currentIndex].classList.remove('current');
            dots[currentIndex].classList.remove('square');
            imgs[++currentIndex].classList.add('current');
            dots[currentIndex].classList.add('square');
        } else {
            imgs[currentIndex].classList.remove('current');
            dots[currentIndex].classList.remove('square');
            currentIndex = 0;
            imgs[currentIndex].classList.add('current');
            dots[currentIndex].classList.add('square');
        }
    }
    //小圆点的点击事件
    for (let k = 0; k < dots.length; k++) {
        dots[k].setAttribute('data-index', k);
        dots[k].addEventListener('click', function() {
            let index = this.getAttribute('data-index');
            if (index !== currentIndex) {
                imgs[currentIndex].classList.remove('current');
                dots[currentIndex].classList.remove('square');
                imgs[index].classList.add('current');
                dots[index].classList.add('square');
                currentIndex = index;
            }
        })
    }
    //自动轮播
    let timer = this.setInterval(changeImage, 5000);
});

