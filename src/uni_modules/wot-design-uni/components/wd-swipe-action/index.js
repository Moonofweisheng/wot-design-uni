import VueComponent from '../common/component'
import touch from '../mixins/touch'
import { pushToQueue, removeFromQueue, closeOther } from '../common/clickoutside'

VueComponent({
  mixins: [touch()],
  props: {
    beforeClose: null,
    disabled: {
      type: Boolean,
      value: false
    },
    value: {
      type: String,
      value: 'close',
      observer (value, old) {
        this.changeState(value, old)
      }
    }
  },
  data: {
    wrapperStyle: '',
    stopPropagation: false
  },
  methods: {
    changeState (value, old) {
      if (this.data.disabled) {
        return
      }
      this.getWidths().then(([leftWidth, rightWidth]) => {
        switch (value) {
        case 'close':
          // 调用此函数时，偏移量本就是0
          if (this.wrapperOffset === 0) return
          this.close('value', old)
          break
        case 'left':
          this.swipeMove(leftWidth)
          break
        case 'right':
          this.swipeMove(-rightWidth)
          break
        }
      })
    },
    /** 防穿透函数的占位符 **/
    nothing () {
    },
    /**
     * @description 获取左/右操作按钮的宽度
     * @return {Promise<[Number, Number]>} 左宽度、右宽度
     */
    getWidths () {
      return Promise.all([
        this.getRect('.wd-swipe-action__left').then(
          (rects) => {
            return rects.width ? rects.width : 0
          }),
        this.getRect('.wd-swipe-action__right').then(
          (rects) => {
            return rects.width ? rects.width : 0
          })
      ])
    },
    /**
     * @description wrapper滑动函数
     * @param {Number} offset 滑动漂移量
     */
    swipeMove (offset = 0) {
      this.offset = offset

      const transform = `translate3d(${offset}px, 0, 0)`
      // 跟随手指滑动，不需要动画
      const transition = this.touching ? 'none' : '.6s cubic-bezier(0.18, 0.89, 0.32, 1)'

      this.setData({
        wrapperStyle: `
        -webkit-transform: ${transform};
        -webkit-transition: ${transition};
        transform: ${transform};
        transition: ${transition};
      `
      })

      // 记录容器当前偏移的量
      this.wrapperOffset = offset
    },
    /**
     * @description click的handler
     * @param event
     */
    onClick (event) {
      if (
        this.data.disabled ||
        this.wrapperOffset === 0
      ) {
        return
      }

      const { key: position = 'inside' } = event.target.dataset
      this.close('click', position)
      this.$emit('click', {
        value: position
      })
    },
    /**
     * @description 开始滑动
     */
    startDrag (event) {
      if (this.data.disabled) return

      this.originOffset = this.wrapperOffset
      this.touchStart(event)
      closeOther(this)
    },
    /**
     * @description 滑动时，逐渐展示按钮
     * @param event
     */
    onDrag (event) {
      if (this.data.disabled) return

      this.touchMove(event)

      if (this.direction === 'vertical') {
        this.setData({ stopPropagation: false })
        return
      } else {
        this.setData({ stopPropagation: true })
      }

      this.touching = true

      // 本次滑动，wrapper应该设置的偏移量
      const offset = this.originOffset + this.deltaX
      this.getWidths().then(([leftWidth, rightWidth]) => {
        // 如果需要想滑出来的按钮不存在，对应的按钮肯定滑不出来，容器处于初始状态。此时需要模拟一下位于此处的start事件。
        if (
          (leftWidth === 0 && offset > 0) ||
          (rightWidth === 0 && offset < 0)
        ) {
          this.swipeMove(0)
          return this.startDrag(event)
        }
        // 按钮已经展示完了，再滑动没有任何意义，相当于滑动结束。此时需要模拟一下位于此处的start事件。
        if (leftWidth !== 0 && offset >= leftWidth) {
          this.swipeMove(leftWidth)
          return this.startDrag(event)
        } else if (rightWidth !== 0 && -offset >= rightWidth) {
          this.swipeMove(-rightWidth)
          return this.startDrag(event)
        }
        this.swipeMove(offset)
      })
    },
    /**
     * @description 滑动结束，自动修正位置
     */
    endDrag () {
      if (this.data.disabled) return
      // 滑出"操作按钮"的阈值
      const THRESHOLD = 0.3

      this.setData({ stopPropagation: false })
      this.touching = false

      this.getWidths().then(([leftWidth, rightWidth]) => {
        if (
          this.originOffset < 0 && // 之前展示的是右按钮
          this.wrapperOffset < 0 &&// 目前仍然是右按钮
          this.wrapperOffset - this.originOffset < rightWidth * THRESHOLD// 并且滑动的范围不超过右边框阀值
        ) {
          this.swipeMove(-rightWidth)// 回归右按钮
          this.setData({ value: 'right' })
        } else if (
          this.originOffset > 0 &&// 之前展示的是左按钮
          this.wrapperOffset > 0 &&// 现在仍然是左按钮
          this.originOffset - this.wrapperOffset < leftWidth * THRESHOLD// 并且滑动的范围不超过左按钮阀值
        ) {
          this.swipeMove(leftWidth)// 回归左按钮
          this.setData({ value: 'left' })
        } else if (
          rightWidth > 0 &&
          this.originOffset >= 0 &&// 之前是初始状态或者展示左按钮显
          this.wrapperOffset < 0 &&// 现在展示右按钮
          Math.abs(this.wrapperOffset) > rightWidth * THRESHOLD// 视图中已经展示的右按钮长度超过阀值
        ) {
          this.swipeMove(-rightWidth)
          this.setData({ value: 'right' })
        } else if (
          leftWidth > 0 &&
          this.originOffset <= 0 &&// 之前初始状态或者右按钮显示
          this.wrapperOffset > 0 &&// 现在左按钮
          Math.abs(this.wrapperOffset) > leftWidth * THRESHOLD// 视图中已经展示的左按钮长度超过阀值
        ) {
          this.swipeMove(leftWidth)
          this.setData({ value: 'left' })
        } else {
          // 回归初始状态
          this.close('swipe')
        }
      })
    },
    /**
     * @description 关闭操过按钮，并在合适的时候调用 beforeClose
     */
    close (reason, position) {
      if (reason === 'swipe' && this.originOffset === 0) {
        // offset：0 ——> offset：0
        return this.swipeMove(0)
      } else if (reason === 'swipe' && this.originOffset > 0) {
        // offset > 0 ——> offset：0
        position = 'left'
      } else if (reason === 'swipe' && this.originOffset < 0) {
        // offset < 0 ——> offset：0
        position = 'right'
      }

      if (reason && position) {
        this.data.beforeClose(reason, position)
      }

      this.swipeMove(0)
      if (this.data.value !== 'close') {
        this.setData({ value: 'close' })
      }
    }
  },
  beforeCreate () {
    pushToQueue(this)
    // 滑动开始时，wrapper的偏移量
    this.originOffset = 0
    // wrapper现在的偏移量
    this.wrapperOffset = 0
    // 是否处于滑动状态
    this.touching = false
    // 设置默认 beforeClose 函数
    !this.data.beforeClose && this.setData({
      beforeClose: v => v
    })
  },
  mounted () {
    this.touching = true
    this.changeState(this.data.value)
    this.touching = false
  },
  destroyed () {
    removeFromQueue(this)
  }
})