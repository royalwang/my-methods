var firstLoading = true;

function WebPage() {
    this.policiesType;
    this.keyword;
    this.$reContent = $("#pullrefresh0");
    this.pageSize = 0;
}

WebPage.prototype = {
    //初始化开关
    init: function() {
        this.initUi();
        this.initEvent();
    },
    //初始化UI
    initUi: function() {

        var _self = this;
        //监听tap时间，解决a标签不能跳转页面问题
        mui('.topbar,.seach').on('tap', 'a', function() { document.location.href = this.href; });

        mui("body").on("tap", ".mui-icon-clear", function() {
            _self.refresh();
        });
        
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    /*
        初始化事件
     */
    initEvent: function() {
        var _self = this;

        var multiTopBar = (function(contId, refreshEvt, loadMoreEvt) {
            var ary = [],
                i = 0,
                l = $("#sliderSegmentedControl").children('a').length;
            for (; i < l; i++) {
                ary.push({
                    container: '#' + contId + i,
                    down: {
                        auto: (i == 0 ? true : false),
                        callback: refreshEvt
                    },
                    up: {
                        contentrefresh: '正在加载...',
                        callback: loadMoreEvt
                    }
                })
            }
            return ary;
        })('pullrefresh', _self.refresh, _self.loading);

        //监听滑动事件
        $('#slider').on('slide', function(e) {
            var slider = mui("#slider").slider();
            // 获取选项卡对应的容器ID
            var _contentID = slider.currentPage.element.id;
            //获取标签的policiesType属性值
            _self.policiesType = $("#sliderSegmentedControl").children('a[href="#' + _contentID + '"]').attr("policiesType");
            // 获取标签下的内容盒子
            _self.$reContent = $("#" + _contentID).children('.mui-content');
            //获取pullrefresh
            _self.refresh();
        });

        mui.init({
            pullRefresh: multiTopBar
            // pullRefresh: [{
            //     container: '#pullrefresh0',
            //     down: {
            //         auto: false,
            //         callback: _self.refresh
            //     },
            //     up: {
            //         contentrefresh: '正在加载...',
            //         callback: _self.loading
            //     }
            // }, {
            //     container: '#pullrefresh1',
            //     down: {
            //         callback: _self.refresh
            //     },
            //     up: {
            //         contentrefresh: '正在加载...',
            //         callback: _self.loading
            //     }
            // }, {
            //     container: '#pullrefresh2',
            //     down: {
            //         callback: _self.refresh
            //     },
            //     up: {
            //         contentrefresh: '正在加载...',
            //         callback: _self.loading
            //     }
            // }, {
            //     container: '#pullrefresh3',
            //     down: {
            //         callback: _self.refresh
            //     },
            //     up: {
            //         contentrefresh: '正在加载...',
            //         callback: _self.loading
            //     }
            // }, ]
        });

        if (mui.os.plus) {
            mui.plusReady(function() {
                setTimeout(function() {
                    mui('#pullrefresh0').pullRefresh().pullupLoading();
                }, 10);
            });
        } else {
            //初始化下拉加载
            // mui.ready(function() {
            //     mui('#pullrefresh0').pullRefresh().pullupLoading();//初始化正在加载
            // });
        }
    },
    // 刷新数据
    refresh: function() {
        // 每次刷新页码回归第一页
        page.pageSize = 1; //分页重置
        page.renderList(page.policiesType, 1, 2, 0);
        setTimeout(function() {
            //二次加载重新开启刷新，恢复滚动
            mui(page.$reContent).pullRefresh().refresh(true);
            console.log("刷新了");
            console.log(`当前${page.pageSize}页`);
        }, 600);
        //结束下拉刷新true，继续加载false
        mui(page.$reContent).pullRefresh().endPulldownToRefresh(true);
    },
    // 加载数据
    loading: function() {
        var _self = this;
        if (firstLoading) {
            firstLoading = false;
        }
        // 判断是否还有数据
        // 
        setTimeout(function() {
            page.renderList(page.policiesType, ++page.pageSize, 2, 1);
        }, 800);
        console.log(`当前${page.pageSize}页`);
    },
    renderList: function(type, pageIndex, pageSize, acntionMode) {
        var _self = this;
        //模拟后台接口
        var jsonData = [{ name: "张三", describe: "今天是2018/09/05，哈哈", county: "河北区", time: "2018/6/1", type: "1" }, { name: "李四", describe: "今天天气非常好", county: "红桥区", time: "2018/8/23", type: "2" }, { name: "王五", describe: "秋高气爽，艳阳高照", county: "南开区", time: "2018/10/7", type: "0" }];
        // 需要填充的容器(找到ul，填充li)
        var $renderBox = _self.$reContent.find("ul.mui-table-view");
        //如果数据大于0就解析数据，否则告诉程序没有数据不允许加载了
        if (jsonData != null && jsonData.length > 0) {
            var li = "";
            $.each(jsonData, function(i, v) {
                li += '<li class="mui-table-view-cell">' +
                    '<div class="mui-table">' +
                    '<div id="dvContent' + i + '" class="mui-table-cell mui-col-xs-9">' +
                    '<div class="mui-ellipsis fontBase fh4">' + v.name + '</div>' +
                    '<div class="fontBase fh5">描述：' + v.describe + '</div>' +
                    '<p class="mui-h6 mui-ellipsis">区县：' + v.county + '</p>' +
                    '</div>' +
                    '<div class="mui-table-cell mui-col-xs-3 mui-text-right">' +
                    '<span class="mui-h5">' + v.time + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</li>';

            });
            //3.把模板输出到页面上
            // 
            /**
             * @param    {[type]}   acntionMode [通过这个标识判断是应该追加数据，还是替换数据]
             * @return   {[type]}               [0代表替换，1代表追加]
             */
            if (acntionMode == 0) {
                // 刷新时应替换数据
                $renderBox.html(li);
                //结束上拉刷新
                mui(page.$reContent).pullRefresh().endPulldownToRefresh();
            } else {
                // 加载时应追加数据
                $renderBox.append(li);
                //结束下拉加载true
                //继续加载false
                console.log(page.pageSize);
                mui(page.$reContent).pullRefresh().endPullupToRefresh(page.pageSize >= 2 ? true : false);
            }

        } else {
            /**
             * @param    {[type]}   acntionMode [没数据时加载模式]
             * @return   {[type]}               [description]
             */
            if (acntionMode == 0) {
                // 刷新时应替换数据
                $renderBox.html("");
                mui(page.$reContent).pullRefresh().refresh(true);
            }
            // 告诉系统数据全部加载完成，没有其他数据了，不允许继续加载
            mui(page.$reContent).pullRefresh().endPullupToRefresh(true); //true
        }
    }
}
var page;
//初始化页面
$(function() {
    page = new WebPage();
    page.init();
});