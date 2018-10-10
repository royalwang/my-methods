/* 判断各类型方法 */
const browser = {
    version: function() {
        const userAgent = navigator.userAgent;
        return {
            /* 判断是否是ios */
            ios: !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            /* 判断是否是Android */
            android: userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1,

            /* 判断是否是移动端 */
            mobilePhone: !!userAgent.match(/AppleWebKit.*Mobile.*/),

            /* IE内核 */
            trident: userAgent.indexOf('Trident') > -1,
            /* opera内核 */
            presto: userAgent.indexOf('Presto') > -1,
            /* 苹果、谷歌内核 */
            webkit: userAgent.indexOf('AppleWebKit') > -1,
            /* 火狐内核 */
            gecko: userAgent.indexOf('Gecko') > -1 && userAgent.indexOf('KHTML') == -1,


            /* 判断是否是IPone手机或者QQHD浏览器 */
            iphone: userAgent.indexOf('iPhone') > -1,
            /* 判断是否是iPad */
            iPad: userAgent.indexOf('iPad') > -1,

            /* 判断是否是web应用程序(能够让用户完成某些特定任务的网站)，没有头部和底部 */
            webApp: userAgent.indexOf('Safari'),
            /* 是否是微信 */
            weixin: userAgent.indexOf('MicroMessenger'),
            /* QQ */
            QQ: userAgent.match(/\sQQ/i) == ' qq',
        }
    }(),
    /* 判断浏览器使用的语言:navigator.language除IE浏览器外的浏览器使用的语言，
     * navigator.browserLanguageIE浏览器使用的语言
     */
    browserLanguage: (navigator.language || navigator.browserLanguage).toLowerCase()
};
if (browser.version.ios || browser.version.android || browser.version.mobilePhone) {
    console.log('是移动端');
}