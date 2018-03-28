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

// 
// $.ajaxSetup({cache:false})//基于jquery的解决浏览器缓存问题
// 
// js延迟加载的方式有哪些？
// defer和async、动态创建DOM方式（用得最多）、按需异步载入js
// 
// 
var ajaxUrl = "http://elec.toxchina.com/ToxElec_2";

//时间戳(毫秒值)格式化
Date.prototype.format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

function dateFormat(str, type) {
    if (str == null || str == "") {
        return '';
    } else if (type == 1) {
        var date = new Date(str).format('yyyy年MM月dd日');
        return date;
    } else if (type == 2) {
        var date = new Date(str).format('yyyy-MM-dd');
        return date;
    } else if (type == 3) {
        var date = new Date(str).format('yyyy-MM-dd hh:mm:ss');
        return date;
    }
}

//时间戳转化
function formatTime(date, type) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()

    var formatTime = "";
    if (type == 1) {
        //年月
        formatTime = [year, month].map(formatNumber).join('-');
    } else if (type == 2) {
        //年月日
        formatTime = [year, month, day].map(formatNumber).join('-');
    } else if (!type) {
        //年月日、时分秒
        formatTime = [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
    }
    return formatTime;
}
//补零
function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}
/*弹出层*/
function layer_show(title, url, w, h, fullScreen) {
    if (title == null || title == '') {
        title = false;
    };
    if (url == null || url == '') {
        url = "#";
    };
    if (w == null || w == '') {
        w = ($(window).width() - 200);
    };
    if (h == null || h == '') {
        h = ($(window).height() - 50);
    };
    var context = layer.open({
        skin: 'layui-bg-cyan',
        type: 2,
        anim: 2,
        shift: 1,
        /*0-6*/
        area: [w + 'px', h + 'px'],
        fix: false, //不固定
        maxmin: false,
        shade: 0.6,
        title: title,
        content: url,
        scrollbar: false
    });
    return fullScreen ? layer.full(context) : context;
}
// 关闭弹出层
function layer_close() {
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}
//
//
function errTips(content, duringTime) {
    layer.msg(content, { time: duringTime, shift: 6 }, function() {});
}

function layer_loading(callback) {
    layer.msg('加载中...', {
        icon: 16,
        shade: 0.6,
        time: 1000
    }, function() {
        callback && callback();
    });
}
////获取url参数
function GetUrlpara(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function isNull(val) {
    return val == null ? '' : val;
}

function checkDate(val) {
    return val == '' ? '' : new Date(val);
}

function getJson(key, num) {
    if (num == null || num == '') {
        return '';
    } else {
        var jsonObj = {
            "chargeStatus": ['充电完成', '正在充电', '开启充电桩失败'], //充电状态
            "pileStatus": ['空闲', '占用', '空闲'], //电桩状态
            "publishStatus": ['下线', '上线'], //发布状态
            "qtStatus": ['停用', '启用'], //启停状态
        };
        for (var item in jsonObj) {
            if (item == key) { //item 表示Json串中的属性，如'name'  
                var jValue = jsonObj[item]; //key所对应的value  
                return jValue[num];
            }
        }
        // return jsonObj[key][num];
    }
}
//
//
//
/**
 * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
 * 即 百度 转 谷歌、高德
 * @param bd_lon
 * @param bd_lat
 * @returns {*[]}
 */
function bd09togcj02(bd_lon, bd_lat) {
    var bd_lon = +bd_lon;
    var bd_lat = +bd_lat;
    var x = bd_lon - 0.0065;
    var y = bd_lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * Math.PI);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * Math.PI);
    var gg_lng = z * Math.cos(theta);
    var gg_lat = z * Math.sin(theta);
    return [gg_lng, gg_lat]
};
//百度转腾讯
function B2T(lng, lat) {
    var pi = 3.14159265358979324 * 3000.0 / 180.0;
    var x = lng - 0.0065;
    var y = lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * pi);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * pi);
    var gg_lng = z * Math.cos(theta);
    var gg_lat = z * Math.sin(theta);
    return [gg_lng, gg_lat];
}
//
//
//调用分页插件
/**
 * [pages 分页]
 * @param  {[type]}   total [数据总数]
 * @param  {Function} cb    [回调]
 * @param  {[type]}   data  [传入回调的参数]
 * @return {[type]}         [description]
 */
