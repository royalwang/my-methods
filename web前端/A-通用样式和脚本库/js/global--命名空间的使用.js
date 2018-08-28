// 全局方法命名空间
var GLOBAL = {};
// 声明全局命名空间
GLOBAL.namespace = function(str) {
    var arr = str.split('.'),
        o = GLOBAL;
    console.log(arr); // ["Dom"]["Event"]["Lang"]["Cookie"]
    for (var i = (arr[0] == 'GLOBAL') ? 1 : 0; i < arr.length; i++) {
        o[arr[i]] = o[arr[i]] || {};
        o = o[arr[i]];
    }
}


// 创建命名空间注册工具类     
var Namespace = new Object();
Namespace.register = function(path) {
    var arr = path.split(".");
    var ns = "";
    for (var i = 0; i < arr.length; i++) {
        if (i = "" > 0) ns += ".";
        ns += arr[i];
        eval("if(typeof(" + ns + ") == 'undefined') " + ns + " = new Object();");
    }
}


//***************************
GLOBAL.namespace('Dom');

GLOBAL.Dom.getNextNode = function(node) {
    node = typeof node == 'string' ? document.getElementById(node) : node;
    var nextNode = node.nextSibling;
    if (!nextNode) {
        return null;
    }
    if (!document.all) {
        while (true) {
            if (nextNode.nodeType == 1) {
                break;
            } else {
                if (nextNode.nextSibling) {
                    nextNode = nextNode.nextSibling;
                } else {
                    break;
                }
            }
        }
    }
    return nextNode;
}
GLOBAL.Dom.setOpacity = function(node, level) {
    node = typeof node == 'string' ? document.getElementById(node) : node;
    if (document.all) {
        node.style.filter = 'alpha(opacity=' + level + ')';
    } else {
        node.style.opacity = level / 100;
    }
}
GLOBAL.Dom.get = function(node) {
    node = typeof node == 'string' ? document.getElementById(node) : node;
    return node;
}
GLOBAL.Dom.getElementsByClassName = function(str, root, tag) {
    if (root) {
        root = typeof root == 'string' ? document.getElementById(root) : root;
    } else {
        root = document.body;
    }
    var els = root.getElementsByTagName(tag),
        arr = [];
    for (var i = 0, n = els.length; i < n; i++) {
        for (var j = 0, k = els[i].className.split(' '), l = k.length; j < l; j++) {
            if (k[j] == str) {
                arr.push(els[i]);
                break;
            }
        }
    }
    return arr;
}
GLOBAL.Dom.addClass = function(node, str) {
    if (!new RegExp("(^|\\s+)" + str).test(node.className)) {
        node.className = node.className + " " + str;
    }
}
GLOBAL.Dom.hasClass = function(name, type) {
    var r = [];
    var re = new RegExp("(^|\\s)" + name + "(\\s|$)");
    var e = document.getElementsByTagName(type || "*");
    for (var j = 0; j < e.length; j++) {
        if (re.test(e[j])) {
            r.push(e[j]);
        }
    }
    return r;
}
GLOBAL.Dom.removeClass = function(node, str) {
    node.className = node.className.replace(new RegExp("(^|\\s+)" + str), "");
}


GLOBAL.namespace('Event');


GLOBAL.Event.getEventTarget = function(e) {
    e = window.event || e;
    return e.srcElement || e.target;
}
GLOBAL.Event.stopPropagation = function(e) {
    e = e.window || e;
    if (document.all) {
        e.cancelBubble = true;
    } else {
        e.stopPropagation();
    }
}
GLOBAL.Event.on = function(node, eventType, handler, scope) {
    node = typeof node == 'string' ? document.getElementById(node) : node;
    if (document.all) {
        node.attachEvent('on' + eventType, function() {
            handler.apply(scope, arguments);
        });
    } else {
        node.addEventListener(eventType, function() {
            handler.apply(scope, arguments);
        }, false);
    }
}

/** Lang：js语言扩展库 **/
GLOBAL.namespace('Lang');

