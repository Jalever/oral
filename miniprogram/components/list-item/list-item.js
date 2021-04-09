// components/list-item.js
Component({
  /**
   * Component properties
   */
  properties: {
    pValue: {
      type: String,
      value: ''
    }
  },

  /**
   * Component initial data
   */
  data: {

  },

  lifetimes:{
    attached: function() {
      // 在组件实例进入页面节点树时执行
      console.log("list-item attached");
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
      console.log("list-item detached");
    },
  },

  /**
   * Component methods
   */
  methods: {

  }
})
