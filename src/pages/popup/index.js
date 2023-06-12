Page({
  data: {
    show1: false,
    show2: false,
    show3: false,
    show4: false,
    show5: false,
    show6: false
  },
  handleClick1 () {
    this.setData({
      show1: true
    })
  },
  handleClose1 () {
    this.setData({
      show1: false
    })
  },
  handleClick2 () {
    this.setData({
      show2: true
    })
  },
  handleClose2 () {
    this.setData({
      show2: false
    })
  },
  handleClick3 () {
    this.setData({
      show3: true
    })
  },
  handleClose3 () {
    this.setData({
      show3: false
    })
  },
  handleClick4 () {
    this.setData({
      show4: true
    })
  },
  handleClose4 () {
    this.setData({
      show4: false
    })
  },
  handleClick5 () {
    this.setData({
      show5: true
    })
  },
  handleClose5 () {
    this.setData({
      show5: false
    })
  },
  handleClick6 () {
    this.setData({
      show6: true
    })
  },
  handleClose6 () {
    this.setData({
      show6: false
    })
  }
})