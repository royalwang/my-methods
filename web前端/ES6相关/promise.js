/**
 * 
 * @authors Yutang NIE (13920365339@163.com)
 * @date    2018-06-20 10:17:26
 * @link    https://github.com/yutang8215
 */


/**
 * Promise是一个构造函数，自己身上有all、reject、resolve这几个方法，原型上有then、catch等同样很眼熟的方法。
 * 这么说用Promise new出来的对象肯定就有then、catch方法
 *
 *
 * 一个 Promise 的当前状态必须为以下三种状态中的一种：等待态（Pending）、完成态|成功（Fulfilled）和拒绝态|失败（Rejected）。
 */



/**
 * promise的使用
 * 
 * 		我们用Promise的时候一般是包在一个函数中，在需要的时候去运行这个函数
 *
 * 		注意：我只是new了一个对象，并没有调用它，我们传进去的函数就已经执行了，这是需要注意的一个细节。
 */
function runAsync() {
    var p = new Promise(function(resolve, reject) {
        //做一些异步操作
        setTimeout(function() {
            console.log('执行完成');
            resolve('随便什么数据');
        }, 2000);
    });
    return p;
}
runAsync();



/**
 * then方法
 * 
 * promise.then(onFulfilled, onRejected)
 *
 * 		onFulfilled 和 onRejected 都是可选参数。
 * 		
 * 		注：如果我们只想传onRejected而不想传onFulfilled，可以这么写：pormise.then(null, onRejected)
 * 			
 */

runAsync().then(function(data) {
    // 在runAsync()的返回上直接调用then方法，then接收一个参数，是函数，
    // 并且会拿到我们在runAsync中调用resolve时传的的参数。运行这段代码，会在2秒后输出“执行完成”，紧接着输出“随便什么数据”。
    console.log(data);
    //后面可以用传过来的数据做些其他操作
    //......
});


/**
 * 链式调用
 *
 * 		promise.then().then().then()
 */


/**
 * reject的用法
 *
 * 		reject的作用就是把Promise的状态置为rejected，这样我们在then中就能捕捉到，然后执行“失败”情况的回调。
 */
function getNumber() {
    var p = new Promise(function(resolve, reject) {
        //做一些异步操作
        setTimeout(function() {
            var num = Math.ceil(Math.random() * 10); //生成1-10的随机数
            if (num <= 5) {
                resolve(num);
            } else {
                reject('数字太大了');
            }
        }, 2000);
    });
    return p;
}


getNumber()
    .then(
        //运行getNumber并且在then中传了两个参数，then方法可以接受两个参数，第一个对应resolve的回调，第二个对应reject的回调。
        function(data) {
            console.log('resolved');
            console.log(data);
        },
        function(reason, data) {
            console.log('rejected');
            console.log(reason);
        }
    );


/**
 * catch的用法
 *
 * 		和then的第二个参数一样，用来指定reject的回调，效果和写在then的第二个参数里面一样。
 * 		不过它还有另外一个作用：在执行resolve的回调（也就是上面then中的第一个参数）时，如果抛出异常了（代码出错了），
 * 		那么并不会报错卡死js，而是会进到这个catch方法中。
 */

getNumber()
    .then(function(data) {
        console.log('resolved');
        console.log(data);
    })
    .catch(function(reason) {
        console.log('rejected');
        console.log(reason);
    });



/**
 * all的用法---->「谁跑的慢，以谁为准执行回调」
 *
 * 		Promise的all方法提供了'并行执行'异步操作的能力，并且在所有异步操作执行完后才执行回调。
 *
 * 		用Promise.all来执行，all接收一个数组参数，里面的值最终都算返回Promise对象。
 * 		这样，三个异步操作的并行执行的，等到它们都执行完后才会进到then里面。
 */
Promise
    .all([runAsync1(), runAsync2(), runAsync3()])
    .then(function(results) {
        console.log(results);
    });



/**
 * race的用法---->「谁跑的快，以谁为准执行回调」
 * 		
 * 		race的用法与all一样
 * 		
 */
Promise
    .race([runAsync1(), runAsync2(), runAsync3()])
    .then(function(results) {
        console.log(results);
    });