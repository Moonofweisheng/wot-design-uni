Page({
  data: {
    value1: '京麦',
    value2: [1]
  },
  handleChange1 ({ detail }) {
    this.setData({
      value1: detail.value
    })
  }
})