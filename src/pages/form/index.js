import Toast from '../../wot-design/toast/toast.js'
import MessageBox from '../../wot-design/messageBox/messageBox.js'
import areaData from '../../utils/area'

Page({
  data: {
    couponName: '',
    couponNameErr: false,
    platform: [],
    platformList: [
      {
        value: '1',
        label: '京东'
      }, {
        value: '2',
        label: '开普勒'
      }, {
        value: '3',
        label: '手Q'
      }, {
        value: '4',
        label: '微信'
      }, {
        value: '5',
        label: '1号店'
      }, {
        value: '6',
        label: '十元街'
      }, {
        value: '7',
        label: '京东极速版'
      }
    ],
    promotion: '1',
    promotionlist: [
      {
        value: '1',
        label: '满减'
      }, {
        value: '2',
        label: '无门槛'
      }
    ],
    threshold: '',
    price: '',
    date: Date.now(),
    address: [],
    area: [Object.keys(areaData[86]).map(key => {
      return {
        value: key,
        label: areaData[86][key]
      }
    })],
    areaChange ({ selectedItem, resolve, finish }) {
      if (areaData[selectedItem.value]) {
        resolve(Object.keys(areaData[selectedItem.value]).map(key => {
          return {
            value: key,
            label: areaData[selectedItem.value][key]
          }
        }))
      } else {
        finish()
      }
    },
    content: '',
    count: 1,
    read: false,
    switchVal: true,
    cardId: '',
    phone: ''
  },
  handleCouponName ({ detail: { value } }) {
    this.setData({
      couponName: value,
      couponNameErr: false
    })
  },
  handlePlatform ({ detail: { value } }) {
    this.setData({
      platform: value
    })
  },
  handleThreshold ({ detail: { value } }) {
    this.setData({
      threshold: value
    })
  },
  handlePrice ({ detail: { value } }) {
    this.setData({
      price: value
    })
  },
  handleAddress ({ detail: { value } }) {
    this.setData({
      address: value
    })
  },
  handleContent ({ detail: { value } }) {
    this.setData({
      content: value
    })
  },
  handleCount ({ detail: { value } }) {
    this.setData({
      count: value
    })
  },
  handleSwitch ({ detail: { value } }) {
    this.setData({
      switchVal: value
    })
  },
  handleRead ({ detail: { value } }) {
    this.setData({
      read: value
    })
  },
  handleCardId ({ detail: { value } }) {
    this.setData({
      cardId: value
    })
  },
  handlePhone ({ detail: { value } }) {
    this.setData({
      phone: value
    })
  },
  formSubmit ({ detail }) {
    if (!detail.value.couponName) {
      Toast.error('请填写优惠券名称')
      return
    }
    MessageBox.alert(`获取的数据为 ${JSON.stringify(detail.value)}`)
  },
  handleIconClick () {
    Toast.info('优惠券提示信息')
  },
  handleDate ({ detail }) {
    this.setData({
      date: detail.value
    })
  }
})