function pages(box, total, cb, data) {
    var pgs = data.pageSize;
    var pages = Math.ceil(total / (pgs == -1 ? total : pgs));
    $(box).pagination({
        pageCount: pages,
        totalData: total,
        activeBgColor: '#353d47',
        count: 4, //当前选中页的前后页数
        jump: true,
        coping: true, //开启第一页和最后一页的按钮,coping为false，homePage和endPage无效。
        homePage: '首页',
        endPage: '末页',
        prevContent: '＜',
        nextContent: '＞',
        isHide: false,
        callback: function(api) {
            data.pageNum = api.getCurrent() - 1;
            if (cb && cb instanceof Function) {
                cb && cb(data);
            }
        }
    });

    laypage({
        cont: 'page_item', //容器。值支持id名、原生dom对象，jquery对象,
        skin: '#353d47', //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
        curr: 1,
        totalCount: total,
        pages: pages, //总页数
        skip: true, //是否开启跳页
        groups: 10, //连续显示分页数
        first: '首页', //将首页显示为数字1,。若不显示，设置false即可
        last: '尾页', //将尾页显示为总页数。若不显示，设置false即可
        prev: '上一页', //若不显示，设置false即可
        next: '下一页', //若不显示，设置false即可
        jump: function(obj, first) {
            // console.log(obj.curr);
            if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
                data.pageNum = obj.curr - 1;
                cb && cb(data);
            }
        }
    })
}
//分页
function setPage(ele, total) {
    var pages = Math.ceil(total / 10);
    var str = '';
    for (var i = 0; i < pages; i++) {
        str += '<a href="javascript:;" class="' + (i == 0 ? "active" : "") + '">' + (i == 0 ? 1 : (i + 1)) + '</a>';
    }
    $(ele).html(str);
}
//获取下拉信息
function getStore(ele, aUrl) {
    $(ele).html("");
    var str = "<option selected='selected' value='' name=''>请选择</option>";
    $.ajax({
            async: false,
            url: aUrl,
            type: 'get',
            dataType: 'json',
            contentType: 'application/json',
        })
        .done(function(res) {
            // console.log(res);
            var items = res.data;
            $.each(items, function(i, o) {
                str += "<option name=" + o.name + " value=" + o.id + ">" + o.name + "</option>";
            })
            $(ele).html(str);
        })
        .fail(function(err) { console.log(err); })
}
//后台传值到当前页显示为当前下拉项
function switchs(selector, val) {
    $(selector).find('option[data-val="' + val + '"]').prop('selected', true);
}

//对字符串进行加密 
function compileStr(code) {
    var c = String.fromCharCode(code.charCodeAt(0) + code.length);
    for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
    }
    return escape(c);
}
//字符串进行解密   
function uncompileStr(code) {
    code = unescape(code);
    var c = String.fromCharCode(code.charCodeAt(0) - code.length);
    for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
    }
    return c;
}
// 获取数组中最大值和最小值
Array.prototype.max = function() {
    return Math.max.apply({}, this);
}
Array.prototype.min = function() {
    return Math.min.apply({}, this);
}
var arr = [1, 2, 3, 4, 5];
Math.max.apply(null, arr); // 5
Math.min.apply(null, arr); // 1

// ES6更简便， 使用展开运算符：
Math.max(...arr); // 5
Math.min(...arr); // 1


//数组去重
Array.prototype.unique1 = function() {
    var res = [this[0]];
    for (var i = 1; i < this.length; i++) {
        var repeat = false;
        for (var j = 0; j < res.length; j++) {
            if (this[i] == res[j]) {
                repeat = true;
                break;
            }
        }
        if (!repeat) {
            res.push(this[i]);
        }
    }
    return res;
}
//数组去重
//es6    new Set();  Set 中的值总是唯一的
function removeRepeatArray(arr) {
    return Array.from(new Set(arr));
}
// console.log(removeRepeatArray([1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3]));
// 一行代码实现数组去重
var newArr = [...new Set([1, 2, 3, 1, 'a', 1, 'a'])];

