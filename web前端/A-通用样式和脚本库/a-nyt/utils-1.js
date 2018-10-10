/**
 * [公共js]
 * @type {[type]}
 */
var myLib = myLib || { version: "1.0", author: "yt.nie" };

var m_ver = "?v=20171116";
/**
 * ajax接口服务url
 */
var m_SERVICEURL = "http://wx.tjncp.com/myLibservice/";

/**
 * 手机版页面的根目录
 */
var m_PAGEPRE = "/";

/**
 * 在线客服的URL地址
 * 当前使用的是美洽
 */
var m_KFURL = "https://static.meiqia.com/dist/standalone.html?eid=57842";

/**
 * 默认的全局图片路径
 */
var m_PICPATH = "http://www.tjncp.com";

/**
 * myLib constants(常量)
 */
(function($, window, undefined) {
    /**
     * 远程服务器的url
     */
    $.SERVICEURL = m_SERVICEURL;

    /**
     * 页面前缀
     */
    $.PAGEPRE = m_PAGEPRE;
    /**
     * 登录界面
     */
    $.LOGINPAGE = $.PAGEPRE + "prelogin.html";
    /**
     * 首页界面
     */
    $.INDEXPAGE = $.PAGEPRE + "index.html";
    /**
     * 登录前页面变量
     */
    $.ORIGINURLVAR = "originUrl";
    /**
     * 在线客服的URL地址
     * 当前使用的是美洽
     */
    $.KFURL = m_KFURL;
    /**
     * 默认的全局图片路径
     */
    $.PICPATH = m_PICPATH;

    //模板使用的默认的全局图片路径
    template.defaults.imports.PICPATH = m_PICPATH;
})(myLib, window);


/**
 * myLib url(URL)
 */
(function($, window, undefined) {
    /**
     * 从指定的URL中取得特定的参数值
     * @param {Object} paramName	参数名
     * @param url	获取参数的url，为空时，抓取当前页面url
     */
    $.getUrlParam = function(paramName, url) {
        var reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)", "i");
        if (null != url && undefined != url && "" != url) {
            var temps = url.split("?");
            if (temps.length <= 1) {
                return null;
            } else {
                url = temps[1];
            };
        } else {
            url = window.location.search.substr(1);
        };
        var r = url.match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    };

    /**
     * 当前页面url
     * @return	页面完整url
     */
    $.currentUrl = function() {
        var url = window.location.href.split('#')[0];
        url = url.replace(/&/g, '%26');

        return url;
    };

    /**
     * 取得跳转登录页面前的url
     */
    $.originUrl = function() {
        var url = $.getUrlParam($.ORIGINURLVAR);
        if (null == url || undefined == url) {
            return null;
        };
        url = url.replace(/&/g, '%26');
        return url;
    };

    /**
     * 取得页面的域名url
     * @param url	不填写url时，取当前页面的域名url
     * 如：http://www.baidu.com
     */
    $.domainUrl = function(url) {
        if ("/" == $.PAGEPRE) {
            var host = window.location.host;
            return "http://" + host;
        } else {
            var url = $.currentUrl();

            var index = url.indexOf($.PAGEPRE);
            if (-1 == index) {
                return "";
            };

            //取得url的前半段
            url = url.substring(0, index);
            return url;
        };
    };

    /**
     * 判断是否url
     * @param {Object} url	url字符串
     * @return true: 是; false: 否
     */
    $.isUrl = function(url) {
        var Expression = /http(s)?:/ ///([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/; 
        var objExp = new RegExp(Expression);
        return objExp.test(url);
    };

    /**
     * 获取全局图片路径
     * @param picfilepath	从服务器获得的图片路径，有可能获取失败
     */
    $.picFilePath = function(picfilepath) {
        if (null == picfilepath || undefined == picfilepath || "" == picfilepath) {
            return $.PICPATH;
        } else {
            return picfilepath;
        };
    };

    /**
     * 获取默认图片
     */
    $.getDefaultPic = function(picfilepath) {
        return $.picFilePath(picfilepath) + "/pics/default.jpg";
    };
})(myLib, window);

/**
 * myLib util(工具类)
 */
