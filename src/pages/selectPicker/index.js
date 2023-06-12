import Toast from '../../wot-design/toast/toast.js'

Page({
  data: {
    columns1: [
      {
        value: '101',
        label: '男装'
      },
      {
        value: '102',
        label: '奢侈品'
      },
      {
        value: '103',
        label: '女装'
      },
      {
        value: '104',
        label: '鞋靴'
      },
      {
        value: '105',
        label: '内衣配饰'
      },
      {
        value: '106',
        label: '箱包'
      },
      {
        value: '107',
        label: '美妆护肤'
      },
      {
        value: '108',
        label: '个性清洁'
      },
      {
        value: '109',
        label: '钟表珠宝'
      },
      {
        value: '110',
        label: '手机'
      },
      {
        value: '111',
        label: '数码'
      },
      {
        value: '112',
        label: '电脑办公'
      }
    ],
    columns2: [
      {
        value: '101',
        label: '男装',
        disabled: true
      },
      {
        value: '102',
        label: '奢侈品'
      },
      {
        value: '103',
        label: '女装'
      }
    ],
    value1: ['101'],
    value2: '101',
    value3: ['102'],
    value4: ['103'],
    value5: [],
    value6: [],
    value7: [],
    value8: [],
    value9: [],
    value10: [],
    value11: [],
    value12: ['103'],
    value13: ['102'],
    value14: [],
    value15: ['101'],
    value16: ['103'],
    value17: ['102'],
    customShow: '奢侈品',

    displayFormat (items, columns) {
      let showValue = ''
      columns.forEach(column => {
        items.forEach((item, index) => {
          if (column.value === item) {
            showValue += `${item}: ${column.label} ${index + 1 < items.length ? '--' : ''} `
          }
        })
      })
      return showValue
    },

    beforeConfirm (value, resolve) {
      if (value.length > 0) {
        Toast.error('暂时无法选择商品')
        resolve(false)
      } else {
        resolve(true)
      }
    }
  },

  handleChange ({ detail }) {
    Toast('选择了' + detail)
  },
  handleConfirm1 ({ detail }) {
    this.setData({
      value1: detail.value
    })
  },
  handleConfirm2 ({ detail }) {
    this.setData({
      value2: detail.value
    })
  },
  handleConfirm3 ({ detail }) {
    this.setData({
      value3: detail.value
    })
  },
  handleConfirm4 ({ detail }) {
    this.setData({
      value4: detail.value
    })
  },
  handleConfirm5 ({ detail }) {
    this.setData({
      value5: detail.value
    })
  },
  handleConfirm6 ({ detail }) {
    this.setData({
      value6: detail.value
    })
  },
  handleConfirm7 ({ detail }) {
    this.setData({
      value7: detail.value
    })
  },
  handleConfirm8 ({ detail }) {
    this.setData({
      value8: detail.value
    })
  },
  handleConfirm9 ({ detail }) {
    this.setData({
      value9: detail.value
    })
  },
  handleConfirm10 ({ detail }) {
    this.setData({
      value10: detail.value
    })
  },
  handleConfirm11 ({ detail }) {
    this.setData({
      value11: detail.value
    })
  },
  handleConfirm12 ({ detail }) {
    this.setData({
      value12: detail.value
    })
  },
  handleConfirm13 ({ detail }) {
    this.setData({
      value13: detail.value
    })
  },
  handleConfirm14 ({ detail }) {
    this.setData({
      value14: detail.value
    })
  },
  handleConfirm15 ({ detail }) {
    this.setData({
      value15: detail.value
    })
  },
  handleConfirm16 ({ detail }) {
    this.setData({
      value16: detail.value
    })
  },
  handleConfirm17 ({ detail }) {
    this.setData({
      value17: detail.value,
      customShow: detail.selectedItems.map(item => {
        return item.label
      }).join(', ')
    })
  }
})