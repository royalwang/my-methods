/**
 * 1、instanceof
 */
let array = [1, 2, 3, 4]; //字面量定义
// let array = new Array(1, 2, 'orange');
console.log(array)
console.log(array instanceof Array)
console.log(array.constructor === Array)

/**
 * 2、Array.isArray(value)
 * 因为是ES5新增的，只支持IE9+、Firefox 4+、Safari 5+、Opera 10.5+和Chrome
 */
function isArray(value) {
    return Array.isArray(value);
}


/**
 * 3、Object.prototype.toString.call(value)
 */
function isArrayFn1(o) {
    return Object.prototype.toString.call(o) === '[object Array]';
}
var arr = [1, 2, 3, 1];
console.log(isArrayFn1(arr)); // true 



/**
 * 综合方法
 */
var arr = [1, 2, 3, 1];
var arr2 = [{ abac: 1, abc: 2 }];

function isArrayFn2(value) {
    if (typeof Array.isArray === "function") {
        return Array.isArray(value);
    } else {
        return Object.prototype.toString.call(value) === "[object Array]";
    }
}
console.log(isArrayFn2(arr)); // true
console.log(isArrayFn2(arr2)); // true