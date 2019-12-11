// components/game/rock/rock.js
var music = wx.createInnerAudioContext();
let att=function(){
  music.src = "cloud://dongming-y95n7.646f-dongming-y95n7-1259439013/其他/开始.mp3";
  music.title = "开始音乐"
  let shibai = Math.ceil(Math.random() * (5 - 3) + 3);
  let top = Math.floor(Math.random() * 3 + 1);
  let bot = Math.floor(Math.random() * 3 + 1);
  this.setData({
    shibai,
    top,
    bot
  })

}
let time1 = null;
let time2 = null;
const APP = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    top: 1,//当前
    bot: 2,//当前
    shushu: 0,//控制相同的次数
    tongs: 0,//控制不同的数次
    shibai: 0,//失败了多少次给成功
    isStart: true,
    isGo: true,//成功后展示
    isBtn:false,//成功按钮
  },
  lifetimes: {
    attached: att,
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
  attached: att,
  detached: function () {
    // 在组件实例被从页面节点树移除时执行
  },
  /**
   * 组件的方法列表
   */
  methods: {
    dong(e) {
      if (!this.data.isStart) return APP.toastS("正在PK中，请勿重复点击！");
      if (e!==1) { this.musicEvent(); } 
      this.setData({ isStart: false });
      let shu = Math.ceil(Math.random() *2);//失败了多少次给成功
      // console.log(shu)
      let yaoshu = Math.ceil(Math.random() * (7 - 5) + 5);//摇动多少次
      let count = 0;//控制达到摇的次数
      let top1 = 1;//给全局top的结果
      time1 = setInterval(() => {
        let top = Math.floor(Math.random() * 3 + 1);
        top1 = top;
        this.setData({ top })
        if (count >= yaoshu) {//暂停
          clearInterval(time1)
        }
        count++
      }, 300);
      time2 = setInterval(() => {
        let top = Math.floor(Math.random() * 3 + 1);
        this.setData({ bot: top })
        // console.log(top, count, "Yui")
        if (count >= yaoshu) {//暂停
          clearInterval(time2);
          if (top1 == top) {//如果相同
            if (this.data.shushu <= shu) {//必须达到这个条件，否则继续摇
              let shushu = this.data.shushu;
              shushu++;
              this.setData({ shushu });
              count = 0;
              clearInterval(time1);
              clearInterval(time2);
              this.setData({ isStart: true })
              this.dong(1);
            } else {
              //  APP.toastS("通过");
              clearInterval(time1);
              clearInterval(time2);
              this.gg();//开启通过
            }
            // console.log("相同")
          } else {
            let tongs = this.data.tongs;
            tongs++;
            this.setData({ tongs });
            if (this.data.tongs >= this.data.shibai) {//错了太多，让他过吧
              clearInterval(time1);
              clearInterval(time2);
              this.setData({
                shushu: 10,
                top:top,
                bot:top,
              });
              // console.log("改为相同了",this.data.top,this.data.bot)
              // APP.toastS("通过");
              this.gg();//开启通过
            } else {
              wx.showToast({
                title: '你失败了！使出你的实力吧~',
                duration:1000,
                mask:true,
                icon:"none"
              });
              this.setData({ isStart: true });
              clearInterval(time1);
              clearInterval(time2);
            }

          }
        }
      }, 300);
    },
    gg() {
      wx.showToast({
        title: '就知道你可以的！马上开启奖励通道~~~',
        duration: 4000,
        mask: true,
        icon: "none"
      });
      setTimeout(() => {
        this.setData({ isGo: false });
      }, 4000);
      setTimeout(()=>{
        this.setData({ isBtn: true });
      },12000)
    },
    jiangli(e){
      let { id } = e.currentTarget.dataset;
      if(id==1){
        wx.showModal({
          title: '温馨提示！',
          content: '确定放弃奖励吗？',
          success:(res)=>{
            if (res.confirm) {
              wx.reLaunch({
                url: '/pages/index/index',
              });
            } 
          }
        })
      }else{
        wx.redirectTo({
          url: '/pages/picture/picture',
        });
      }
    },

    musicEvent(){
      music.play();
    },
  }
})
