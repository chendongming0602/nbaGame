// pages/picture/picture.js
const APP=getApp();
import isAlbum from '../../utils/isAlbum.js';
import imgs from '../../utils/imgs.js';
let {bgs,select}=imgs;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top:0,
    left:0,
    imgList:[
      bgs[0].img,
      "https://minis-resources-1252149780.cos.ap-guangzhou.myqcloud.com/nbaGame/components/%E5%85%B6%E4%BB%96/useri.jpg",
    ],
    bunShow:true,//按钮显示隐藏
    textShow:true,//提示文字
    textHieght:0,//号码高度,
    value:"",//号码
    albumShow:true,
    isLoad:false,//加载图
    select,//预览数据,
    yulanFrom:false,//预览框
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
        const tempFilePaths = res.tempFilePaths[0];
        if (res.tempFiles[0].size>200000){
          wx.showModal({
            title: '温馨提示~',
            content: '你的选泽的图片尺寸较大，建议更换！',
            cancelText:"继续上传",
            confirmText:"更换照片",
            success:(res)=>{
              if (res.confirm) {
                return this.picEvent();
              } else{
                isAlbum.isAlbumGF(tempFilePaths).then(res => {
                  this.setData({
                    [`imgList[1]`]: tempFilePaths
                  })
                }).catch(err => {
                  wx.hideLoading()
                });
              }
            }
          })
        }else{
          isAlbum.isAlbumGF(tempFilePaths).then(res => {
            this.setData({
              [`imgList[1]`]: tempFilePaths
            })
          }).catch(err => {
            wx.hideLoading()
          });
        }
        
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
  showModalE(){//提示用户
    wx.showModal({
      title: '温馨提示',
      content: '你未有可消耗的奖励！只能使用浏览模式！',
      cancelText:"浏览模式",
      confirmText:"奖励通道",
      success:(res)=> {
        if (res.confirm) {
          let pages = getCurrentPages();
          let length = pages.length-1;
          // console.log(length)
          pages.map((t,i)=>{//如果打开过那个页面，进行回退
            if (t.route =="pages/pit/pit"){
              wx.navigateBack({
                delta: length-i
              });
              this._pages=1
            }
          });
          if (!this._pages){//否则关闭直接打开该页面
            wx.redirectTo({
              url: '/pages/pit/pit',
            })
          }
        } 
      }
    });
  },
  guiE(){//打开衣柜
    this.setData({ yulanFrom:true})
  },
  quxiaoE(){//关闭衣柜
    this.setData({ yulanFrom: false })
  },
  selectE(e){
    let {id}=e.currentTarget.dataset;
    bgs.map(t => {
      if (t.id == id) {
        this.setData({
          [`imgList[0]`]: t.img
        });
      };
    });
    this.quxiaoE();
  },
  baocunE1(){//保存按钮1
    if(!!!this._imgs){
      this.showModalE();
    }else{
      if (this.data.imgList[0] !== this._imgs){
        wx.showLoading({
          title: '恢复奖励！',
          mask:true
        });
        this.setData({
          [`imgList[0]`]: this._imgs
        });
        setTimeout(()=>{
          this.baocun();
        },1000)
      }else{
        console.log("直接保存")
         this.baocun();
      }
   
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {id}=options;
    if(id){//奖励
      bgs.map(t=>{
        if(t.id==id){
          this.setData({
            [`imgList[0]`]:t.img
          });
          this._imgs = t.img;
        };
      });
    }else{//无奖励
      this.showModalE();
    }
  
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    wx.getSystemInfo({//兼容屏幕
      success: (res) => {
        setTimeout(() => {
          this.setData({ isLoad: true });
        }, 2000);
        wx.hideLoading()
        this.width = res.windowWidth;//屏幕宽度
        this.height = res.windowHeight;//屏幕高度
        //绘画头像的X开始默认位置
        this.canW = this.width/2-50;
        //绘画头像的Y开始默认位置
        this.canH = this.height * 0.1498;
        //绘制编号的高度
        this.countH=this.height*0.8;
        //绘制的编号
        this.countText=this.data.value;
        this.setData({
          top: this.canH,
          left: this.canW,
          textHieght: this.countH,
        });
      },
      fail:()=>{
        APP.toastS();
      }
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
      ctx.setFontSize(20) //字体大小
      // const grd = ctx.createLinearGradient(0, 0, 10, 10)
      // grd.addColorStop(0, '#000');
      // grd.addColorStop(1, '#f00');
      ctx.setFillStyle("#54acff") //字体颜色
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
      success:(res)=> {
        wx.showToast({
          title: '保存成功',
          duration: 2000,
        });
        this._imgs="";//只保存一次
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
    return {
      title: '《我懂球了》欢迎您',
      imageUrl: ""
    };
  }
})