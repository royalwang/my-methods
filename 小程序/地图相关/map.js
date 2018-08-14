// <!-- map.wxml -->
// <map id="map" longitude="113.324520" latitude="23.099994" scale="14" controls="{{controls}}" bindcontroltap="controltap" markers="{{markers}}" bindmarkertap="markertap" polyline="{{polyline}}" bindregionchange="regionchange" show-location style="width: 100%; height: 300px;"></map>
// 
// 
// map的一些重要属性值：
/*
  
  show-location               Boolean                    显示带有方向的当前定位点
  bindmarkertap               EventHandle                点击标记点时触发，会返回marker的id
  bindcallouttap              EventHandle                点击标记点对应的气泡时触发，会返回marker的id
  bindcontroltap              EventHandle                点击控件时触发，会返回control的id
  bindregionchange            EventHandle                视野发生变化时触发





 */