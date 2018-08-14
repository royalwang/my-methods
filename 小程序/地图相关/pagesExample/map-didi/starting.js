var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
qqmapsdk = new QQMapWX({
    key: 'DHNBZ-2ZLKK-T7IJJ-AXSQW-WX5L6-A6FJZ'
});
const app = getApp()
Page({
    data: {
        scale: 16,
        latitude: 0,
        longitude: 0,
        address: '',
        bluraddress: '',
    },
    onLoad: function(options) {
        wx.getLocation({
            type: "gcj02",
            success: (res) => {
                // console.log(res)
                this.setData({
                    longitude: res.longitude,
                    latitude: res.latitude
                })

                var that = this;
                qqmapsdk.reverseGeocoder({
                    location: {
                        latitude: res.latitude,
                        longitude: res.longitude,
                    },
                    success: function(res) {
                      // 输入坐标返回地理位置信息和附近poi列表。
                        app.globalData.location = location
                        that.setData({
                            address: res.result.address,
                            bluraddress: res.result.formatted_addresses.recommend
                        });
                    },

                });
            }
        })

        // this.moveToLocation();
        //根据设备的宽高动态调整controls的位置
        wx.getSystemInfo({
            success: (res) => {
                this.setData({
                    controls: [{
                        id: 1,
                        iconPath: '../../assets/images/marker.png',
                        position: {
                            left: res.windowWidth / 2 - 11,
                            top: res.windowHeight / 2 - 45,
                            width: 22,
                            height: 45
                        },
                        clickable: true
                    }, {
                        id: 2,
                        iconPath: '../../assets/images/location.png',
                        position: {
                            left: 20, // 单位px
                            top: res.windowHeight - 200,
                            width: 40, // 控件宽度/px
                            height: 40,
                        },
                        clickable: true
                    }],
                })
            }
        })
    },

    onReady: function() {
        // wx.createMapContext(mapId, this)
        // 初始化一个mapCtx对象
        this.mapCtx = wx.createMapContext("didiMap"); // 地图组件的id
        this.movetoPosition()//初始地图将地图中心移到当前定位点
    },
    controltap: function(e) {
        console.log(e.controlId)
        if (e.controlId == 1) {
            this.movetoLocation();
        }
    },
    bindregionchange: function(e) {
        var that = this
        //调用mapCtx对象的getCenterLocation方法
        this.mapCtx.getCenterLocation({
            // 获取当前地图中心的经纬度，返回的是 gcj02 坐标系，可以用于 wx.openLocation
            success: function(res) {
                app.globalData.strLatitude = res.latitude
                app.globalData.strLongitude = res.longitude
                qqmapsdk.reverseGeocoder({
                    location: {
                        latitude: res.latitude,
                        longitude: res.longitude,
                    },
                    success: function(res) {

                        that.setData({
                            address: res.result.address,
                            bluraddress: res.result.formatted_addresses.recommend
                        })
                    },
                });

            }
        })

    },
    movetoPosition: function() {
        //调用mapCtx的moveToLocation方法，将地图中心移动到当前定位点
        this.mapCtx.moveToLocation();
    },
    toIndex() {
        let bluraddress = this.data.bluraddress;
        app.globalData.bluraddress = bluraddress
        wx.redirectTo({
            url: "/pages/index/index",
        })
    },
})