var BaseAjax = {
    //*****************
    // BaseApi.sendRequest(arg);
    // 说明：发送URL请求
    // 示例：BaseApi.sendRequest({ url: ActivityLmUrl, box: { dv1: "dvLm",dv2:"dvLmCutPage" }, obj: new ActivityLm(),onCompleted:function(d){ alert('数据读取完毕,读取总数为：'+d.总数); }});
    //*****************
    get: function(arg) {
        $.ajax({
            type: "GET",
            url: arg.url || "",
            data: arg.data || "",
            dataType: "json",
            async: (arg.async != undefined || arg.async != null) ? Boolean(arg.async) : true,
            beforeSend: function() {
                //$("#msg").html("logining");
                // 调用加载
            },
            success: function(data) {
                arg.success && arg.success(data);
            },
            //调用执行后调用的函数
            complete: function(XMLHttpRequest, textStatus) {},
            //调用出错执行的函数
            error: function() {}
        });
    },
    post: function(arg) {
        $.extend(arg, { hasModulID: true });
        if (Boolean(arg.hasModulID)) {
            arg.data["mid"] = typeof basePage != 'undefined' ? (basePage.mid || "") : "";
        }
        //alert(basePage.mid);

        $.ajax({
            type: "POST",
            url: arg.url || "",
            data: arg.data || "",
            async: (arg.async != undefined && arg.async != null) ? Boolean(arg.async) : true,
            dataType: "json", //"xml", "html", "script", "json", "jsonp", "text".
            processData: (arg.processData != undefined && arg.processData != null) ? Boolean(arg.processData) : true,
            // processData 默认值: true。默认情况下，通过data选项传递进来的数据，如果是一个对象(技术上讲只要不是字符串)，
            // 			   都会处理转化成一个查询字符串，以配合默认内容类型 "application/x-www-form-urlencoded"。
            // 			   当设置为false的时候,jquery ajax 提交的时候不会序列化 data，而是直接使用data
            cache: (arg.cache != undefined && arg.cache != null) ? Boolean(arg.cache) : true,
            //contentType: (arg.contentType != undefined && arg.contentType != null) ? Boolean(arg.contentType) : true,
            beforeSend: function() {
                //$("#msg").html("logining");
                // 调用加载
                //layer = $("body").soul_Loading();
                //layer.open();

            },
            //成功返回之后调用的函数             
            success: function(data) {
                arg.success && arg.success(data);
                // 模拟个时间来关闭，一般情况是在ajax读取时候调用open()，读取后手动调用close()
                //layer.close();
                //setTimeout(function () {
                //    layer.close();
                //}, 2000);
                //layer.close();
            },
            //调用执行后调用的函数
            complete: function(XMLHttpRequest, textStatus) {
                //layer.close();
            },
            //调用出错执行的函数
            error: function() {
                //layer.close();
            }
        });
    },
}