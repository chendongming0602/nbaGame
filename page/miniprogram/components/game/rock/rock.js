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
  },1500);

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
    // top: 1,//当前
    // bot: 2,//当前
    // shushu: 0,//控制相同的次数
    // tongs: 0,//控制不同的数次
    // shibai: 0,//失败了多少次给成功
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
      if(!this.data.isStart) return
      this.setData({ isStart:false});
      music.play();
      let userActive = this.data.userActive;
      let system=0;
      let count=0;
      let counts = Math.ceil(Math.random() * (8 - 4) + 4);//摇多少次
      // console.log(counts)
      if(userActive==0){//石头/////////////////////////////////////////////
      time1= setInterval(() => {
          system = Math.random();//系统
          count++;
        if (system > 0.8) system=1;//控制几率
        else if (system > 0.4) system = 0;
        else system = 2;
        let systemT = system
        if (system == this.data.system){//如果摇到相同的页面不会变（进行切换使页面有变动）
          if (system<2){
            systemT+=1
          }else{
            systemT-=1
          };
          this.setData({ system: systemT })
        }else{
          this.setData({ system})
        }
        
        if (count > counts){//摇到几次停止
            this.setData({ system })
            if (system == 0) {//平局
              this.finish(0);
            } else if (system == 1) {//用户赢
              this.finish(2);
            } else {//系统赢
              this.finish(1);
            }
            clearInterval(time1);
          }
          
        },300)
      } else if (userActive==1){//剪刀//////////////////////////////
        time1 = setInterval(() => {
          system = Math.random();//系统
          count++;
          if (system > 0.8) system = 2;//控制几率
          else if (system > 0.4) system = 1;
          else system = 0;
          let systemT = system
          if (system == this.data.system) {//如果摇到相同的页面不会变（进行切换使页面有变动）
            if (system < 2) {
              systemT += 1
            } else {
              systemT -= 1
            };
            this.setData({ system: systemT })
          } else {
            this.setData({ system })
          }

          if (count > counts) {
            this.setData({ system })
            if (system == 0) {//系统赢
              this.finish(1);
            } else if (system == 1) {//平局
              this.finish(0);
            } else {//用户赢
              this.finish(2);
            }
            clearInterval(time1);
          }
          
        },310)
      }else{//布/////////////////////////////////////////
        time1 =  setInterval(() => {
          system = Math.random();//系统
          count++;
          if (system > 0.8) system = 0;//控制几率
          else if (system > 0.4) system = 1;
          else system = 2;
          let systemT = system
          if (system == this.data.system) {//如果摇到相同的页面不会变（进行切换使页面有变动）
            if (system < 2) {
              systemT += 1
            } else {
              systemT -= 1
            };
            this.setData({ system: systemT })
          } else {
            this.setData({ system })
          }
          if (count > counts) {
            this.setData({ system })
            if (system == 0) {//用户赢
              this.finish(2);
            } else if (system == 1) {//系统赢
              this.finish(1);
            } else {//平局
              this.finish(0);
            }
            clearInterval(time1);
          }
          
        },320)
      }
     
    },
    finish(e){//提示
      this.setData({ isStart:true})
      let arr0=[//平局
        "哎呀！竟然平局了！",
        "看来我们的修炼结果一样啊！",
        "菜鸡互啄么！哈哈~",
        "难不成你也是在NBA报的名？",
        "咋们的教练都是同一个！很胖的那个~~"
      ];
      let arr1=[//系统赢
        "你还要修炼五百年~~~",
        "连‘懂球’这关都过不了！还想进入NBA！！",
        "放弃吧！‘懂球’的报名费比你多太多了~~",
        "就这样？也想竞争名人堂（哈哈哈）！",
        "哎呀！‘懂球’都看不下去了...."
      ];
      let arr2=[//用户赢
        "这...不可能！！！！",
        "‘懂球’整整修炼了五百年！为什么还是输给了你~~",
        "恭喜你，成功成为CBA！（台词错了）是NBA球员！",
        "没想到你挺过来了，快去领取你的奖励吧！",
        "等‘懂球’再修炼五百年，出来一定赢你！"
      ]
      let arrs = Math.floor(Math.random() *5)
      if(e==0)
        APP.toastS(arr0[arrs],true);
      else if(e==1)
        APP.toastS(arr1[arrs], true);
      else
        APP.toastS(arr2[arrs], true);
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
});