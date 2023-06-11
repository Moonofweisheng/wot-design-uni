import VueComponent from '../common/component'
import pickerProps from '../picker/props'
import pickerViewProps from '../pickerView/props'
import cell from '../mixins/cell'
import { getType, padZero, isEqual } from '../common/util'
const currentYear = new Date().getFullYear()

VueComponent({
  /**
   * 注意，datetimePickerView和datetimePicker有公共逻辑，抽离成/mixins/datetimePickerView，通过mixins options注入
   */
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
    ...pickerProps,
    ...pickerViewProps,
    // 选中项，当 type 为 time 时，类型为字符串，否则为 时间戳
    value: {
      type: null,
      observer (val, oldVal) {
        if (isEqual(val, oldVal)) return

        if (getType(val) === 'array') {
          this.setData({
            region: true,
            innerValue: this.getDefaultInnerValue({
              isRegion: true
            }),
            endInnerValue: this.getDefaultInnerValue({
              isRegion: true,
              isEnd: true
            })
          })
        } else {
          // 每次value更新时都需要刷新整个列表
          this.setData({
            innerValue: this.getDefaultInnerValue()
          })
        }
        this.setShowValue()
      }
    },
    // 时间选择器的类型
    type: {
      type: String,
      value: 'datetime'
    },
    // 最小日期 20(x-10)年1月1日
    minDate: {
      type: Number,
      value: new Date(currentYear - 10, 0, 1).getTime()
    },
    // 最大日期 20(x+10)年1月1日
    maxDate: {
      type: Number,
      value: new Date(currentYear + 10, 11, 31).getTime()
    },
    // 最小小时
    minHour: {
      type: Number,
      value: 0
    },
    // 最大小时
    maxHour: {
      type: Number,
      value: 23
    },
    // 最小分钟
    minMinute: {
      type: Number,
      value: 0
    },
    // 最大分钟
    maxMinute: {
      type: Number,
      value: 59
    },
    // 自定义过滤选项的函数，返回列的选项数组
    filter: {
      type: null,
      observer (fn) {
        // 每次变化需要重置picker的filter
        this.updateFn('filter', fn)
      }
    },
    // 自定义弹出层选项文案的格式化函数，返回一个字符串
    formatter: {
      type: null,
      observer (fn) {
        // 每次变化需要重置picker的formatter
        this.updateFn('formatter', fn)
      }
    },
    // 自定义展示文案的格式化函数，返回一个字符串
    displayFormat: {
      type: null,
      observer (fn) {
        if (getType(fn) !== 'function') {
          throw Error('The type of displayFormat must be Function')
        }
        // 每次变化需要重置picker的displayFormat
        this.updateFn('displayFormat', fn)
      }
    },
    // 自定义展示文案的格式化函数，返回一个字符串
    beforeConfirm: {
      type: null,
      observer (fn) {
        if (getType(fn) !== 'function') {
          throw Error('The type of beforeConfirm must be Function')
        }
        // 每次变化需要重置picker的beforeConfirm
        this.updateFn('beforeConfirm', fn)
      }
    },
    // 自定义展示文案的格式化函数，返回一个字符串
    displayFormatTabLabel: {
      type: null,
      observer (fn) {
        if (getType(fn) !== 'function') {
          throw Error('The type of displayFormatTabLabel must be Function')
        }
        // 每次变化需要重置picker的displayFormatTabLabel
        this.updateFn('displayFormatTabLabel', fn)
      }
    },
    defaultValue: {
      type: null,
      observer (val) {
        if (getType(val) === 'array') {
          this.setData({
            innerValue: this.getDefaultInnerValue({
              isRegion: true
            }),
            endInnerValue: this.getDefaultInnerValue({
              isRegion: true,
              isEnd: true
            })
          })
        } else {
          this.setData({
            innerValue: this.getDefaultInnerValue()
          })
        }
      }
    },
    zIndex: {
      type: Number,
      value: 15
    }
  },

  data: {
    child: null,
    popupShow: false,
    tabLabel: false,
    showStart: true,
    region: false,
    showTabLabel: [],
    innerValue: '',
    endInnerValue: '',
    pickerId: 'wd-datetime-picker-view',
    pickerId1: 'wd-datetime-picker-view1',
    handleFilter: null,
    handleColumnFormatter: null,
    handleFormatter: null,
    isPicking: false, // 判断pickview是否还在滑动中
    hasConfirmed: false // 判断用户是否点击了确认按钮
  },

  methods: {
    noop () { },

    getDefaultInnerValue ({ isRegion, isEnd } = {}) {
      const { value, defaultValue } = this.data

      if (isRegion) {
        if (isEnd) {
          return value[1] || (defaultValue && defaultValue.length ? defaultValue[1] : '')
        } else {
          return value[0] || (defaultValue && defaultValue.length ? defaultValue[0] : '')
        }
      } else {
        return value || defaultValue
      }
    },

    // 对外暴露接口，打开弹框
    open () {
      this.showPopup()
    },

    // 对外暴露接口，关闭弹框
    close () {
      this.onCancel()
    },

    /**
     * @description JM小程序无法透过中间变量传递function对象，因此在此处直接设置picker中的props值
     * @param {String} key 修改的键名
     * @param {Function} fn 修改的函数主体
     */
    updateFn (key, fn) {
      this.picker && this.picker.setData({
        [key]: fn
      })

      if (this.data.region) {
        this.picker1 && this.picker1.setData({
          [key]: fn
        })
      }
    },

    /**
     * @description 展示popup，小程序有个bug，在picker-view弹出时设置value，会触发change事件，而且会将picker-view的value多次触发change重置为第一项
     */
    showPopup () {
      if (this.data.disabled || this.data.readonly) return

      this.$emit('open')
      if (this.data.region) {
        this.setData({
          popupShow: true,
          showStart: true,
          innerValue: this.getDefaultInnerValue({
            isRegion: true
          }),
          endInnerValue: this.getDefaultInnerValue({
            isRegion: true,
            isEnd: true
          })
        })
      } else {
        this.setData({
          popupShow: true,
          innerValue: this.getDefaultInnerValue()
        })
      }
      this.setShowValue(true, false)
    },

    /**
     * @description 区域选择时tab标签切换时触发
     */
    tabChange (event) {
      this.setData({
        showStart: !this.data.showStart
      })
      // 列项刷新多级联动挂载到datetimepickerView
      const picker = this.data.showStart ? this.picker : this.picker1
      picker.setData({
        columns: picker.updateColumns()
      })

      this.$emit('toggle', this.data.showStart ? this.data.innerValue : this.data.endInnerValue)
    },

    /**
     * @description datetimePickerView change 事件
     */
    onChangeStart ({ detail: { value } }) {
      this.setData({
        innerValue: value
      })
      if (this.data.region) {
        this.setData({
          showTabLabel: [this.setTabLabel(), this.data.showTabLabel[1]]
        })
        this.$emit('change', {
          value: [value, this.data.endInnerValue]
        })
        this.picker.setData({
          columns: this.picker.updateColumns()
        })
        this.picker1.setData({
          columns: this.picker1.updateColumns()
        })
      } else {
        this.$emit('change', {
          value: this.data.innerValue
        })
      }
    },

    /**
     * @description 区域选择 下方 datetimePickerView change 事件
     */
    onChangeEnd ({ detail: { value } }) {
      this.setData({
        endInnerValue: value,
        showTabLabel: [this.data.showTabLabel[0], this.setTabLabel(1)]
      })
      this.$emit('change', {
        value: [this.data.innerValue, value]
      })
      this.picker.setData({
        columns: this.picker.updateColumns()
      })
      this.picker1.setData({
        columns: this.picker1.updateColumns()
      })
    },

    /**
     * @description 点击取消按钮触发。关闭popup，触发cancel事件。
     */
    onCancel () {
      this.setData({
        popupShow: false
      })
      setTimeout(() => {
        if (this.data.region) {
          this.setData({
            innerValue: this.getDefaultInnerValue({
              isRegion: true
            }),
            endInnerValue: this.getDefaultInnerValue({
              isRegion: true,
              isEnd: true
            })
          })
        } else {
          this.setData({
            innerValue: this.getDefaultInnerValue()
          })
        }
      }, 200)

      this.$emit('cancel')
    },

    /** picker触发confirm事件，同步触发confirm事件 */
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
      if (beforeConfirm) {
        beforeConfirm(this.data.innerValue, isPass => {
          isPass && this.handleConfirm()
        }, this)
      } else {
        this.handleConfirm()
      }
    },

    onPickStart () {
      this.setData({
        isPicking: true
      })
    },

    onPickEnd () {
      this.setData({
        isPicking: false
      })

      // 延迟一会，因为组件层级嵌套过多，日期的计算时间也较长
      setTimeout(() => {
        if (this.data.hasConfirmed) {
          this.setData({
            hasConfirmed: false
          })
          this.onConfirm()
        }
      }, 50)
    },

    handleConfirm () {
      if (this.data.loading || this.data.disabled) {
        this.setData({
          popupShow: false
        })
        return
      }
      const value = this.data.region ? [this.data.innerValue, this.data.endInnerValue] : this.data.innerValue
      this.setData({
        popupShow: false,
        value
      })
      this.$emit('confirm', {
        value
      })
      this.setShowValue(false, true)
    },

    /**
     * @description 设置区域选择 tab 标签展示值
     * @param {Number} index 索引标志位，有三个有效值; 0(默认):上方picker索引; 1:下方picker索引;
     * @return {String} showTabLabel
     */
    setTabLabel (index = 0) {
      if (this.data.region) {
        const items = index === 0 ? this.picker.picker.getSelects() : this.picker1.picker.getSelects()
        return this.defaultDisplayFormat(items, true)
      }
    },

    /**
     * @description 设置展示值
     * @param {Boolean} tab 是否修改tab展示值（尽在区域选择情况下生效）
     * @param {Boolean} isConfirm 是否提交当前修改
     */
    setShowValue (tab = false, isConfirm = false) {
      const { value, region } = this.data
      if (region) {
        const items = this.picker.picker.getSelects()
        const endItems = this.picker1.picker.getSelects()
        this.setData({
          showValue: tab
            ? this.data.showValue
            : [(value[0] || isConfirm ? this.defaultDisplayFormat(items) : ''), (value[1] || isConfirm ? this.defaultDisplayFormat(endItems) : '')],
          showTabLabel: [this.defaultDisplayFormat(items, true), this.defaultDisplayFormat(endItems, true)]
        })
      } else {
        const items = this.picker.picker.getSelects()
        this.setData({
          showValue: (value || isConfirm) ? this.defaultDisplayFormat(items) : ''
        })
      }
    },

    /**
     * @description 设置展示值
     * @param {Object} items 获取到的选中项 包含 { value, label }
     * @param {Boolean} tabLabel 当前返回的是否是展示tab上的标签
     * @return {String} showValue / showTabLabel
     */
    defaultDisplayFormat (items, tabLabel = false) {
      if (items.length === 0) return ''

      if (tabLabel && this.data.displayFormatTabLabel) {
        return this.data.displayFormatTabLabel(items)
      }

      if (this.data.displayFormat) {
        return this.data.displayFormat(items)
      }

      // 如果使用了自定义的的formatter，defaultDisplayFormat无效
      if (this.data.formatter) {
        /**
         * 不建议使用 this.picker.picker.getLabels() 拉取
         * 在初始展示时，需要使用模拟 nextTick 来等待内部 pickerView 渲染后labels才可得到format后的labels
         * 但使用模拟nextTick会造成页面延迟展示问题，对用户感知来讲不友好，因此不适用该方法
         */
        const map = (items) => {
          const typeMaps = {
            datetime: ['year', 'month', 'date', 'hour', 'minute'],
            date: ['year', 'month', 'date'],
            time: ['hour', 'minute'],
            'year-month': ['year', 'month']
          }
          return items.map((item, index) => {
            return this.data.formatter(typeMaps[this.data.type][index], item.value)
          })
        }
        return map(items).join('')
      }

      switch (this.data.type) {
      case 'date':
        return `${items[0].label}-${items[1].label}-${items[2].label}`
      case 'year-month':
        return `${items[0].label}-${items[1].label}`
      case 'time':
        return `${items[0].label}:${items[1].label}`
      case 'datetime':
        return `${items[0].label}-${items[1].label}-${items[2].label} ${items[3].label}:${items[4].label}`
      }
    },

    /**
     * @description 区域选择time禁用规则，根据传入的位置标志以及日期类型 返回该节点是否禁用
     * @param {String} isStart 时间段类型 true：start | false：end
     * @param {Array} column 当前遍历到的列数组
     * @param {Number} cindex 外层column的索引（对应每一个类型）
     * @param {Number / String} value 遍历到的当前值
     * @param {Array} currentValue 当前选中的值 this.pickerValue
     * @param {Array} boundary 当前变量的限制值，决定禁用的边界值
     * @return {Boolean} disabled
     */
    columnDisabledRules (isStart, columns, cIndex, value, currentValue, boundary) {
      const { type } = this.data
      // 0年 1月 2日 3時 4分
      // startPicker 除最小值外 还需要有一个时间限制, endPicker 时间选择后, startPicker 的 添加一个时间限制boundary min->boundary
      // endPicker 除最小值外 还需要有一个时间限制, startPicker 时间选择后, endPicker 的 添加一个时间限制boundary boundary->max
      const column = columns[cIndex]
      // 根据当前选择年确认 ranges[0][0] minYear ranges[0][1] maxYear 以此类推
      if (type === 'datetime') {
        const year = boundary[0]
        const month = boundary[1]
        const date = boundary[2]
        const hour = boundary[3]
        const minute = boundary[4]

        if (column.type === 'year') {
          return isStart ? value > year : value < year
        }
        if (column.type === 'month' && currentValue[0] === year) {
          return isStart ? value > month : value < month
        }
        if (column.type === 'date' && (currentValue[0] === year && currentValue[1] === month)) {
          return isStart ? value > date : value < date
        }
        if (column.type === 'hour' && currentValue[0] === year && currentValue[1] === month && currentValue[2] === date) {
          return isStart ? value > hour : value < hour
        }
        if (column.type === 'minute' && currentValue[0] === year && currentValue[1] === month && currentValue[2] === date && currentValue[3] === hour) {
          return isStart ? value > minute : value < minute
        }
      } else if (type === 'year-month') {
        const year = boundary[0]
        const month = boundary[1]

        if (column.type === 'year') {
          return isStart ? value > year : value < year
        }
        if (column.type === 'month' && currentValue[0] === year) {
          return isStart ? value > month : value < month
        }
      } else if (type === 'date') {
        const year = boundary[0]
        const month = boundary[1]
        const date = boundary[2]

        if (column.type === 'year') {
          return isStart ? value > year : value < year
        }
        if (column.type === 'month' && currentValue[0] === year) {
          return isStart ? value > month : value < month
        }
        if (column.type === 'date' && currentValue[0] === year && currentValue[1] === month) {
          return isStart ? value > date : value < date
        }
      } else if (type === 'time') {
        const hour = boundary[0]
        const minute = boundary[1]

        if (column.type === 'hour') {
          return isStart ? value > hour : value < hour
        }
        if (column.type === 'minute' && currentValue[0] === hour) {
          return isStart ? value > minute : value < minute
        }
      }

      return false
    },

    /**
     * @description 自定义列项筛选规则，对每列单项进行禁用校验，最终返回传入PickerView的columns数组
     * @param {Component} picker datetimePickerView对象
     * @return {Array} columns
     */
    customColumnFormatter (picker) {
      const { type, innerValue, endInnerValue } = this.data
      const { startSymbol, formatter } = picker.data
      // 校准上下方picker的value值，与内部innerValue对应
      const start = picker.correctValue(innerValue)
      const end = picker.correctValue(endInnerValue)
      /**
       * 如果是上方picekr 那么将下方picker的值作为下边界
       * 如果是下方picekr 那么将上方picker的值作为上边界
       */
      const currentValue = startSymbol ? picker.getPickerValue(start, type) : picker.getPickerValue(end, type)
      const boundary = startSymbol ? picker.getPickerValue(end, type) : picker.getPickerValue(start, type)
      // 获取当前picekr中的源列数组
      const columns = picker.getOriginColumns()

      const mapColumns = (columns) => {
        // 此时index是最外层知道当前的索引即可得到当前是哪个时间段
        return columns.map((column, cIndex) => {
          return column.values.map((value, index) => {
            const disabled = this.columnDisabledRules(startSymbol, columns, cIndex, value, currentValue, boundary)
            return {
              label: formatter ? formatter(column.type, padZero(value)) : padZero(value),
              value,
              disabled
            }
          })
        })
      }
      return mapColumns(columns)
    }
  },

  beforeCreate () {
    // pickerView挂载到全局
    this.picker = this.selectComponent(`#${this.data.pickerId}`)
    this.picker1 = this.selectComponent(`#${this.data.pickerId1}`)
  },

  created () {
    const { value } = this.data

    if (getType(value) === 'array') {
      this.setData({
        region: true,
        innerValue: this.getDefaultInnerValue({
          isRegion: true
        }),
        endInnerValue: this.getDefaultInnerValue({
          isRegion: true,
          isEnd: true
        })
      })
    } else {
      this.setData({
        innerValue: this.getDefaultInnerValue()
      })
    }
    this.setShowValue(true, false)

    this.updateFn('columnFormatter', getType(value) === 'array' ? this.customColumnFormatter.bind(this) : null)
  }
})