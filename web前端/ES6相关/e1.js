/*
    1、用class取代需要prototype
 */
function Fn(arr = []) {
    // 构造函数，首字母大写
    this._data = [...arr];
}

Fn.prototype.pop = function() {
    //构造函数的原型
    const value = this._data[0];
    this._data.splice(0, 1);
    return value;
}
// var a = new Arroption(arr);
// console.log(a.pop());
// 
// 
// 
// 以下是es6的写法
class Fn {
    constructor(arr = []) {
        this._data = [...arr];
    }
    pop() {
        const value = this._data[0];
        this._data.splice(0, 1);
        return value;
    }
}
// 继承机制
class Fnchild extends Fn() {
    peek() {
        return this._data[0];
    }
}

// var a = new FnChild(arr);
// console.log(a.peek());





/*
    2.解构赋值
 */
// 原来的方式
const arr = [1, 2, 3, 4]
const f = arr[0]
const s = arr[1]

//解构赋值的方式(一一对应)
const [f, s] = [1, 2, 3, 4]
//
//
//
// 删除不需要的属性
// 
// 下面的代码里，我们希望删除 _internal和 tooBig参数。我们可以把它们赋值给 internal和 tooBig变量，
// 然后在 cleanObject中存储剩下的属性以备后用
let { _internal, tooBig, ...cleanObject } = { el1: '1', _internal: "secret", tooBig: {}, el2: '2', el3: '3' };
console.log(cleanObject); // {el1: '1', el2: '2', el3: '3'}
//
//
//
//
// 在函数参数中解构嵌套对象
var car = { model: 'bmw 2018', engine: { v6: true, turbo: true, vin: 12345 } }
const modelAndVIN = ({ model, engine: { vin } }) => {
    console.log(`model: ${model} vin: ${vin}`);
}
modelAndVIN(car); // => model: bmw 2018  vin: 12345
//
//
//合并对象
//
let object1 = { a: 1, b: 2, c: 3 }
let object2 = { b: 30, c: 40, d: 50 }
let merged = { ...object1, ...object2 } // {a:1, b:30, c:40, d:50}






/*
    3.数组拷贝
 */
const arrCopy = [...arr]





/*
    4.Set 实例的方法
 */
// 
// size：返回Set实例的成员总数。
// 
// 操作方法
// add(value)：添加某个值，返回 Set 结构本身。
// delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
// has(value)：返回一个布尔值，表示该值是否为Set的成员。
// clear()：清除所有成员，没有返回值。
// 
// 
// 遍历方法
// keys()：返回键名的遍历器
// values()：返回键值的遍历器
// entries()：返回键值对的遍历器
// forEach()：使用回调函数遍历每个成员
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
    console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
    console.log(item);
}
// red
// green
// blue

//可以省略values方法，直接用for...of循环遍历 Set
for (let x of set) {
    console.log(x);
}
// red
// green
// blue
// 
// 
for (let item of set.entries()) {
    console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]

let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
// 
// 
// 遍历数组，改变原来的 Set 结构
// 
// // 方法一
let set = new Set([1, 2, 3]);
set = new Set([...set].map(val => val * 2));
// set的值是2, 4, 6

// 方法二
let set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2));
// set的值是2, 4, 6
// 








/*
    5.Map 实例的方法
 */
// 类似“键值对”的数据结构
// 
const m = new Map();
const o = { p: 'Hello World' };

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false
map.clear() //没有返回值
//
//
//遍历方法
const map = new Map([
    ['F', 'no'],
    ['T', 'yes'],
]);
[...map]

//[['F', 'no'], ['T', 'yes']]
//
for (let key of map.keys()) {
    console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
    console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
    console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
    console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
    console.log(key, value);
}
// "F" "no"
// "T" "yes"
// 
// 
// 




/*
    6.使用reduce取代map和filter
 */
const numbers = [10, 20, 30, 40];
const doubledOver50 = numbers.reduce((finalList, num) => {
    num = num * 2;
    if (num > 50) {
        finalList.push(num);
    }
    return finalList;
}, []);
doubledOver50(); // [60, 80]
//
//
//使用reduce匹配圆括号