'use strict';

/**
 * 空函数，不绑定 this
 * @private
 */
const _noop = function() {};

/**
 * 无元素对象
 * @type {object}
 */
const plainObject = {};

/**
 * 纯数字
 * @type {number}
 */
const plainNumber = 0;

/**
 * 存放 class to type 类型，用于 Object.prototype.toString.call(this) === ?
 * 例如：{ '[object Array]': 'array', '[object Function]': 'function' }
 * @type {{}}
 */
const class2Type = {};
(function() {
    const classes = 'Boolean Number String Function Object Array Date Error RegExp Symbol Undefined Null FormData'.split(
        ' ');
    for (let i = 0; i < classes.length; i++) {
        class2Type['[object ' + classes[i] + ']'] = classes[i].toLowerCase();
    }
})();

/**
 *  扩展typeof，自带的 typeof 不能判断 array, null, NaN, RegExp, Error, Date 类型
 * @param target {object} 要检验的对象
 * @param {string} [wishType=undefined] 用于比对的类型
 * @return {*} 当wishType不存在，返回对象类型；wishType为字符串类型，返回对象类型是否等于wishType
 * @private
 */
const _typeof = function _typeof(target, wishType) {
    let targetClass, originType;

    targetClass = plainObject.toString.call(target);
    originType = class2Type[targetClass];

    // 特例 NaN
    if (originType === 'number' && plainNumber.toString.call(target) === 'NaN') {
        originType = 'NaN';
    }

    // 如果传入了 wishType (!==undefined 避免 0, null, NaN 等情况)
    if (wishType !== undefined) {
        // 如果 wishType 是 string 类型的
        if (typeof wishType === 'string') {
            // 还是加上 toLowerCase 吧，避免大小写写错了，比如我还是习惯写 formData
            return wishType.toLowerCase() === originType;
            // 如果不是，那就让 originType 去比较， originType 肯定是 string 类型
        } else {
            return _typeof(wishType, originType);
        }
    }

    return originType;
};

/**
 * 从数组中移除某个成员
 * @param array {*} 要移除的
 * @param item {*} 成员
 * @param [removeNum=1] {number|boolean} 移除多少个相同的。为true 表示全部，超过数组中此成员的个数表示全部，<=0 那就不移除
 * @returns {*}
 * @private
 */
const _removeFromArray = function removeFromArray(
    array, item, removeNum) {
    if (!_typeof(array, 'array')) {
        return array;
    }

    if (!array.length) {
        return array;
    }

    // 如果没有输入，默认删除一个
    if (removeNum === undefined) {
        removeNum = 1;
    }

    // 输入是 true，那么删除所有
    if (removeNum === true) {
        removeNum = array.length;
    }

    // 如果执行到此处，都还不是数字，那么表示输入的不是 boolean 和 number
    if (!_typeof(removeNum, 'number')) {
        return array;
    }

    // 如果输入的个数小于等于0
    if (removeNum <= 0) {
        return array;
    }

    // 主体函数
    const remove = function(_arr, _item) {
        // 如果这个数组已经为空了
        if (!_arr.length) return _arr;
        // 使用 every 保证循环可以提前结束
        _arr.every(function(v, i, _) {
            // 确保只删除一个
            if (v === _item) {
                _.splice(_.indexOf(v), 1);
                // 结束循环
                return false;
            }
            return true;
        });
        return _arr;
    };
    // 使用 for 更简单，更炫点可以 Array(removeNum).fill(1).map(()=>remove(array, item));
    for (let i = 0; i < removeNum; i++) {
        remove(array, item);
    }

    return array;
};

/**
 * 移除出字符串中指定元素
 * @param source {string} 源字符串
 * @param str {string} 目标元素
 * @param removeAll {*=undefined} 是否移除全部
 * @returns {*}
 * @private
 */
const _removeFromString = function _removeFromString(source, str, removeAll) {
    if (_typeof(source) !== 'string' || _typeof(str) !== 'string') {
        return source;
    }
    const regExp = new RegExp(`${str}`, removeAll ? 'g' : '');
    return source.replace(regExp, '');
};

