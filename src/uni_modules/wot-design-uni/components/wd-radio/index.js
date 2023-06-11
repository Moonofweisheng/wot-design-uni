import VueComponent from '../common/component'

VueComponent({
  props: {
    value: {
      type: null,
      observer (value, old) {
        // 类型校验，支持所有值(除null、undefined。undefined建议统一写成void (0)防止全局undefined被覆盖)
        if (value === null || value === undefined) {
          throw Error('value can\'t be null or undefined')
        }
        // 当建立relations关系之后，radio的value改变,以下内容才能执行
        if (!this.parent || old === null) return
        // 检查自己绑定的值是否和其它radio冲突
        this.parent.checkValue(this)
        // 会判断新value是否和radioGroup的value一致，一致就会调用radio的方法选中此节点。
        // 如果之前本节点被选中，匹配不上还要主动关闭自己
        if (value === this.parent.data.value) {
          this.parent.changeSelect(value)
        } else {
          this.setData({ isChecked: false })
        }
      }
    },
    shape: {
      type: String,
      value: null,
      observer (target) {
        // type: 'dot', 'button', 'check'
        const type = ['check', 'dot', 'button']
        if (type.indexOf(target) === -1) throw Error(`shape must be one of ${type.toString()}`)
      }
    },
    checkedColor: {
      type: String,
      value: null
    },
    disabled: {
      type: Boolean,
      value: null
    },
    cell: {
      type: Boolean,
      value: null
    },
    inline: {
      type: Boolean,
      value: null
    },
    maxWidth: String,
    size: {
      type: String,
      value: null
    }
  },
  relations: {
    '../radioGroup/index': {
      type: 'ancestor',
      linked (target) {
        this.parent = target

        const { shape, checkedColor, disabled, inline, size, cell } = this.parent.data
        const data = {
          shape,
          checkedColor,
          disabled,
          inline,
          size,
          cell
        }
        const keys = Object.keys(data)
        const will = {}
        keys.forEach(key => {
          if (
            data[key] !== null &&
            data[key] !== undefined &&
            this.data[key] === null
          ) {
            will[key] = data[key]
          }
        })
        this.setData(will)
        this.setData({
          isChecked: this.data.value === this.parent.data.value
        })
      },
      unlinked () {
        this.parent = null
      }
    }
  },
  data: {
    isChecked: false
  },
  methods: {
    /**
     * 点击子元素，通知父元素触发change事件
     */
    handleClick () {
      const { value, disabled } = this.data
      if (
        !disabled &&
        this.parent &&
        value !== null &&
        value !== undefined
      ) {
        this.parent.handleClick(value)
        this.parent.setData({ value })
      }
    }
  }
})