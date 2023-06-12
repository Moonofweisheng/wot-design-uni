Page({
  data: {
    active: 0
  },
  nextStep () {
    this.setData({
      active: this.data.active + 1
    })
  }
})