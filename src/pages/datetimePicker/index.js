import Toast from '../../wot-design/toast/toast.js'

Page({
  data: {
    type: 'date',
    value1: '',
    value2: Date.now(),
    value3: Date.now(),
    value4: '09:20',
    value5: Date.now(),
    value6: Date.now(),
    value7: Date.now(),
    value8: Date.now(),
    value9: Date.now(),
    value10: Date.now(),
    value11: '',
    value12: '',
    value13: Date.now(),
    value14: [],
    value15: ['', Date.now()],
    defaultValue: [Date.now() - 24 * 60 * 60 * 1000, Date.now()],
    showstart: false,
    formatter (type, value) {
      switch (type) {
      case 'year':
        return value + '年'
      case 'month':
        return value + '月'
      case 'date':
        return value + '日'
      case 'hour':
        return value + '时'
      case 'minute':
        return value + '分'
      default:
        return value
      }
    },
    filter (type, values) {
      if (type === 'minute') {
        return values.filter(value => value % 5 === 0)
      }
      return values
    },
    displayFormat (items) {
      return `${items[0].label}年${items[1].label}月${items[2].label}日 ${items[3].label}:${items[4].label}`
    },
    beforeConfirm (value, resolve, picker) {
      picker.setData({
        loading: true
      })
      setTimeout(() => {
        picker.setData({
          loading: false
        })
        if (value > Date.now()) {
          resolve(false)
          Toast.error('不能选择大于今天的日期')
        } else {
          resolve(true)
        }
      }, 2000)
    },
    displayFormatTabLabel (items) {
      return `${items[0].label}年${items[1].label}月${items[2].label}日 ${items[3].label}:${items[4].label}`
    }
  },
  /** picker触发confirm事件，同步触发confirm事件 */
  handleConfirm1 (event) {
    console.log(new Date(event.detail.value))
    this.setData({
      value1: event.detail.value
    })
  },
  handleConfirm2 (event) {
    this.setData({
      value2: event.detail.value
    })
  },
  handleConfirm3 (event) {
    this.setData({
      value3: event.detail.value
    })
  },
  handleConfirm4 (event) {
    this.setData({
      value4: event.detail.value
    })
  },
  handleConfirm5 (event) {
    this.setData({
      value5: event.detail.value
    })
  },
  handleConfirm6 (event) {
    this.setData({
      value6: event.detail.value
    })
  },
  handleConfirm7 (event) {
    this.setData({
      value7: event.detail.value
    })
  },

  handleConfirm8 (event) {
    this.setData({
      value8: event.detail.value
    })
  },
  handleConfirm9 (event) {
    this.setData({
      value9: event.detail.value
    })
  },
  handleConfirm10 (event) {
    this.setData({
      value10: event.detail.value
    })
  },
  handleConfirm11 (event) {
    this.setData({
      value11: event.detail.value
    })
  },
  handleConfirm12 (event) {
    this.setData({
      value12: event.detail.value
    })
  },
  handleConfirm13 (event) {
    this.setData({
      value13: event.detail.value
    })
  },
  handleConfirm14 (event) {
    this.setData({
      value14: event.detail.value
    })
  },
  handleConfirm15 (event) {
    this.setData({
      value15: event.detail.value
    })
  },
  /** picker触发cancel事件，同步触发cancel事件 */
  onCancel () {
  }
})