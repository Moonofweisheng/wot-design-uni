import VueComponent from '../../../common/component'
import { compareDate, getMonthEndDay, getWeekRange, getDayOffset, getDayByOffset, getDateByDefaultTime } from '../../utils'
import { getType } from '../../../common/util'
import Toast from '../../../toast/toast.js'

VueComponent({
  data: {
    days: []
  },
  props: {
    type: {
      type: String,
      observer: 'setDays'
    },
    date: {
      type: Number,
      observer: 'setDays'
    },
    value: {
      type: [null, Number, Array],
      observer: 'setDays'
    },
    minDate: {
      type: Number,
      observer: 'setDays'
    },
    maxDate: {
      type: Number,
      observer: 'setDays'
    },
    firstDayOfWeek: Number,
    formatter: {
      type: null,
      observer: 'setDays'
    },
    maxRange: Number,
    rangePrompt: String,
    allowSameDay: Boolean,
    defaultTime: Array
  },
  methods: {
    setDays () {
      const days = []
      const date = new Date(this.data.date)
      const year = date.getFullYear()
      const month = date.getMonth()

      const totalDay = getMonthEndDay(year, month + 1)

      let value = this.data.value

      if ((this.data.type === 'week' || this.data.type === 'weekrange') && value) {
        value = this.getWeekValue()
      }

      for (let day = 1; day <= totalDay; day++) {
        const date = new Date(year, month, day).getTime()
        let type = this.getDayType(date, value)
        if (!type && compareDate(date, Date.now()) === 0) {
          type = 'current'
        }
        const dayObj = this.getFormatterDate(date, day, type)
        days.push(dayObj)
      }

      this.setData({
        days
      })
    },
    getDayType (date, value) {
      switch (this.data.type) {
      case 'date':
      case 'datetime':
        return this.getDateType(date)
      case 'dates':
        return this.getDatesType(date)
      case 'daterange':
      case 'datetimerange':
        return this.getDatetimeType(date, value)
      case 'week':
        return this.getWeektimeType(date, value)
      case 'weekrange':
        return this.getWeektimeType(date, value)
      default:
        return this.getDateType(date)
      }
    },
    getDateType (date) {
      if (this.data.value && compareDate(date, this.data.value) === 0) {
        return 'selected'
      }

      return ''
    },
    getDatesType (date) {
      if (!this.data.value) return ''

      let type = ''

      this.data.value.some((item) => {
        if (compareDate(date, item) === 0) {
          type = 'selected'

          return true
        }

        return false
      })

      return type
    },
    getDatetimeType (date, value) {
      const [startDate, endDate] = value || []

      if (startDate && compareDate(date, startDate) === 0) {
        if (this.data.allowSameDay && endDate && compareDate(startDate, endDate) === 0) {
          return 'same'
        }
        return 'start'
      } else if (endDate && compareDate(date, endDate) === 0) {
        return 'end'
      } else if (startDate && endDate && compareDate(date, startDate) === 1 && compareDate(date, endDate) === -1) {
        return 'middle'
      } else {
        return ''
      }
    },
    getWeektimeType (date, value) {
      const [startDate, endDate] = value || []

      if (startDate && compareDate(date, startDate) === 0) {
        return 'start'
      } else if (endDate && compareDate(date, endDate) === 0) {
        return 'end'
      } else if (startDate && endDate && compareDate(date, startDate) === 1 && compareDate(date, endDate) === -1) {
        return 'middle'
      } else {
        return ''
      }
    },
    getWeekValue () {
      if (this.data.type === 'week') {
        return getWeekRange(this.data.value, this.data.firstDayOfWeek)
      } else {
        const [startDate, endDate] = this.data.value || []

        if (startDate) {
          const firstWeekRange = getWeekRange(startDate, this.data.firstDayOfWeek)

          if (endDate) {
            const endWeekRange = getWeekRange(endDate, this.data.firstDayOfWeek)

            return [firstWeekRange[0], endWeekRange[1]]
          } else {
            return firstWeekRange
          }
        }

        return []
      }
    },
    handleDateClick (event) {
      const { index } = event.currentTarget.dataset
      const date = this.data.days[index]

      switch (this.data.type) {
      case 'date':
      case 'datetime':
        this.handleDateChange(date)
        break
      case 'dates':
        this.handleDatesChange(date)
        break
      case 'daterange':
      case 'datetimerange':
        this.handleDateRangeChange(date)
        break
      case 'week':
        this.handleWeekChange(date)
        break
      case 'weekrange':
        this.handleWeekRangeChange(date)
        break
      default:
        this.handleDateChange(date)
      }
    },
    getDate (date, isEnd) {
      date = this.data.defaultTime && this.data.defaultTime.length > 0
        ? getDateByDefaultTime(date, isEnd ? this.data.defaultTime[1] : this.data.defaultTime[0])
        : date

      if (date < this.data.minDate) return this.data.minDate

      if (date > this.data.maxDate) return this.data.maxDate

      return date
    },
    handleDateChange (date) {
      if (date.disabled) return

      if (date.type !== 'selected') {
        this.$emit('change', {
          value: this.getDate(date.date),
          type: 'start'
        })
      }
    },
    handleDatesChange (date) {
      if (date.disabled) return

      const value = this.data.value || []
      if (date.type !== 'selected') {
        value.push(this.getDate(date.date))
      } else {
        value.splice(value.indexOf(date.date), 1)
      }
      this.$emit('change', {
        value
      })
    },
    handleDateRangeChange (date) {
      if (date.disabled) return

      let value
      let type
      const [startDate, endDate] = this.data.value || []
      const compare = compareDate(date.date, startDate)

      // 禁止选择同个日期
      if (!this.data.allowSameDay && compare === 0 && (this.data.type === 'daterange' || this.data.type === 'datetimerange') && !endDate) {
        return
      }

      if (startDate && !endDate && compare > -1) {
        // 不能选择超过最大范围的日期
        if (this.data.maxRange && getDayOffset(date.date, startDate) > this.data.maxRange) {
          const maxEndDate = getDayByOffset(startDate, this.data.maxRange - 1)
          value = [startDate, this.getDate(maxEndDate, true)]
          Toast({
            msg: this.data.rangePrompt || `选择天数不能超过${this.data.maxRange}天`,
            context: this
          })
        } else {
          value = [startDate, this.getDate(date.date, true)]
        }
      } else if (this.data.type === 'datetimerange' && startDate && endDate) {
        // 时间范围类型，且有开始时间和结束时间，需要支持重新点击开始日期和结束日期可以重新修改时间
        if (compare === 0) {
          type = 'start'
          value = this.data.value
        } else if (compareDate(date.date, endDate) === 0) {
          type = 'end'
          value = this.data.value
        } else {
          value = [this.getDate(date.date), null]
        }
      } else {
        value = [this.getDate(date.date), null]
      }

      this.$emit('change', {
        value,
        type: type || (value[1] ? 'end' : 'start')
      })
    },
    handleWeekChange (date) {
      const [weekStart] = getWeekRange(date.date, this.data.firstDayOfWeek)

      // 周的第一天如果是禁用状态，则不可选中
      if (this.getFormatterDate(weekStart, new Date(weekStart).getDate()).disabled) return

      this.$emit('change', {
        value: this.getDate(weekStart) + 24 * 60 * 60 * 1000
      })
    },
    handleWeekRangeChange (date) {
      const [weekStartDate] = getWeekRange(date.date, this.data.firstDayOfWeek)

      // 周的第一天如果是禁用状态，则不可选中
      if (this.getFormatterDate(weekStartDate, new Date(weekStartDate).getDate()).disabled) return

      let value
      const [startDate, endDate] = this.data.value || []
      const [startWeekStartDate] = startDate ? getWeekRange(startDate, this.data.firstDayOfWeek) : []
      const compare = compareDate(weekStartDate, startWeekStartDate)

      if (startDate && !endDate && compare > -1) {
        if (!this.data.allowSameDay && compare === 0) return

        value = [this.getDate(startWeekStartDate) + 24 * 60 * 60 * 1000, this.getDate(weekStartDate) + 24 * 60 * 60 * 1000]
      } else {
        value = [this.getDate(weekStartDate) + 24 * 60 * 60 * 1000, null]
      }

      this.$emit('change', {
        value
      })
    },
    getFormatterDate (date, day, type) {
      let dayObj = {
        date: date,
        text: day,
        topInfo: '',
        bottomInfo: '',
        type,
        disabled: compareDate(date, this.data.minDate) === -1 || compareDate(date, this.data.maxDate) === 1
      }
      if (this.data.formatter) {
        if (getType(this.data.formatter) === 'function') {
          dayObj = this.data.formatter(dayObj)
        } else {
          console.error('[wot-design] error(wd-calendar-view): the formatter prop of wd-calendar-view should be a function')
        }
      }

      return dayObj
    }
  }
})