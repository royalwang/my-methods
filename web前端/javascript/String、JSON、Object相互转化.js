//js对象转JSON
function jsToJSON(obj) {
    let objFnToStr = fnToStr(obj);
    return JSON.stringify(objFnToStr);
}

//字符串转JSON
function strToJSON(str) {
    let obj = eval('(' + str + ')');
    return jsToJSON(obj);
}

//JSON转js对象
function JSONToJs(json) {
    let obj = JSON.parse(json);
    return strToFn(obj);
}

//将js对象中的函数字符串解析为函数
function strToFn(obj) {
    var o = obj instanceof Array ? [] : {};
    for (var k in obj) {
        switch (typeof(obj[k])) {
            case 'object':
                o[k] = obj[k] ? strToFn(obj[k]) : null;
                break;
            case 'string':
                o[k] = obj[k].match(/^\s*(function\s*\(.*\)\s*)|(\(.*\)\s*\=>\s*)/) ? eval('(' + obj[k] + ')') : obj[k];
                break;
            default:
                o[k] = obj[k];
                break;
        }
    }
    return o;
}

//将js对象中的函数类型转为字符串
function fnToStr(obj) {
    var o = obj instanceof Array ? [] : {};
    for (var k in obj) {
        switch (typeof(obj[k])) {
            case 'object':
                o[k] = obj[k] ? fnToStr(obj[k]) : null;
                break;
            case 'function':
                o[k] = obj[k] + '';
                break;
            default:
                o[k] = obj[k];
                break;
        }
    }
    return o;
}