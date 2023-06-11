import VueComponent from '../common/component'

VueComponent({
  props: {
    value: {
      type: String,
      value: null,
      observer: 'notice'
    },
    bgColor: String,
    max: {
      type: Number,
      observer: 'notice'
    },
    isDot: {
      type: Boolean,
      value: false,
      observer: 'notice'
    },
    hidden: Boolean,
    type: String,
    top: Number,
    right: Number
  },
  data: {
    content: ''
  },
  methods: {
    notice () {
      if (this.data.isDot) return
      let value = this.data.value
      const max = this.data.max
      if (value && max && !Number.isNaN(value) && !Number.isNaN(max)) {
        value = max < value ? `${parseInt(max)}+` : value
      }
      this.setData({ content: value })
    }
  }
})