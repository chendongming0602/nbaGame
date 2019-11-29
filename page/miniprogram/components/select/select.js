// components/select/select.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isPlayer:{//球员
      type:Boolean,
      value:false
    },
    name:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    seEvent(e) {
      let { name } = e.currentTarget.dataset
      this.triggerEvent('selectTeam', name);//球队
      this.triggerEvent('selectMember', name);//球员
    },
  }
})
