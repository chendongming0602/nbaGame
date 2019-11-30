//app.js
App({
  userInfo:{//用户资料
    isPower:false
  },
  isAPPLoad:false,
  onLaunch: function () {
    this.getUserPic().then(()=>{//授权
      this.isAPPLoad=true
      if (this.checkLoginReadyCallback) {
        this.checkLoginReadyCallback();
      }
    })
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

})
