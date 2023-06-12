import Toast from '../../wot-design/toast/toast'
import clickoutside from '../../wot-design/common/clickoutside'

Page({
  data: {
    show1: false,
    show2: false,
    show3: false,
    show4: false,
    show5: false,
    show6: false,
    show7: false,
    show8: false,
    show9: false,
    show10: false,
    show11: false,
    show12: false,
    show13: false,
    show14: false,
    show15: false,
    show16: false,
    show17: false,
    content: '显示内容'
  },

  control () {
    this.setData({ show15: !this.data.show15 })
  },

  onShow () {
    console.log('显示')
  },

  onHide () {
    Toast('文字提示关闭')
  },

  handleChange1 (event) {
    this.setData({ show1: event.detail.show })
  },

  handleChange2 (event) {
    this.setData({ show2: event.detail.show })
  },

  handleChange3 (event) {
    this.setData({ show3: event.detail.show })
  },

  handleChange4 (event) {
    this.setData({ show4: event.detail.show })
  },

  handleChange5 (event) {
    this.setData({ show5: event.detail.show })
  },

  handleChange6 (event) {
    this.setData({ show6: event.detail.show })
  },

  handleChange7 (event) {
    this.setData({ show7: event.detail.show })
  },

  handleChange8 (event) {
    this.setData({ show8: event.detail.show })
  },

  handleChange9 (event) {
    this.setData({ show9: event.detail.show })
  },

  handleChange10 (event) {
    this.setData({ show10: event.detail.show })
  },

  handleChange11 (event) {
    this.setData({ show11: event.detail.show })
  },

  handleChange12 (event) {
    this.setData({ show12: event.detail.show })
  },

  handleChange13 (event) {
    this.setData({ show13: event.detail.show })
  },

  handleChange14 (event) {
    this.setData({ show14: event.detail.show })
  },

  handleChange15 (event) {
    this.setData({ show15: event.detail.show })
  },

  handleChange16 (event) {
    this.setData({ show16: event.detail.show })
  },

  handleChange17 (event) {
    this.setData({ show17: event.detail.show })
  },

  clickoutside (event) {
    console.log(event)
    clickoutside()
  }
})