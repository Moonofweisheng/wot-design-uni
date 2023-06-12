Page({
  data: {
    page1: 1,
    total1: 190,
    page2: 1,
    total2: 19,
    page3: 1,
    total3: 160,
    pageSize3: 20
  },
  handleChange1 ({ detail }) {
    this.setData({
      page1: detail.value
    })
  },
  handleChange2 ({ detail }) {
    this.setData({
      page2: detail.value
    })
  },
  handleChange3 ({ detail }) {
    this.setData({
      page3: detail.value
    })
  }
})