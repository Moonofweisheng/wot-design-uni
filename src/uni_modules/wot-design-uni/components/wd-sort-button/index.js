import VueComponent from '../common/component'

VueComponent({
  props: {
    title: String,
    value: {
      type: Number,
      value: 0
    },
    allowReset: Boolean,
    descFirst: Boolean,
    line: {
      type: Boolean,
      value: true
    }
  },
  methods: {
    handleClick () {
      let { value, allowReset, descFirst } = this.data
      if (descFirst) {
        if (value === 0) {
          value = -1
        } else if (value === -1) {
          value = 1
        } else if (value === 1) {
          if (allowReset) {
            value = 0
          } else {
            value = -1
          }
        }
      } else {
        if (value === 0) {
          value = 1
        } else if (value === 1) {
          value = -1
        } else if (value === -1) {
          if (allowReset) {
            value = 0
          } else {
            value = 1
          }
        }
      }
      this.$emit('change', {
        value
      })
      this.setData({
        value: value
      })
    }
  }
})