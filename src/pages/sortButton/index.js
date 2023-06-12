Page({
  data: {
    value1: 0,
    value2: 0,
    value3: 0,
    value4: 0
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
  },
  handleChange4 (event) {
    this.setData({
      value4: event.detail.value
    })
  }
})