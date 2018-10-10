/*
	一、计算属性（computed）、方法（methods）和侦听属性（watch）的区别与使用场景

	****methods VS 计算属性****

		1、计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值。
		   这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。

		2、相比而言，只要发生重新渲染，method 调用总会执行该函数。

		总之，重新计算开销很大的话请选计算属性，不希望有缓存的请选methods。


	****watch VS 计算属性****

		当你在模板内使用了复杂逻辑的表达式时，你应当使用计算属性。

		侦听属性是一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。 
		当你有一些数据需要随着其它数据变动而变动时，或者当需要在数据变化时执行异步或开销较大的操作时，你可以使用 watch。
 */



/*
	二、Vue 路由中 hash 模式和 history 模式区别

	****hash模式****
		
		hash 出现在 URL 中，但不会被包含在 http 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面。
 		特点：hash虽然在URL中，但不被包括在HTTP请求中；用来指导浏览器动作，hash不会重加载页面。


 	****history模式****
 	
 	 	history 利用了 html5 history interface 中新增的 pushState() 和 replaceState() 方法。
 	 	这两个方法应用于浏览器记录栈，在当前已有的 back、forward、go 基础之上，它们提供了对历史记录修改的功能。
 	 	只是当它们执行修改时，虽然改变了当前的 URL ，但浏览器不会立即向后端发送请求。


 	****原理：****
 	
 		hash 模式的原理是 onhashchange 事件，可以在 window 对象上监听这个事件。 
		history ：hashchange 只能改变 # 后面的代码片段，history api （pushState、replaceState、go、back、forward） 则给了前端完全的自由，通过在window对象上监听popState()事件。
 */