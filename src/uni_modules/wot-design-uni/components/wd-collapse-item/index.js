import VueComponent from '../common/component'

const $body = '.wd-collapse-item__body'
VueComponent({
  externalClasses: ['custom-class'],
  data: {
    height: '',
    show: false,
    firstItem: false,
    isExpand: false,
    transD: '0.3s'
  },
  props: {
    title: String,
    disabled: Boolean,
    name: {
      type: String,
      observer (newVal) {
        const condition = this.parent && this.parent.checkRepeat(this.parent.children, newVal, 'name')
        // 比较数组中是否存在重复数据
        if (condition > -1) {
          throw Error('Name attribute cannot be defined repeatedly')
        }
      }
    }
  },
  relations: {
    '../collapse/index': {
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
    this.initState()
  },
  methods: {
    initState () {
      const { isExpand, name } = this.data
      const { accordion, value } = this.parent.data
      if (!value) {
        console.warn('[wot-design] warning(wd-collapse-item): there is no value with parent.')
        return
      }
      this.setData({
        show: isExpand,
        isExpand: accordion ? value === name : value.indexOf(name) > -1
      })
      this.scrollHeight($body, true)
    },
    /**
     * 关联组件控制内部值
     * @param {String} key 键值
     * @param String value 键名
     */
    stateControl (key, value) {
      this.setData({ [key]: value })
    },
    /**
     * 控制折叠面板滚动
     * @param {String} select 选择器名称
     * @param {Boolean} firstRender 是否首次渲染
     */
    scrollHeight (select, firstRender = false) {
      const transD = firstRender ? '0s' : '0.3s'

      this.getRect(select).then(rect => {
        if (!rect) return
        const { height } = rect
        if (this.data.isExpand) {
          if (height === 0) {
            this.setData({
              height: 'auto',
              show: true,
              transD
            })
            return
          }

          this.setData({ height: 0, show: true, transD })
          setTimeout(() => {
            this.setData({ height: height + 'px' })
          }, 30)
        } else {
          this.setData({ height: height + 'px', transD })
          setTimeout(() => {
            this.setData({ height: 0 })
          }, 30)
        }
      })
    },
    // 点击触发
    toggle () {
      const { disabled, name, isExpand } = this.data
      const { accordion } = this.parent.data
      if (disabled) return
      // 如果是手风琴模式, 那么只展开一个，其余全部折叠
      if (accordion) {
        this.parent.children.forEach(item => {
          item.stateControl('isExpand', item.data.name === name)
          item.scrollHeight($body)
        })
      } else {
        this.setData({ isExpand: !isExpand })
        this.scrollHeight($body)
      }
      // 调用父组件方法 switchValue 当前选中的是什么，判断当前是否处于选中状态
      this.parent.switchValue(name, !isExpand)
    },
    // 动画结束时触发
    onTransitionend (event) {
      if (!this.data.isExpand) {
        this.setData({ show: false })
      } else {
        this.setData({ height: '' })
      }
    }
  }
})