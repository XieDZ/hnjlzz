// pages/map/map.js
var app = getApp();
var Data;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    hiddenName:true,
    addr:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({ title: 'gis展示' })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var _self = this;
    this.mapCtx = wx.createMapContext('myMap')
    wx.request({
      url: app.globalData.path + '/info/findInfoAll', //上线的话必须是https，没有appId的本地请求貌似不受影响 
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT 
      header: {
        'Content-Type': "application/x-www-form-urlencoded",
        'Cookie': app.globalData.cookies
      }, // 设置请求的 header
      data: "",
      success: function(res) {
        var data = JSON.parse(res.data.data);
        Data = data;
        var markers = []
        for (var i = 0; i < data.length; i++) {
          var content = data[i].jcdmc + "\nCOD:" + data[i].cod + "(mg/L)\n氨氮:" + data[i].ad + "(mg/L)\npH:" + data[i].ph + "\n累计流量" + data[i].cq1
          var marker = {
            id: i,
           // iconPath: "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=530643247,2345229158&fm=85&app=57&f=JPEG?w=121&h=75&s=6961B3423BEC936C0CCDE406000080C2",
            latitude: data[i].wd,
            longitude: data[i].jd,
            width: 50,
            callout:{
              content: content,
              padding:3,
              borderRadius:5,
              fontSize:12,
              color:"#ccc",
              bgColor:"000",

            },
            
            height: 50
          }
          markers.push(marker);
        }
        _self.setData({
          markers: markers,
        })
      },
      fail: function(res) {
        console.log(res)
      },
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  includePoints: function() {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 3.10229,
        longitude: 113.3345211,
      }, {

      }]
    })
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    this.setData({
      addr:Data[e.markerId].jcdmc,
      hiddenName:false,
    })
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  }
})