import VueComponent from '../common/component'
import { isEqual, padZero } from '../common/util'
import { getDefaultTime, getWeekNumber } from '../calendarView/utils'
import cell from '../mixins/cell'
import dayjs from '../common/dayjs.min'

const current = new Date()
const currentYear = current.getFullYear()
const currentMonth = current.getMonth()
const currentDay = current.getDate()

const defaultDisplayFormat = (value, type) => {
  switch (type) {
    case 'date':
      return dayjs(value).format('YYYY-MM-DD')
    case 'dates':
      return value
        .map((item) => {
          return dayjs(item).format('YYYY-MM-DD')
        })
        .join(', ')
    case 'daterange':
      return `${value[0] ? dayjs(value[0]).format('YYYY-MM-DD') : '开始时间'} 至 ${value[1] ? dayjs(value[1]).format('YYYY-MM-DD') : '结束时间'}`
    case 'datetime':
      return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
    case 'datetimerange':
      return `${value[0] ? dayjs(value[0]).format('YY年MM月DD日 HH:mm:ss') : '开始时间'} 至\n${
        value[1] ? dayjs(value[1]).format('YY年MM月DD日 HH:mm:ss') : '结束时间'
      }`
    case 'week': {
      const year = new Date(value).getFullYear()
      const week = getWeekNumber(value)
      return `${year} 第 ${padZero(week)} 周`
    }
    case 'weekrange': {
      const year1 = new Date(value[0]).getFullYear()
      const week1 = getWeekNumber(value[0])
      const year2 = new Date(value[1]).getFullYear()
      const week2 = getWeekNumber(value[1])
      return `${value[0] ? `${year1} 第 ${padZero(week1)} 周` : '开始周'} - ${value[1] ? `${year2} 第 ${padZero(week2)} 周` : '结束周'}`
    }
    case 'month':
      return dayjs(value).format('YYYY / MM')
    case 'monthrange':
      return `${value[0] ? dayjs(value[0]).format('YYYY / MM') : '开始月'} 至 ${value[1] ? dayjs(value[1]).format('YYYY / MM') : '结束月'}`
  }
}

const formatRange = (value, rangeType, type) => {
  switch (type) {
    case 'daterange':
      if (!value) {
        return rangeType === 'end' ? '结束时间' : '开始时间'
      }
      return dayjs(value).format('YYYY年MM月DD日')
    case 'datetimerange':
      if (!value) {
        return rangeType === 'end' ? '结束时间' : '开始时间'
      }
      return dayjs(value).format('YY年MM月DD日 HH:mm:ss')
    case 'weekrange': {
      if (!value) {
        return rangeType === 'end' ? '结束周' : '开始周'
      }
      const date = new Date(value)
      const year = date.getFullYear()
      const week = getWeekNumber(value)
      return year + '年第' + week + '周'
    }
    case 'monthrange':
      if (!value) {
        return rangeType === 'end' ? '结束月' : '开始月'
      }
      return dayjs(value).format('YYYY年MM月')
  }
}

