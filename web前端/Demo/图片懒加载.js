//图片懒加载
//基于jquery
$(window).on("scroll", function () {
    checkShow();
})
checkShow();

function checkShow() {
    $("body img").each(function () {
        var $cur = $(this);
        if (isShow($cur)) {
            setTimeout(function () {
                showImg($cur);
            }, 500);
        }
    })
}

function isShow(el) {
    var scrollHeight = $(window).scrollTop(),
        windowHeight = $(window).height(),
        top = el.offset().top;
    // if (top < scrollHeight + windowHeight) {
    //     return true;
    // } else {
    //     return false;
    // }
    return (top < scrollHeight + windowHeight) ? true : false
}

function showImg($el) {
    $el.attr("src", $el.attr("data-src"));
}