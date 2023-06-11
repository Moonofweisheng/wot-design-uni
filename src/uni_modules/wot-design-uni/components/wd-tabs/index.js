import VueComponent from '../common/component'
import { getType, checkNumRange, debounce } from '../common/util'
import touch from '../mixins/touch'
const $item = '.wd-tabs__nav-item'
const $container = '.wd-tabs__nav-container'

VueComponent({
  mixins: [touch()],
  relations: {
    '../tab/index': {
      type: 'child',
      linked (child) {
        this.children = this.children || []
        // 在建立relations时tabs保存tab实例中的name的唯一性。
        this.children.push(child)
        this.updateItems()

        // 提前设置好高亮的 tab，避免等到 mounted 时出现闪烁延迟问题
        let { value, items } = this.data
        if (
          getType(value) === 'number' &&
          value >= items.length
        ) {
          return
        }
        // 如果是字符串直接匹配，匹配不到用0兜底
        if (getType(value) === 'string') {
          const index = items.findIndex(item => item.name === value)

          if (index === -1) return

          value = index
        }
        this.children[value].setData({
          painted: true,
          isShow: true
        })
      },
      unlinked (target) {
        this.children = this.children.filter(child => child !== target)
        this.updateItems()
      }
    }
  },
  props: {
    // 绑定值
    value: {
      type: null,
      value: 0,
      observer (value) {
        if (getType(value) !== 'number' && getType(value) !== 'string') {
          console.error('[wot design] error(wd-tabs): the type of value should be number or string')
        }

        // 保证不为非空字符串，小于0的数字
        if (value === '' || value === undefined) {
          console.error('[wot design] error(wd-tabs): tabs\'s value cannot be null or undefined')
        }
        if (getType(value) === 'number' && value < 0) {
          console.error('[wot design] error(wd-tabs): tabs\'s value cannot be less than zero')
        }
        this.setActive && this.setActive(value)
      }
    },
    // 标签数超过阈值可滑动
    slidableNum: {
      type: Number,
      value: 6,
      observer: checkNumRange
    },
    // 标签数超过阈值显示导航地图
    mapNum: {
      type: Number,
      value: 10,
      observer: checkNumRange
    },
    // 粘性布局
    sticky: {
      type: Boolean,
      value: false
    },
    // 粘性布局吸顶位置
    offsetTop: {
      type: Number,
      value: 0
    },
    // 开启手势滑动
    swipeable: Boolean,
    // 底部条宽度，单位像素
    lineWidth: {
      type: Number,
      value: 19
    },
    // 底部条高度，单位像素
    lineHeight: {
      type: Number,
      value: 3
    }
  },
  data: {
    // 选中值的索引，默认第一个
    activeIndex: 0,
    // navBar的下划线样式
    lineStyle: '',
    // tabs数据
    items: [],
    // map的开关
    mapShow: false,
    // 标签页偏移量
    bodyStyle: '',
    // scroll-view偏移量
    scrollLeft: 0
  },
  methods: {
    /**
     * @description nav map list 开关
     */
    toggleMap () {
      // 必须保证display和transition不在同一个帧
      if (this.data.mapShow) {
        this.setData({ animating: false })
        setTimeout(() => {
          this.setData({ mapShow: false })
        }, 300)
      } else {
        this.setData({ mapShow: true })
        setTimeout(() => {
          this.setData({ animating: true })
        }, 100)
      }
    },
    /**
     * @description 更新tab items
     */
    updateItems () {
      this.setData({
        items: this.children.map(({ data }) => data)
      })
    },
    /**
     * @description 更新navBar underline的偏移量
     * @param {Boolean} animation 是否伴随动画
     */
    updateLineStyle (animation = true) {
      if (!this.inited) return
      // const { activeIndex, lineWidth, lineHeight, slidableNum, items } = this.data
      const { activeIndex, lineWidth, lineHeight } = this.data
      this.getRect($item, true).then(
        (rects) => {
          const rect = rects[activeIndex]
          // const width = lineWidth || (slidableNum < items.length ? rect.width : (rect.width - 14))
          const width = lineWidth
          let left = rects.slice(0, activeIndex).reduce((prev, curr) => prev + curr.width, 0)
          left += (rect.width - width) / 2
          const transition = animation
            ? 'transition: width 300ms ease, transform 300ms ease;'
            : ''

          const lineStyle = `
            height: ${lineHeight}px;
            width: ${width}px;
            transform: translateX(${left}px);
            ${transition}
          `
          // 防止重复绘制
          this.data.lineStyle !== lineStyle && this.setData({ lineStyle })
        })
    },
    /**
     * @description 通过控制tab的active来展示选定的tab
     */
    setActiveTab () {
      if (!this.inited) return
      const { activeIndex, items } = this.data

      this.children.forEach((child, index) => {
        child.setData({
          painted: child.data.painted || index === activeIndex,
          isShow: index === activeIndex
        })
      })

      this.$emit('change', {
        index: activeIndex,
        name: items[activeIndex].name
      })
    },
    /**
     * @description scroll-view滑动到active的tab_nav
     */
    scrollIntoView () {
      if (!this.inited) return
      const { activeIndex } = this.data
      Promise.all([
        this.getRect($item, true),
        this.getRect($container)
      ]).then(
        ([navItemsRects, navRect]) => {
          // 选中元素
          const selectItem = navItemsRects[activeIndex]
          // 选中元素之前的节点的宽度总和
          const offsetLeft = navItemsRects.slice(0, activeIndex).reduce((prev, curr) => prev + curr.width, 0)
          // scroll-view滑动到selectItem的偏移量
          const scrollLeft = offsetLeft - (navRect.width - selectItem.width) / 2
          this.setData({ scrollLeft })
        }
      )
    },
    /**
     * @description 单击tab的处理
     * @param index
     */
    handleSelect ({ target: { dataset: { index } } }) {
      if (index === undefined) return
      const { name, disabled } = this.data.items[index]
      if (disabled) {
        this.$emit('disabled', {
          index,
          name
        })
        return
      }
      this.data.mapShow && this.toggleMap()
      this.setActive(index)
      this.$emit('click', {
        index,
        name
      })
    },
    /**
     * @description touch handle
     * @param event
     */
    onTouchStart (event) {
      if (!this.data.swipeable) return

      this.touchStart(event)
    },
    onTouchMove (event) {
      if (!this.data.swipeable) return
      this.touchMove(event)
    },
    onTouchEnd () {
      if (!this.data.swipeable) return
      const { items, activeIndex } = this.data
      const { direction, deltaX, offsetX } = this
      const minSwipeDistance = 50
      if (direction === 'horizontal' && offsetX >= minSwipeDistance) {
        if (deltaX > 0 && activeIndex !== 0) {
          this.setActive(activeIndex - 1)
        } else if (deltaX < 0 && activeIndex !== items.length - 1) {
          this.setActive(activeIndex + 1)
          this.setActive(activeIndex + 1)
        }
      }
    },
    getActiveIndex (value) {
      const { items } = this.data
      // name代表的索引超过了items的边界，自动用0兜底
      if (
        getType(value) === 'number' &&
        value >= items.length
      ) {
        console.warn('[wot design] warning(wd-tabs): the type of tabs\' value is Number shouldn\'t be less than its children')
        value = 0
      }
      // 如果是字符串直接匹配，匹配不到用0兜底
      if (getType(value) === 'string') {
        const index = items.findIndex(item => item.name === value)
        value = (index === -1) ? 0 : index
      }

      return value
    }
  },
  beforeCreate () {
    /**
     * @description 修改选中的tab Index
     * @param {String |Number } value - radio绑定的value或者tab索引，默认值0
     * @param {Boolean } init - 是否伴随初始化操作
     */
    this.setActive = debounce(function (value = 0, init = false) {
      const { items } = this.data
      // 没有tab子元素，不执行任何操作
      if (items.length === 0) return

      value = this.getActiveIndex(value)
      // 被禁用，不执行任何操作
      if (items[value].disabled) return
      this.setData({ activeIndex: value })

      this.updateLineStyle(init === false)
      this.setActiveTab()
      this.scrollIntoView()
    }, 100)
  },
  mounted () {
    this.inited = true
    this.setActive(this.data.value, true)
  }
})