// pages/login/login.js
var app = getApp();
var pass;
var ressage;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ressage: "",
    userMas: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({ title: '用户登录' })
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '用户登录' })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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

  submit: function(e) {
    var _self = this;
    if (app.globalData.username == "" || app.globalData.username == null) {
      _self.setData({
        userMas: "请输入用户名",
      });
      return;
    }
    if (pass == "" || pass == undefined) {
      _self.setData({
        ressage: "请输入密码",
      });
      return;
    }
    wx.request({
      url: app.globalData.path + '/smallRoutine', //上线的话必须是https，没有appId的本地请求貌似不受影响 
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT 
      header: {
        'Content-Type': "application/x-www-form-urlencoded",
        'Cookie': 'SESSION=' + wx.getStorageSync("sessionId")
      }, // 设置请求的 header
      data: {
        username: app.globalData.username,
        password: pass,
      },
      success: function(res) {
        if (res.data.code == 200) {
          for (var i = 0; i < res.cookies.length; i++) {
            if (res.cookies[i].indexOf("shiroCookie") != -1) {
              app.globalData.cookies = res.cookies[0];
              wx.redirectTo({
                url: '../map/map'
              });
              break;
            }
          }
        } else {
          _self.setData({
            ressage: "登录失败"
          })
        }
      },
      fail: function(res) {
        _self.setData({
          ressage: res.data.data
        })
      },
      complete: function(res) {
        _self.setData({
          ressage: res.data.data
        })
      }
    })
  },
  passVal: function(e) {
    this.setData({
      ressage: "",
    });
    pass = e.detail.value;
  },
  userVal: function(e) {
    this.setData({
      userMas: "",
    });
    app.globalData.username = e.detail.value;
  }
})