/**
 * 闭包是js中的一大特色，也是一大难点。简单来说，所谓闭包就是说，一个函数能够访问其函数外部作用域中的变量。
 *
 * 我的理解是，闭包就是能够读取其他函数内部变量的函数。
 *
 *
 * 在另一个作用域中保存了一份它从上一级函数或作用域取得的变量（键值对），而这些键值对是不会随上一级函数的执行完成而销毁。
 * 
 */



/**
 * 闭包的三大特点为：
 * 
 * 		1、函数嵌套函数
 *
 * 		2、内部函数可以访问外部函数的变量(如何从外部读取局部变量)
 *
 * 		3、参数和变量不会被回收。
 * 		
 */



/**
 * 使用闭包的注意点：
 *
 * 		1、由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，
 * 		在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除
 *
 * 		2、闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，
 * 		把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），
 * 		这时一定要小心，不要随便改变父函数内部变量的值。
 */

/**
 * 总结：
 *
 * 		优点：
 * 		1、闭包是指有权访问另一个函数作用域中的变量的函数，
 * 		2、创建闭包的最常见的方式就是在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量。
 * 		
 * 		缺点：
 * 		1、闭包的缺点就是常驻内存，会增大内存使用量，使用不当很容易造成内存泄露，
 * 		2、参数和变量不会被垃圾回收机制回收。
 */

function test() {
    var a = 1;
    return function() {
        console.log(a);
    }
}
// var try1 = test();
// try1(); //弹出a的值
// 
// 
var name = "The Window";
var object = {
    name: "My Object",
    getNameFunc: function() {
        return function() {
            return this.name;
        };
    }
};
console.log(object.getNameFunc()()); //The Window


function a() {
    var i = 0;

    function b() { console.log(++i); }
    return b;
}
var c = a();
c(); //1

/**
 * 上述这段代码有两个特点：
 * 
 * 		1、函数b嵌套在函数a内部；
 *
 *		2、函数a返回函数b。 
 *
 *
 * 引用关系如下：
 *
 * 		在执行完var c=a()后，变量c实际上是指向了函数b，再执行c()后就会弹出一个窗口显示i的值(第一次为1)
 *
 *
 * 函数a外的变量c引用了函数a内的函数b，也就是当函数a的内部函数b被函数a外的一个变量c引用的时候，就创建了一个闭包。
 */


// <ul id="testUL">
//      <li> index = 0</li>
//      <li> index = 1</li>
//      <li> index = 2</li>
//      <li> index = 3</li>
// </ul>

var newUL = document.createElement("ul");
//循环数组，创建节点
for (var i = 0; i < 4; i++) {
    var newLi = document.createElement("li");
    newLi.innerHTML = i;
    newUL.append(newLi);
};


var nodes = document.getElementsByTagName("li");
for (i = 0; i < nodes.length; i += 1) {
    nodes[i].onclick = (function(i) {
        return function() {
            console.log(i);
        } //不用闭包的话，值每次都是4
    })(i);
}