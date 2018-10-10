/*
一、定义全局filters

	1、src目录下自定义filters文件，index.js写入指定方法集

	2、main.js入口文件中进行如下操作：

		import * as filters from './filters' // global filters

		Object.keys(filters).forEach(key => {
  			Vue.filter(key, filters[key])
		});
	
	3、页面中即可使用
		{{createdate | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
 */



/*
二、注册全局组件

main.js中引入   globalComponents.js 即可

 */



/*
三、化繁为简的Watch

watch: {
    //监测的值
    xxx: {
        handler: 'functionName', //执行的方法名
        immediate: true //表示创建组件时立马执行
    }
}

 */



/*
四、工具集，请求，配置信息可以直接挂在在Vue原型(prototype)上

	1、import Utils from './config/utils.js' //工具集
	  import Api from './service/getData.js' //请求

	2、Vue.prototype.$Api = Api
	  Vue.prototype.$Utils = Utils


	页面中直接使用
	  this.$Api.fn
	  this.$Utils.fn
 */



/*
五、判断开发、生产环境

const __DEV__ = () => {
  return process.env.NODE_ENV == 'development' ? true : false;
}

 */