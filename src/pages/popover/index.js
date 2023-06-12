import Toast from '../../wot-design/toast/toast'

Page({
  data: {
    show: false,
    show1: false,
    show2: false,
    show3: false,
    menu: [
      {
        iconClass: 'read',
        content: '全部标记已读'
      },
      {
        iconClass: 'delete',
        content: '清空最近会话'
      },
      {
        iconClass: 'detection',
        content: '消息订阅设置'
      },
      {
        iconClass: 'subscribe',
        content: '消息异常检测'
      }
    ]
  },

  link ({ detail: { item } }) {
    Toast('选择了' + item.content)
  },

  clickOutside () {
    this.closeOtherPop()
  },

  closeOtherPop () {
    if (this.pop && this.pop.data.show) {
      this.pop.close()
      this.pop = null
    }
  },

  showPop (event) {
    const id = event.currentTarget.dataset.id
    if (this.pop && (this.pop.id !== id)) {
      this.closeOtherPop()
    }
    this.pop = this.selectComponent('#' + id)
  },

  handleChange1 (event) {
    this.setData({
      show1: event.detail.show
    })
  },

  handleChange2 (event) {
    this.setData({
      show2: event.detail.show
    })
  },

  handleChange3 (event) {
    this.setData({
      show3: event.detail.show
    })
  }
})