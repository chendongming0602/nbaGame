// components/game/coin/coin.js
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
      },3100)
    },
  }
})
