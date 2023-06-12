Page({
  data: {
    value1: 1,
    value2: 1,
    value3: 1,
    value4: 2,
    value5: 1,
    value6: '1.205',
    value7: 1,
    value8: 2,
    value9: ''
  },
  handleChange1 ({ detail }) {
    this.setData({
      value1: detail.value
    })
  },
  handleChange2 ({ detail }) {
    this.setData({
      value2: detail.value
    })
  },
  handleChange3 ({ detail }) {
    this.setData({
      value3: detail.value
    })
  },
  handleChange4 ({ detail }) {
    this.setData({
      value4: detail.value
    })
  },
  handleChange5 ({ detail }) {
    this.setData({
      value5: detail.value
    })
  },
  handleChange6 ({ detail }) {
    this.setData({
      value6: detail.value
    })
  },
  handleChange7 ({ detail }) {
    this.setData({
      value7: detail.value
    })
  },
  handleChange8 ({ detail }) {
    this.setData({
      value8: detail.value
    })
  },
  handleChange9 ({ detail }) {
    this.setData({
      value9: detail.value
    })
  }
})