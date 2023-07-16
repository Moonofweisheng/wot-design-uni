import VueComponent from '../../../common/component'
import { compareMonth, getMonthOffset, getMonthByOffset, getDateByDefaultTime } from '../../utils'
import { getType } from '../../../common/util'
import Toast from '../../../toast/toast.js'

VueComponent({
  data: {
    months: []
  },
  props: {
    type: {
      type: String,
      observer: 'setMonths'
    },
    date: {
      type: Number,
      observer: 'setMonths'
    },
    value: {
      type: [null, Number, Array],
      observer: 'setMonths'
    },
    minDate: {
      type: Number,
      observer: 'setMonths'
    },
    maxDate: {
      type: Number,
      observer: 'setMonths'
    },
    formatter: {
      type: null,
      observer: 'setMonths'
    },
    maxRange: Number,
    rangePrompt: String,
    allowSameDay: Boolean,
    defaultTime: Array
  },
  methods: {
    setMonths () {
      const months = []
      const date = new Date(this.data.date)
      const year = date.getFullYear()

      const value = this.data.value
      const valueType = getType(value)

      if (this.data.type.indexOf('range') > -1 && value && valueType !== 'array') {
        console.error('[wot-design] value should be array when type is range')
        return
      }

      for (let month = 0; month < 12; month++) {
        const date = new Date(year, month, 1).getTime()
        let type = this.getMonthType(date, value)
        if (!type && compareMonth(date, Date.now()) === 0) {
          type = 'current'
        }
        const monthObj = this.getFormatterDate(date, month, type)
        months.push(monthObj)
      }

      this.setData({
        months
      })
    },
    getMonthType (date) {
      if (this.data.type === 'monthrange') {
        const [startDate, endDate] = this.data.value || []

        if (startDate && compareMonth(date, startDate) === 0) {
          if (endDate && compareMonth(startDate, endDate) === 0) {
            return 'same'
          }
          return 'start'
        } else if (endDate && compareMonth(date, endDate) === 0) {
          return 'end'
        } else if (startDate && endDate && compareMonth(date, startDate) === 1 && compareMonth(date, endDate) === -1) {
          return 'middle'
        } else {
          return ''
        }
      } else {
        if (this.data.value && compareMonth(date, this.data.value) === 0) {
          return 'selected'
        } else {
          return ''
        }
      }
    },
    handleDateClick (event) {
      const { index } = event.currentTarget.dataset
      const date = this.data.months[index]

      if (date.disabled) return

      switch (this.data.type) {
      case 'month':
        this.handleMonthChange(date)
        break
      case 'monthrange':
        this.handleMonthRangeChange(date)
        break
      default:
        this.handleMonthChange(date)
      }
    },
    getDate (date) {
      return this.data.defaultTime && this.data.defaultTime.length > 0 ? getDateByDefaultTime(date, this.data.defaultTime[0]) : date
    },
    handleMonthChange (date) {
      if (date.type !== 'selected') {
        this.$emit('change', {
          value: this.getDate(date.date)
        })
      }
    },
    handleMonthRangeChange (date) {
      let value
      const [startDate, endDate] = this.data.value || []
      const compare = compareMonth(date.date, startDate)

      // 禁止选择同个日期
      if (!this.data.allowSameDay && !endDate && compare === 0) return

      if (startDate && !endDate && compare > -1) {
        if (this.data.maxRange && getMonthOffset(date.date, startDate) > this.data.maxRange) {
          const maxEndDate = getMonthByOffset(startDate, this.data.maxRange - 1)
          value = [startDate, this.getDate(maxEndDate)]
          Toast({
            msg: this.data.rangePrompt || `选择月份不能超过${this.data.maxRange}个月`,
            context: this
          })
        } else {
          value = [startDate, this.getDate(date.date)]
        }
      } else {
        value = [this.getDate(date.date), null]
      }
      this.$emit('change', {
        value
      })
    },
    getFormatterDate (date, month, type) {
      let monthObj = {
        date: date,
        text: month + 1,
        topInfo: '',
        bottomInfo: '',
        type,
        disabled: compareMonth(date, this.data.minDate) === -1 || compareMonth(date, this.data.maxDate) === 1
      }
      if (this.data.formatter) {
        if (getType(this.data.formatter) === 'function') {
          monthObj = this.data.formatter(monthObj)
        } else {
          console.error('[wot-design] error(wd-calendar-view): the formatter prop of wd-calendar-view should be a function')
        }
      }

      return monthObj
    }
  }
})