/**
 * 从url中获取参数值
 * @param name 参数名称
 * @returns {string|null}参数存在返回参数值，不存在返回null
 */
const _getQueryString = function _getQueryString(name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    const r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
};

/**
 * 将对象转变成 url 参数
 * @param obj 对象
 * @param firstParamWithQuestionMask=false 首个参数前 是否自动添加 "?"
 * @returns {string} 转换后的 string
 */
const _setQueryString = function _setQueryString(
    obj, firstParamWithQuestionMask) {
    function toQueryPair(key, value) {
        if (_typeof(value, 'undefined')) {
            return key;
        }
        return key + '=' + encodeURIComponent(value === null ? '' : String(value));
    }

    if (!_typeof(obj, 'object')) {
        return '';
    }
    let ret = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            key = encodeURIComponent(key);
            let values = obj[key];
            if (_typeof(values, 'array')) { // 数组
                let queryValues = [];
                for (let i = 0, len = values.length, value; i < len; i++) {
                    value = values[i];
                    queryValues.push(toQueryPair(key, value));
                }
                ret = ret.concat(queryValues);
            } else { // 字符串
                ret.push(toQueryPair(key, values));
            }
        }
    }

    if (firstParamWithQuestionMask) {
        return '?' + ret.join('&');
    }
    return ret.join('&');
};

/**
 * 简易防抖
 * @param func 防抖函数
 * @param threshold 时长
 * @returns {*}
 */
const _debounced = function debounced(func, threshold) {
    if (typeof func !== 'function') {
        return func;
    }

    let debounceT = null; // 定时变量
    let that = null; // 存储 this 变量
    let args = []; // 存储 返回的 arguments

    // （不考虑数值(2^53)溢出、大于2^31和小于-2^31-1 的问题）
    // 因为 只要 延时大于 2^31-1=2147483647，或者小于0，均会被立即执行
    // 
    threshold = threshold >> 0 || 10; // 延时间隔//   有符号按位右移运算符>>
    //左移1位等于乘以2，右移1位等于除以2，然后再取整，移位溢出的丢弃

    return function() {
        that = this; // 保存 this
        args = arguments; // 保存 参数
        debounceT && clearTimeout(debounceT);
        debounceT = setTimeout(function() {
            func.apply(that, args);
        }, threshold);
    };
};
/**
 * 简易节流
 * @param func 节流函数
 * @param threshold 时长
 * @returns {*}
 */
const _throttle = function throttle(func, threshold) {
    if (typeof func !== 'function') {
        return func;
    }

    let previousTime = null; // 定时变量
    let that = null; // 存储 this 变量
    let args = []; // 存储 返回的 arguments

    // （不考虑数值(2^53)溢出、大于2^31和小于-2^31-1 的问题）
    // 因为 只要 延时大于 2^31-1=2147483647，或者小于0，均会被立即执行
    threshold = threshold >> 0 || 10; // 延时间隔）

    return function() {
        that = this; // 保存 this
        args = arguments; // 保存 参数
        let nowTime = Date.now();
        if (nowTime - previousTime > threshold) {
            previousTime = nowTime;
            func.apply(that, args);
        }
    };
};

/**
 * 兼容addEventListener函数
 * @param ele ElementDOM
 * @param event 事件名称
 * @param fn 事件functionName
 * @param options 见 https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener
 */
const _addEventListener = function _addEventListener(ele, event, fn, options) {
    if (ele.addEventListener) {
        ele.addEventListener(event, fn, options || false);
    } else {
        ele.attachEvent('on' + event, fn.bind(ele));
    }
};
/**
 * 兼容removeEventListener函数
 * @param ele ElementDOM
 * @param event 事件名称
 * @param fn 事件functionName
 * @param options 见 https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/removeEventListener
 */
const _removeEventListener = function _removeEventListener(
    ele, event, fn, options) {
    if (ele.removeEventListener) {
        ele.removeEventListener(event, fn, options || false);
    } else {
        ele.detachEvent('on' + event, fn.bind(ele));
    }
};

