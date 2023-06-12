import Toast from '../../wot-design/toast/toast'

Page({
  data: {
    value1: '',
    value2: Date.now(),
    value3: Date.now(),
    value4: '11:12',
    value5: Date.now(),
    value6: Date.now(),
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
    }
  },
  onChange1 (event) {
    Toast('选择了' + new Date(event.detail.value))
    this.setData({
      value1: event.detail.value
    })
  },
  onChange2 (event) {
    this.setData({
      value2: event.detail.value
    })
  },
  onChange3 (event) {
    this.setData({
      value3: event.detail.value
    })
  },
  onChange4 (event) {
    this.setData({
      value4: event.detail.value
    })
  },
  onChange5 (event) {
    this.setData({
      value5: event.detail.value
    })
  },
  onChange6 (event) {
    this.setData({
      value6: event.detail.value
    })
  }
})