Page({
  data: {
    type1: 'date',
    type2: 'daterange',
    minDate: Date.now(),
    value1: Date.now(),
    value2: '',
    value3: [Date.now() - 24 * 60 * 60 * 1000 * 33, Date.now()],
    value4: Date.now(),
    value5: [Date.now() - 24 * 60 * 60 * 1000 * 3, Date.now() - 24 * 60 * 60 * 1000],
    value6: [Date.now() - 24 * 60 * 60 * 1000 * 3, Date.now() - 24 * 60 * 60 * 1000],
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
    }
  },
  handleTypeChange1 (event) {
    this.setData({
      type1: event.detail.value
    })
  },
  handleTypeChange2 (event) {
    this.setData({
      type2: event.detail.value
    })
  },
  handleChange1 (event) {
    this.setData({
      value1: event.detail.value
    })
  },
  handleChange2 (event) {
    this.setData({
      value2: event.detail.value
    })
  },
  handleChange3 (event) {
    this.setData({
      value3: event.detail.value
    })
  }
})