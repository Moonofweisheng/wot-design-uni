import VueComponent from '../common/component'
import { renderData } from '../common/util'

VueComponent({
  relations: {
    '../sticky/index': {
      type: 'child',
      unlinked (child) {
        this.deleteObserver(child)
      }
    }
  },
  beforeCreate () {
    this.observerMap = new Map()
  },
  methods: {
    /**
     * @description wd-sticky-box 尺寸发生变化时，重新监听所有的viewport
     */
    resizeHandler (e) {
      // 相对的容器大小改变后，同步设置 wd-sticky-box 的大小
      renderData(this, {
        width: e.detail.width,
        height: e.detail.height
      })
      // wd-sticky-box 大小变化时，重新监听所有吸顶元素
      const temp = this.observerMap
      this.observerMap = new Map()
      for (const [child] of temp) {
        this.observerForChild(child)
      }
      temp.forEach(observer => {
        observer.disconnect()
      })
      temp.clear()
    },
    /**
     * @description 删除 wd-sticky 废弃的监听器
     * @param child
     */
    deleteObserver (child) {
      const observer = this.observerMap.get(child)
      if (!observer) return
      observer.disconnect()
      this.observerMap.delete(child)
    },
    /**
     * @description 为 wd-sticky 创建监听器
     * @param child
     */
    createObserver (child) {
      const observer = this.createIntersectionObserver()
      this.observerMap.set(child, observer)
      return observer
    },
    /**
     * @description 为单个 wd-sticky 监听 viewport
     * @param child sticky
     */
    observerForChild (child) {
      const offset = child.data.height + child.data.offsetTop
      this.deleteObserver(child)
      const observer = this.createObserver(child)
      // 如果 wd-sticky 比 wd-sticky-box还大，"相对吸顶"无任何意义,此时强制吸顶元素回归其占位符
      if (this.data.height <= child.data.height) {
        return renderData(child, {
          openBox: false,
          position: 'absolute',
          top: 0
        })
      }
      observer.relativeToViewport({ top: -offset })
        .observe('.wd-sticky-box', this.scrollHandler.bind(this, child))
      this.getRect('.wd-sticky-box').then(res => {
        // 当 wd-sticky-box 位于 viewport 外部时不会触发 observe，此时根据位置手动修复位置。
        if (res.bottom <= offset) this.scrollHandler(child, { boundingClientRect: res })
      })
    },
    /**
     * @description 为子节点监听 viewport，处理子节点的相对吸顶逻辑
     * @param {Object} child wd-sticky实例
     * @param {Object} boundingClientRect 目标节点各个边在viewport中的坐标
     */
    scrollHandler (child, { boundingClientRect }) {
      const offset = child.data.height + child.data.offsetTop
      if (boundingClientRect.bottom <= offset) {
        // 父元素即将被吸顶元素遮盖，将吸顶元素固定到父元素底部
        renderData(child, {
          // 关闭 wd-sticky 的 position: 'relative'，
          // 将吸顶元素的 position: 'absolute' 相对为 wd-sticky-box
          openBox: true,
          position: 'absolute',
          top: boundingClientRect.height - child.data.height
        })
      } else if (
        boundingClientRect.top <= offset &&
        boundingClientRect.bottom > offset
      ) {
        // wd-sticky 已经完全呈现了 viewport 中了，
        // 此时没有必要再相对 wd-sticky-box 吸顶了
        if (child.data.state === 'normal') return
        // 顶元素开始遮盖不住父元素了，将吸顶元素恢复到吸顶模式
        renderData(child, {
          openBox: false,
          position: 'fixed',
          top: child.data.offsetTop
        })
      }
    }
  }
})