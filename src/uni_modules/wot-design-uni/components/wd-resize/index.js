import VueComponent from '../common/component'
import { renderData } from '../common/util'

VueComponent({
  externalClasses: ['custom-container-class'],
  data: {
    expandScrollTop: 0,
    shrinkScrollTop: 0,
    expandScrollLeft: 0,
    shrinkScrollLeft: 0,
    height: 0,
    width: 0,
    scrollEventCount: 0
  },
  methods: {
    onScrollHandler () {
    },
    scrollToBottom ({ width, height }) {
      renderData(this, {
        expandScrollTop: 100000 + height,
        shrinkScrollTop: 3 * this.data.height + height,
        expandScrollLeft: 100000 + width,
        shrinkScrollLeft: 3 * this.data.width + width
      })
    }
  },
  mounted () {
    this.query = this.createSelectorQuery()
      .in(this)
      .select('.wd-resize__container')
      .boundingClientRect()
    this.query.exec(([res]) => {
      const { width, height } = res
      // 闭包记录容器高度
      let lastHeight = height
      let lastWidth = width
      // 立即填充父容器高宽
      renderData(this, {
        height,
        width
      })
      // 监听滚动事件
      this.onScrollHandler = () => {
        this.query.exec(([res]) => {
          // 前两次滚动事件被触发，说明 created 的修改已渲染，通知用户代码当前容器大小
          if (this.data.scrollEventCount++ === 0) {
            const result = {};
            ['bottom', 'top', 'left', 'right', 'height', 'width'].forEach(propName => {
              result[propName] = res[propName]
            })
            this.$emit('resize', result)
          }
          // 滚动条拉到底部会触发两次多余的事件，屏蔽掉。
          if (this.scrollEventCount < 3) return
          // 手动设置父容器高宽，防止父容器坍塌
          // 滚动完，重新获取容器新的高度
          const newHeight = res.height
          const newWidth = res.width
          // 立即填充父容器高宽
          renderData(this, {
            height: newHeight,
            width: newWidth
          })
          // 宽高都改变时，只需要触发一次 size 事件
          const emitStack = []
          if (newHeight !== lastHeight) {
            lastHeight = newHeight
            emitStack.push(1)
          }
          if (newWidth !== lastWidth) {
            lastWidth = newWidth
            emitStack.push(1)
          }
          if (emitStack.length !== 0) {
            const result = {};
            ['bottom', 'top', 'left', 'right', 'height', 'width'].forEach(propName => {
              result[propName] = res[propName]
            })
            this.$emit('resize', result)
          }
          // 滚动条拉到底部（如果使用 nextTick 效果更佳）
          this.scrollToBottom({
            width: lastWidth,
            height: lastHeight
          })
        })
      }
      // 滚动条拉到底部（如果使用 nextTick 效果更佳）
      this.scrollToBottom({
        width: lastWidth,
        height: lastHeight
      })
    })
  }
})