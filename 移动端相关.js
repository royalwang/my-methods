// 横、竖屏判断
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
    if (window.orientation === 180 || window.orientation === 0) {
        console.log("竖屏")
    }
    if (window.orientation === 90 || window.orientation === -90) {
        console.log("横屏")
    }
}, false);

// 安卓机，点击输入框，弹出键盘导致页面错位

function isA() {
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
        var windowHeight = document.documentElement.clientHeight;
        document.body.style.height = windowHeight + 'px';
    }
}