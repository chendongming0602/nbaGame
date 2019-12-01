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
      "cloud://dongming-y95n7.646f-dongming-y95n7-1259439013/其他/useri.jpg",
    ],
    bunShow:true,//按钮显示隐藏
    textShow:true,//提示文字
    textHieght:0,//号码高度,
    value:"00",//号码
    albumShow:true,
  },
  imgEvent() {//图片转换
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
  move(e){//移动头像
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
      left,
      bunShow:false,
      textShow:false
    });
    this.canW=left;//将移动后的头像位置传给canvas头像
    this.canH = top;//将移动后的头像位置传给canvas头像
  },
  chend(){//移动结束
    this.setData({ bunShow:true})
  },
  picEvent(){//选泽头像
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:(res)=> {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0];
        this.setData({
          [`imgList[1]`]: tempFilePaths
        })
      }
    })
  },
  inputEvent(e){//输入框
  let {value}=e.detail
    this.setData({value});
    this.countText = value;
  },
  albumEvent(){
    this.setData({albumShow:true})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    wx.getSystemInfo({//兼容屏幕
      success: (res) => {
        wx.hideLoading()
        this.width = res.windowWidth;//屏幕宽度
        this.height = res.windowHeight;//屏幕高度
        //绘画头像的X开始默认位置
        this.canW = this.width/2-50;
        //绘画头像的Y开始默认位置
        this.canH = this.height * 0.1498;
        //绘制编号的高度
        this.countH=this.height*0.48;
        //绘制的编号
        this.countText=this.data.value;
        this.setData({
          top: this.canH,
          left: this.canW,
          textHieght: this.countH,
        });
      },
    });
    // this.setData({
    //   [`imgList[1]`]: APP.userInfo.userInfo.avatarUrl
    // });
  },

  baocun() {//保存图片
    wx.showLoading({
      title: '保存中',
      mask:true
    })
    let that = this
    that.imgEvent().then(res => {
      console.log(res)
      const ctx = wx.createCanvasContext("can");
      ctx.drawImage(res[0], 0, 0, this.width, this.height);//背景图
      ctx.setFontSize(16) //字体大小
      // const grd = ctx.createLinearGradient(0, 0, 10, 10)
      // grd.addColorStop(0, '#000');
      // grd.addColorStop(1, '#f00');
      ctx.setFillStyle("#2390e4") //字体颜色
      //ctx.textAlign = "center"; //文字居中
      ctx.font = 'bold 60px sans-serif';
      //绘制文字居中（屏幕宽度-文字宽度，最后/2）
      ctx.fillText(this.countText, (this.width - ctx.measureText(this.countText).width) / 2, this.countH);
      ctx.save();//保存剪切
      ctx.beginPath();
      ctx.arc(this.canW + 50, this.canH+50, 50, 0, Math.PI * 2, false);//剪切圆（需要将圆的半径加上）
      ctx.clip();
      ctx.drawImage(res[1], this.canW, this.canH, 100, 100);//头像
      ctx.restore();//恢复剪切
      
      ctx.draw(that, (() => {
        wx.canvasToTempFilePath({
          canvasId: "can",
          success: res => {
            let url = res.tempFilePath;
            wx.getSetting({
              success:(res)=> {
                if (!res.authSetting['scope.writePhotosAlbum']) {
                  console.log("未授权")
                  wx.authorize({//进行授权
                    scope: 'scope.writePhotosAlbum',
                    success:(res)=> {
                      that.album(url);
                    },
                    fail(){
                      console.log("拒绝");
                      wx.hideLoading()
                      that.setData({ albumShow:false})
                    }
                  })
                } else {
                  console.log("已经授权")
                  that.album(url)
                }
              }
            });
          },
          fail() {
            wx.showToast({
              title: '保存失败！请确认是否授权',
              duration: 2000,
              icon: "none"
            });
          }
        })
      }));
    })
  },
  album(url){//保存到相册
    wx.saveImageToPhotosAlbum({
      filePath: url,
      success(res) {
        wx.showToast({
          title: '保存成功',
          duration: 2000,
        });
      },
      fail() {
        wx.showToast({
          title: '保存失败！请确认是否授权',
          duration: 2000,
          icon: "none"
        });
      }
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

  }
})