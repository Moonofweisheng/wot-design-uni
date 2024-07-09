import * as functionIndex from './libs/function/index'
import * as test from './libs/function/test'

const $wd = {
  ...functionIndex,
  test,
  // #ifdef MP-WEIXIN
  pageHidden() {
    wx.setPageStyle({
      style: {
        overflow: 'hidden'
      }
    })
  },
  pageVisible() {
    wx.setPageStyle({
      style: {
        overflow: 'visible'
      }
    })
  }
  // #endif
}

uni.$wd = $wd

const install = (Vue, options = {}) => {
  // #ifdef VUE3
  Vue.config.globalProperties.$wd = $wd
  // #endif
}

export default {
  install
}
