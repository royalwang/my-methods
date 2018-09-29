/**
 * 1、arr.forEach()
 * 遍历数组, 没有返回值, 不允许在循环体内写return, 不会改变原来数组的内容
 */
let array1 = [1, 2, 3, 4];

array1.forEach((item, index, array) => {
    console.log(item);
});

/**
 * 2、arr.map() 
 * 遍历数组, 会返回一个新数组, 不会改变原来数组里的内容
 * 
 */
let array2 = [1, 2, 3, 4];

let temp1 = array2.map((item, index, array) => {
    return item * 10;
});
console.log(temp1);　　 //  [10, 20, 30, 40];
let temp2 = array2.map(String);　　 // 把数组里的元素都转成字符串

/**
 * 3、arr.filter()
 * 过滤掉数组中不满足条件的元素, 把满足条件的元素放到一个新数组中, 不改变原数组
 */
let array3 = [1, 2, 3, 4];

let temp3 = array3.filter((item, index, array) => {　　
    return item > 3;
});
console.log(temp3);　　 // [4]

// 
/**
 * 4、arr.reduce()
 * 数组的递归、迭代
 */

let array4 = [1, 2, 3, 4];

let temp4 = array4.reduce((pre, cur) => {
    console.log("上一次计算过的值====" + pre);
    console.log("当前元素====" + cur);
    // 迭代求和
    return pre + cur;
});
console.log(temp4);　　 // 10
// pre 是上一次计算过的值, 第一次循环的时候是数组中的第1个元素
// cur 是数组中的每个元素, 第一次循环的时候是数组的第2个元素
// 
//
//  
/**
 * 5、arr.every()
 * every遍历数组, 每一项都是true, 则返回true, 只要有一个是false, 就返回false
 */
let array5 = [1, 2, 3, 4];

let bo = array5.every((item, index, array) => {　　
    return item > 2;
});
console.log(bo);　 // false

/**
 * 6、arr.some()
 * 遍历数组的每一项, 有一个返回true, 就停止循环
 */

let array6 = [1, 2, 3, 4];

let temp5 = array6.some((item, index, array) => {　　
    return item > 1;
});
console.log(temp5);　　 // true


/*
	以上均不改变原数组。 
	some、every返回true、false。 
	map、filter返回一个新数组。 
	reduce让数组的前后两项进行某种计算，返回最终操作的结果。 
	forEach 无返回值。
 */


/**
 * 7、Array.from() 
 * 将伪数组变成数组，只要有length的就可以转成数组
 * 或者使用：[].slice.call(arguments)
 */
let str1 = '12345'
console.log(Array.from(str1)) // ["1", "2", "3", "4", "5"]
let obj = { 0: 'a', 1: 'b', length: 2 }
console.log(Array.from(obj)) // ["a", "b"]

/**
 * 8、Array.of()，类似于new Array()
 * 将一组值转换成数组，类似于声明数组
 */
let str2 = '11'
console.log(Array.of(str2)) // ['11']


/**
 * 8、arr.copyWithin(target, start, end) 
 * 在当前数组内部，将指定位置的数组复制到其他位置，会覆盖原数组项，返回当前数组
 * 
 * 参数：
 * 		target-------必需。复制到指定目标索引位置。
 * 		start--------可选。元素复制的起始位置。
 * 		end----------可选。停止复制的索引位置 (默认为 array.length)。如果为负值，表示倒数。
 */

let arr0 = [1, 2, 3, 4, 5, 6, 7]
let arr1 = arr0.copyWithin(1)
console.log(arr1) // [1, 1, 2, 3, 4, 5, 6]
// let arr2 = arr.copyWithin(1, 2)
// console.log(arr2) // [1, 3, 4, 5, 6, 7, 7]
// let arr3 = arr.copyWithin(1, 2, 4)
// console.log(arr3) // [1, 3, 4, 4, 5, 6, 7]
// 

/**
 * 9、arr.find(callback)
 * 找到第一个符合条件的数组成员
 */
let arr4 = [1, 2, 3, 4, 5, 2, 4]
let arr5 = arr4.find((value, index, array) => value > 2)
console.log(arr5) // 3

/**
 * 10、arr.findIndex(callback) 
 * 找到第一个符合条件的数组成员的索引值
 */

let arr6 = [1, 2, 3, 4, 5]
let arr7 = arr6.findIndex((value, index, array) => value > 3)
console.log(arr7) // 3

/**
 * 11、arr.fill(target, start, end)
 * 使用给定的值，填充一个数组,ps:填充完后会改变原数组
 *
 * 参数： 
 *      target -- 待填充的元素
 *      start -- 开始填充的位置-索引
 *      end -- 终止填充的位置-索引（不包括该位置)
 */

let arr8 = [1, 2, 3, 4, 5]
let arr9 = arr8.fill(5)
console.log(arr9) // [5, 5, 5, 5, 5]
console.log(arr8) // [5, 5, 5, 5, 5]
// let arr10 = arr8.fill(5, 2)
// console.log(arr10)
// let arr11 = arr8.fill(5, 1, 3)
// console.log(arr11)

/**
 * 12、arr.includes() 
 * 判断数中是否包含给定的值
 *
 * ps:与indexOf()的区别：
 * 		1、indexOf()返回的是数值，而includes()返回的是布尔值
 * 		2、indexOf() 不能判断NaN，返回为-1 ，includes()则可以判断
 */

let arr12 = [1, 2, 3, 4, 5]
let arr13 = arr12.includes(2)
console.log(arr13) // ture
let arr14 = arr12.includes(9)
console.log(arr14) // false
let arr15 = [1, 2, 3, NaN].includes(NaN)
console.log(arr15) // true


