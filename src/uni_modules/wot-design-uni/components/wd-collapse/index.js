import VueComponent from '../common/component'
VueComponent({
  externalClasses: ['custom-more-slot-class'],
  data: {
    contentLineNum: ''
  },
  props: {
    // [String, Array, Boolean]
    value: {
      type: null,
      observer (newVal, oldVal) {
        const { viewmore, accordion } = this.data
        // 类型校验，支持所有值(除null、undefined。undefined建议统一写成void (0)防止全局undefined被覆盖)
        if (newVal === null || newVal === undefined) {
          throw Error('value can\'t be null or undefined')
        }
        // 手风琴状态下 value 类型只能为 string
        if (accordion && typeof newVal !== 'string') {
          throw Error('accordion value must be string')
        } else if (!accordion && !viewmore && this.checkType(newVal) !== 'Array') {
          throw Error('value must be Array')
        }
        // 初始状态不执行动画
        // 外部修改 value 滚动
        if (oldVal && !viewmore && this.children) {
          this.children.forEach((item) => {
            const { name, isExpand } = item.data
            const condition = newVal === name || newVal.indexOf(name) > -1
            if (isExpand === condition) return
            item.stateControl('isExpand', condition)
            item.scrollHeight('.wd-collapse-item__body')
          })
        }
      }
    },
    accordion: {
      type: Boolean,
      value: false
    },
    viewmore: {
      type: Boolean,
      value: false
    },
    useMoreSlot: {
      type: Boolean,
      value: false
    },
    lineNum: {
      type: Number,
      value: 2,
      observer (newVal) {
        if (newVal <= 0) {
          this.setData({ lineNum: 2 })
          throw Error('lineNum must greater than 0')
        }
      }
    }
  },
  relations: {
    '../collapseItem/index': {
      type: 'child',
      linked (target) {
        this.children = this.children || []
        const repeat = this.checkRepeat(this.children, target.data.name, 'name')
        if (repeat === -1) {
          this.children.push(target)
          this.children[0].stateControl('firstItem', true)
        } else {
          throw Error('Name attribute cannot be defined repeatedly')
        }
      },
      unlinked (target) {
        this.children = this.children.filter(child => child !== target)
      }
    }
  },
  created () {
    const { lineNum, viewmore, value } = this.data
    this.setData({ contentLineNum: viewmore && !value ? lineNum : '' })
  },
  methods: {
    checkType (value) {
      return Object.prototype.toString.call(value).slice(8, -1)
    },
    /**
     * 检查是否存在重复属性
     * @param {Array} currentList
     * @param {String} checkValue 比较的重复值
     * @param {String} key 键名
     */
    checkRepeat (currentList, checkValue, key) {
      return currentList.findIndex(item => item.data[key] === checkValue)
    },
    /**
     * 折叠控制
     * @param {String} name 当前选中的 item name
     * @param {Boolean} expanded 是否展开 false: 开->关(删除)；true: 关->开(添加)
     */
    switchValue (name, expanded) {
      const { accordion, viewmore, value } = this.data
      if (!accordion && !viewmore && this.checkType(value) === 'Array') {
        name = expanded
          ? value.concat(name)
          : value.filter(item => item !== name)
      } else if (viewmore) {
        name = !value
      }
      this.$emit('input', {
        value: name
      })
      this.$emit('change', {
        value: name
      })
    }
  }
})