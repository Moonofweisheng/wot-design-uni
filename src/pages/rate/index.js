Page({
  data: {
    value1: 5,
    value2: 3
  },
  changeValue1 ({ detail }) {
    this.setData({ value1: detail.value })
  },
  changeValue2 ({ detail }) {
    this.setData({ value2: detail.value })
  }
})