// components/game/rock/rock.js
var music = wx.createInnerAudioContext();
let att=function(){
  music.src = "https://minis-resources-1252149780.cos.ap-guangzhou.myqcloud.com/nbaGame/components/jiandao/%E5%BC%80%E5%A7%8B.mp3";
  music.title = "开始音乐"
  let shibai = Math.ceil(Math.random() * (5 - 3) + 3);


  let system = Math.floor(Math.random() * 3);//系统
  let userActive = Math.floor(Math.random() * 3);//用户
  this.setData({
    shibai,
    system,
    userActive
  });
  let aCss=0
  setInterval(()=>{
    aCss++;
    if(aCss>2){
      aCss=0;
    }
    this.setData({
      aCss
    });
  },2000);

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
    list:[
      "https://minis-resources-1252149780.cos.ap-guangzhou.myqcloud.com/nbaGame/components/jiandao/%E7%9F%B3%E5%A4%B4.jpg ",
      "https://minis-resources-1252149780.cos.ap-guangzhou.myqcloud.com/nbaGame/components/jiandao/%E5%89%AA%E5%88%80.jpg",
      "https://minis-resources-1252149780.cos.ap-guangzhou.myqcloud.com/nbaGame/components/jiandao/%E5%B8%83.jpg"
    ],
    userActive:0,//用户选择的值
    system:0,//系统选的值
    aCss:0,
  },
  
  methods: {
    selectE(e){//用户选择的值
      let { index } = e.currentTarget.dataset;
      this.setData({
        userActive:index
      });
      this.startE();
    },
    startE(){
      let userActive = this.data.userActive;
      let system=0;
      let count=0;
      if(userActive==0){//石头
      time1= setInterval(() => {
          system = Math.random();//系统
          count++;
        // console.log(system)
          // console.log(system)
        if (system > 0.9) system=1;
        else if (system > 0.4) system = 0;
        else system = 2;
        console.log(system)
        this.setData({ system})
        //   if(count>5){
            
        //     if (system == 0) {//平局
        //       console.log("平局")
        //     } else if (system == 1) {//用户赢
        //       console.log("用户赢")
        //     } else {//系统赢
        //       console.log("系统赢")
        //     }
        //     clearInterval(time1);
        //   }
          
        },500)
      } else if (userActive==1){//剪刀
        time1 = setInterval(() => {
          system = Math.floor(Math.random() * 3);//系统
          if (system == 0) {//系统赢

          } else if (system == 1) {//平局

          } else {//用户赢

          }
        })
      }else{//布
        time1 =  setInterval(() => {
           system = Math.floor(Math.random() * 3);//系统
          if (system == 0) {//用户赢

          } else if (system == 1) {//系统赢

          } else {//平局

          }
        })
      }
     
    },
    gg() {
      wx.showToast({
        title: '就知道你可以的！马上开启奖励通道~~~',
        duration: 4000,
        mask: true,
        icon: "none"
      });
    },
    musicEvent(){
      music.play();
    },
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
})






// dong(e) {
//   if (!this.data.isStart) return APP.toastS("正在PK中，请勿重复点击！");
//   if (e !== 1) { this.musicEvent(); }
//   this.setData({ isStart: false });
//   let shu = Math.ceil(Math.random() * 2);//失败了多少次给成功
//   // console.log(shu)
//   let yaoshu = Math.ceil(Math.random() * (7 - 5) + 5);//摇动多少次
//   let count = 0;//控制达到摇的次数
//   let top1 = 1;//给全局top的结果
//   time1 = setInterval(() => {
//     let top = Math.floor(Math.random() * 3 + 1);
//     top1 = top;
//     this.setData({ top })
//     if (count >= yaoshu) {//暂停
//       clearInterval(time1)
//     }
//     count++
//   }, 300);
//   time2 = setInterval(() => {
//     let top = Math.floor(Math.random() * 3 + 1);
//     this.setData({ bot: top })
//     // console.log(top, count, "Yui")
//     if (count >= yaoshu) {//暂停
//       clearInterval(time2);
//       if (top1 == top) {//如果相同
//         if (this.data.shushu <= shu) {//必须达到这个条件，否则继续摇
//           let shushu = this.data.shushu;
//           shushu++;
//           this.setData({ shushu });
//           count = 0;
//           clearInterval(time1);
//           clearInterval(time2);
//           this.setData({ isStart: true })
//           this.dong(1);
//         } else {
//           //  APP.toastS("通过");
//           clearInterval(time1);
//           clearInterval(time2);
//           this.gg();//开启通过
//         }
//         // console.log("相同")
//       } else {
//         let tongs = this.data.tongs;
//         tongs++;
//         this.setData({ tongs });
//         if (this.data.tongs >= this.data.shibai) {//错了太多，让他过吧
//           clearInterval(time1);
//           clearInterval(time2);
//           this.setData({
//             shushu: 10,
//             top: top,
//             bot: top,
//           });
//           // console.log("改为相同了",this.data.top,this.data.bot)
//           // APP.toastS("通过");
//           this.gg();//开启通过
//         } else {
//           wx.showToast({
//             title: '你失败了！使出你的实力吧~',
//             duration: 1000,
//             mask: true,
//             icon: "none"
//           });
//           this.setData({ isStart: true });
//           clearInterval(time1);
//           clearInterval(time2);
//         }

//       }
//     }
//   }, 300);
// },