/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = '';
let devUrl = '';
let routerMode = 'history';
let imgBaseUrl = 'http://cangdu.org:8001/img/';


if (process.env.NODE_ENV == 'development') {
  //开发者模式
  baseUrl = 'http://cangdu.org:8001';
  devUrl = 'http://localhost:8085';
} else if (process.env.NODE_ENV == 'production') {
  //生产模式

}

export {
  baseUrl,
  devUrl,
  routerMode,
  imgBaseUrl,
}
