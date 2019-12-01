// pages/picture/picture.js
const APP=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top:0,
    left:0,
    imgList:[
      "cloud://dongming-y95n7.646f-dongming-y95n7-1259439013/其他/canvas.jpg",
      "http://minis-resources-1252149780.cosgz.myqcloud.com/lovers_magpie%20/logo.jpg",
    ]
  },
  imgEvent() {
    let imgList = this.data.imgList;
    let img = imgList.map((i) => {
      return new Promise((resolve) => {
        wx.getImageInfo({
          src: i,
          success(res) {
            resolve(res.path)
          }
        })
      })
    });
    return Promise.all(img)
  },
  move(e){
    let top = e.touches[0].pageY-50;
    let left = e.touches[0].pageX-50;
    if(top<0){
      top=0
    }else if(top>this.height-100){
      top = this.height - 100
    }
    if(left<0){
      left=0
    }else if(left>this.width-100){
      left=this.width-100
    }
    this.setData({
      top,
      left
    });
    this.canW=left;//将移动后的头像位置传给canvas头像
    this.canH = top;//将移动后的头像位置传给canvas头像
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        this.width = res.windowWidth;//屏幕宽度
        this.height = res.windowHeight;//屏幕高度
        //绘画头像的X开始默认位置
        this.canW = this.width/2-50;
        //绘画头像的Y开始默认位置
        this.canH = this.height * 0.14925;
        //绘制编号的高度
        this.countH=this.height*0.49751;
        //绘制的编号
        this.countText="1000";
      },
    });
    
  },

  baocun() {
    let that = this
    that.imgEvent().then(res => {
      const ctx = wx.createCanvasContext("can");
      ctx.drawImage(res[0], 0, 0, this.width, this.height);//背景图
      ctx.save();//保存剪切
      ctx.beginPath();
      ctx.arc(this.canW + 50, this.canH+50, 50, 0, Math.PI * 2, false);//剪切圆（需要将圆的半径加上）
      ctx.clip();
      ctx.drawImage(res[1], this.canW, this.canH, 100, 100);//头像
      ctx.restore();//恢复剪切
      ctx.setFontSize(16) //字体大小
      // const grd = ctx.createLinearGradient(0, 0, 10, 10)
      // grd.addColorStop(0, '#000');
      // grd.addColorStop(1, '#f00');
      ctx.setFillStyle("#0f6cb4") //字体颜色
      //ctx.textAlign = "center"; //文字居中
      ctx.font = 'bold 80px sans-serif';
      //绘制文字居中（屏幕宽度-文字宽度，最后/2）
      ctx.fillText(this.countText, (this.width-ctx.measureText(this.countText).width)/2, this.countH);
      ctx.draw(that, (() => {
        wx.canvasToTempFilePath({
          canvasId: "can",
          success: res => {
            let url = res.tempFilePath;
            wx.getSetting({
              success(res) {
                if (!res.authSetting['scope.writePhotosAlbum']) {
                  console.log("未授权")
                  wx.authorize({
                    scope: 'scope.writePhotosAlbum',
                    success(res) {
                      wx.saveImageToPhotosAlbum({
                        filePath: url,
                        success(res) {
                          console.log("保存成功1", res)
                        }
                      })
                    },
                    fail(){
                      console.log("拒绝")
                    }
                  })
                } else {
                  console.log("授权")
                  wx.saveImageToPhotosAlbum({
                    filePath: url,
                    success(res) {
                      console.log("保存成功2", res)
                    }
                  })
                }
              }
            })
            console.log(res)
          }
        })
      }));
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