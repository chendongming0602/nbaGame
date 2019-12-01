// components/login/login.js
const APP=getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isAlbum:{
      type:Number,
      value:0,//1为打开设置页，其他是用户信息
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    clone(){//关闭
      this.triggerEvent("close");
      this.triggerEvent("albumEvent");
    },
    openSetting(){//点击了进去设置页面
      this.triggerEvent("albumEvent");
    },
    infoEvent(e){
      if (e.detail.rawData) {//同意授权
        console.log(e.detail)
        APP.userInfo={
          ...e.detail,
          isPower: true
        }
        this.triggerEvent("close");
        this.triggerEvent("confirm");
      }
    }
  }
})
