// pages/mystore/mystore.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // text:"这是一个页面"
    hiddenModal: true
  },
  erweima(){
    console.log("erweima")
  },
  // 退出
  loginOut(){
    this.setData({
      hiddenModal: !this.data.hiddenModal
    })
  },
  listenerConfirm () {
    this.setData({
      hiddenModal: true
    })
  },

  listenerCancel(){
    this.setData({
      hiddenModal: true
    })
  },
  camera:function(){
    wx.navigateTo({
      url: './camera',
      success:function(){
        console.log("camera");
      }
    })
  },
  musices:function(e){
    console.log(e.target.innerText)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})