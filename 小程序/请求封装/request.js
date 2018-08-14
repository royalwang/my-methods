const DEFAULT_REQUEST_OPTIONS = {
    url: '',
    data: {},
    header: {
        // header 中不能设置 Referer
        // 最终发送给服务器的数据是 String 类型，如果传入的 data 不是 String 类型，会被转换成 String
        'Content-Type': 'application/json',// 默认值,传递JSON对象，需前台对数据进行 JSON 序列化（JSON.stringify）
        // "application/x-www-form-urlencoded"//传递JSON字符串
    },
    method: 'GET',//需大写
    dataType: 'json'//如果设为json，会尝试对返回的数据做一次 JSON.parse
}
const request = opt => {
    // 生成对象 结构
    let options = Object.assign({}, DEFAULT_REQUEST_OPTIONS, opt);
    let { url, data, header, method, dataType } = options
    return new Promise((resolve, reject) => {
        wx.request({
            url,
            data,
            header,
            method,
            dataType,
            success(res) {
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}

export default request