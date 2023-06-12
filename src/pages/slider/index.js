Page({
  options: {
    multipleSlots: true
  },
  data: {
    sliderDisable: false,
    colorValue: 255,
    value1: 30,
    value2: 479,
    value3: 50,
    value4: 11,
    value5: 70,
    value6: [20, 40],
    value7: 0
  },
  handleChange1 ({ detail }) {
    this.setData({ value1: detail.value })
  },
  handleChange2 ({ detail }) {
    this.setData({ value2: detail.value })
  },
  handleChange3 ({ detail }) {
    this.setData({ value3: detail.value })
  },
  handleChange4 ({ detail }) {
    this.setData({ value4: detail.value })
  },
  handleChange5 ({ detail }) {
    this.setData({ value5: detail.value })
  },
  handleChange6 ({ detail }) {
    this.setData({ value6: detail.value })
  }
})