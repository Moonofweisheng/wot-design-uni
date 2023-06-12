import Toast from '../../wot-design/toast/toast'
Page({
  data: {
    rate: 0,
    slider: 0,
    value: true
  },
  toast () {
    Toast('点击')
  },
  handleRateChange ({ detail }) {
    this.setData({
      rate: detail
    })
  },
  handleSliderChange ({ detail }) {
    this.setData({
      slider: detail
    })
  },
  handleSwitchChange ({ detail }) {
    this.setData({
      switch: detail
    })
  }
})