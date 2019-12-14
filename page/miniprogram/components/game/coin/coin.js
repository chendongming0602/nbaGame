// components/game/coin/coin.js
const APP=getApp();
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
    paos:"",
    isPao:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    pao(){
      this.setData({ paos: "",isPao:true });
      let arr=[
        "pao0",//用户
        "pao1",//用户
        "pao2",//系统
        "pao3",//系统
        "pao4",//系统
        "pao5",//用户
      ];
      let index=Math.random();
      if(index>0.9) index=0;
      else if(index>0.85) index=1;
      else if(index>0.75) index=5;
      else if(index>0.6) index=2;
      else if(index>0.3) index=3;
      else index=4;
      this.setData({ paos:arr[index]});
      setTimeout(()=>{
        this.setData({ isPao: false });
        if(index==0||index==1||index==5)
        this.toasts(2);
        else this.toasts(1)
      },3000)
    },
    toasts(e){
      let arr1=[
        "看来硬币专家还是我~~~",
        "你还需要多练练呢！",
        "你怎么可能赢‘懂球’我呢！",
        "你距离奖励还太远了！",
      ];
      let arr2=[
        "你是不是偷偷补习了！",
        "‘懂球’还会回来的~~~",
        "奖励归你了！！！！",
        "能告诉‘懂球’你的秘诀么...",
      ];
      let arrs = Math.floor(Math.random() * 4);
      if(e==1){
        APP.toastS(arr1[arrs])
      }else{
        APP.toastS(arr2[arrs])
      }
    },
  }
})
