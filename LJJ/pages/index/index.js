//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    flag:true,
    flag1: false,
    flag2: false,
    dis:"block",
    dis1:"none",
    dis2:"none"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  scancode(){
    wx.scanCode({
      success:function(){
        console.log("scancode")
      }
    })
  },
  meau(){
    var that=this;
    that.setData({
      flag: true,
      flag1: false,
      flag2: false,
      dis:"block",
      dis1: "none",
      dis2: "none",
    })
  },
  talk(){
    this.setData({
      flag: false,
      flag1: true,
      flag2: false,
      dis: "none",
      dis1: "block",
      dis2: "none",
    })
  },
  shop(){
    this.setData({
      flag: false,
      flag1: false,
      flag2: true,
      dis: "none",
      dis1: "none",
      dis2: "block",
    })
  },
  // 下拉加载监听函数
  onPullDownRefresh:function(){
    setTimeout(function(){
      wx.stopPullDownRefresh();
      console.log(1);
    },1000)
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
