(function($) {
    //基于jquery的公共方法
    $.vIndex = {
        formatTime: function(date, type) {
            var year = date.getFullYear()
            var month = date.getMonth() + 1
            var day = date.getDate()
            var hour = date.getHours()
            var minute = date.getMinutes()
            var second = date.getSeconds()
            var formatTime = "";
            if (type == 1) {
                //年月
                formatTime = [year, month].map($.vIndex.formatNumber).join('-');
            } else if (type == 2) {
                //年月日
                formatTime = [year, month, day].map($.vIndex.formatNumber).join('-');
            } else if (!type) {
                //年月日、时分秒
                formatTime = [year, month, day].map($.vIndex.formatNumber).join('/') + ' ' + [hour, minute, second].map($.vIndex.formatNumber).join(':')
            }
            return formatTime;
        },
        formatNumber: function(n) {
            n = n.toString()
            return n[1] ? n : '0' + n
        },
        getUrlpara: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        bd09togcj02: function(bd_lon, bd_lat) {
            var bd_lon = +bd_lon;
            var bd_lat = +bd_lat;
            var x = bd_lon - 0.0065;
            var y = bd_lat - 0.006;
            var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * Math.PI);
            var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * Math.PI);
            var gg_lng = z * Math.cos(theta);
            var gg_lat = z * Math.sin(theta);
            return [gg_lng, gg_lat]
        },
        removeRepeatArray: function(arr) {
            //es6 语法 数组去重
            return Array.from(new Set(arr));
        },
        removeRepeatArray1: function(list) {
            var newArr = [];
            var obj = {};
            for (var i = 0; i < list.length; i++) {
                //如果obj对象中没有list中的一个元素，则加入到新数组newArr
                if (!obj[list[i]]) {
                    newArr.push(list[i]);
                    obj[list[i]] = list[i];
                }
            }
            return newArr;
        },
        mformat: function(input) {
            var n = parseFloat(input).toFixed(2);
            var re = /(\d{1,3})(?=(\d{3})+(?:\.))/g;
            return n.replace(re, "$1,");
        },
        getUrl: function() {
            var ref = '';　　
            if (document.referrer.length > 0) {
                ref = document.referrer;
                return ref;
            }　
            try {
                if (ref.length == 0 && opener.location.href.length > 0) {　
                    ref = opener.location.href;　
                    return ref;　
                }
            } catch (e) {
                return '';
            }
        },
        isObj: function(bar) {
            if ((bar !== null) && (typeof bar === "object") && (toString.call(bar) !== "[object Array]")) {
                return true;
            } else {
                return false;
            }
        }
    };
    $(function() {
        // $.learunindex.load();
        // $.learunindex.loadMenu();
        // $.learuntab.init();
    });
})(jQuery);