/**
 * 手动触发事件
 * @param target jQuery对象或者 DOM原生对象
 * @param event:string jQuery对象的事件名称,DOM原生对象的事件名称
 */
const _trigger = function _trigger(target, event) {
    if (_typeof(event, 'string')) {
        if (target instanceof EventTarget) {
            target.dispatchEvent(new Event(event));
        }
        return true;
    }
    _throwWindowErrorMsg('未知事件类型');
};

/**
 * 触发 window 全局错误提示
 * @param errorMsg {string} 提示消息
 * @private
 */
const _throwWindowErrorMsg = function _throwWindowErrorMsg(errorMsg) {
    window.__errorMsg__ = errorMsg;
    _trigger(window, 'error');
    setTimeout(function() {
        delete window.__errorMsg__;
    });
};

/**
 * 生成随机字符串
 * @param len 字符串长度，默认32位
 * @returns {string}
 * thanks: http://blog.csdn.net/wangkiml/article/details/52880051
 */
const _randomString = function _randomString(len) {
    len = len || 32;
    const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1 //
    const maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
};
/**
 * RGB颜色转换为16进制
 * @param value {string} 颜色值
 * @returns {string}
 */
const _rgbToHex = function _rgbToHex(value) {
    // 十六进制颜色值的正则表达式
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(value)) {
        value = value.replace(/\s+/g, ''); // 去掉空格
        let aColor = value.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
        let strHex = '#';
        for (let i = 0; i < aColor.length; i++) {
            let hex = Number(aColor[i]).toString(16);
            if (hex === '0') {
                hex += hex;
            }
            // 有可能aColor[i]小于16，那么就是一位的，一位的的话，下面的!==7成里，就没没有转换成功
            if (hex.length < 2) {
                hex = '0' + hex;
            }
            strHex += hex;
        }
        if (strHex.length !== 7) {
            strHex = value;
        }
        return strHex;
        // 如果是十六进制的
    } else if (reg.test(value)) {
        let aNum = value.replace(/#/, '').split('');
        if (aNum.length === 6) {
            return value;
        } else if (aNum.length === 3) {
            let numHex = '#';
            for (let i = 0; i < aNum.length; i += 1) {
                numHex += (aNum[i] + aNum[i]);
            }
            return numHex;
        }
    } else {
        return value;
    }
};
/**
 * 16进制颜色转为RGB格式
 * @param value {string} 颜色值
 * @returns {string}
 */
const _hexToRgb = function _hexToRgb(value) {
    // 十六进制颜色值的正则表达式
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    let sColor = value.toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            let sColorNew = '#';
            for (let i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        // 处理六位的颜色值
        const sColorChange = [];
        for (let i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
        }
        return 'RGB(' + sColorChange.join(',') + ')';
    } else {
        return sColor;
    }
};

/**
 * 当值不存在时，替换成 instead
 * @param value {*} 源值
 * @param {*} [instead='未知'] 如果 value == null 替换成的值
 * @returns {string}
 */
const _nullInsteadBy = function _nullInsteadBy(value, instead) {
    // 这儿只能写null，避免 value = 0, 或者value = ''
    return value == null ?
        instead == null ?
        '未知' :
        instead :
        value;
};
/**
 * 简单的 function 结果缓存（只能有单个参数）
 * @param fn {function} 函数
 * @returns {function(*=): *}
 * @private
 */
const _cachedFn = function _cachedFn(fn) {
    const cachedResult = {};
    return function cachedFn(param) {
        if (!cachedResult[param]) {
            cachedResult[param] = fn(param);
        }
        return cachedResult[param];
    };
};

module.exports = {
    _noop,
    _typeof,
    _removeFromArray,
    _removeFromString,
    _setQueryString,
    _getQueryString,
    _addEventListener,
    _removeEventListener,
    _debounced,
    _throttle,
    _trigger,
    _throwWindowErrorMsg,
    _hexToRgb,
    _rgbToHex,
    _randomString,
    _nullInsteadBy,
    _cachedFn,
};