// let set = new Set(['red', 'green', 'blue']);
// for (let item of set.keys()) {
////返回键名的遍历器
// console.log(item);
// }
// values()：返回键值的遍历器,省略values方法,默认遍历值
// entries()：返回键值对的遍历器
// forEach()：使用回调函数遍历每个成员，set.forEach((value, key) => console.log(key + ' : ' + value))
// 
// 
// 
// 
// 
//对象方法
//传入一个数组list
function quchong(list) {
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
}
// console.log(quchong([1, 2, 2, 3, 3]));
// 
// 
/**
 * [removeRepeatSort 数组去重和排序]
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
function removeRepeatSort(arr) {
    var obj = {};
    var t = [];
    for (var i = 0; i < arr.length; i++) {
        // 判断这个对象的属性是否和数组的值相同，相同则不添加，否则给这个对象添加这个值
        if (!(obj[arr[i]] === arr[i])) {
            obj[arr[i]] = arr[i];
            // 把这个过滤完以后的值添加到我们的新数组中。
            t.push(arr[i]);
        }
    }
    t.sort(function(a, b) {
        return a - b;
    });
    return t;
}

function BubbleSort(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        for (var k = 0; k < arr.length - i - 1; k++) {
            if (arr[k] > arr[k + 1]) {
                arr[k] = arr[k] + arr[k + 1];
                arr[k + 1] = arr[k] - arr[k + 1];
                arr[k] = arr[k] - arr[k + 1];
            }
        }
    }


    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            //获取第一个值和后一个值比较
            var cur = arr[i];
            if (cur > arr[j]) {
                // 因为需要交换值，所以会把后一个值替换，我们要先保存下来
                var index = arr[j];
                // 交换值
                arr[j] = cur;
                arr[i] = index;
            }
        }
    }
    return arr;
}
/**
 * [全选方法]
 * @param  {[type]} allCheckBtn [全选按钮]
 * @param  {[type]} total       [当页checkbox按钮除全选按钮的个数]
 * @return {[type]}             [结果]
 */
function selectAll(allCheckBtn, total) {
    $(allCheckBtn).click(function() {
        if ($(this).is(":checked")) {
            $("input[type=checkbox]:not(this)").each(function() {
                $(this).prop("checked", true);
            });
        } else {
            $("input[type=checkbox]:not(this)").each(function() {
                $(this).prop("checked", false);
            });
        }
    });
    $("input[type=checkbox]:not(this)").each(function() {
        $(this).click(function() {
            if ($(this).is(":checked")) {
                var len = 0;
                $("input[type=checkbox]:not(this)").each(function() {
                    if ($(this).is(":checked")) {
                        len++;
                    }
                });
                if (len == total) {
                    $(allCheckBtn).prop("checked", true);
                }
            } else {
                $(allCheckBtn).prop("checked", false);
            }
        });
    });
}

//发送验证码
var wait = 60;

function countDown(t) {
    if (wait == 0) {
        $(t).prop("disabled", false);
        $(t).css("backgroundColor", "#FFA200");
        $(t).val("发送验证码");
        wait = 60;
        vlide();
    } else {
        $(t).prop("disabled", true);
        $(t).css("backgroundColor", "#aaa");
        $(t).val("重新发送(" + wait + ")");
        wait--;
        setTimeout(function() { countDown(t) }, 1000)
    }
}
//60秒倒计时
var second = 60,
    timer = null;

function countdown(query) {
    if (second >= 1) {
        second -= 1;
        $(query).val(second + 's后重新获取');
        $(query).prop('disabled', true);
        timer = setTimeout(function() {
            //1秒调一次，类似倒计时
            countdown(query);
        }, 1000);
    } else {
        timer != null && clearTimeout(timer);
        second = 60;
        $(query).val('获取验证码');
        $(query).prop('disabled', false);
    }
}

//金额千分位显示
function mformat(input) {
    var n = parseFloat(input).toFixed(2);
    var re = /(\d{1,3})(?=(\d{3})+(?:\.))/g;
    return n.replace(re, "$1,");
}

function inputZzs() {
    var tt = /^[0-9]*[1-9][0-9]*$/;
    if (!tt.test(investAmount)) {
        alert('请输入正整数');
        return;
    }
}
//字符串每4位加入一个空格，方便银行卡号显示
function bank(t) {
    // t.value = t.value.replace(/[ \f\t\v]/g, '').replace(/(\d{4})(?=\d)/g, "$1 "); //要换行
    t.value = t.value.replace(/[\s]/g, '').replace(/(\d{4})(?=\d)/g, "$1 "); //不换行
}
//获取url来源
function getUrl() {
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
}

