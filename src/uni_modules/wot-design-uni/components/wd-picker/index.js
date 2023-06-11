import VueComponent from '../common/component'
import { getType, defaultDisplayFormat } from '../common/util'
import selfProps from './props'
import pickerViewProps from '../pickerView/props'
import cell from '../mixins/cell'

VueComponent({
  externalClasses: [
    'custom-view-class',
    'custom-label-class',
    'custom-value-class'
  ],
  behaviors: [cell, 'jd://form-field'],
  relations: {
    '../cellGroup/index': {
      type: 'ancestor',
      linked (target) {
        this.parent = target
      },
      unlinked () {
        this.parent = null
      }
    }
  },
  props: {
    ...selfProps,
    // 外部展示格式化函数
    displayFormat: {
      type: null,
      observer (fn) {
        if (getType(fn) !== 'function') {
          throw Error('The type of displayFormat must be Function')
        }
        if (
          this.picker &&
          this.picker.data.selectedIndex &&
          this.picker.data.selectedIndex.length !== 0
        ) {
          if (this.data.value) {
            this.setShowValue(this.picker.getSelects())
          } else {
            this.setData({
              showValue: ''
            })
          }
        }
      }
    },
    /* 参考pickerView组件 */
    value: {
      type: null,
      observer (value) {
        this.setData({
          pickerValue: value
        })
        // 为picker的displayFormat设置默认值
        this.data.displayFormat || this.setData({
          displayFormat: defaultDisplayFormat
        })
        // JM小程序无法透传function类型的props，此处手动透传
        this.data.columnChange && this.picker.setData({
          columnChange: this.data.columnChange
        })
        // 获取初始选中项,并展示初始选中文案
        if (value) {
          this.setShowValue(this.picker.getSelects())
        } else {
          this.setData({
            showValue: ''
          })
        }
      }
    },
    columns: {
      type: Array,
      observer (val) {
        this.setData({
          displayColumns: val,
          resetColumns: val
        })
        // 为picker的displayFormat设置默认值
        this.data.displayFormat || this.setData({
          displayFormat: defaultDisplayFormat
        })
        // JM小程序无法透传function类型的props，此处手动透传
        this.data.columnChange && this.picker.setData({
          columnChange: this.data.columnChange
        })
        // 获取初始选中项,并展示初始选中文案
        if (this.data.value) {
          this.setShowValue(this.picker.getSelects())
        } else {
          this.setData({
            showValue: ''
          })
        }
      }
    },
    ...pickerViewProps,
    columnChange: {
      type: null,
      observer (fn) {
        if (getType(fn) !== 'function') {
          throw Error('The type of columnChange must be Function')
        }
        // 外部props更新，手动透传保持同步
        if (this.picker) {
          this.picker.setData({ columnChange: this.data.columnChange })
        }
      }
    },
    zIndex: {
      type: Number,
      value: 15
    }
  },
  data: {
    // 弹出层是否显示
    popupShow: false,
    // pickerView选择器
    pickerId: 'wd-picker-view',
    // 选定后展示的选中项
    showValue: '',
    pickerValue: '',
    displayColumns: [], // 传入 pickerView 的columns
    resetColumns: [], // 保存之前的 columns，当取消时，将数据源回滚，避免多级联动数据源不正确的情况
    isPicking: false, // 判断pickview是否还在滑动中
    hasConfirmed: false // 判断用户是否点击了确认按钮
  },
  methods: {
    // 对外暴露方法，打开弹框
    open () {
      this.showPopup()
    },
    // 对外暴露方法，关闭弹框
    close () {
      this.onCancel()
    },
    /**
     * @description 展示popup，小程序有个bug，在picker-view弹出时设置value，会触发change事件，而且会将picker-view的value多次触发change重置为第一项
     */
    showPopup () {
      if (this.data.disabled || this.data.readonly) return

      this.$emit('open')

      this.setData({
        popupShow: true,
        pickerValue: this.data.value, // 打开时重置回原来的选中值
        displayColumns: this.data.resetColumns // 打开时重置当前展示的数据源
      })
    },
    /**
     * @description 点击取消按钮触发。关闭popup，触发cancel事件。
     */
    onCancel () {
      this.setData({
        popupShow: false
      })
      this.$emit('cancel')
    },
    /**
     * @description 点击确定按钮触发。展示选中值，触发cancel事件。
     */
    onConfirm () {
      if (this.data.loading) return

      // 如果当前还在滑动且未停止下来，则锁住先不确认，等滑完再自动确认，避免pickview值未更新
      if (this.data.isPicking) {
        this.setData({
          hasConfirmed: true
        })
        return
      }

      const { beforeConfirm } = this.data
      if (beforeConfirm && getType(beforeConfirm) === 'function') {
        beforeConfirm(this.data.pickerValue, isPass => {
          isPass && this.handleConfirm()
        }, this)
      } else {
        this.handleConfirm()
      }
    },
    handleConfirm () {
      if (this.data.loading || this.data.disabled) {
        this.setData({
          popupShow: false
        })
        return
      }

      const selects = this.picker.getSelects()
      const values = this.picker.getValues()
      // 获取当前的数据源，并设置给 resetColumns，用于取消时可以回退数据源
      const columns = this.picker.getColumnsData()
      this.setData({
        popupShow: false,
        value: values,
        resetColumns: columns
      })
      this.setShowValue(selects)
      this.$emit('confirm', {
        value: values,
        selectedItems: selects
      })
    },
    /**
     * @description 初始change事件
     * @param event
     */
    pickerViewChange ({ detail }) {
      this.setData({
        pickerValue: detail.value
      })
    },
    /**
     * @description 设置展示值
     * @param {Array<String>} items
     */
    setShowValue (items) {
      // 避免值为空时调用自定义展示函数
      if ((items instanceof Array && !items.length) || !items) return

      const { valueKey, labelKey } = this.data
      this.setData({
        showValue: this.data.displayFormat(items, { valueKey, labelKey })
      })
    },
    noop () { },
    onPickStart () {
      this.setData({
        isPicking: true
      })
    },
    onPickEnd () {
      this.setData({
        isPicking: false
      })

      if (this.data.hasConfirmed) {
        this.setData({
          hasConfirmed: false
        })
        this.onConfirm()
      }
    }
  },
  beforeCreate () {
    // pickerView挂载到全局
    this.picker = this.selectComponent(`#${this.data.pickerId}`)
  },
  created () {
    // 为picker的displayFormat设置默认值
    this.data.displayFormat || this.setData({
      displayFormat: defaultDisplayFormat
    })
    // JM小程序无法透传function类型的props，此处手动透传
    this.data.columnChange && this.picker.setData({
      columnChange: this.data.columnChange
    })
    this.setData({
      displayColumns: this.data.columns,
      resetColumns: this.data.columns
    })
  }
})