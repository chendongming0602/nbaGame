// miniprogram/pages/pit/pit.js
const APP=getApp();
import imgs from '../../utils/imgs.js';
let { select } = imgs
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
    ],
    checking: true,//是否在审核
    select,//球衣数据
    indexs: select[0].id,//球衣的id
  },
  imgE(e) {//选泽
    let { index } = e.currentTarget.dataset
    this.setData({ indexs: index });
  },
  querenE() {//确认领取奖励
    wx.redirectTo({
      url: '/pages/picture/picture?id=' + this.data.indexs,
    });
  },
  fqE() {//取消
    wx.showModal({
      title: '温馨提示',
      content: '确定放弃奖励吗？',
      showCancel: true,
      cancelText: '取消放弃',
      cancelColor: '#369eff',
      confirmText: '确认放弃',
      confirmColor: '#999999',
      success: function (res) {
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
    if (APP.isAPPLoad) {//和APP回调判断是否授权了
      this.alls()
    } else {
      APP.checkLoginReadyCallback = res => {
        this.alls()
      }
    }
   
    // this.dong();
  },
  alls(){
    this.setData({
      checking: global.checking
    });
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