VueComponent({
  externalClasses: ['custom-view-class', 'custom-label-class', 'custom-value-class'],
  behaviors: [cell, 'jd://form-field'],
  relations: {
    '../cellGroup/index': {
      type: 'ancestor',
      linked(target) {
        this.parent = target
      },
      unlinked() {
        this.parent = null
      }
    }
  },
  props: {
    value: {
      type: [null, Number, Array],
      observer(val, oldVal) {
        if (isEqual(val, oldVal)) return

        this.setData(
          {
            calendarValue: val,
            confirmBtnDisabled: this.getConfirmBtnStatus(val)
          },
          () => {
            this.scrollIntoView()
          }
        )

        this.setShowValue()

        if (this.data.type.indexOf('range') > -1) {
          this.setInnerLabel()
        }
      }
    },
    type: {
      type: String,
      value: 'date',
      observer(val) {
        if (this.data.showTypeSwitch) {
          const tabs = ['date', 'week', 'month']
          const rangeTabs = ['daterange', 'weekrange', 'monthrange']

          const index = val.indexOf('range') > -1 ? rangeTabs.indexOf(val) || 0 : tabs.indexOf(val)
          this.setData({
            currentTab: index
          })
        }

        this.setData({
          panelHeight: this.data.showConfirm ? 338 : 400,
          currentType: val
        })

        if (this.data.type.indexOf('range') > -1) {
          this.setInnerLabel()
        }
      }
    },
    minDate: {
      type: Number,
      value: new Date(currentYear, currentMonth - 6, currentDay).getTime()
    },
    maxDate: {
      type: Number,
      value: new Date(currentYear, currentMonth + 6, currentDay, 23, 59, 59).getTime()
    },
    firstDayOfWeek: {
      type: Number,
      value: 0
    },
    formatter: null,
    maxRange: Number,
    rangePrompt: String,
    allowSameDay: Boolean,
    defaultTime: {
      type: [String, Array],
      observer(val) {
        this.setData({
          formatDefauleTime: getDefaultTime(val)
        })
      }
    },
    timeFilter: null,
    hideSecond: Boolean,
    label: String,
    labelWidth: String,
    useLabelSlot: Boolean,
    useDefaultSlot: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    placeholder: String,
    title: String,
    alignRight: Boolean,
    error: Boolean,
    required: Boolean,
    size: String,
    center: Boolean,
    closeOnClickModal: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 15
    },
    showConfirm: {
      type: Boolean,
      value: true,
      observer(val) {
        this.setData({
          panelHeight: val ? 338 : 400
        })
      }
    },
    confirmText: String,
    displayFormat: null,
    innerDisplayFormat: null,
    ellipsis: Boolean,
    showTypeSwitch: Boolean,
    shortcuts: Array,
    onShortcutsClick: null,
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    },
    beforeConfirm: null
  },
  data: {
    pickerShow: false,
    calendarValue: '',
    lastCalendarValue: '',
    panelHeight: 338,
    confirmBtnDisabled: true,
    showValue: '',
    currentTab: 0,
    lastTab: 0,
    currentType: 'date',
    lastCurrentType: 'date',
    inited: false,
    rangeLabel: []
  },
  methods: {
    scrollIntoView() {
      const calendarView = this.selectComponent('#calendarView')
      calendarView && calendarView.scrollIntoView()
    },
    // 对外暴露方法
    open() {
      const { disabled, readonly } = this.data

      if (disabled || readonly) return

      this.setData(
        {
          inited: true,
          pickerShow: true,
          lastCalendarValue: this.data.calendarValue,
          lastTab: this.data.currentTab,
          lastCurrentType: this.data.currentType
        },
        () => {
          setTimeout(() => {
            this.scrollIntoView()

            if (this.data.showTypeSwitch) {
              const tab = this.selectComponent('#tabs')
              tab.scrollIntoView()
              tab.updateLineStyle(false)
            }
          }, 250)
        }
      )
    },
    // 对外暴露方法
    close() {
      this.setData({
        pickerShow: false
      })
      setTimeout(() => {
        const confirmBtnDisabled = this.getConfirmBtnStatus(this.data.lastCalendarValue)

        this.setData({
          calendarValue: this.data.lastCalendarValue,
          currentTab: this.data.lastTab,
          currentType: this.data.lastCurrentType,
          confirmBtnDisabled
        })
      }, 250)
      this.$emit('cancel')
    },
    handleTypeChange({ detail: { index } }) {
      const tabs = ['date', 'week', 'month']
      const rangeTabs = ['daterange', 'weekrange', 'monthrange']
      const type = this.data.type.indexOf('range') > -1 ? rangeTabs[index] : tabs[index]

      this.setData({
        currentTab: index,
        currentType: type
      })
    },
    getConfirmBtnStatus(value) {
      let confirmBtnDisabled = false
      // 范围选择未选择满，或者多日期选择未选择日期，按钮置灰不可点击
      if (
        (this.data.type.indexOf('range') > -1 && (!value[0] || !value[1] || !value)) ||
        (this.data.type === 'dates' && (value.length === 0 || !value)) ||
        !value
      ) {
        confirmBtnDisabled = true
      }

      return confirmBtnDisabled
    },
    handleChange({ detail: { value } }) {
      const confirmBtnDisabled = this.getConfirmBtnStatus(value)
      this.setData({
        calendarValue: value,
        confirmBtnDisabled
      })

      this.$emit('change', {
        value
      })

      if (this.data.type.indexOf('range') > -1) {
        this.setInnerLabel()
      }

      if (!this.data.showConfirm && !confirmBtnDisabled) {
        this.handleConfirm()
      }
    },
    handleConfirm() {
      if (this.data.beforeConfirm) {
        this.data.beforeConfirm({
          value: this.data.calendarValue,
          resolve: (isPass) => {
            isPass && this.onConfirm()
          }
        })
      } else {
        this.onConfirm()
      }
    },
    onConfirm() {
      this.setData({
        pickerShow: false,
        value: this.data.calendarValue
      })
      this.$emit('confirm', {
        value: this.data.calendarValue
      })
      this.setShowValue()
    },
    setInnerLabel() {
      const [start, end] = this.data.calendarValue || []
      this.setData({
        rangeLabel: [start, end].map((item, index) => {
          return (this.data.innerDisplayFormat || formatRange)(item, index === 0 ? 'start' : 'end', this.data.currentType)
        })
      })
    },
    setShowValue() {
      if (
        (!(this.data.calendarValue instanceof Array) && this.data.calendarValue) ||
        (this.data.calendarValue instanceof Array && this.data.calendarValue.length)
      ) {
        this.setData({
          showValue: (this.data.displayFormat || defaultDisplayFormat)(this.data.calendarValue, this.data.currentType)
        })
      } else {
        this.setData({
          showValue: ''
        })
      }
    },
    handleShortcutClick(event) {
      const { index } = event.target.dataset

      if (this.data.onShortcutsClick && typeof this.data.onShortcutsClick === 'function') {
        const calendarValue = this.data.onShortcutsClick({
          item: this.data.shortcuts[index],
          index
        })
        const confirmBtnDisabled = this.getConfirmBtnStatus(calendarValue)
        this.setData({
          calendarValue,
          confirmBtnDisabled
        })
      }

      if (!this.data.showConfirm) {
        this.handleConfirm()
      }
    }
  }
})
