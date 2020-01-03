//app.js
wx.cloud.init({
  traceUser: true,
  env: 'dongming-y95n7'
});
let { ver } = require('./utils/version.js');//审核关闭需要的东西
App({
  userInfo:{//用户资料
    isPower:false
  },
  isAPPLoad:false,
  onLaunch: function () {
    Promise.all([ver()]).then(()=>{//审核
      this.isAPPLoad=true
      if (this.checkLoginReadyCallback) {
        this.checkLoginReadyCallback();
      }
    }).catch(err=>{
      this.isAPPLoad = true
      if (this.checkLoginReadyCallback) {
        this.checkLoginReadyCallback();
      }
    })
    
    // this.getUserPic().then(()=>{//授权
    //   this.isAPPLoad=true
    //   if (this.checkLoginReadyCallback) {
    //     this.checkLoginReadyCallback();
    //   }
    // })
  },
  getUserPic() {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => { 
                this.userInfo={
                  isPower:true,
                  ...res
                  };
                resolve()
              },
              fail: reject
            })

          } else {
            console.log("app: " + "用户暂时未授权")
            resolve()
          }
        }
      });
    })

  },
  toastS(text ="灌篮失败！请重新进入...",mask=false){
    wx.showToast({
      title: text,
      duration:2000,
      icon:"none",
      mask,
    })
  },
  loadS(text="正在训练中..."){
    wx.showLoading({
      title: text,
      mask:true
    })
  },
  
})
