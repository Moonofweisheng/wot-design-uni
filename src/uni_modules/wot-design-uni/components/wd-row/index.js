import VueComponent from '../common/component'

VueComponent({
  data: {
    style: ''
  },
  props: {
    gutter: {
      type: Number,
      value: 0,
      observer: 'setGutter'
    }
  },
  relations: {
    '../col/index': {
      type: 'descendant',
      linked (target) {
        this.children = this.children || []
        this.children.push(target)
        target.setGutter(this.data.gutter)
      },
      unlinked (target) {
        this.children = this.children.filter(child => child !== target)
      }
    }
  },
  methods: {
    setGutter () {
      const { gutter } = this.data
      if (gutter < 0) {
        console.warn('[wot design] warning(wd-row): attribute gutter must be greater than or equal to 0')
      }
      const margin = `${gutter / 2}px`
      const style = gutter ? `margin-left: -${margin}; margin-right: -${margin};` : ''
      this.setData({ style })
      gutter && this.children && this.children.forEach(item => {
        item.setGutter(gutter)
      })
    }
  }
})