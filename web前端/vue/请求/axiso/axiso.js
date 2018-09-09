import axios from 'axios';
import qs from 'qs';
import Promise from 'bluebird';
import {
    _removeFromArray,
    _noop,
    _typeof,
    _nullInsteadBy,
    _removeFromString,
} from './common';
import { i18n as _i18n } from '../messages';
import message from './message';
import {
    methodName as METHOD_NAME_TAG,
    baseURL,
    accessTokenCookieParamName,
    accessTokenInvalidCode,
    debugParamName,
} from '../constants/fetch';
import { MessageBox } from 'element-ui';

// axios 请求实例
const axiosIns = axios.create({
    baseURL, // 基准请求前缀，这儿最好别写 '/'，这样，测试url写成 ''，会在axios 中转换成 '/'，会导致意想不到的问题（已知道为什么）
    timeout: 10000, // 超时设置
    responseType: 'json', // 接受返回数据的类型（自动转换成json）
    // withCredentials: true, // 是否允许带cookie这些
    headers: { // 配置请求头
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
});

const {
    CancelToken, // 取消请求基础对象
    Cancel, // 传入错误回调的 参数 的 构造器
} = axios;

class AxiosMethodsClass {
    constructor() {
        this.options = {
            autoCancelBeforeReqs: new Set(), // 存放 自动取消之前请求的 url
            autoCancelAfterReqs: new Set(), // 存放 自动取消之后请求的 url
            ignoreRepeatReqs: new Set(), // 存放 忽略“禁止重复请求”的 url（默认 同 url 不能同时 pending.只能先完成一个）
            noErrorMsgReqs: new Set(), // 存放“不需要出错提示”的 url
            noSuccessMsgReqs: new Set(), // 存放“不需要成功提示”的 url
            noAutoSendParamsReqs: new Set(), // 存放“不需要自动添加要上传的数据”的 url
            urlsDefaultMethodName: { // 以 url 为 key，value 为 字符串，存放请求默认名称
                // 'https://www.xxx.com': '我是请求名称',
            },
        };
        this.requests = {}; // 保存请求实例等属性
        this.urlsWithSign = { // 以 url 为 key，value 为 数组，存放请求标志
            // 'https://www.xxx.com': [sign],
        };
        this.autoSendParams = {}; // 存放自动发送的请求属性（比如 csrf）
    }

    /**
     * 拿 axiosMethods 的配置
     * @param paramName
     * @returns {*}
     */
    getOptions(paramName) {
        if (paramName) {
            return this.options[paramName];
        }
        return this.options;
    }

    /**
     * 获取本请求的 详情
     * @param sign {symbol} 标志
     * @returns {*}
     */
    getRequestInfo(sign) {
        return this.requests[sign];
    }

    /**
     * 获取本请求的 参数 对象
     * @param sign {symbol} 标志
     * @param [paramName=undefined] {*} 参数 对象的 某个 key
     * @returns {*}
     */
    getRequestConfig(sign, paramName) {
        const thisRequestInfo = this.getRequestInfo(sign);
        if (!thisRequestInfo) {
            return null;
        }
        if (paramName) {
            return thisRequestInfo.config[paramName];
        }
        return thisRequestInfo.config;
    }

    /**
     * 获取本请求的 url
     * @param sign {symbol} 标志
     * @returns {*}
     */
    getRequestUrl(sign) {
        const thisRequestConfig = this.getRequestConfig(sign);
        if (!thisRequestConfig) {
            return null;
        }

        return thisRequestConfig.url;
    }

    /**
     * 初始化这个请求在此处的保存内容
     * @param sign {symbol}标志
     * @param url {string} 路径
     * @param [config={}] {object} 请求参数对象
     * @param [init=false] {boolean} 是否是在最初的初始化
     * @returns {AxiosMethodsClass}
     */
    initRequest(sign, url, config = {}, init) {
        if (!this.getRequestInfo(sign)) {
            this.requests[sign] = {};
        }

        if (!this.urlsWithSign[url]) {
            this.urlsWithSign[url] = [];
        }

        !init && this.urlsWithSign[url].push(sign);

        Object.assign(this.getRequestInfo(sign), {
            cancelByPerson: false, // 是否是人为取消的
            start_at: +Date.now(),
            end_at: undefined,
            config, // { url, params, method, settings, sign }
            cancelFun: _noop,
        });

        return this;
    }

    /**
     * 获取这个url所存放的请求标志
     * @param url {string} 路径
     * @returns {[]}
     */
    getThisUrlReqs(url) {
        return _typeof(this.urlsWithSign[url], 'array') ?
            this.urlsWithSign[url] :
            [];
    }

    /**
     * 判断这个 url 是否正在请求
     * @param url {string} 路径
     * @returns {boolean}
     */
    judgeThisUrlRequesting(url) {
        return this.getThisUrlReqs(url).length > 0;
    }

    /**
     * 设置此次请求的 `取消` 事件
     * @param sign {symbol} 标志
     * @param url {string} 路径
     * @param [cancelFun=function(){}] {function} 取消事件
     * @returns {AxiosMethodsClass}
     */
    setReqCancelFun(sign, url, cancelFun) {
        let reqInfo = this.getRequestInfo(sign);
        if (!reqInfo) {
            return this;
        }
        reqInfo.cancelFun = _typeof(cancelFun, 'function') ? cancelFun : _noop;
        return this;
    }

    /**
     * 设置终止时间
     * @param sign {symbol} 标志
     * @param [endAt=undefined] {number} 终止时间
     * @returns {AxiosMethodsClass}
     */
    setReqEndAt(sign, endAt) {
        const reqInfo = this.getRequestInfo(sign);
        if (!reqInfo) {
            return this;
        }
        reqInfo.end_at = _nullInsteadBy(endAt, +Date.now());
        return this;
    }

    /**
     * 设置这个url的请求均会自动取消之前的
     * @param url {string} 请求路径
     * @returns {AxiosMethodsClass}
     */
    setUrlAutoCancelBefore(url) {
        this.getOptions('autoCancelBeforeReqs').add(url);
        return this;
    }

    /**
     * 判断这个url是否加入了 “自动取消之前的请求” 功能
     * @param url {string} 请求路径
     * @returns {boolean}
     */
    judgeUrlAutoCancelBefore(url) {
        return this.getOptions('autoCancelBeforeReqs').has(url);
    }

    /**
     * 这个url不要再“自动取消之前的请求”
     * @param url {string} 请求路径
     * @returns {AxiosMethodsClass}
     */
    removeUrlAutoCancelBefore(url) {
        this.getOptions('autoCancelBeforeReqs').delete(url);
        return this;
    }

    /**
     * 设置这个url的请求不会有出错提示
     * @param url {string} 请求路径
     * @returns {AxiosMethodsClass}
     */
    setUrlNoErrorMsg(url) {
        this.getOptions('noErrorMsgReqs').add(url);
        return this;
    }

    /**
     * 判断这个url是否加入了 “请求不会有出错提示” 功能
     * @param url {string} 请求路径
     * @returns {boolean}
     */
    judgeUrlNoErrorMsg(url) {
        return this.getOptions('noErrorMsgReqs').has(url);
    }

    /**
     * 这个url不要再“请求不会有出错提示”
     * @param url {string} 请求路径
     * @returns {AxiosMethodsClass}
     */
    removeUrlNoErrorMsg(url) {
        this.getOptions('noErrorMsgReqs').delete(url);
        return this;
    }

    /**
     * 设置这个url的请求不会有成功提示
     * @param url {string} 请求路径
     * @returns {AxiosMethodsClass}
     */
    setUrlNoSuccessMsg(url) {
        this.getOptions('noSuccessMsgReqs').add(url);
        return this;
    }

    /**
     * 判断这个url是否加入了 “请求不会有成功提示” 功能
     * @param url {string} 请求路径
     * @returns {boolean}
     */
    judgeUrlNoSuccessMsg(url) {
        return this.getOptions('noSuccessMsgReqs').has(url);
    }

    /**
     * 这个url不要再“请求不会有成功提示”
     * @param url {string} 请求路径
     * @returns {AxiosMethodsClass}
     */
    removeUrlNoSuccessMsg(url) {
        this.getOptions('noSuccessMsgReqs').delete(url);
        return this;
    }

    /**
     * 设置这个url的请求，不自动添加当前设置的要自动上传的参数
     * @param url {string} 请求路径
     * @returns {AxiosMethodsClass}
     */
    setUrlNoAutoSendParams(url) {
        this.getOptions('noAutoSendParamsReqs').add(url);
        return this;
    }

    /**
     * 判断这个url是否加入了 “不自动添加当前设置的要自动上传的参数” 功能
     * @param url {string} 请求路径
     * @returns {boolean}
     */
    judgeUrlNoAutoSendParams(url) {
        return this.getOptions('noAutoSendParamsReqs').has(url);
    }

    /**
     * 这个url不要再“不自动添加当前设置的要自动上传的参数”
     * @param url {string} 请求路径
     * @returns {AxiosMethodsClass}
     */
    removeUrlNoAutoSendParams(url) {
        this.getOptions('noAutoSendParamsReqs').delete(url);
        return this;
    }

    /**
     * 设置这个url的请求（在执行完成前）均会自动取消之后的
     * @param url {string} 请求路径
     * @returns {AxiosMethodsClass}
     */
    setUrlAutoCancelAfter(url) {
        this.getOptions('autoCancelAfterReqs').add(url);
        return this;
    }

    /**
     * 判断这个url是否加入了 “自动取消之后的请求” 功能
     * @param url {string} 请求路径
     * @returns {boolean}
     */
    judgeUrlAutoCancelAfter(url) {
        return this.getOptions('autoCancelAfterReqs').has(url);
    }

    /**
     * 这个url不要再“自动取消之后的请求”
     * @param url {string} 请求路径
     * @returns {AxiosMethodsClass}
     */
    removeUrlAutoCancelAfter(url) {
        this.getOptions('autoCancelAfterReqs').delete(url);
        return this;
    }

    /**
     * 设置这个url忽略“不准重复请求”
     * @param url {string} 请求路径
     * @returns {AxiosMethodsClass}
     */
    setUrlIgnoreRepeat(url) {
        this.getOptions('ignoreRepeatReqs').add(url);
        return this;
    }

    /**
     * 判断这个url是否忽略“不准重复请求”
     * @param url {string} 请求路径
     * @returns {boolean}
     */
    judgeUrlIgnoreRepeat(url) {
        return this.getOptions('ignoreRepeatReqs').has(url);
    }

    /**
     * 这个url不要再忽略“不准重复请求”
     * @param url {string} 请求路径
     * @returns {AxiosMethodsClass}
     */
    removeUrlIgnoreRepeat(url) {
        this.getOptions('ignoreRepeatReqs').delete(url);
        return this;
    }

    /**
     * 设置这个url默认请求名称
     * @param url {string} 请求路径
     * @param methodName {string} 请求名称
     * @returns {AxiosMethodsClass}
     */
    setUrlsDefaultMethodName(url, methodName) {
        this.getOptions('urlsDefaultMethodName')[url] = methodName;
        return this;
    }

    /**
     * 获取这个url请求名称
     * @param url {string} 请求路径
     * @param sign {symbol} 请求标志
     * @returns {AxiosMethodsClass}
     */
    getThisUrlMethodName(url, sign) {
        const settings = this.getRequestConfig(sign, 'settings');
        return (settings && settings[METHOD_NAME_TAG]) ||
            this.getUrlsDefaultMethodName(url);
    }

    /**
     * 获取这个url默认请求名称
     * @param url {string} 请求路径
     * @returns {AxiosMethodsClass}
     */
    getUrlsDefaultMethodName(url) {
        return this.getOptions('urlsDefaultMethodName')[url];
    }

    /**
     * 移除这个url默认请求名称
     * @param url {string} 请求路径
     * @returns {AxiosMethodsClass}
     */
    removeUrlsDefaultMethodName(url) {
        // if (urlsDefaultMethodName[url]) {
        delete this.getOptions('urlsDefaultMethodName')[url];
        // }
        return this;
    }

    /**
     * 判断此次请求是否是 `人为取消` 的
     * @param sign {symbol} 标志
     * @returns {boolean}
     */
    judgeReqCancelByPerson(sign) {
        const reqInfo = this.getRequestInfo(sign);
        if (!reqInfo) {
            return false;
        }
        return reqInfo.cancelByPerson;
    }

    /**
     * 取消此次请求
     * @param sign {symbol} 标志
     * @param message 取消时的消息
     * @returns {AxiosMethodsClass}
     */
    cancelThisReqWithSign(sign, message) {
        const reqInfo = this.getRequestInfo(sign);
        if (!reqInfo) {
            return this;
        }
        const config = this.getRequestConfig(sign);
        const { url } = config;
        reqInfo.cancelByPerson = true;
        // 这个 取消此次请求的函数 好像是异步的
        // 此处本应只传入 一个 string 类型的 message
        // 但由于后面确实需要 config，所以没办法。
        reqInfo.cancelFun({
            message: message || _i18n.t(
                'fetch.cancel_this_url_req_default_msg', {
                    [METHOD_NAME_TAG]: _nullInsteadBy(
                        this.getThisUrlMethodName(url, sign),
                        _i18n.t('fetch.this_req_msg'),
                    ),
                },
            ),
            config,
        });
        // 由于上面是异步的，所以下面也只能异步
        setTimeout(() => this.dropThisReq(sign));
        return this;
    }

    /**
     * 取消这个 url 的所有正在处理的请求
     * @param url {string} 请求路径
     * @param message 提示消息
     */
    cancelThisUrlAllReq(url, message) {
        const thisUrlReqs = this.getThisUrlReqs(url);
        thisUrlReqs.map((sign, i, _) => {
            this.cancelThisReqWithSign(sign, message);
        });
        return this;
    }

    /**
     * 取消所有正在处理的请求
     * @param message 提示消息
     */
    cancelAllReqs(message) {
        const thisUrlReqs = Object.values(this.urlsWithSign);
        thisUrlReqs.map(signsArray => {
            signsArray.map(sign => {
                this.cancelThisReqWithSign(sign, message);
            });
        });
        return this;
    }

    /**
     * 从此处移除掉这个请求的信息
     * @param sign {symbol} 标志
     * @returns {AxiosMethodsClass}
     */
    dropThisReq(sign) {
        const url = this.getRequestUrl(sign);
        this.setReqEndAt(sign);
        delete this.requests[sign];
        _removeFromArray(this.urlsWithSign[url], sign);
        return this;
    }

    /**
     * 去掉有关这个 url 的所有配置
     * @param url
     */
    dropThisUrlAllConfig(url) {
        this.removeUrlAutoCancelAfter(url); // 自动取消之前请求
        this.removeUrlAutoCancelBefore(url); // 自动取消之后请求
        this.removeUrlIgnoreRepeat(url); // 自动禁止重复请求
        this.removeUrlNoErrorMsg(url); // “不需要出错提示”
        this.removeUrlNoSuccessMsg(url); // “不需要成功提示”
        this.removeUrlsDefaultMethodName(url); // 移除请求的默认名称
        this.removeUrlNoAutoSendParams(url); // 移除“不添加自动上传的参数”
    }

    /**
     * 设置自动要上传的东西 比如csrf
     * @param [params={}] {object} 参数对象 { key: value }
     * @returns {AxiosMethodsClass}
     */
    setAutoSendParams(params) {
        params = _typeof(params, 'object') ? params : {};
        Object.defineProperties(
            this.autoSendParams,
            Object.getOwnPropertyDescriptors(params),
        );
        return this;
    }

    /**
     * 获取自动要上传的东西
     * @param url {string} 路径
     * @param [params={}] {object} 参数对象 { key: value }
     * @returns {object}
     */
    getAutoSendParams(url, params) {
        // 如果这个 url 不需要添加自动上传的参数
        if (this.judgeUrlNoAutoSendParams(url)) {
            return {};
        }
        // 可以将参数合并，比如 我想改一下自动上传的参数
        if (_typeof(params, 'object')) {
            // 这儿有点绕，但是是为了 保留 this.autoSendParams 的特性，万一有 getter 呢
            return Object.defineProperties(
                Object.defineProperties({},
                    Object.getOwnPropertyDescriptors(this.autoSendParams),
                ),
                Object.getOwnPropertyDescriptors(params),
            );
        }
        return this.autoSendParams;
    }

    /**
     * 移除某个自动要上传的东西
     * @param key {*} 如果 key 为预定义的 删除所有params 的标志，那么移除所有要自动上传的
     * @returns {AxiosMethodsClass}
     */
    removeAutoSendParams(key) {
        if (key && this.autoSendParams[key]) {
            delete this.autoSendParams[key];
        }
        return this;
    }

    /**
     * 初始化自动上传的东西
     * @returns {AxiosMethodsClass}
     */
    removeAllAutoSendParams() {
        this.autoSendParams = {};
        return this;
    }
}

const axiosMethods = new AxiosMethodsClass();

// POST传参序列化(添加请求拦截器)
axiosIns.interceptors.request.use(
    config => {
        const { url, sign } = config;
        const thisUrlReqs = axiosMethods.getThisUrlReqs(url);
        // 判断是否需要自动取消当前的请求（因为还有正在请求的）
        if (thisUrlReqs.length > 1) {
            // 如果需要自动取消之前的
            if (axiosMethods.judgeUrlAutoCancelBefore(url)) {
                thisUrlReqs.slice(0, -1)
                    .map(
                        (_sign, i, _) => axiosMethods.cancelThisReqWithSign(
                            _sign,
                            _i18n.t('fetch.cancel_this_url_before_req_msg', {
                                [METHOD_NAME_TAG]: _nullInsteadBy(
                                    axiosMethods.getThisUrlMethodName(url, sign),
                                    _i18n.t('fetch.this_req_msg'),
                                ),
                            }),
                        ),
                    );
                return config;
            }
            // 如果需要自动取消之后的
            if (axiosMethods.judgeUrlAutoCancelAfter(url)) {
                thisUrlReqs.slice(1)
                    .map(
                        (_sign, i, _) => axiosMethods.cancelThisReqWithSign(
                            _sign,
                            _i18n.t('fetch.cancel_this_url_after_req_msg', {
                                [METHOD_NAME_TAG]: _nullInsteadBy(
                                    axiosMethods.getThisUrlMethodName(url, sign),
                                    _i18n.t('fetch.this_req_msg'),
                                ),
                            }),
                        ),
                    );
                return config;
            }
        }

        // 需要自动添加 access_token 到请求头中（跨域时，不能添加 Header）
        // const localAccessToken = localStorage.getItem(accessTokenCookieParamName);
        // if (localAccessToken) {
        //   config.headers[accessTokenCookieParamName] = localAccessToken;
        // }
        return config;
    },
    error => {
        message.error(error);
        return Promise.reject(new Error(error));
    },
);

// 返回状态判断(添加响应拦截器)
axiosIns.interceptors.response.use(
    res => {
        const { settings, sign } = res.config;
        // 这儿的 url 是由 axios 封装的，自动加上了 baseURL 头
        let { url } = res.config;
        url = _removeFromString(url, baseURL);
        const responseData = res.data;
        // 对响应数据做些事
        // 这里判断 200，是自己的习惯。
        // 自己定义后台返回数据形式为： { code: '', body: '', message: '' }
        if (!_typeof(responseData, 'object') || +responseData.code !== 200) {
            // 判断是否需要出错提示
            if (!axiosMethods.judgeUrlNoErrorMsg(url) &&
                !axiosMethods.judgeReqCancelByPerson(sign) &&
                !settings.noErrorMsg // 本次请求是否没有出错提示
            ) {
                // 提示错误
                message.warning(_nullInsteadBy(
                    responseData.message,
                    _i18n.t('fetch.this_req_failed_msg', {
                        [METHOD_NAME_TAG]: _nullInsteadBy(
                            axiosMethods.getThisUrlMethodName(url, sign),
                            _i18n.t('fetch.this_req_msg'),
                        ),
                    }),
                ));
            }
            // 如果返回的是 token 已失效，那么去掉 cookie 里面的 token，然后重载界面（触发 router 钩子函数）
            if (+responseData.code === accessTokenInvalidCode) {
                localStorage.removeItem(accessTokenCookieParamName);
                // 如果开启调试模式
                if (localStorage.getItem(debugParamName)) {
                    MessageBox.alert(
                        `请求类型：${res.config.method}<br>请求的参数：${JSON.stringify(
              res.config.params)}<br>返回的参数：${JSON.stringify(responseData)}<br>`,
                        '请求出现超时错误', {
                            showCancelButton: false,
                            confirmButtonText: '知道了',
                            dangerouslyUseHTMLString: true,
                        },
                    );
                } else {
                    setTimeout(() => location.reload(), 1000);
                }
            }
            return Promise.resolve(responseData);
        }

        // 请求成功的提示（如果需要成功提示的话，默认提示）
        if (!axiosMethods.judgeUrlNoSuccessMsg(url) && !settings.noSuccessMsg) {
            const successMsg = _i18n.t('fetch.this_req_success_msg', {
                [METHOD_NAME_TAG]: _nullInsteadBy(
                    axiosMethods.getThisUrlMethodName(url, sign),
                    _i18n.t('fetch.this_req_msg'),
                ),
            });
            message.success(successMsg);
        }
        return responseData;
    },
    error => {
        // 如果是手动取消的，那么这个 error 就会是 Cancel 的实例
        // 在 428 行， cancelThisReqWithSign() 中，我重新封装了一次 error
        // error 将会是： { message: { message: 'xxx', config: {} } }
        // 最外层的 message 是 axios 自己封装的，我没办法改。config 是 这个 请求的相关配置
        let config, errorMsg;
        if (error instanceof Cancel) {
            config = error.message.config;
            errorMsg = error.message.message;
        } else {
            config = error.config;
        }
        const { settings, sign } = config;
        // 这儿的 url 是由 axios 封装的，自动加上了 baseURL 头
        let { url } = config;
        url = _removeFromString(url, baseURL);
        errorMsg = errorMsg || _i18n.t(
            'fetch.this_req_error_msg', {
                [METHOD_NAME_TAG]: _nullInsteadBy(
                    axiosMethods.getThisUrlMethodName(url, sign),
                    _i18n.t('fetch.this_req_msg'),
                ),
            },
        );
        // 判断是否需要出错提示
        if (!axiosMethods.judgeUrlNoErrorMsg(url) &&
            !axiosMethods.judgeReqCancelByPerson(sign) &&
            !settings.noErrorMsg // 本次请求是否没有出错提示
        ) {
            message.error(errorMsg);
        }
        return Promise.reject(new Error(errorMsg));
    },
);

/**
 * 自动注册要暴露出去的Promise[axios]方法
 * @param method {string} 方式 get, post
 * @returns {Function}
 */
const axiosAutoRegisterFunc = method => (url, params, options, callback) => {
    // 默认配置
    let settings = {
        [METHOD_NAME_TAG]: undefined, // 请求名称
        noErrorMsg: false, // 不要有出错提示
        noSuccessMsg: false, // 不要有成功提示
        noAutoSendParams: false, // 不要添加自动要上传的参数
    };
    if (!_typeof(options, 'object')) {
        options = {};
    }
    settings = Object.assign(settings, options);

    // 创建一个唯一标志，标志此次请求（一开始打算用 {}，但是不能作为某对象的key，这样不能保证唯一）
    // 这儿如果使用 Symbol.for(url) 就可以去掉一个 url 多次请求了。
    const sign = _typeof(options.sign, 'symbol') ? options.sign : Symbol(url);

    // 首先初始化一下
    axiosMethods.initRequest(sign, url, {
        sign, // 加这个是因为，在手动取消请求后，进入了 response.use 的 error 函数，那里面 axios 自己封装的（692 行）
        url,
        params,
        settings,
        method,
    });
    // 获取这个url正在执行的请求的 标志 集合 [symbol(xxx), symbol(yyy)]
    const thisUrlReqs = axiosMethods.getThisUrlReqs(url);
    // 如果这个url当前有超过 1 个以上的请求 `正准备发起`。 此时还没有发起！！！
    if (
        thisUrlReqs.length > 1 &&
        !axiosMethods.judgeUrlIgnoreRepeat(url) // 且并没有说 这个url可以发起重复请求
    ) {
        // 出错提示
        const errorMsg = _i18n.t(
            'fetch.cancel_this_url_ignore_repeat_req_msg', {
                [METHOD_NAME_TAG]: _nullInsteadBy(
                    axiosMethods.getThisUrlMethodName(url, sign),
                    _i18n.t('fetch.this_req_msg'),
                ),
            },
        );
        // 正在处理中...
        message.warning(
            _i18n.t(
                'fetch.this_req_processing_msg', {
                    [METHOD_NAME_TAG]: _nullInsteadBy(
                        axiosMethods.getThisUrlMethodName(url, sign),
                        _i18n.t('fetch.this_req_msg'),
                    ),
                },
            ),
        );
        // 那么去掉 `第一个请求` 之后 `所有` 的 `正要发起的请求`。
        axiosMethods.dropThisReq(sign);
        // 说明此次是 怎么被取消的，并 `不发起请求`。
        return Promise.reject(new Error(errorMsg));
    }
    let sendDataTemplate = {};
    // 需要自动上传的参数。
    // 如果设置了不要自动上传，那就是 {}
    const autoSendParams = settings.noAutoSendParams ?
        {} :
        axiosMethods.getAutoSendParams(url);
    // 如果是 formData
    if (_typeof(params, 'formData')) {
        for (const i in autoSendParams) {
            // 这里要判断一次，保证参数只能被append一次
            // 优先考虑 params 本身 的参数（也就是说，params 里有 a，autoSendParams里面也有 a，就不 append 进 params 了）
            if (autoSendParams.hasOwnProperty(i)) {
                if (params.has(i)) {
                    continue;
                }
                params.append(i, autoSendParams[i]);
            }
        }
        sendDataTemplate = {
            data: params, // 如果不是 get 方式，那么传入 data 属性
            headers: { 'Content-Type': 'multipart/form-data' }, // 需要改请求头
        };
    } else {
        sendDataTemplate = {
            // 如果 autoSendParams 与 params 的 key 有重合，保留 params 的值
            data: qs.stringify({
                ...autoSendParams,
                ...params,
            }, { arrayFormat: 'brackets' }), // 如果不是 get 方式，那么传入 data 属性
        };
    }
    // 除了 get 请求之外的所有请求的 模板
    // 如果是 get 方式，那么 需要传入 params 属性
    if (method === 'get') {
        // 如果 autoSendParams 与 params 的 key 有重合，保留 params 的值
        sendDataTemplate = {
            params: {
                ...autoSendParams,
                ...params,
            },
        };
    }

    // 此次 axios 请求的 配置，并且合并
    // 因为上方已处理 get, post 方法不同的 请求体，post 是 { params: params }, get 是 { data: params }
    const axiosConfig = Object.assign({
            method, // 方式 'get', 'post' （暂不考虑其他的 put, patch）
            url, // 请求路径
            sign, // 请求标志（用于前后的 拦截器）
            settings, // 此次请求配置，比如请求的名称 methodName（比如 “编辑用户”）
            cancelToken: (function() { // 取消此次请求的 token
                const func = CancelToken.source();
                // 存放取消此次请求的函数
                axiosMethods.setReqCancelFun(sign, url, func.cancel);
                // 必须是 token
                return func.token;
            })(),
        },
        sendDataTemplate,
    );
    // 加上一个回调函数
    _typeof(callback, 'function') && callback(axiosConfig);

    // 发起请求
    const func = new Promise((resolve, reject) => {
        // 返回 Promise => 请求处理
        return axiosIns(axiosConfig).then(
            res => resolve(res),
            // 如果是人为取消的，那就不触发 catch 回调（暂时还是不改成这样吧）
            // err => { !axiosMethods.judgeReqCancelByPerson(sign) && reject(err); },
            err => reject(err),
        ).finally(() => axiosMethods.dropThisReq(sign)); // 最终执行完 要去清除 备份的 请求数据。
    });

    // 暴露一个取消方法，避免和 Promise 自带的 cancel 方法冲突。
    // 所以叫这名字
    func.cancelReq = (message) => axiosMethods.cancelThisReqWithSign(
        sign,
        message,
    );
    return func;
};

// 方便导出
const $get = axiosAutoRegisterFunc('get');
const $post = axiosAutoRegisterFunc('post');
const $methods = axiosMethods;
export default {
    // get请求
    get: $get,
    // post请求
    post: $post,
    // 导出 本地 axios 自定义方法配置
    methods: $methods,

    // 为 Vue 注册全局的实例函数（当然需要使用 Vue.use() 调用）
    install(Vue, options) {
        const { prototype } = Vue;
        prototype.$ajax = {
            get: $get,
            post: $post,
        };

        prototype.$ajaxGet = $get;
        prototype.$ajaxPost = $post;
        prototype.$ajaxMethods = $methods;
    },
};