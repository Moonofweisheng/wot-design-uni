Page({
  options: {
    multipleSlots: true
  },
  data: {
    value1: ['item1'],
    value2: 'item1',
    value3: ['item1'],
    value4: false,
    value5: false,
    value6: false,
    accordion: true,
    name: 'item1'
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
  }
})