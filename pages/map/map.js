// pages/map/map.js
var app = getApp();
var Data, tiInput;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    scale: 12,
    latitude:28.2217518704,
    longitude: 113.1379795074
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '首页'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var _self = this;
    _self.getStAll(_self)
  },
  submit: function() {
    var _self = this;
    
    _self.getStAll(_self, tiInput)
  },
  tiInput: function(e) {
    tiInput = e.detail.value;
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
    var longitude, latitude, scale;
    if (e.markerId != undefined){
      latitude = Data[e.markerId].wd;
      longitude = Data[e.markerId].jd;
      scale = 14
    }
    this.setData({
      longitude: longitude,
      latitude: latitude,
      scale: scale,
    })
  },
  controltap(e) {
    console.log(e.controlId)
  },
  getStAll: function getStAll(_self, jname) {
    if (jname != undefined) {
      jname = {
        jname: jname
      }
    }else{
      jname=""
    }
    _self.mapCtx = wx.createMapContext('myMap')
    wx.request({
      url: app.globalData.path + '/info/findInfoAll', //上线的话必须是https，没有appId的本地请求貌似不受影响 
      method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT 
      header: {
        'Content-Type': "application/x-www-form-urlencoded",
        'Cookie': app.globalData.cookies
      }, // 设置请求的 header
      data: jname,
      success: function(res) {
        var data = JSON.parse(res.data.data);
        Data = data;
        var markers = []
        for (var i = 0; i < data.length; i++) {
          if (data[i].cod == undefined) {
            data[i].cod = ""
          }
          if (data[i].ad == undefined) {
            data[i].ad = ""
          }
          if (data[i].ph == undefined) {
            data[i].ph = ""
          }
          if (data[i].cq1 == undefined) {
            data[i].cq1 = ""
          }
          if (data[i].z == undefined) {
            data[i].z = ""
          }
          if (data[i].va == undefined) {
            data[i].va = ""
          }
          var content = data[i].jcdmc + "\nCOD:" + data[i].cod + "(mg/L)\n氨氮:" + data[i].ad + "(mg/L)\npH:" + data[i].ph + "\n累计流量" + data[i].cq1 + "(吨)\n水位:" + data[i].z + "(m)\n流速:" + data[i].va + "(m/s)"
          var marker = {
            id: i,
            latitude: data[i].wd,
            longitude: data[i].jd,
            width: 50,
            height: 30,
            callout: {
              content: content,
              padding: 3,
              borderRadius: 5,
              fontSize: 12,
              color: "#ccc",
              bgColor: "000",
            },
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
  }
})