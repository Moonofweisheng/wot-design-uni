import VueComponent from '../common/component'
import { closeOther } from '../common/clickoutside'

VueComponent({
  data: {
    // 保存的永远是当前选中的值
    titleList: [],
    // -1表示折叠
    currentIndex: -1,
    offset: 0
  },
  props: {
    zIndex: {
      type: Number,
      value: 12
    },
    direction: {
      type: String,
      value: 'down',
      observer (newValue) {
        if (newValue !== 'up' && newValue !== 'down') {
          this.setData({ direction: 'down' })
          console.warn('[wot design] warning(wd-drop-menu): direction must be \'up\' or \'down\'')
        }
      }
    },
    modal: {
      type: Boolean,
      value: true
    },
    closeOnClickModal: {
      type: Boolean,
      value: true
    },
    duration: {
      type: Number,
      value: 200
    }
  },
  relations: {
    '../dropMenuItem/index': {
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
    const { windowHeight } = jd.getSystemInfoSync()
    this.windowHeight = windowHeight
    this.children = []
  },
  mounted () {
    this.updateTitle()
  },
  methods: {
    noop () { },
    toggle (event) {
      // 如果重复展开相同的选项，则折叠选项卡
      const { index } = event.currentTarget.dataset
      const child = this.children[index]
      // 点击当前 menu, 关闭其他 menu
      if (!child.data.disabled) {
        const currentIndex = index === this.data.currentIndex ? -1 : index
        closeOther(child)
        this.fold(currentIndex)
      }
    },
    /**
     * 控制菜单内容是否展开
     * @param {Number} currentIndex 当前选的索引
     */
    fold (currentIndex) {
      this.setData({ currentIndex })

      if (currentIndex === -1) {
        this.children.forEach((item, index) => {
          item.set('showPop', false)
        })
        return
      }

      this.getRect('.wd-drop-menu').then(rect => {
        if (!rect) return
        const { top, bottom } = rect

        if (this.data.direction === 'down') {
          this.setData({
            offset: bottom
          })
        } else {
          this.setData({
            offset: this.windowHeight - top
          })
        }

        // 选中当前关掉其他的
        this.children.forEach((item, index) => {
          currentIndex === index ? item.open() : item.set('showPop', false)
        })
      })
    },
    // 重设选中的 value 菜单列表
    updateTitle () {
      const titleList = []
      this.children.forEach((item, index) => {
        const { displayTitle, disabled } = item.data
        titleList.push({
          title: displayTitle,
          disabled: disabled
        })
      })
      this.setData({ titleList })
    }
  }
})