GLOBAL.Lang.trim = function(ostr) {
    return ostr.replace(/^\s+|s+$/g, "");
}
GLOBAL.Lang.isNumber = function(s) {
    return !isNaN(s);
}
GLOBAL.Lang.isString = function(s) {
    return typeof s === 'string';
}
GLOBAL.Lang.isBoolean = function(s) {
    return typeof s === 'boolean';
}
GLOBAL.Lang.isFunction = function(s) {
    return typeof s === 'function';
}
GLOBAL.Lang.isNull = function(s) {
    return s === null;
}
GLOBAL.Lang.isUndefined = function(s) {
    return typeof s === 'undefined';
}
GLOBAL.Lang.isEmpty = function(s) {
    return /^\s$/.test(s);
}
GLOBAL.Lang.isArray = function(s) {
    return s instanceof Array;
}
/*
@ 函数功能：对输入框的特殊字串进行过滤保存
@ 参数strPass：过滤前的字符串
@ 返回值：过滤后的字符串
*/
GLOBAL.Lang.SQLenCode = function(byVal, strPass) {
    strPass = Replace(strPass, "&", "&");
    strPass = Replace(strPass, "<", "<");
    strPass = Replace(strPass, ">", ">");
    strPass = Replace(strPass, "\"\"", "\"");
    strPass = Replace(strPass, "'", "'");
    strPass = Replace(strPass, " ", "　");
    strPass = Replace(strPass, chr(13) & chr(10), "<br/>");
    return strPass;
}
//************************************
// 函数功能：对SQLencode函数过滤后的字符串进行还原
// @strPass：过滤前的字符串
// 返回值：过滤后的字符串
//************************************
GLOBAL.Lang.SQLdecode = function(byVal, strPass) {
    if (strPass != null) {
        strPass = Replace(strPass, "<", "<");
        strPass = Replace(strPass, ">", ">");
        strPass = Replace(strPass, "\"", "\"\"");
        strPass = Replace(strPass, "'", "'");
        strPass = Replace(strPass, "<br/>", chr(13) & chr(10))
    }
    return strPass;
}
GLOBAL.Lang.extend = function(subClass, superClass) {
    var F = function() {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;
    subClass.superClass = superClass.prototype;
    if (superClass.prototype.constructor == Object.prototype.constructor) {
        superClass.prototype.constructor = superClass;
    }
}
GLOBAL.Lang.Dictionary = function() {
    this.keys = new Array();
    this.data = new Array();
    //添加键值对
    this.set = function(key, value) {
        if (this.data[key] == null) { //如键不存在则身【键】数组添加键名
            this.keys.push(value);
        }
        this.data[key] = value; //给键赋值
    };
    //获取键对应的值
    this.get = function(key) {
        return this.data[key];
    };
    //去除键值，(去除键数据中的键名及对应的值)
    this.remove = function(key) {
        this.keys.remove(key);
        this.data[key] = null;
    };
    //判断键值元素是否为空
    this.isEmpty = function() {
        return this.keys.length == 0;
    };
    //获取键值元素大小
    this.size = function() {
        return this.keys.length;
    };
}
//************************************
// 函数功能：字符串过滤掉Img标签
// @str：过滤前的字符串
// 返回值：过滤后的字符串
//************************************
GLOBAL.Lang.clearTagImg = function(str) {
    var txt = str.replace(/ <img.* >.* < \/img>/ig, "");
    txt = txt.replace(/<img.*\/>/ig, "");
    return txt;
}

//************************************
// 函数功能：字符串过滤掉的所有Html标签
// @str：过滤前的字符串
// 返回值：过滤后的字符串
//************************************
GLOBAL.Lang.clearTag = function(str) {
    var txt = str.replace(/<[^>]*>/ig, "");
    return txt;
}


//************************************
GLOBAL.namespace("Cookie");

GLOBAL.Cookie = {
    read: function(name) {
        var cookieStr = ";" + document.cookie + ";";
        var index = cookieStr.indexOf(";" + name + "=");
        if (index != -1) {
            var s = cookieStr.substring(index + name.length + 3, cookieStr.length);
            return unescape(s.substring(0, s.indexOf(';')));
        } else {
            return null;
        }
    },
    set: function(name, value, expires) {
        var expDays = expires * 24 * 60 * 60 * 1000;
        var expDate = new Date();
        expDate.setTime(expDate.getTime() + expDays);
        var expString = expires ? ";expires" + expDate.toGMTString() : "";
        var pathString = ";path=/";
        document.cookie = name + "=" + escape(value) + expString + pathString;
    },
    del: function() {
        var exp = new Date(new Date().getTime() - 1);
        var s = this.read(name);
        if (s != null) {
            document.cookie = name + "=" + s + ";expires=" + exp.toGMTString() + ";path=/";
        }
    }
};