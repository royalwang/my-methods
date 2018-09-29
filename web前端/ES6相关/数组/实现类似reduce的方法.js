Array.prototype.fakeReduce = function fakeReduce(fn, base) {
    let initialArr = this;
    let arr = initialArr.concat(); //数组连接

    if (base) arr.unshift(base); //向数组的开头添加一个或更多元素，并返回新的长度。
    let index, newValue;

    while (arr.length > 1) {
        index = initialArr.length - arr.length + 1;
        newValue = fn.call(null, arr[0], arr[1], index, initialArr);

        arr.splice(0, 2, newValue); // 直接用 splice 实现替换，，，指定的0的位置添加2个新的newValue
    }
    return newValue;
};


let arr = [1, 2, 3, 4, 5];
let sum = arr.fakeReduce((prev, cur, index, arr) => {
    console.log(prev, cur, index, arr);
    return prev * cur;
}, 100);

console.log(sum);