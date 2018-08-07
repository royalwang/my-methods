// 横、竖屏判断
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
    if (window.orientation === 180 || window.orientation === 0) {
        console.log("竖屏")
    }
    if (window.orientation === 90 || window.orientation === -90) {
        console.log("横屏")
    }
}, false);

function detectOrient() {
    var cw = document.documentElement.clientWidth;
    var _Width = 0,
        _Height = 0;
    sw = window.screen.width;
    sh = window.screen.height;
    _Width = sw < sh ? sw : sh;
    _Height = sw >= sh ? sw : sh;
    if (cw == _Width) {
        // 竖屏
        return;
    }
    if (cw == _Height) {
        // 横屏
        return;
    }
}
// 安卓机，点击输入框，弹出键盘导致页面错位

function isA() {
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
        var windowHeight = document.documentElement.clientHeight;
        document.body.style.height = windowHeight + 'px';
    }
}

!(function(doc, win) {
    var docEle = doc.documentElement,
        evt = "onorientationchange" in window ? "orientationchange" : "resize",
        fn = function() {
            var width = docEle.clientWidth;
            // width && (docEle.style.fontSize = 20 * (width / 375) + "px");
            width && (docEle.style.fontSize = 10 * width / 75 + "px");
        };

    win.addEventListener(evt, fn, false);
    doc.addEventListener("DOMContentLoaded", fn, false);

}(document, window));

// 直接使用css3属性，而不用js控制
// html {
//     font-size: 100vw/750;
//     font-size: 100vw/375;
//     /*100vw是设备的宽度，除以3.75可以让1rem的大小在iPhone6下等于100px*/
//     /*100vw是设备的宽度，除以375可以让1rem的大小在iPhone6下等于1px*/
// }

// 手机端
// document.documentElement.style.fontSize = innerWidth / 16 + 'px';
// window.onresize = function() {
//     document.documentElement.style.fontSize = innerWidth / 16 + 'px';
// }
// 
// 判断页面是在移动端还是PC端打开的
window.location.href = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? "https://www.baidu.com/" : "http://news.baidu.com/";