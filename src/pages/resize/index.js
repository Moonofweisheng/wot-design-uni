Page({
  data: {
    width: '',
    height: '',
    lastWidth: '',
    lastHeight: '',
    lastTop: '',
    lastRight: '',
    lastBottom: '',
    lastLeft: '',
    sizeWidth: '',
    sizeHeight: '',
    sizeTop: '',
    sizeRight: '',
    sizeBottom: '',
    sizeLeft: ''
  },
  handleResize ({ detail }) {
    const { height, width, top, right, bottom, left } = detail
    const { sizeWidth, sizeHeight, sizeTop, sizeRight, sizeBottom, sizeLeft } = this.data
    this.setData({
      lastWidth: sizeWidth,
      lastHeight: sizeHeight,
      lastTop: sizeTop,
      lastRight: sizeRight,
      lastBottom: sizeBottom,
      lastLeft: sizeLeft,
      sizeHeight: height,
      sizeWidth: width,
      sizeTop: top,
      sizeRight: right,
      sizeBottom: bottom,
      sizeLeft: left
    })
  },
  onReady () {
    setTimeout(() => {
      this.setData({
        width: '100px',
        height: '100px'
      })
    }, 1500)
  }
})