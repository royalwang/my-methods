$(function() {
    var htmls = document.getElementsByTagName('html')[0];
    var deviceWidth = document.documentElement.clientWidth;
    htmls.style.fontSize = deviceWidth / 750 * 100 + 'px';
    $(".cityList-selectWrap>li").click(function() {
        $(".cityList-mengban").show();
        var val = $(this).text();
        $(".cityList-alertWrap>p").text(val);
        $(".cityList-alertWrap").fadeIn().delay(100).fadeOut(function() {
            $(".cityList-mengban").hide();
        });
        val = val.toLowerCase();
        $("html, body").animate({
            scrollTop: $(".cityList-" + val + "").offset().top,//向上滚动到元素距顶部的位置
            duration: 500,
            easing: "linear"
        }, function() {
            return false;
        })
    })
})