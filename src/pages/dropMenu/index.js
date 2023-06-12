import clickoutside from '../../wot-design/common/clickoutside'

Page({
  data: {
    show: false,
    value1: 1,
    value2: 0,
    value3: 0,
    value4: 0,
    value5: 0,
    value6: 0,
    value7: 0,
    value8: 0,
    value9: 0,
    option1: [
      { label: '全部商品', value: 0 },
      { label: '新款商品', value: 1, tip: '这是补充信息' },
      { label: '这是比较长的筛选条件这是比较长的筛选条件', value: 2 }
    ],
    option2: [
      { label: '综合', value: 0 },
      { label: '销量', value: 1 },
      { label: '上架时间', value: 2 }
    ]
  },
  clickOutside: clickoutside,
  handleChange1 ({ detail }) {
    this.setData({
      value1: detail.value
    })
  },
  handleChange2 ({ detail }) {
    this.setData({
      value2: detail.value
    })
  },
  handleChange3 ({ detail }) {
    this.setData({
      value3: detail.value
    })
  },
  handleChange4 ({ detail }) {
    this.setData({
      value4: detail.value
    })
  },
  handleChange5 ({ detail }) {
    this.setData({
      value5: detail.value
    })
  },
  handleChange6 ({ detail }) {
    this.setData({
      value6: detail.value
    })
  },
  handleChange7 ({ detail }) {
    this.setData({
      value7: detail.value
    })
  },
  handleChange8 ({ detail }) {
    this.setData({
      value8: detail.value
    })
  },
  handleChange9 ({ detail }) {
    this.setData({
      value9: detail.value
    })
  },
  confirm () {
    // 关闭下拉框
    const drop = this.selectComponent('#drop-menu')
    drop.close()
  }
})