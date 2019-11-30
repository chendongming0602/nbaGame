//index.js
const APP = getApp()

Page({
  data: {
    list:[
      "进入NBA",
      "坑一下 ！",
      "合个照 ！"
    ],
    isPower:false,//是否授权
    loginShow:false,//显示授权弹窗
  },
  close(){//关闭授权弹窗
    this.setData({ loginShow:false})
  },
  confirm(){//同意授权
    this.setData({ isPower: true })
  },
  itemEvent(e){//列表按钮
    let { index } = e.currentTarget.dataset;
    if(index==2){
      if (this.data.isPower){

      }else{
        this.setData({ loginShow:true})
      }
    }
    console.log(e)
  },
  onLoad: function() {
    if (APP.isAPPLoad){//和APP回调判断是否授权了
      this.setData({
        isPower: APP.userInfo.isPower
      });
    }else{
      APP.checkLoginReadyCallback = res => {
        this.setData({
          isPower: APP.userInfo.isPower
        });
      }
    }
  },

})
