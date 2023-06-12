Page({
  data: {
    value: 1,
    value0: 1,
    value1: 1,
    value2: 1,
    value3: 1,
    value4: 1,
    value5: 1,
    value6: 1,
    value7: 1,
    value8: 1,
    value9: 1,
    value10: 1,
    value11: 1
  },
  change (event) {
    const index = event.target.dataset.index
    this.setData({
      [`value${index}`]: event.detail.value
    })
  }
})