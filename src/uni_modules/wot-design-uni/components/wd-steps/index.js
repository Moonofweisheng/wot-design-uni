import VueComponent from '../common/component'

VueComponent({
  props: {
    active: {
      type: Number,
      value: 0,
      observer () {
        if (this.children && this.children.length) {
          this.children.forEach(child => child.setIndexAndStatus())
        }
      }
    },
    vertical: Boolean,
    dot: Boolean,
    space: String,
    alignCenter: Boolean
  },
  relations: {
    '../step/index': {
      type: 'child',
      linked (target) {
        this.children = this.children || []
        this.children.push(target)
        setTimeout(() => {
          const { vertical, dot, alignCenter } = this.data
          const canAlignCenter = !vertical && alignCenter
          target.setData({
            vertical,
            dot,
            canAlignCenter
          })
          this.children.forEach(child => child.setIndexAndStatus())
        }, 30)
      },
      unlinked (target) {
        this.children = this.children.filter(child => child !== target)
        this.children.forEach(child => child.setIndexAndStatus())
      }
    }
  }
})