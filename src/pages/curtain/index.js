Page({
  data: {
    value1: false,
    value2: false,
    value3: false,
    value4: false,
    value5: false,
    value6: false,
    value7: false,
    value8: false,
    img: 'https://img20.360buyimg.com/da/jfs/t1/141592/25/8861/261559/5f68d8c1E33ed78ab/698ad655bfcfbaed.png',
    link: '/pages/index/index'
  },
  handleClick1 () {
    this.setData({
      value1: true
    })
  },
  handleClose1 () {
    this.setData({
      value1: false
    })
  },
  handleClick2 () {
    this.setData({
      value2: true
    })
  },
  handleClose2 () {
    this.setData({
      value2: false
    })
  },
  handleClick3 () {
    this.setData({
      value3: true
    })
  },
  handleClose3 () {
    this.setData({
      value3: false
    })
  },
  handleClick4 () {
    this.setData({
      value4: true
    })
  },
  handleClose4 () {
    this.setData({
      value4: false
    })
  },
  handleClick5 () {
    this.setData({
      value5: true
    })
  },
  handleClose5 () {
    this.setData({
      value5: false
    })
  },
  handleClick6 () {
    this.setData({
      value6: true
    })
  },
  handleClose6 () {
    this.setData({
      value6: false
    })
  },
  handleClick7 () {
    this.setData({
      value7: true
    })
  },
  handleClose7 () {
    this.setData({
      value7: false
    })
  },
  handleClick8 () {
    this.setData({
      value8: true
    })
  },
  handleClose8 () {
    this.setData({
      value8: false
    })
  },
  clickImg () {
    jd.navigateTo({
      url: '/pages/index/index'
    })
  }
})