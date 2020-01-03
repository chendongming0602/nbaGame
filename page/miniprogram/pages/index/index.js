//index.js
const APP = getApp()

Page({
  data: {
    list:[
      "进入“NBA”",
      "获取“球衣”",
      "穿上“球衣”"
    ],
    isPower:false,//是否授权
    loginShow:false,//显示授权弹窗
    isShow:false,//app.js执行完再显示
    checking:false,//是否在审核
  },
  close(){//关闭授权弹窗
    this.setData({ loginShow:false})
  },
  confirm(){//同意授权
    this.setData({ isPower: true });
    wx.navigateTo({
      url: '/pages/picture/picture',
    })
  },
  itemEvent(e){//列表按钮
    let { index } = e.currentTarget.dataset;
    if(index==2){
      // return APP.toastS("需要通关《玩一会》领取奖励可进入!")
      wx.navigateTo({
        url: '/pages/picture/picture',
      });
    } else if (index == 1){
      wx.navigateTo({
        url: '/pages/pit/pit',
      })
    }else{
      wx.navigateTo({
        url: '/pages/nba/nba',
      })
    }
    // console.log(e)
  },
  onLoad: function() {
    if (APP.isAPPLoad){//和APP回调判断是否授权了
        this.alls()
    }else{
      APP.checkLoginReadyCallback = res => {
        this.alls()
      }
    }
  },
  alls(){
    this.setData({
      isShow:true,
      checking: global.checking
    });
  },
  onShareAppMessage: function () {
    return {
      title: '《我懂球了》欢迎您',
      imageUrl:""
    };
  }

})
