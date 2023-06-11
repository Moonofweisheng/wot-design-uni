import VueComponent from '../common/component'

VueComponent({
  props: {
    show: {
      type: Boolean
    },
    duration: {
      type: null,
      value: 300
    },
    zIndex: {
      type: Number,
      value: 10
    },
    customStyle: String
  },
  methods: {
    handleClick () {
      this.$emit('click')
    },
    noop () {}
  }
})