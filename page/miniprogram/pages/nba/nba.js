// pages/nba/nba.js
const db = wx.cloud.database();
const APP=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    team:"湖人队",
    Member:"詹姆斯",
    baImg:"",//背景图
    teamList:[],
    memList:[],
  },
  selectTeam(e){//选择的球队
  console.log(e)
    let team=e.detail.name;
    let id = e.detail.id;
    this.setData({
      team
    })
  },
  selectMember(e){//选择的球员
    let Member = e.detail.name;
    let id = e.detail.id;
    this.setData({
      Member
    })
  },
  teamEvent(){//球队
    return db.collection("team").get().then(res=>{
      let list = res.data[0].list
      this.setData({ 
        teamList: list,
        team: list[0].name,
      });
      return list
    }).catch(err=>{
    })
  },
  MemberEvent(){//球员
    return db.collection("member").where({
      id:this._id
    }).get().then(res => {
      let list=res.data[0].list;
      this.setData({
        memList:list,
        baImg: list[0].teamImg,
      })
    }).catch(err => {
      console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.teamEvent().then(res=>{
      this._id=res[0].id;
      this.MemberEvent();
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
    return {
      title: "蜜囍美文",
      imageUrl: "https://minis-resources-1252149780.cos.ap-guangzhou.myqcloud.com/text/new/top.png",
      path: '/pages/index/index?id=10'
    };
  }
})