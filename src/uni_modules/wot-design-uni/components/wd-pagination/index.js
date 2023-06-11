import VueComponent from '../common/component'

VueComponent({
  props: {
    value: Number, // 当前页
    totalPage: {
      type: Number,
      value: 1
    },
    showIcon: Boolean, // 是否展示分页为Icon图标
    showMessage: Boolean,
    total: {
      type: Number,
      observer: 'updateTotalPage'
    },
    pageSize: { // 分页大小
      type: Number,
      value: 10
    },
    prevText: {
      type: String,
      value: '上一页'
    },
    nextText: {
      type: String,
      value: '下一页'
    },
    hideIfOnePage: {
      type: Boolean,
      value: true
    }
  },
  methods: {
    add () {
      const { value, totalPage } = this.data
      if (value > totalPage - 1) {
        return
      }
      this.$emit('change', { value: value + 1 })
    },
    sub () {
      const { value } = this.data
      if (value < 2) {
        return
      }
      this.$emit('change', { value: value - 1 })
    },
    updateTotalPage () {
      const { total, pageSize } = this.data
      if (total) {
        this.setData({
          totalPage: Math.ceil(total / pageSize)
        })
      }
    }
  }
})