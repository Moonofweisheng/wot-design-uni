Page({
  data: {
    state: 'loading',
    num: 0,
    max: 60
  },
  onReachBottom () {
    const { num, max } = this.data
    if (num === 45) {
      this.setData({
        state: 'error'
      })
    } else if (num < max) {
      this.loadmore()
    } else if (num === max) {
      this.setData({
        state: 'finished'
      })
    }
  },
  loadmore () {
    const { num } = this.data
    setTimeout(() => {
      this.setData({
        num: num + 15,
        state: 'loading'
      })
    }, 200)
  },
  onLoad () {
    this.loadmore()
  }
})