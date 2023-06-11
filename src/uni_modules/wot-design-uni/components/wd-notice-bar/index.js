import VueComponent from '../common/component'

const $wrap = '.wd-notice-bar__wrap'
const $content = '.wd-notice-bar__content'
VueComponent({
  data: {
    firstPlay: true,
    wrapWidth: 0,
    contentWidth: 0,
    show: true,
    duration: 0,
    animation: '',
    noticeBarClass: ''
  },
  props: {
    text: {
      type: String,
      observer () {
        setTimeout(() => {
          this.scroll()
        }, 20)
      }
    },
    // warning | info | danger
    type: {
      type: String,
      value: 'warning',
      observer: 'computedClass'
    },
    scrollable: {
      type: Boolean,
      value: true,
      observer: 'computedClass'
    },
    delay: {
      type: Number,
      value: 1
    },
    speed: {
      type: Number,
      value: 50
    },
    closable: Boolean,
    wrapable: {
      type: Boolean,
      observer: 'computedClass'
    },
    prefix: String,
    color: String,
    backgroundColor: String
  },
  created () {
    this.computedClass()
  },
  methods: {
    computedClass () {
      const { type, wrapable, scrollable } = this.data
      let noticeBarClass = []
      type && noticeBarClass.push(`is-${type}`)
      !wrapable && !scrollable && noticeBarClass.push('wd-notice-bar--ellipse')
      wrapable && !scrollable && noticeBarClass.push('wd-notice-bar--wrap')
      noticeBarClass = noticeBarClass.join(' ')
      this.setData({ noticeBarClass })
    },
    handleClose () {
      this.setData({
        show: false
      })
      this.$emit('close')
    },
    initAnimation (duration, delay, translate) {
      return jd.createAnimation({
        duration,
        delay
      }).translateX(translate)
        .step()
        .export()
    },
    scroll () {
      Promise.all([
        this.getRect($wrap),
        this.getRect($content)
      ]).then(rects => {
        const [wrapRect, contentRect] = rects
        if (!wrapRect || !contentRect || !wrapRect.width || !contentRect.width) return

        const wrapWidth = wrapRect.width
        const contentWidth = contentRect.width
        if (this.data.scrollable && contentWidth > wrapWidth) {
          const animation = this.initAnimation(contentWidth / this.data.speed * 1000, this.data.delay * 1000, -contentWidth)
          this.setData({
            animation: animation,
            wrapWidth,
            contentWidth
          })
        }
      })
    },
    animationEnd () {
      const resetAnimation = this.initAnimation(0, 0, this.data.wrapWidth)
      this.setData({
        animation: resetAnimation
      })
      setTimeout(() => {
        const animation = this.initAnimation((this.data.wrapWidth + this.data.contentWidth) / this.data.speed * 1000, 0, -this.data.contentWidth)
        this.setData({
          animation
        })
      }, 20)
    }
  }
})