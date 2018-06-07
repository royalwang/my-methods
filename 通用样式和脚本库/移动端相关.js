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