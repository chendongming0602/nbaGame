// pages/nba/nba.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    team:"湖人队",
    Member:"詹姆斯",
    baImg:"cloud://dongming-y95n7.646f-dongming-y95n7-1259439013/球队/凯尔特人.jpg",//背景图
  },
  selectTeam(e){//选择的球队
    let team=e.detail;
    this.setData({
      team
    })
  },
  selectMember(e){//选择的球员
    let Member = e.detail
    this.setData({
      Member
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      title: "蜜囍美文",
      imageUrl: "https://minis-resources-1252149780.cos.ap-guangzhou.myqcloud.com/text/new/top.png",
      path: '/pages/index/index?id=10'
    };
  }
})