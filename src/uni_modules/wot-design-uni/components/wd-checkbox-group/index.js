import VueComponent from '../common/component'
import { checkNumRange, debounce, renderData } from '../common/util'

VueComponent({
  behaviors: ['jd://form-field'],
  relations: {
    '../checkbox/index': {
      type: 'descendant',
      linked (target) {
        this.children = this.children || []
        this.children.push(target)
        const index = this.children.indexOf(target)
        // 如果当前子节点为第一个组件，将其isFirst设置为true
        if (index === 0) {
          target.setData({
            isFirst: true
          })
        }
        // 如果当前子节点为最后一个组件，将其isLast设置为true，删掉倒数第二个子节点的isLast
        if (index === this.children.length - 1) {
          target.setData({
            isLast: true
          })
          const [prevChild] = this.children.slice(-2, -1)
          prevChild && renderData(prevChild, { isLast: false })
        }
      },
      unlinked (target) {
        this.children = this.children.filter(child => child !== target)
        const index = this.children.indexOf(target)

        if (this.children.length === 0) return
        // 如果当前删除的组件为第一个组件，将删除后的第一个组件的isFirst设置为true
        if (index === 0) {
          this.children[0].setData({
            isFirst: true
          })
        }
        // 如果当前删除的组件为最后一个组件，将删除后的倒数第一个组件的isLast设置为true
        if (index === this.children.length - 1) {
          this.children.slice(-1)[0].setData({
            isLast: true
          })
        }
      }
    }
  },
  props: {
    value: {
      type: Array,
      value: [],
      observer (value, oldVal) {
        // 传入的value数组中包括重复的元素，这种情况非法。
        if (new Set(value).size !== value.length) {
          throw Error('checkboxGroup\'s bound value includes same value')
        }
        if (value.length < this.data.min) {
          throw Error('checkboxGroup\'s bound value\'s length can\'t be less than min')
        }
        if (this.data.max !== 0 && value.length > this.data.max) {
          throw Error('checkboxGroup\'s bound value\'s length can\'t be large than max')
        }
        // 每次value变化都会触发重新匹配选中项
        this.children && this.children.length > 0 && this.resetChildren()
      }
    },
    cell: {
      type: Boolean,
      value: false,
      // 以下内容用于解决父子组件样式隔离的问题 —— START
      observer (value) {
        this.children && this.children.forEach(child => {
          child.setData({ cellBox: value })
        })
      }
      // 以下内容用于解决父子组件样式隔离的问题 —— END
    },
    shape: {
      type: String,
      value: 'circle',
      observer (value) {
        const type = ['circle', 'square', 'button']
        if (type.indexOf(value) === -1) throw Error(`shape must be one of ${type.toString()}`)
        this.updateAllChild({ shape: value })
        // 以下内容用于解决父子组件样式隔离的问题 —— START
        this.children && this.children.forEach(child => {
          child.setData({ buttonBox: value === 'button' })
        })
        // 以下内容用于解决父子组件样式隔离的问题 —— END
      }
    },
    checkedColor: {
      type: String,
      observer (value) {
        this.updateAllChild({ checkedColor: value })
      }
    },
    disabled: {
      type: Boolean,
      value: null,
      observer () {
        // 当值修改时需要重新检测
        this.resetChildren()
      }
    },
    min: {
      type: Number,
      value: 0,
      observer (value) {
        checkNumRange(value, 'min')
        // 当值修改时需要重新检测
        this.resetChildren()
      }
    },
    max: {
      type: Number,
      value: 0,
      observer (value) {
        checkNumRange(value, 'max')
        // 当值修改时需要重新检测
        this.resetChildren()
      }
    },
    inline: {
      type: Boolean,
      value: false,
      observer (value) {
        this.updateAllChild({ inline: value })
      }
    },
    size: {
      type: String,
      observer (value) {
        this.updateAllChild({ size: value })
      }
    }
  },
  methods: {
    /**
     * @description 当和child建立relation后，用checkboxGroup的props覆盖checkbox中props值为null的属性。
     * @param {Object} data 属性键值对
     */
    updateAllChild (data) {
      const keys = Object.keys(data)
      this.children && this.children.forEach(child => {
        const will = {}
        keys.forEach(key => {
          if (
            data[key] !== null &&
            data[key] !== undefined &&
            child.data[key] === null
          ) {
            will[key] = data[key]
          }
        })
        renderData(child, will)
      })
    },
    /**
     * @description 子节点通知父节点修改子节点选中状态
     * @param {any} value 子组件的标识符
     */
    changeSelectState (value) {
      const temp = this.data.value
      const index = temp.indexOf(value)
      if (index > -1) {
        // 已经选中，则从 value 列表中删除子节点的标识符。
        temp.splice(index, 1)
      } else {
        // 之前未选中，则现在把加子节点的标识符加到 value 列表中。
        temp.push(value)
      }
      this.setData({
        value: temp
      })
      // 操作完之后更新一下 所有节点的 disabled 状态
      this.resetChildren(temp)
      this.$emit('change', {
        value: temp
      })
    },
    /**
     * @description 修正子组件的 isChecked 和 finalDisabled
     * @param {array} values
     */
    resetChildren (values) {
      values = values || this.data.value
      this.children && this.children.forEach(child => {
        // value 对应的节点直接选中
        const isChecked = values.indexOf(child.data.value) > -1
        renderData(child, { isChecked })
        child.checkDisabled()
      })
    }
  },
  beforeCreate () {
    // 设置防抖，避免修改 props(min, max, disabled) 触发多次
    this.resetChildren = debounce(this.resetChildren, 50)
  }
})