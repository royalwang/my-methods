/**
 * Deferred对象的基本用法如下:
 */
function jqueryPromise() {
    var def = $.Deferred();
    //做一些异步操作
    setTimeout(function() {
        console.log('执行完成');
        def.resolve('随便什么数据');
    }, 2000);
    return def;
}
jqueryPromise().then(function(data) {
    console.log(data)
});


/**
 * ES6的Promise和jquery的promise区别
 *
 * 		由于jquery的def对象本身就有resolve方法，
 * 		所以我们在创建def对象的时候并未像ES6这样传入了一个函数参数，是空的。在后面可以直接def.resolve()这样调用
 */


//以下是ES6的Promise
function es6Promise() {
    var p = new Promise(function(resolve, reject) {
        //做一些异步操作
        setTimeout(function() {
            console.log('执行完成');
            resolve('随便什么数据');
        }, 2000);
    });
    return p;
}
es6Promise();

/**
 * 思考？
 *
 * 		由于jquery的def对象本身就有resolve方法，这样也有一个弊端，因为执行runAsync()可以拿到def对象，
 * 		而def对象上又有resolve方法，那么岂不是可以在外部就修改def的状态了？
 *
 * 代码如下(仅供举例说明，实际不能这么写！！！)
 */
var d = jqueryPromise();
d.then(function(data) {
    console.log(data);
});
d.resolve('在外部结束');

// 执行以上代码并不会在2秒后输出“执行完成”，而是直接输出“在外部结束”。
// 因为我们在异步操作执行完成之前，没等他自己resolve，就在外部给resolve了。
// 这显然是有风险的，比如你定义的一个异步操作并指定好回调函数，有可能被别人给提前结束掉，你的回调函数也就不能执行了。
// 
// 
/**
 * jquery提供了一个promise方法，就在def对象上，他可以返回一个受限的Deferred对象，
 * 所谓受限就是没有resolve、reject等方法，无法从外部来改变他的状态，用法如下：
 * 
 */


