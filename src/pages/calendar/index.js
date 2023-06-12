import dayjs from '../../wot-design/common/dayjs.min.js'
import Toast from '../../wot-design/toast/toast.js'

Page({
  data: {
    value1: Date.now(),
    value2: [Date.now() - 24 * 60 * 60 * 1000 * 3, Date.now()],
    value3: [],
    value4: Date.now(),
    value5: [Date.now() - 24 * 60 * 60 * 1000 * 3, Date.now() - 24 * 60 * 60 * 1000],
    value6: Date.now(),
    value7: Date.now(),
    value8: [Date.now() - 24 * 60 * 60 * 1000 * 14, Date.now()],
    value9: [Date.now() - 24 * 60 * 60 * 1000 * 33, Date.now()],
    value10: Date.now(),
    value11: [Date.now() - 24 * 60 * 60 * 1000 * 3, Date.now()],
    value12: '',
    value13: [Date.now() - 24 * 60 * 60 * 1000 * 3, Date.now()],
    value14: '',
    formatValue: '',
    formatter: function (day) {
      const date = new Date(day.date)
      const now = new Date()

      const year = date.getFullYear()
      const month = date.getMonth()
      const da = date.getDate()
      const nowYear = now.getFullYear()
      const nowMonth = now.getMonth()
      const nowDa = now.getDate()

      if (year === nowYear && month === nowMonth && da === nowDa) {
        day.topInfo = '今天'
      }

      if (month === 5 && da === 18) {
        day.topInfo = '618大促'
      }

      if (month === 10 && da === 11) {
        day.topInfo = '京东双11'
      }

      if (day.type === 'start') {
        day.bottomInfo = '开始'
      }

      if (day.type === 'end') {
        day.bottomInfo = '结束'
      }

      if (day.type === 'same') {
        day.bottomInfo = '开始/结束'
      }

      return day
    },
    shortcuts: [
      {
        text: '近7天',
        id: 7
      }, {
        text: '近15天',
        id: 15
      }, {
        text: '近30天',
        id: 30
      }
    ],
    onShortcutsClick ({ item }) {
      const dayDiff = item.id
      const endDate = Date.now() - 24 * 60 * 60 * 1000
      const startDate = endDate - dayDiff * 24 * 60 * 60 * 1000

      return [startDate, endDate]
    },
    displayFormat (value) {
      return dayjs(value[0]).format('YY年MM月DD日') + ' - ' + dayjs(value[1]).format('YY年MM月DD日')
    },
    innerDisplayFormat (value, rangeType) {
      if (!value) {
        return rangeType === 'start' ? '活动开始时间' : '活动结束时间'
      }

      return dayjs(value).format('YY年MM月DD日')
    },
    beforeConfirm ({ value, resolve }) {
      if (value > Date.now()) {
        Toast.error('该日期暂无数据')
        resolve(false)
      } else {
        resolve(true)
      }
    }
  },
  handleConfirm1 (event) {
    this.setData({
      value1: event.detail.value
    })
  },
  handleConfirm2 (event) {
    this.setData({
      value2: event.detail.value
    })
  },
  handleConfirm3 (event) {
    this.setData({
      value12: event.detail.value
    })
  },
  handleConfirm4 (event) {
    this.setData({
      formatValue: new Date(event.detail.value).toString()
    })
  }
})