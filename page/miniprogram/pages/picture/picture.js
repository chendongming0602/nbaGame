// pages/picture/picture.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top:0,
    left:0,
  },
  start(e){
   
    // console.log(this.x,this.y)
    
  },
  move(e){
    let top = e.touches[0].pageY-50;
    let left = e.touches[0].pageX-50;
    if(top<0){
      top=0
    }else if(top>this.height-100){
      top = this.height - 100
      console.log(112)
    }
    console.log(this.height)
    if(left<0){
      left=0
    }else if(left>this.width-100){
      left=this.width-100
    }
    this.setData({
      top,
      left
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        this.width = res.windowWidth;
        this.height = res.windowHeight;
      },
    })
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

  }
})