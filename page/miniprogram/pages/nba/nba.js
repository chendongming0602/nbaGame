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
    isLoad:false,//加载完成
  },
  selectTeam(e){//选择的球队
    let team=e.detail.name;
    let id = e.detail.id;
    if(id==this._id) return APP.toastS("已经是当前球队！");
    this._id=id;
    APP.loadS();
    this.MemberEvent().then(()=>{
      wx.hideLoading();
    });
    this.setData({
      team
    })
  },
  selectMember(e){//选择的球员
    let Member = e.detail.name;
    let id = e.detail.id;
    this._Mid=id;
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
      this._id = list[0].id;
      return list
    });
  },
  MemberEvent(){//球员
    return db.collection("member").where({
      id:this._id
    }).get().then(res => {
      let list=res.data[0].list;
      this.setData({
        memList:list,
        baImg: list[0].teamImg,
        Member: list[0].name
      });
      this._Mid = list[0].id;
    });
  },
  affirm(){
    console.log(this._id,this._Mid);
    APP.toastS("目前暂未开启此功能！")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.teamEvent().then(res=>{
      this.MemberEvent().then(()=>{
        setTimeout(()=>{
          this.setData({isLoad:true});
        },2000)
      });
    }).catch(()=>{
      APP.toastS();
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