(function($, window, undefined) {
    /**
     * 重新整理对象，将对象属性为数组的值转换为字符串
     * 可应于ajax，将传递的data参数中数组转换为字符串
     * @param {Object} obj 格式为{key: value}
     * @return  整理完的对象
     */
    $.convertObjAry2Str = function(obj) {
        if (!obj) {
            return {};
        };

        var newObj = {};
        for (var p in obj) {
            if (null != obj[p] && undefined != obj[p] &&
                obj[p] != "function" && obj[p].constructor != Function) { //非函数
                if (Array.isArray(obj[p])) { //数组
                    newObj[p] = obj[p].join();
                } else {
                    newObj[p] = obj[p];
                };
            };
        };

        return newObj;
    };

    /**
     * 格式化时间戳  yyyy-MM-dd HH:mm:ss
     * @param {Object} timestamp 1970年1月1日至今的毫秒数
     * @param {Boolean} returnTime 是否返回时分秒，默认为true
     */
    $.formatDateTime = function(timestamp, returnTime) {
        returnTime = (null == returnTime || undefined == returnTime ? true : false);

        function add0(m) { return m < 10 ? '0' + m : m }

        var curDate = new Date(timestamp);
        var result = curDate.getFullYear() + "-" + add0(curDate.getMonth() + 1) + "-" + add0(curDate.getDate());
        if (returnTime) {
            result += "  " + add0(curDate.getHours()) + ":" + add0(curDate.getMinutes()) + ":" + add0(curDate.getSeconds());
        }
        return result;
    };

    /**
     * 执行倒计时
     * @param {Object} obj          DOM对象
     * @param {Object} originText   对象初始显示的文本
     * @param {Object} after        结束倒计时事件
     */
    var doCountdown = function(obj, originText, after) {
        if (countdownSeconds == 0) {
            obj.innerHTML = originText;
            countdownSeconds = 60;
            //执行结束后事件
            if (after) after();
        } else {
            obj.innerHTML = "重新发送(" + countdownSeconds + ")";
            countdownSeconds--;
            setTimeout(function() {
                doCountdown(obj, originText, after);
            }, 1000);
        };
    };
    //倒计时秒数
    var countdownSeconds = 60;
    /**
     * 倒计时
     * @param {Object} options  参数，格式为{key: value}
     *                              seconds: 倒计时秒数
     *                              originText: 对象初始显示的文本
     *                              obj: DOM对象
     *                              before: 开始倒计时事件
     *                              after: 结束倒计时事件
     */
    $.countdown = function(options) {
        countdownSeconds = (!options.seconds ? 60 : options.seconds);
        var _originText = (!options.originText ? "获取验证码" : options.originText);
        var _obj = options.obj;
        if (!_obj) {
            throw "缺少操作对象";
        };
        var _before = options.before;
        var _after = options.after;

        //执行开始前事件
        if (_before) _before();
        //倒时计
        doCountdown(_obj, _originText, _after);
    };

    /**
     * 验证对象
     * @example 
     *      var v = new myLib.validate();
     */
    $.validate = function() {
        var me = this;
        /**
         * 验证是否手机号
         * @param {Object} value    手机号
         * @return  true:是手机号; false:不是手机号
         * @example
         *      var b = new myLib.validate().mobile("13712345432");
         */
        me.mobile = function(value) {
            return /^1[3|4|5|7|8]\d{9}$/.test(value);
        };

        /**
         * 验证是否邮箱
         * @param {Object} value    邮箱
         * @return  true:是邮箱; false:不是邮箱
         * @example
         *      var b = new myLib.validate().email("11@126.com");
         */
        me.email = function(value) {
            return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
        };

        /**
         * 验证是否是手机号或电子邮箱
         * @param {Object} value    手机号或邮箱
         * @return  true:是手机号或邮箱; false:不是手机号或邮箱
         * @example
         *      var b = new myLib.validate().phoneEmail("11@126.com");
         */
        me.phoneEmail = function(value) {
            //验证是否手机号
            var b = me.mobile(value);
            b = b || me.email(value);

            return b;
        };
    };

    /**
     * 浏览器对象
     * @example 
     *      var v = new myLib.browser();
     */
    $.browser = function() {
        var me = this;
        /**
         * 判断是否是微信浏览器
         * @return true: 是; false: 否
         * @example
         *      var b = new myLib.browser().isWeixin();
         */
        me.isWeixin = function() {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                return true;
            } else {
                return false;
            };
        };
    };

    /**
     * 监听回退键，打开指定页
     */
    $.back = function(page) {
        if (null == page || undefined == page || "" == page) {
            return false;
        };

        /**
         * 重写回退事件
         * @param {Object} event
         */
        mui.back = function(event) {
            $.openWindow(page);
        };
    };
})(myLib, window);