var Cookie = { set: function(e, t, o, i, s, n) { document.cookie = e + "=" + (n ? t : escape(t)) + (s ? "; expires=" + s.toGMTString() : "") + (i ? "; path=" + i : "; path=/") + (o ? "; domain=" + o : "") }, get: function(e, t) { var o = document.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)")); return null != o ? unescape(o[2]) : t }, clear: function(e, t, o) { this.get(e) && (document.cookie = e + "=" + (t ? "; path=" + t : "; path=/") + (o ? "; domain=" + o : "") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT") } };
! function() {
    function save(e) {
        var t = [];
        for (tmpName in options) options.hasOwnProperty(tmpName) && "duRobotState" !== tmpName && t.push('"' + tmpName + '":"' + options[tmpName] + '"');
        var o = "{" + t.join(",") + "}";
        bds.comm.personalData ? $.ajax({ url: "//www.baidu.com/ups/submit/addtips/?product=ps&tips=" + encodeURIComponent(o) + "&_r=" + (new Date).getTime(), success: function() { writeCookie(), "function" == typeof e && e() } }) : (writeCookie(), "function" == typeof e && setTimeout(e, 0))
    }

    function set(e, t) { options[e] = t }

    function get(e) { return options[e] }

    function writeCookie() {
        if (options.hasOwnProperty("sugSet")) {
            var e = "0" == options.sugSet ? "0" : "3";
            clearCookie("sug"), Cookie.set("sug", e, document.domain, "/", expire30y)
        }
        if (options.hasOwnProperty("sugStoreSet")) {
            var e = 0 == options.sugStoreSet ? "0" : "1";
            clearCookie("sugstore"), Cookie.set("sugstore", e, document.domain, "/", expire30y)
        }
        if (options.hasOwnProperty("isSwitch")) {
            var t = { 0: "2", 1: "0", 2: "1" },
                e = t[options.isSwitch];
            clearCookie("ORIGIN"), Cookie.set("ORIGIN", e, document.domain, "/", expire30y)
        }
        if (options.hasOwnProperty("imeSwitch")) {
            var e = options.imeSwitch;
            clearCookie("bdime"), Cookie.set("bdime", e, document.domain, "/", expire30y)
        }
    }

    function writeBAIDUID() { var e, t, o, i = Cookie.get("BAIDUID"); /FG=(\d+)/.test(i) && (t = RegExp.$1), /SL=(\d+)/.test(i) && (o = RegExp.$1), /NR=(\d+)/.test(i) && (e = RegExp.$1), options.hasOwnProperty("resultNum") && (e = options.resultNum), options.hasOwnProperty("resultLang") && (o = options.resultLang), Cookie.set("BAIDUID", i.replace(/:.*$/, "") + ("undefined" != typeof o ? ":SL=" + o : "") + ("undefined" != typeof e ? ":NR=" + e : "") + ("undefined" != typeof t ? ":FG=" + t : ""), ".baidu.com", "/", expire30y, !0) }

    function clearCookie(e) { Cookie.clear(e, "/"), Cookie.clear(e, "/", document.domain), Cookie.clear(e, "/", "." + document.domain), Cookie.clear(e, "/", ".baidu.com") }

    function reset(e) { options = defaultOptions, save(e) }
    var defaultOptions = { sugSet: 1, sugStoreSet: 1, isSwitch: 1, isJumpHttps: 1, imeSwitch: 0, resultNum: 10, skinOpen: 1, resultLang: 0, duRobotState: "000" },
        options = {},
        tmpName, expire30y = new Date;
    expire30y.setTime(expire30y.getTime() + 94608e7);
    try { if (bds && bds.comm && bds.comm.personalData) { if ("string" == typeof bds.comm.personalData && (bds.comm.personalData = eval("(" + bds.comm.personalData + ")")), !bds.comm.personalData) return; for (tmpName in bds.comm.personalData) defaultOptions.hasOwnProperty(tmpName) && bds.comm.personalData.hasOwnProperty(tmpName) && "SUCCESS" == bds.comm.personalData[tmpName].ErrMsg && (options[tmpName] = bds.comm.personalData[tmpName].value) } try { parseInt(options.resultNum) || delete options.resultNum, parseInt(options.resultLang) || "0" == options.resultLang || delete options.resultLang } catch (e) {} writeCookie(), "sugSet" in options || (options.sugSet = 3 != Cookie.get("sug", 3) ? 0 : 1), "sugStoreSet" in options || (options.sugStoreSet = Cookie.get("sugstore", 0)); var BAIDUID = Cookie.get("BAIDUID"); "resultNum" in options || (options.resultNum = /NR=(\d+)/.test(BAIDUID) && RegExp.$1 ? parseInt(RegExp.$1) : 10), "resultLang" in options || (options.resultLang = /SL=(\d+)/.test(BAIDUID) && RegExp.$1 ? parseInt(RegExp.$1) : 0), "isSwitch" in options || (options.isSwitch = 2 == Cookie.get("ORIGIN", 0) ? 0 : 1 == Cookie.get("ORIGIN", 0) ? 2 : 1), "imeSwitch" in options || (options.imeSwitch = Cookie.get("bdime", 0)) } catch (e) {} window.UPS = { writeBAIDUID: writeBAIDUID, reset: reset, get: get, set: set, save: save }
}(),
function() {
    var e = "https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/plugins/every_cookie_4644b13.js";
    ("Mac68K" == navigator.platform || "MacPPC" == navigator.platform || "Macintosh" == navigator.platform || "MacIntel" == navigator.platform) && (e = "https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/plugins/every_cookie_mac_82990d4.js"), setTimeout(function() { $.ajax({ url: e, cache: !0, dataType: "script" }) }, 0);
    var t = navigator && navigator.userAgent ? navigator.userAgent : "",
        o = document && document.cookie ? document.cookie : "",
        i = !!(t.match(/(msie [2-8])/i) || t.match(/windows.*safari/i) && !t.match(/chrome/i) || t.match(/(linux.*firefox)/i) || t.match(/Chrome\/29/i) || t.match(/mac os x.*firefox/i) || o.match(/\bISSW=1/) || 0 == UPS.get("isSwitch"));
    bds && bds.comm && (bds.comm.supportis = !i, bds.comm.isui = !0), window.__restart_confirm_timeout = !0, window.__confirm_timeout = 8e3, window.__disable_is_guide = !0, window.__disable_swap_to_empty = !0, window.__switch_add_mask = !0;
    var s = "https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/global/js/all_async_search_7a3867d.js",
        n = "/script";
    document.write("<script src='" + s + "'><" + n + ">"), bds.comm.newindex && $(window).on("index_off", function() { $('<div class="c-tips-container" id="c-tips-container"></div>').insertAfter("#wrapper"), window.__sample_dynamic_tab && $("#s_tab").remove() }), bds.comm && bds.comm.ishome && Cookie.get("H_PS_PSSID") && (bds.comm.indexSid = Cookie.get("H_PS_PSSID"))
}();