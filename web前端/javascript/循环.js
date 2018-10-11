// 一、 定义一个数组和对象
const arr = ['a', 'b', 'c', 'd', 'e', 'f'];
const obj = {
    a: 1,
    b: 2,
    c: 3,
    d: 4
}


// 二、循环
// 
/*
    1.for循环 （经常用来遍历数组元素，遍历值为数组元素索引）
 */

for (let i = 0, len = arr.length; i < len; i++) {
    console.log(i); // 0 1 2 3 4 5
    console.log(arr[i]); // a b c d e f
}
/*
    2.forEach(item,index,arr)   (用来遍历数组元素， 第一个参数为数组元素item，第二个参数为数组元素索引index，第三个参数为数组本身arr(可选), 没有返回值)
 */

arr.forEach((item, index) => {
    console.log(item); // a b c d e f
    console.log(index); // 0 1 2 3 4 5
})

/*
    3.map(item,index,arr)   (有返回值，返回一个新数组)

         every()，some()，filter()，reduce()，reduceRight()
 */

let arrData = arr.map((item, index) => {
    console.log(item); // a b c d e f
    console.log(index); // 0 1 2 3 4 5
    return item;
})
console.log(arrData); // ["a", "b", "c", "d", "e", "f"]
/*
    4.for...in   (可循环对象和数组，推荐用于循环对象！！！)
 */

//a).用于循环对象时-----> 循环值为对象属性
for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
        console.log(key); // a b c d  属性
        console.log(obj[key]); // 1 2 3 4  属性值
    }
}

//b).用于遍历数组时------> 值为数组索引
for (let index in arr) {
    console.log(index); // 0 1 2 3 4 5 数组索引
    console.log(arr[index]); // a b c d e f 数组值
}
/*
    5.for...of   （可循环对象和数组，推荐用于遍历数组！！！）
 */

//a).用于循环对象时-----> 须配合Object.keys()一起使用，直接用于循环对象会报错，不推荐使用for...of循环对象，循环值为对象属性
for (let value of Object.keys(obj)) {
    console.log(value); // a b c d 对象属性
}

//b).用于遍历数组时------>  遍历值为数组元素
for (let value of arr) {
    console.log(value); // a b c d e f 数组值
}