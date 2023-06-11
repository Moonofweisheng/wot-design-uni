import { pushToQueue, removeFromQueue, closeOther } from '../common/clickoutside'

/**
 * @description 注意点：
 * 1. 需要控制的位置： 12个
 * 2. 每一个位置改变都需要控制：
 * popLeft(弹出坐标x)/ popTop(弹出坐标Y)/ arrowStyle(三角形位置以及尖角朝向)
 * 尖角样式朝向class控制，位置用js控制
 * @param {String} [placement=bottom] - Placement of the popper accepted values: top(-start, -end), right(-start, -end), bottom(-start, -end), left(-start, -end)
 * @param {Number} [offset=5] - Amount of pixels the popper will be shifted (can be negative).
 * @param {Boolean} [visibleArrow=false] Visibility of the arrow
 * @param {Boolean} [value=false] Visibility of the component
 * @param {Boolean} [disabled=false] Disabled to change.
 */

export default function () {
  return {
    externalClasses: ['custom-arrow', 'custom-pop'],

    data: {
      popStyle: {},
      arrowStyle: {},
      showStyle: ''
    },

    props: {
      visibleArrow: {
        type: Boolean,
        value: true
      },
      // 显示内容 String || Array
      content: {
        type: null,
        observer(newVal) {
          const { mode, selector } = this.data
          // 类型校验，支持所有值(除null、undefined。undefined建议统一写成void (0)防止全局undefined被覆盖)
          if (newVal === null || newVal === undefined) {
            throw Error("value can't be null or undefined")
          }
          if (selector === 'popover' && mode === 'normal' && typeof newVal !== 'string') {
            throw Error('The value type must be a string type in normal mode')
          } else if (selector === 'popover' && mode === 'menu' && this.checkType(newVal) !== 'Array') {
            throw Error('The value type must be a Array type in menu mode')
          }
        }
      },
      placement: {
        type: String,
        value: 'bottom'
      },
      offset: {
        type: Number,
        value: 0
      },
      useContentSlot: {
        type: Boolean,
        value: false
      },
      disabled: {
        type: Boolean,
        value: false
      },
      showClose: {
        type: Boolean,
        value: false
      },
      show: {
        type: Boolean,
        observer(newValue, oldValue) {
          if (newValue) {
            this.control()
            closeOther(this)
          }
          this.setData({ showStyle: newValue ? 'display: inline-block;' : 'display: none;' })
          this.$emit('change', { show: newValue })
          this.$emit(`${newValue ? 'open' : 'close'}`)
        }
      }
    },

    mounted() {
      this.init()
    },

    beforeCreate() {
      pushToQueue(this)
    },

    created() {
      this.setData({ showStyle: this.data.show ? 'opacity: 1;' : 'opacity: 0;' })
    },

    destroyed() {
      removeFromQueue(this)
    },

    methods: {
      noop() {},

      open() {
        this.setData({ show: true })
      },

      close() {
        this.setData({ show: false })
      },

      init() {
        // 初始化 class
        const { placement, visibleArrow, selector } = this.data
        if (visibleArrow) {
          let arrowClass = [
            `wd-${selector}__arrow`,
            placement === 'bottom' || placement === 'bottom-start' || placement === 'bottom-end' ? `wd-${selector}__arrow-up` : '',
            placement === 'left' || placement === 'left-start' || placement === 'left-end' ? `wd-${selector}__arrow-right` : '',
            placement === 'right' || placement === 'right-start' || placement === 'right-end' ? `wd-${selector}__arrow-left` : '',
            placement === 'top' || placement === 'top-start' || placement === 'top-end' ? `wd-${selector}__arrow-down` : ''
          ]
          arrowClass = arrowClass.join(' ')
          this.setData({ arrowClass })
        }

        // 初始化数据获取
        this.getRect('#target').then((rect) => {
          if (!rect) return
          this.left = rect.left
          this.bottom = rect.bottom
          this.width = rect.width
          this.height = rect.height
          this.top = rect.top
        })
        // 用透明度可在初始化时获取到pop尺寸
        this.getRect('#pos').then((rect) => {
          if (!rect) return
          this.popWidth = rect.width
          this.popHeight = rect.height
        })
      },

      toggle(event) {
        if (this.data.disabled) return
        const { show } = this.data
        this.setData({ show: !show })
      },

      checkType(value) {
        return Object.prototype.toString.call(value).slice(8, -1)
      },

      control() {
        const { placement, offset } = this.data
        // arrow size
        const arrowSize = 9
        // 上下位（纵轴）对应的距离左边的距离
        const verticalX = this.width / 2
        // 上下位（纵轴）对应的距离底部的距离
        const verticalY = arrowSize + this.height + 5
        // 左右位（横轴）对应的距离左边的距离
        const horizontalX = this.width + arrowSize + 5
        // 左右位（横轴）对应的距离底部的距离
        const horizontalY = this.height / 2

        const offsetX = (verticalX - 17 > 0 ? 0 : verticalX - 25) + offset
        const offsetY = (horizontalY - 17 > 0 ? 0 : horizontalY - 25) + offset

        const placements = new Map([
          // 上
          ['top', [`left: ${verticalX}px; bottom: ${verticalY}px; transform: translateX(-50%);`, 'left: 50%;']],
          [
            'top-start',
            [
              `left: ${offsetX}px; bottom: ${verticalY}px;`,
              `left: ${(this.popWidth >= this.width ? this.width / 2 : this.popWidth - 25) - offsetX}px;`
            ]
          ],
          [
            'top-end',
            [
              `right: ${offsetX}px; bottom: ${verticalY}px;`,
              `right: ${(this.popWidth >= this.width ? this.width / 2 : this.popWidth - 25) - offsetX}px; transform: translateX(50%);`
            ]
          ],
          // 下
          ['bottom', [`left: ${verticalX}px; top: ${verticalY}px; transform: translateX(-50%);`, 'left: 50%;']],
          [
            'bottom-start',
            [`left: ${offsetX}px; top: ${verticalY}px;`, `left: ${(this.popWidth >= this.width ? this.width / 2 : this.popWidth - 25) - offsetX}px;`]
          ],
          [
            'bottom-end',
            [
              `right: ${offsetX}px; top: ${verticalY}px;`,
              `right: ${(this.popWidth >= this.width ? this.width / 2 : this.popWidth - 25) - offsetX}px; transform: translateX(50%);`
            ]
          ],
          // 左
          ['left', [`right: ${horizontalX}px; top: ${horizontalY}px; transform: translateY(-50%);`, 'top: 50%']],
          [
            'left-start',
            [
              `right: ${horizontalX}px; top: ${offsetY}px;`,
              `top: ${(this.popHeight >= this.height ? this.height / 2 : this.popHeight - 20) - offsetY}px;`
            ]
          ],
          [
            'left-end',
            [
              `right: ${horizontalX}px; bottom: ${offsetY}px;`,
              `bottom: ${(this.popHeight >= this.height ? this.height / 2 : this.popHeight - 20) - offsetY}px; transform: translateY(50%);`
            ]
          ],
          // 右
          ['right', [`left: ${horizontalX}px; top: ${horizontalY}px; transform: translateY(-50%);`, 'top: 50%']],
          [
            'right-start',
            [
              `left: ${horizontalX}px; top: ${offsetY}px;`,
              `top: ${(this.popHeight >= this.height ? this.height / 2 : this.popHeight - 20) - offsetY}px;`
            ]
          ],
          [
            'right-end',
            [
              `left: ${horizontalX}px; bottom: ${offsetY}px;`,
              `bottom: ${(this.popHeight >= this.height ? this.height / 2 : this.popHeight - 20) - offsetY}px; transform: translateY(50%);`
            ]
          ]
        ])

        this.setData({
          popStyle: placements.get(placement)[0],
          arrowStyle: placements.get(placement)[1]
        })
      }
    }
  }
}
