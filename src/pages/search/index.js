import Toast from '../../wot-design/toast/toast'

Page({
  data: {
    value1: '',
    value2: '初始文案',
    value3: '',
    searchType: '全部',
    menu: [
      {
        content: '全部'
      }, {
        content: '订单号'
      }, {
        content: '退款单号'
      }
    ]
  },
  search (e) {
    Toast('搜索' + e.detail.value)
  },
  clear () {
    Toast('清空')
  },
  cancel () {
    Toast('取消')
  },
  change (e) {
    this.setData({
      value1: e.detail.value
    })
  },
  changeSearchType (e) {
    this.setData({
      searchType: e.detail.item.content
    })
  }
})