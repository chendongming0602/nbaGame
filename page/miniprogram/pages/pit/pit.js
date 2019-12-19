// miniprogram/pages/pit/pit.js
const APP=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alls:[
      {
        id:1,
        name:"猜 拳 高 手",
        bg:"https://minis-resources-1252149780.cos.ap-guangzhou.myqcloud.com/nbaGame/components/jiandao/bg2.jpg"
      },
      {
        id:2,
        name:"硬 币 专 家",
        bg:"https://minis-resources-1252149780.cos.ap-guangzhou.myqcloud.com/nbaGame/components/paoyingbi/bg.png"
      },
    ]
  },

  ggoo(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // this.dong();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    return {
      title: '《我懂球了》欢迎您',
      imageUrl: ""
    };
  }
})