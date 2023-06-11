import VueComponent from '../common/component'

VueComponent({
  props: {
    value: {
      type: Boolean,
      value: false,
      observer: 'computedShowImg'
    },
    closePosition: String,
    src: String,
    to: String,
    width: {
      type: String,
      observer: 'computeImgStyle'
    },
    closeOnClickModal: Boolean,
    hideWhenClose: {
      type: Boolean,
      value: true
    }
  },
  data: {
    show: false,
    imgSucc: true,
    imgStyle: '',
    imgScale: '1'
  },
  methods: {
    computedShowImg () {
      if (this.data.value && this.data.imgSucc) {
        this.setData({ show: true })
      } else {
        this.setData({ show: false })
        this.close()
      }
    },
    computeImgStyle () {
      let style = ''
      if (this.data.width) {
        style += `width: ${this.data.width}px ;`
        style += `height: ${this.data.width / this.data.imgScale}px`
      }
      this.setData({ imgStyle: style })
    },
    beforeenter () {
      this.$emit('beforeenter')
    },
    enter () {
      this.$emit('enter')
    },
    afterenter () {
      this.$emit('afterenter')
    },
    beforeleave () {
      this.$emit('beforeleave')
    },
    leave () {
      this.$emit('leave')
    },
    afterleave () {
      this.$emit('afterleave')
    },
    close () {
      this.setData({
        show: false
      })
      this.$emit('close')
    },
    closed () {
      this.$emit('closed')
    },
    clickModal () {
      this.$emit('clickmodal')
    },
    imgLoad (event) {
      const {
        height,
        width
      } = event.detail
      this.setData({
        imgScale: width / height,
        imgSucc: true
      })
      this.computeImgStyle()
      this.$emit('load')
    },
    imgErr () {
      this.setData({ imgSucc: false })
      this.$emit('error')
    },
    clickImage () {
      if (this.data.to) {
        jd.navigateTo({
          url: this.data.to
        })
      }
      this.$emit('click')
      this.close()
    }
  }
})