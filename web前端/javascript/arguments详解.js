/*
	arguments 是一个类似数组的对象, 对应于传递给函数的参数。
 */

/*
	arguments对象不是一个 Array 。它类似于数组，但除了 长度之外没有任何数组属性。例如，它没有 pop 方法。但是它可以被转换为一个真正的数组：
 */
let args = Array.prototype.slice.call(arguments);
let args = [].slice.call(arguments);
/*
	你还可以使用 Array.from()方法或 spread 运算符将 arguments 转换为真正的数组：
 */
let args = Array.from(arguments);
let args = [...arguments];

/*
	另一种方法是使用 被忽视的/鄙视/轻视,/看不起 Array构造函数作为一个函数：
 */
let args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));