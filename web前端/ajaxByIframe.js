/* 
 * 使用隐藏的iframe发送表单提交
 * Author: 邓智容
 * Created: 2017-06-19,  Last-Modified: 2017-06-19
 * 依赖 jQuery或者 Zepto
 * 
 *
 * options参数说明：
        url     : api接口地址 （必填）
        type    : 请求method（选填。默认值为get）
        data    : 发送的data对象。（选填。默认为空）

        blank   : 当前域下blank.html页面的url地址 （选填。默认值为当前页面路径下的blank.html。填写的是绝对路径）
        form    : form表单DOM （选填。需要提交的form表单DOM）

        success : 表单提交成功后的回调函数，参数为返回的data数据
        error   : 表单提交失败后的回调函数

 * 使用示例：
        var submitByIframe = PostByIframe.create({
            url: 'http://example.com/api',
            type: 'post',
            data: {
                    a: 12,
                    b: 32
                },
            blank: 'http://example.com/blamk.html',
            success: function(res) {
                console.log(res);
            },
            error: function() {
                alert('服务器错误！');
            }
        });

        // 发送请求
        submitByIframe.submit();

 * 注意事项：
        1. 一定要有blank.html，且空白页内设置的document.domain 与 当前页的document.domain 一致；
        2. 当前页一定要设置 document.domain；
        3. 当前组件跨域只适合父域名相同的跨域接口间的访问!!!!!!!!；
        4. 依赖jQuery或者Zepto，可兼容到IE7；
 */
var PostByIframe = (function(window, document, $) {
    var PostByIframe = function(options) {
        options = options || {};
        this.options = options;
        this.data = options.data || {};
        this.url = options.url;
        this.type = options.type || 'GET';
        this.$form = options.form ? $(options.form) : null;

        this.success = options.success;
        this.error = options.error;

        this.formId = 'trick_post_form_' + this.index;
        this.iframeId = 'trick_post_hidden_iframe_' + this.index;

        this.blankUrl = options.blank ?
            options.blank :
            window.location.href.split(/#|\?/)[0].substring(0, window.location.href.lastIndexOf('/') + 1) + 'blank.html';
    }

    PostByIframe.prototype = {
        formatIframeHtml: function() {
            var iframeHtml = '<iframe id="' + this.iframeId + '" name="' + this.iframeId + '" src="' + this.blankUrl + '" style="display:none"></iframe>';
            return iframeHtml;
        },

        formatFormHtml: function() {
            var self = this;
            var formHtml = '',
                inputHtml = '',
                data = this.data;
    
            formHtml += '<form' +
                ' target=' + self.iframeId +
                ' method=' + self.type +
                ' id=' + self.formId +
                ' enctype=multipart/form-data' +
                ' style="display: none"' +
                '>';

            inputHtml += '<input type="hidden" name="url" value="' + self.blankUrl + '"/>';
            for (var key in data) {
                inputHtml += '<input type="hidden" name="' + key + '" value="' + data[key] + '"/>';
            }

            formHtml += inputHtml;
            formHtml += '</form>';

            return formHtml;
        },

        init: function(cb) {
            var self = this;

            // 插入隐藏的iframe和form
            var $body = $('body'),
                iframeHtml = self.formatIframeHtml();
            $body.append(iframeHtml);
            self.$iframe = $('#' + self.iframeId);

            if (!self.$form) {
                var formHtml = self.formatFormHtml();
                $body.append(formHtml);
                self.$form = $('#' + self.formId);
            }

            self.$iframe.unbind('load').on('load', function() {
                cb && cb();
            });
        },

        // 从iframe的返回参数中获取返回值
        getUrlValue: function(s) {
            if (s.search(/#/) > 0) {
                s = s.slice(0, s.search(/#/));
            }
            var r = {};
            if (s.search(/\?/) < 0) {
                return r;
            }
            var p = s.slice(s.search(/\?/) + 1).split('&');
            for (var i = 0, j = p.length; i < j; i++) {
                var tmp = p[i].split('=');
                r[tmp[0]] = tmp[1];
            }
            return r;
        },

        // 绑定iframe的加载，获取加载返回值
        bindSubmit: function() {
            var self = this;
            var $iframe = self.$iframe;
            $iframe.unbind('load').on('load', function() {
                try {
                    var href = $iframe.prop('contentWindow').location.href;
                    var res = self.getUrlValue(href);
                    if (res) {
                        self.success && self.success(res);
                    } else {
                        self.error && self.error();
                    }
                } catch (err) {
                    self.error && self.error();
                }
            });
        },

        // 提交表单
        submit: function() {
            var self = this;
            if (!self.isInited) {
                self.init(function() {
                    self.isInited = true;
                    self.bindSubmit();
                    self.submitForm();
                });
            } else {
                self.submitForm();
            }
        },

        submitForm: function() {
            this.$form.attr('action', this.url).submit();
        }
    };

    PostByIframe.count = 0;

    PostByIframe.create = function(options) {
        var formSubmit = new PostByIframe(options);
        formSubmit.index = PostByIframe.count;
        PostByIframe.count++;
        return formSubmit;
    };

    return PostByIframe;

})(window, document, $);