import VueComponent from '../common/component'
import { debounce, getType, isDef, range, padZero } from '../common/util'
import pickerViewProps from '../pickerView/props'

// 本地时间戳
const currentYear = new Date().getFullYear()
/** @description 判断时间戳是否合法 */
const isValidDate = date => isDef(date) && !Number.isNaN(date)
/**
 * @description 生成n个元素，并使用iterator接口进行填充
 * @param n
 * @param iteratee
 * @return {any[]}
 */
const times = (n, iteratee) => {
  let index = -1
  const result = Array(n < 0 ? 0 : n)
  while (++index < n) {
    result[index] = iteratee(index)
  }
  return result
}
/**
 * @description 获取某年某月有多少天
 * @param {Number} year
 * @param {Number} month
 * @return {Number} day
 */
const getMonthEndDay = (year, month) => {
  return 32 - new Date(year, month - 1, 32).getDate()
}

VueComponent({
  /**
   * 注意，datetimePickerView和datetimePicker有公共逻辑，抽离成/mixins/datetimePickerView，通过mixins options注入
   */
  behaviors: ['jd://form-field'],

  props: {
    value: {
      type: null,
      observer (val, oldVal) {
        if (val === oldVal) return
        // 外部传入值更改时 更新picker数据
        const value = this.correctValue(val)
        this.updateColumnValue(value)
      }
    },
    ...pickerViewProps,
    // 时间选择器的类型
    type: {
      type: String,
      value: 'datetime',
      observer (target) {
        const type = ['date', 'year-month', 'time', 'datetime']
        if (type.indexOf(target) === -1) {
          throw Error(`type must be one of ${type}`)
        }
        // 每次type更新时都需要刷新整个列表
        this.updateValue()
      }
    },
    // 自定义过滤选项的函数，返回列的选项数组
    filter: {
      type: null,
      observer (fn) {
        if (getType(fn) !== 'function') {
          throw Error('The type of filter must be Function')
        }
        this.updateValue()
      }
    },
    // 自定义弹出层选项文案的格式化函数，返回一个字符串
    formatter: {
      type: null,
      observer (fn) {
        if (getType(fn) !== 'function') {
          throw Error('The type of formatter must be Function')
        }
        this.updateValue()
      }
    },
    // 自定义列筛选条件
    columnFormatter: {
      type: null,
      observer (fn) {
        if (getType(fn) !== 'function') {
          throw Error('The type of columnFormatter must be Function')
        }
        this.updateValue()
      }
    },
    // 最小日期 20(x-10)年1月1日
    minDate: {
      type: Number,
      value: new Date(currentYear - 10, 0, 1).getTime(),
      observer: 'updateValue'
    },
    // 最大日期 20(x+10)年1月1日
    maxDate: {
      type: Number,
      value: new Date(currentYear + 10, 11, 31).getTime(),
      observer: 'updateValue'
    },
    // 最小小时
    minHour: {
      type: Number,
      value: 0,
      observer: 'updateValue'
    },
    // 最大小时
    maxHour: {
      type: Number,
      value: 23,
      observer: 'updateValue'
    },
    // 最小分钟
    minMinute: {
      type: Number,
      value: 0,
      observer: 'updateValue'
    },
    // 最大分钟
    maxMinute: {
      type: Number,
      value: 59,
      observer: 'updateValue'
    },
    startSymbol: Boolean
  },

  data: {
    // pickerView的id选择器
    pickerId: 'wd-picker-view',
    // 内部保持时间戳的
    innerValue: null,
    // 传递给pickerView的columns的数据
    columns: [],
    // 传递给pickerView的value的数据
    pickerValue: null,
    // 自定义组件是否已经调用created hook
    created: false
  },

  methods: {
    /** pickerView触发change事件，同步修改pickerValue */
    onChange ({ detail }) {
      // 更新pickerView的value
      this.setData({
        pickerValue: detail.value
      })
      // pickerValue => innerValue
      // 这个地方的value返回的是picker数组，实际上在此处我们应该返回 change 的是 value date类型的值
      this.$emit('change', {
        value: this.updateInnerValue()
      })
    },
    /**
     * @description updateValue 防抖函数的占位符
     */
    updateValue () {
    },

    /**
     * @description 使用formatter格式化getOriginColumns的结果
     * @return {Array<Array<Number>>} 用于传入picker的columns
     */
    updateColumns () {
      const { formatter, columnFormatter } = this.data

      if (columnFormatter) {
        return columnFormatter(this)
      } else {
        return this.getOriginColumns().map(column => {
          return column.values.map(value => {
            return {
              label: formatter ? formatter(column.type, padZero(value)) : padZero(value),
              value
            }
          })
        })
      }
    },

    /**
     * @description 根据getRanges得到的范围计算所有的列的数据
     * @return {{values: any[], type: String}[]} 年
     */
    getOriginColumns () {
      const { filter } = this.data
      return this.getRanges().map(({ type, range }) => {
        let values = times(range[1] - range[0] + 1, index => {
          return range[0] + index
        })

        if (filter) {
          values = filter(type, values)
        }

        return {
          type,
          values
        }
      })
    },

    /**
     * @description 根据时间戳生成年月日时分的边界范围
     * @return {Array<{type:String,range:Array<Number>}>}
     */
    getRanges () {
      const { data } = this
      if (data.type === 'time') {
        return [
          {
            type: 'hour',
            range: [data.minHour, data.maxHour]
          },
          {
            type: 'minute',
            range: [data.minMinute, data.maxMinute]
          }
        ]
      }

      const {
        maxYear,
        maxDate,
        maxMonth,
        maxHour,
        maxMinute
      } = this.getBoundary('max', data.innerValue)
      const {
        minYear,
        minDate,
        minMonth,
        minHour,
        minMinute
      } = this.getBoundary('min', data.innerValue)

      const result = [
        {
          type: 'year',
          range: [minYear, maxYear]
        },
        {
          type: 'month',
          range: [minMonth, maxMonth]
        },
        {
          type: 'date',
          range: [minDate, maxDate]
        },
        {
          type: 'hour',
          range: [minHour, maxHour]
        },
        {
          type: 'minute',
          range: [minMinute, maxMinute]
        }
      ]

      if (data.type === 'date') result.splice(3, 2)
      if (data.type === 'year-month') result.splice(2, 3)
      return result
    },

    /**
     * @description 修正时间入参，判定是否为规范时间类型
     * @param {String | Number} value
     * @return {String | Number} innerValue
     */
    correctValue (value) {
      const { data } = this
      const isDateType = data.type !== 'time'
      if (isDateType && !isValidDate(value)) {
        // 是Date类型，但入参不可用，使用最小时间戳代替
        value = data.minDate
      } else if (!isDateType && !value) {
        // 非Date类型，无入参，使用最小小时代替
        const { minHour } = data
        value = `${padZero(minHour)}:00`
      }

      // 当type为time时
      if (!isDateType) {
        // 非Date类型，直接走此逻辑
        let [hour, minute] = value.split(':')
        hour = padZero(range(hour, data.minHour, data.maxHour))
        minute = padZero(range(minute, data.minMinute, data.maxMinute))
        return `${hour}:${minute}`
      }

      // date type
      value = Math.min(Math.max(value, data.minDate), data.maxDate)

      return value
    },

    /**
     * @description 根据时间戳，计算所有选项的范围
     * @param {'min'|'max'} type 类型
     * @param {Number} innerValue 时间戳
     */
    getBoundary (type, innerValue) {
      const value = new Date(innerValue)
      const boundary = new Date(this.data[`${type}Date`])
      const year = boundary.getFullYear()
      let month = 1
      let date = 1
      let hour = 0
      let minute = 0

      if (type === 'max') {
        month = 12
        date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1)
        hour = 23
        minute = 59
      }

      if (value.getFullYear() === year) {
        month = boundary.getMonth() + 1
        if (value.getMonth() + 1 === month) {
          date = boundary.getDate()
          if (value.getDate() === date) {
            hour = boundary.getHours()
            if (value.getHours() === hour) {
              minute = boundary.getMinutes()
            }
          }
        }
      }
      return {
        [`${type}Year`]: year,
        [`${type}Month`]: month,
        [`${type}Date`]: date,
        [`${type}Hour`]: hour,
        [`${type}Minute`]: minute
      }
    },

    /**
     * @description 根据传入的值和类型，获取当前的选项数组，便于传入 pickerView
     * @param value
     * @param type picker类型
     * @return {Array} pickerValue
     */
    getPickerValue (value, type) {
      const values = []
      const date = new Date(value)
      if (type === 'time') {
        const pair = value.split(':')
        values.push(parseInt(pair[0]), parseInt(pair[1]))
      } else {
        values.push(date.getFullYear(), date.getMonth() + 1)
        if (type === 'date') {
          values.push(date.getDate())
        } else if (type === 'datetime') {
          values.push(date.getDate(), date.getHours(), date.getMinutes())
        }
      }
      return values
    },

    /**
     * @description 根据传入的value以及type，初始化innerValue，期间会使用format格式化数据
     * @param value
     * @return {Array}
     */
    updateColumnValue (value) {
      const values = this.getPickerValue(value, this.data.type)
      // 更新pickerView的value,columns
      if (this.data.value !== value) {
        this.$emit('change', {
          value
        })
      }
      this.setData({
        innerValue: value,
        columns: this.updateColumns(),
        pickerValue: values
      })
    },

    /**
     * @description 根据当前的选中项 处理innerValue
     * @return {date} innerValue
     */
    updateInnerValue () {
      const { type } = this.data
      let values = ''
      let innerValue = ''
      values = this.picker.getValues()
      if (type === 'time') {
        innerValue = `${padZero(values[0])}:${padZero(values[1])}`
        return innerValue
      }

      // 处理年份 索引位0
      const year = values[0] && parseInt(values[0])

      // 处理月 索引位1
      const month = values[1] && parseInt(values[1])

      const maxDate = getMonthEndDay(year, month)

      // 处理 date 日期 索引位2
      let date = 1
      if (type !== 'year-month') {
        date = (values[2] && parseInt(values[2])) > maxDate ? maxDate : (values[2] && parseInt(values[2]))
      }

      // 处理 时分 索引位3，4
      let hour = 0
      let minute = 0

      if (type === 'datetime') {
        hour = values[3] && parseInt(values[3])
        minute = values[4] && parseInt(values[4])
      }
      const value = new Date(year, month - 1, date, hour, minute)

      innerValue = this.correctValue(value)
      return innerValue
    },

    /**
     * @description 选中项改变，多级联动
     */
    columnChange (picker) {
      const { type } = this.data
      // time 和 year-mouth 无需联动
      if (
        type === 'time' ||
        type === 'year-month'
      ) {
        return
      }
      /** 重新计算年月日时分秒，修正时间。 */
      const values = picker.getValues()
      const year = values[0]
      const month = values[1]
      const maxDate = getMonthEndDay(year, month)
      let date = values[2]
      if (type === 'year-month') {
        date = 1
      }
      date = date > maxDate ? maxDate : date
      let hour = 0
      let minute = 0
      if (type === 'datetime') {
        hour = values[3]
        minute = values[4]
      }
      const value = new Date(year, month - 1, date, hour, minute)
      /** 根据计算选中项的时间戳，重新计算所有的选项列表 */
      // 更新选中时间戳
      const innerValue = this.correctValue(value)
      // 根据innerValue获取最新的时间表，重新生成对应的数据源
      this.setData({ innerValue })
      const newColumns = this.updateColumns().slice(0, 3)
      // 深拷贝联动之前的选中项
      const selectedIndex = picker.data.selectedIndex.slice(0)
      /**
       * 选中年会修改对应的年份的月数，和月份对应的日期。
       * 选中月，会修改月份对应的日数
       */

      newColumns.forEach((columns, index) => {
        const nextColumnIndex = index + 1
        const nextColumnData = newColumns[nextColumnIndex]
        // `日`不控制任何其它列
        if (index === 2) return
        picker.setColumnData(
          nextColumnIndex,
          nextColumnData,
          (selectedIndex[nextColumnIndex] <= nextColumnData.length - 1)
            ? selectedIndex[nextColumnIndex]
            : 0
        )
      })
    },
    onPickStart () {
      this.$emit('pickstart')
    },
    onPickEnd () {
      this.$emit('pickend')
    }
  },

  beforeCreate () {
    /**
     * @description observer触发选项重计算，防抖50秒
     * 防抖函数必须要在实例初始化的时候手动挂载到this上
     */
    this.updateValue = debounce(function () {
      // 只有等created hook初始化数据之后，observer才能执行此操作
      if (!this.data.created) return
      const { data } = this
      const val = this.correctValue(this.data.value)
      const isEqual = val === data.innerValue
      if (!isEqual) {
        this.updateColumnValue(val)
      } else {
        this.setData({ columns: this.updateColumns() })
      }
    }, 50)
    // pickerView挂载到全局
    this.picker = this.selectComponent(`#${this.data.pickerId}`)
  },

  created () {
    // 小程序基础库v1.9.91无法初始化时兼容JM客户端props传入function
    const { filter, formatter, columnFormatter } = this.data
    this.setData({
      filter: filter || null,
      columnFormatter: columnFormatter || null,
      formatter: formatter || null
    })
    // 多级联动挂载到pickerView
    this.picker.setData({
      columnChange: this.columnChange.bind(this)
    })
    // 初始化完毕，打开observer触发render的开关
    this.setData({ created: true })
    // 手动进行一次render
    const innerValue = this.correctValue(this.data.value)
    this.updateColumnValue(innerValue)
  }
})