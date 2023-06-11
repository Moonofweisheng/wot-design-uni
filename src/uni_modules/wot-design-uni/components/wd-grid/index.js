import VueComponent from '../common/component'
const nextTick = () => new Promise(resolve => setTimeout(resolve, 20))

VueComponent({
  props: {
    clickable: Boolean,
    square: Boolean,
    column: {
      type: Number,
      observer (val, oldVal) {
        if (val === oldVal) return
        if (val <= 0) {
          throw Error('The number of columns attribute value is invalid. The attribute must be greater than 0 and it is not recommended to use a larger value attribute.')
        }
        oldVal && this.init()
      }
    },
    border: {
      type: Boolean,
      value: false,
      observer (val) {
        val && Promise.resolve().then(nextTick).then(() => {
          this.init()
        })
      }
    },
    bgColor: {
      type: String,
      value: '#ffffff'
    },
    gutter: Number
  },

  relations: {
    '../gridItem/index': {
      type: 'child',
      linked (target) {
        this.children = this.children || []
        this.children.push(target)
      },
      unlinked (target) {
        this.children = this.children.filter(child => child !== target)
      }
    }
  },

  created () {
    this.init()
  },

  methods: {
    init () {
      if (!this.children) return

      this.children.forEach((item, index) => {
        if (this.data.border) {
          const { column } = this.data
          if (column) {
            const isRightItem = this.children.length - 1 === index || (index + 1) % column === 0
            const isFirstLine = (index + 1) <= column

            isFirstLine && item.set('itemClass', 'is-first')
            isRightItem && item.set('itemClass', 'is-right')
            !isFirstLine && item.set('itemClass', 'is-border')
          } else {
            item.set('itemClass', 'is-first')
          }
          this.children.length - 1 === index && item.set('itemClass', item.data.itemClass + ' is-last')
        }
        item.init()
      })
    }
  }
})