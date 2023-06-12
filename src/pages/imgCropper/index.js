Page({
  data: {
    src: '',
    imgSrc: '',
    show: false
  },
  upload () {
    const that = this
    jd.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        const tempFilePaths = res.tempFilePaths[0]
        that.setData({
          show: true,
          src: tempFilePaths
        })
      }
    })
  },
  handleConfirm (event) {
    const { tempFilePath } = event.detail
    this.setData({
      imgSrc: tempFilePath
    })
  },
  imgLoaderror (res) {
    console.log('加载失败', res)
  },
  imgLoaded (res) {
    console.log('加载成功', res)
  },
  handleCancel (event) {
    console.log('取消', event)
  }
})