// web端cookie的设置和获取方法
// 
//写cookie
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//读取cookie
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
//删除cookie
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

//多个input不为空判断
//输入时和清除内容时的交互,依赖jquery
function loop() {
    var str = '';
    $('.name_input').each(function() {
        str += $(this).val(); //重要
    });
    if (str != '') {
        $('.login_btn').addClass('usable');
        $('.login_btn').attr('disabled', false)
    } else {
        //只要一个为空
        $('.login_btn').removeClass('usable');
        $('.login_btn').attr('disabled', true)
    }



    // var str1 = '';
    // var inputs = document.querySelectorAll('input');
    // for (var i = 0; i < inputs.length; i++) {
    //     str1 += inputs[i].value;
    // }
    // if (str1 == '') {
    //     document.getElementById('submitBtn').className = 'noUse';
    //     document.getElementById('submitBtn').setAttribute('disabled', true);
    // } else {
    //     document.getElementById('submitBtn').className = 'canUse';
    //     document.getElementById('submitBtn').setAttribute('disabled', false);
    // }
}


//变量交换
function exchangeData() {
    // 第一种，通过一个临时变量来做数据的缓冲
    var foo = 1;
    var bar = 2;
    var temp = foo;
    foo = bar;
    bar = temp;
    //第二种，利用了数组
    foo = [bar, bar = foo][0]
}

function scrollTo(ele, speed) {
    //速度默认值
    if (!speed) speed = 300;
    if (!ele) {
        $("html,body").animate({ scrollTop: 0 }, speed);
    } else {
        if (ele.length > 0) $("html,body").animate({ scrollTop: $(ele).offset().top }, speed);
    }
    return false;
}

// 数组的"短路运算"every和some
// 一个数组里面某个或者全部满足条件,就返回true
// 情况一:全部满足
const allTrueArr = (arrs) => {
    return arr.every((arr) => {
        return arr > 20; //如果数组的每一项都满足则返回true,如果有一项不满足返回false,终止遍历              
    })
}
// 情况二:有一个满足
const OneTrueArr = (arrs) => {
    return arr.some((arr) => {
        return arr > 20; //如果数组有一项满足则返回true,终止遍历,每一项都不满足则返回false         
    })
}


// 在ios上获取不到时间戳
// 问题：
new Date('2018-03-07 10:45:32').getTime(); //在ios上获取不到时间戳
//解决办法：

// 1.换种方式表达
new Date('2018/03/07').getTime();
// 或者
new Date('2018-03-07 10:45:32'.replace(/-/g, '/')).getTime();


/**
 * 解决小数精度问题
 * @param {*数字} a
 * @param {*数字} b
 * @param {*符号} sign
 * fixedFloat(0.3, 0.2, '-')
 */
function fixedFloat(a, b, sign) {
    // 补0
    function padding0(p) {
        var z = ''
        while (p--) {
            z += '0'
        }
        return z
    }

    function handle(x) {
        var y = String(x)
        var p = y.lastIndexOf('.')
        if (p === -1) {
            return [y, 0]
        } else {
            return [y.replace('.', ''), y.length - p - 1]
        }
    }
    // v 操作数1, w 操作数2, s 操作符, t 精度
    function operate(v, w, s, t) {
        switch (s) {
            case '+':
                return (v + w) / t
            case '-':
                return (v - w) / t
            case '*':
                return (v * w) / (t * t)
            case '/':
                return (v / w)
        }
    }

    var c = handle(a)
    var d = handle(b)
    var k = 0

    if (c[1] === 0 && d[1] === 0) {
        return operate(+c[0], +d[0], sign, 1)
    } else {
        k = Math.pow(10, Math.max(c[1], d[1]))
        if (c[1] !== d[1]) {
            if (c[1] > d[1]) {
                d[0] += padding0(c[1] - d[1])
            } else {
                c[0] += padding0(d[1] - c[1])
            }
        }
        return operate(+c[0], +d[0], sign, k)
    }
}