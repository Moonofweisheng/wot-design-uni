import VueComponent from '../common/component'
import { renderData } from '../common/util'

VueComponent({
  behaviors: ['jd://form-field'],
  externalClasses: [
    'custom-label-class',
    'custom-shape-class'
  ],
  relations: {
    '../checkboxGroup/index': {
      type: 'ancestor',
      linked (target) {
        this.parent = target
        this.checkName(this, this.data.value)

        const { shape, checkedColor, inline, size, cell } = this.parent.data
        const data = {
          shape,
          checkedColor,
          inline,
          size
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
        renderData(this, Object.assign(will, {
          isChecked: this.parent.data.value.indexOf(this.data.value) > -1,
          cellBox: cell,
          buttonBox: cell && shape === 'button'
        }))
        // disabled 单独设置
        this.checkDisabled()
      },
      unlinked () {
        this.parent = null
      }
    }
  },
  props: {
    value: {
      type: null,
      observer (value) {
        if (
          value === null ||
          value === undefined
        ) {
          throw Error('checkbox\'s value can\'t be null or undefined')
        }
        if (!this.data.inited) return
        // 组合使用走这个逻辑
        if (this.parent) {
          this.checkName()
          return this.parent.resetChildren()
        }

        this.setData({ isChecked: value === this.data.trueValue })
      }
    },
    shape: {
      type: String,
      value: null,
      observer (target) {
        const type = ['circle', 'square', 'button']
        if (type.indexOf(target) === -1) throw Error(`shape must be one of ${type.toString()}`)
      }
    },
    checkedColor: {
      type: String,
      value: null
    },
    disabled: {
      type: Boolean,
      value: null,
      observer () {
        this.checkDisabled()
      }
    },
    trueValue: {
      type: null,
      value: true
    },
    falseValue: {
      type: null,
      value: false
    },
    size: {
      type: String,
      value: null
    },
    maxWidth: String
  },
  data: {
    isChecked: false,
    inited: false,
    // 相同组件的伪类选择器无效，这里配合类名手动模拟 last-child、first-child
    isFirst: false,
    isLast: false,
    finalDisabled: false,
    inline: null,
    // 以下内容用于解决父子组件样式隔离的问题 —— START
    cellBox: false,
    buttonBox: false
    // 以下内容用于解决父子组件样式隔离的问题 —— END
  },
  methods: {
    /**
     * @description 检测checkbox绑定的value是否和其它checkbox的value冲突
     * @param {Object} self 自身
     * @param  myName 自己的标识符
     */
    checkName (self = this, myName = this.data.value) {
      this.parent && this.parent.children.forEach(node => {
        if (
          node !== self &&
          node.data.value === myName
        ) {
          throw Error(`The checkbox's bound value: ${myName} has been used`)
        }
      })
    },
    /**
     * @description 点击checkbox的Event handle
     */
    toggle () {
      const { value, finalDisabled, trueValue, falseValue, isChecked } = this.data
      if (finalDisabled) return
      // 复选框单独使用时点击反选，并且在checkbox上触发change事件
      if (this.parent) {
        this.$emit('change', {
          value: !isChecked
        })
        this.parent.changeSelectState(value)
      } else {
        const newVal = value === trueValue ? falseValue : trueValue
        this.setData({
          value: newVal
        })
        this.$emit('change', {
          value: newVal
        })
      }
    },
    /**
     * @description 检查设置实际 disabled 情况，需要考虑父组件的 min, max 和 value.length 的关系
     *
     */
    checkDisabled () {
      // 不管 this.data.disabled 是啥，我先设置上
      const config = {}
      config.finalDisabled = this.data.disabled
      if (!this.parent) {
        return renderData(this, config)
      }
      // 此处用于修正上一步
      const { min, max, disabled, value } = this.parent.data
      if (
        // max 生效时，group 已经选满，禁止其它节点再选中。
        (max && value.length >= max && !this.data.isChecked) ||
        // min 生效时，group 选中的节点数量仅满足最小值，禁止取消已选中的节点。
        (min && value.length <= min && this.data.isChecked) ||
        // 只要子节点自己要求 disabled，那就 disabled。
        (this.data.disabled === true) ||
        // 父节点要求全局 disabled，子节点没吱声，那就 disabled。
        (disabled && this.data.disabled === null)
      ) {
        config.finalDisabled = true
      }
      renderData(this, config)
    }
  },
  created () {
    if (this.data.value === null) throw Error('checkbox\'s value must be set')
    this.setData({ inited: true })
  },
  mounted () {
    // 如果没有父组件，设置 isChecked
    if (!this.parent) {
      this.setData({
        isChecked: this.data.value === this.data.trueValue,
        isFirst: true,
        isLast: true
      })
    }
  }
})