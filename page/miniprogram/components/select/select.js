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
    name:String,
    list:Array
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
      let { name ,id} = e.currentTarget.dataset
      this.triggerEvent('selectTeam', {name,id});//球队
      this.triggerEvent('selectMember', { name, id });//球员
    },
  }
})
