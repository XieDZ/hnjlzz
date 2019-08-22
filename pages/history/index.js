// pages/history/index.js
import * as echarts from '../../utils/echarts';
var util = require('../../utils/util.js');


var app = getApp();
var Data;

Page({

  /**
   * 页面的初始数据
   */
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/history/index',
      success: function () { },
      fail: function () { }
    }
  },

  data: {
    ec: {
      onInit: function (canvas, width, height) {
        barec = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(barec);
        return barec;
      }
    },
    selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示 
    selectData: ['001 岳麓区南园路94号海伦东方舞工作室', '002 岳麓区南园路94号海伦东方舞工作室', '003 岳麓区南园路94号海伦东方舞工作室'],//下拉列表的数据 
    index: 0,//选择的下拉列表下标 
  }, 

  // 点击下拉显示框 
  selectTap() {
    this.setData({
      selectShow: !this.data.selectShow
    });
  }, 

  // 点击下拉列表 
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标 
    this.setData({
      index: Index,
      selectShow: !this.data.selectShow
    });
  },

  // 时间选择 
  onLoad: function () {
    //设置默认的年份 
    var DATE = util.formatDate(new Date());
    this.setData({
      starttime: DATE,
      endtime: DATE
    });

  }, 

  //获取时间日期 
  bindDateChange(e) {
    let that = this;
    console.log(e.detail.value)
    that.setData({
      starttime: e.detail.value,
      endtime: e.detail.value,
    })
  }, 
  bindDateChange2(e) {
    let that = this;
    that.setData({
      date2: e.detail.value,
    })

  },

  onReady() {
    //setTimeout(this.getData, 500);
    wx.request({
      url: app.globalData.path + "/history/whMC",
      method: "get",
      herder: {
        'Content-Type': "application / x - www - form - urlencoded",
        'Cookie': app.globalData.cookies
      },
      data: "",
      cache: false,
      error: function () {
      },
      success: function (data) {
        
      }
    });
  }, 

  search1(st, start, end) {
    getDateByName(st)
  }, 



  //getData方法里发送ajax 
  getDateByName(data) {
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.path + '/GdInfo/getStByName',
      method: 'get',
      herder: {
        'Content-Type': "application / x - www - form - urlencoded",
        'Cookie': app.globalData.cookies
      },
      success: function (res) {
        console.log(res);
        var data = res.data.info;
        console.log(data);
        barec.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          grid: {
            left: 50,
          },
          legend: {
            data: ['水位'/*,'降雨量'*/],
            y: '25px'
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              data: time
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '水位(m)',
              position: 'right',
              min: 0,
              max: 5,

            }/*, 
                        { 
                            type: 'value', 
                            name: '降雨量(mm)', 
                            position: 'left', 
                            splitLine : { // 网格线 
                                show : false 
                            }, 
// inverse:true, 
                            nameLocation:'center', 
                        }*/
          ],
          dataZoom: [{
            type: 'slider',
            show: true,
            realtime: true,
            start: 75,
            end: 100,
          }],
          series: [{
            name: '水位',
            type: 'line',
            color: '#ffc107',
            data: water
          }/*,{ 
                        name : '降雨量', 
                        type : 'line', 
                        color : '#195fdf', 
                        yAxisIndex: 1, 
                        data : pcpn 
                    }*/]
        })
        wx.hideLoading();
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  } 

  
})