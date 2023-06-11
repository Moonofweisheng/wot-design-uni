import VueComponent from '../common/component'

VueComponent({
  externalClasses: ['custom-text', 'custom-icon'],

  data: {
    style: '',
    gutterContentStyle: '',
    iconStyle: '',
    itemClass: '',
    gutter: 0,
    square: false,
    border: true
  },

  props: {
    icon: {
      type: String,
      value: ''
    },
    iconSize: {
      type: String,
      value: '26px'
    },
    text: String,
    url: String,
    linkType: {
      type: String,
      value: 'navigateTo'
    },
    useSlot: Boolean,
    useIconSlot: Boolean,
    useTextSlot: Boolean,
    // badge属性
    isDot: Boolean,
    type: String,
    value: null,
    max: Number
  },

  relations: {
    '../grid/index': {
      type: 'parent',
      linked (target) {
        this.parent = target
      },
      unlinked () {
        this.parent = null
      }
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      if (!this.parent) return
      const { children, data } = this.parent
      const { column, gutter, square, border, bgColor } = data
      const width = column ? 100 / column + '%' : 100 / children.length + '%'
      // 单独定义间隔
      const gutterStyle = gutter ? `padding:${gutter}px ${gutter}px 0 0; background-color: transparent;` : ''
      // 单独定义正方形
      const squareStyle = square ? `background-color:transparent; padding-bottom: 0; padding-top:${width}` : ''
      // 间隔+正方形
      const gutterContentStyle = (gutter && square) ? `right: ${gutter}px; bottom:${gutter}px;height: auto; background-color: ${bgColor}` : `background-color: ${bgColor}`
      this.setData({
        border,
        square,
        gutter,
        gutterContentStyle,
        style: `width: ${width}; ${squareStyle || gutterStyle}`
      })
    },
    click (event) {
      if (!this.parent.data.clickable) return
      const { url, linkType } = this.data
      if (url) {
        jd[linkType]({ url })
      }
      this.$emit('itemclick')
    },
    set (key, value) {
      this.setData({ [key]: value })
    }
  }
})