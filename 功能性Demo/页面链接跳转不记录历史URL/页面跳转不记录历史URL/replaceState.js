/**
 * 1、history.pushState(state, title, url);
 * 2、history.replaceState(state, title, url);
 *
 *      state：一个与指定历史记录相关联的状态对象，当popstate事件触发时，会把该对象传入回调函数。如果不需要用到，可以传null
 *      title：页面的标题。但当前大多数浏览器都不支持或忽略这个值。可以传null
 *      url：添加或修改的history的网址。为了安全性，必须保持与当前URL同一个域
 *
 *
 * pushState()是在history栈中添加一个新的条目，replaceState()是替换当前的记录值
 * 
 */

var fnUrlReplace = function(eleLink) {
    // eleLink参数表示<a>链接DOM元素
    if (!eleLink) {
        return;
    }
    //1、首先通过HTML5 history.replaceState()方法把当前URL地址替换成以个井号#结尾的目前链接地址
    //2、执行location.replace('')刷新当前地址（此时#会忽略）
    var href = eleLink.href;

    if (href && /^#|javasc/.test(href) === false) {
        if (history.replaceState) {
            history.replaceState(null, document.title, href.split('#')[0] + '#');
            location.replace('');
        } else {
            location.replace(href);
        }
    }
};