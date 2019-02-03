/* 工具库 */

var BaseTools = {
    /*格式化JSON代码*/
    foramtJson: function(text_value) {
        if (text_value == "") {
            alert("不能为空");
            return false;
        } else {
            var res = "";
            for (var i = 0, j = 0, k = 0, ii, ele; i < text_value.length; i++) { //k:缩进，j:""个数
                ele = text_value.charAt(i);
                if (j % 2 == 0 && ele == "}") {
                    k--;
                    for (ii = 0; ii < k; ii++) ele = "    " + ele;
                    ele = "\n" + ele;
                } else if (j % 2 == 0 && ele == "{") {
                    ele += "\n";
                    k++;
                    debugger;
                    for (ii = 0; ii < k; ii++) ele += "    ";
                } else if (j % 2 == 0 && ele == ",") {
                    ele += "\n";
                    for (ii = 0; ii < k; ii++) ele += "    ";
                } else if (ele == "\"") j++;
                res += ele;
            }
            return res;
        }
    },
    //,isNull: function (s) {
    //    return (s === null) && (typeof s === "undefined") && (/^\s*$/.test(s));
    //}
    /* 获取用户信息
    @id：用户ID
    @return：返回的数据格式。
    调用形式：BaseUtil.getGuid();
    */
    getGuid: function() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    },
    /* 获取根目录地址（包含虚拟目录）
     */

    getRootPath: function() {
        /*
            返回当前 URL:
                http://localhost:8010/jsMethods/tst.html
         */
        var strFullPath = window.document.location.href;
        /*
            返回当前 URL 的路径部分:
                /jsMethods/tst.html
         */
        var strPath = window.document.location.pathname;
        var pos = strFullPath.indexOf(strPath);
        var prePath = strFullPath.substring(0, pos);
        var postPath = ""
        if (prePath.indexOf("micromsg.soulteams.com") > 0) {
            postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
        }
        return (prePath + postPath);
    },
    isTrue: function(s) {
        if (s === 1) {
            return true;
        } else if (s === "true") {
            return true;
        } else if (s === true) {
            return true
        } else {
            return false;
        }
    },
    getDateDiff: function(startDiffTime, endDiffTime) {
        //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式   
        startTime = startDiffTime.replace(/\-/g, "/");
        endTime = endDiffTime.replace(/\-/g, "/");
    },
    // 删除文本中所有标签
    removeAllHtmlTag: function(html) {
        return html.replace(/<[^>]+>/g, '');
    }
};

// 日期格式化
//var time1 = new Date().format("yyyy-MM-dd hh:mm:ss");
//var time2 = new Date().format("yyyy-MM-dd");
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
//************************************
//函数功能：判断是否为空
// null/undefined/empty/""
// "张三".isNull();
//************************************
String.prototype.isNull = function() {
    //alert(!this);
    //alert((this === null));
    //alert((typeof this === "undefined"));
    //alert(/^\s*$/.test(this));
    //alert((!this) && (this === null) && (typeof this === "undefined") && (/^\s*$/.test(this) && this.length == 0));
    return (!this) || (this === null) || (this == "undefined") || (/^\s*$/.test(this) || this.length == 0);
};

String.prototype.replaceAll = function(s1, s2) {
    return this.replace(new RegExp(s1, "g"), s2);
}

//************************************
//字符串格式化
//var newsList= `<div class="news ">
//     <div class="news-con">
//         <div class="news-con-left {0}" >
//             <p class="news-con-left-title">{1}</p>
//             <span class="news-con-left-type {6}" code={7}>{2}</span>
//         </div>
//         {3}
//     </div>
//     <div class="news-info"><span class="news-info-demp fl">{8}{4}</span><span class="news-info-time fr">{5}</span></div>
// </div>`;
// 
//newsList.format(style, pinDaoStyle, row.PinDao_value, isLock);
String.prototype.format = function() {
    if (arguments.length == 0) return this;
    for (var s = this, i = 0; i < arguments.length; i++)
        s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
    return s;
};
