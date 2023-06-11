import VueComponent from '../common/component'

VueComponent({
  data: {
    index: -1,
    styles: '',
    currentStatus: '',
    currentTitle: '',
    canAlignCenter: false,
    vertical: false,
    dot: false,
    childrenLength: 0
  },
  props: {
    title: String,
    description: String,
    icon: String,
    status: {
      type: String,
      observer: 'setCurrentStatus'
    },
    iconSlot: Boolean,
    titleSlot: Boolean,
    descriptionSlot: Boolean
  },
  relations: {
    '../steps/index': {
      type: 'parent',
      linked (target) {
        this.parent = target
      },
      unlinked () {
        this.parent = null
      }
    }
  },
  methods: {
    getIndex () {
      return this.parent.children.indexOf(this)
    },
    getStyles () {
      const { vertical, space } = this.parent.data
      if (vertical) {
        return space ? `height: ${space}` : ''
      } else {
        return `width: ${space || (100 / this.parent.children.length + '%')}`
      }
    },
    getCurrentStatus (index) {
      if (this.data.status) {
        return this.data.status
      }

      const { active } = this.parent.data

      if (active > index) {
        return 'finished'
      } else if (active === index) {
        return 'process'
      } else {
        return 'wait'
      }
    },
    getCurrentTitle (currentStatus) {
      if (this.data.title) return this.data.title

      switch (currentStatus) {
      case 'finished':
        return '已完成'
      case 'error':
        return '失败'
      case 'process':
        return '进行中'
      case 'wait':
      default:
        return '未开始'
      }
    },
    setIndexAndStatus () {
      const index = this.getIndex()
      const currentStatus = this.getCurrentStatus(index)
      const currentTitle = this.getCurrentTitle(currentStatus)
      const styles = this.getStyles()

      this.setData({
        index,
        currentStatus,
        currentTitle,
        childrenLength: this.parent.children.length,
        styles
      })
    }
  }
})