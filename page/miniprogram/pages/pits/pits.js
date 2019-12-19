// pages/pits/pits.js
import imgs from '../../utils/imgs.js';
let {select}=imgs
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select,//球衣数据
    indexs:select[0].id,//球衣的id
    isShow:false,
    count:2,
  },
  confirm(){//触发奖励
    this.setData({isShow:true,count:null});
  },
  imgE(e){//选泽
    let {index}=e.currentTarget.dataset
    this.setData({indexs:index});
  },
  querenE(){//确认领取奖励
    wx.redirectTo({
      url: '/pages/picture/picture?id='+this.data.indexs,
    });
  },
  fqE(){//取消
    wx.showModal({
      title: '温馨提示',
      content: '确定放弃奖励吗？',
      showCancel: true,
      cancelText: '取消放弃',
      cancelColor: '#369eff',
      confirmText: '确认放弃',
      confirmColor: '#999999',
      success: function(res) {
        if (res.confirm) {
          wx.navigateBack({
            delta: 1
          })
        } 
      },
     
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {id}=options;
    this.setData({
      count:id
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