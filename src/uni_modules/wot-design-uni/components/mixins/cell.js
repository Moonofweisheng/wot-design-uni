export default Behavior({
  properties: {
    border: Boolean
  },
  methods: {
    /**
     * @description 从cellGroup获取此组件的索引
     * @return {Number} 此组件的索引
     */
    getIndex() {
      if (!this.parent) return
      return this.parent.children.indexOf(this)
    },
    /**
     * @description 为所有索引非0的组件设置刘海线，此方法由cellGroup调用
     */
    setIndexAndStatus(border) {
      const index = this.getIndex()
      this.setData({
        border: border && index
      })
    }
  }
})
