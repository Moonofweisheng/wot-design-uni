import areaData from '../../utils/area'
import Toast from '../../wot-design/toast/toast.js'

Page({
  data: {
    value1: [],
    value2: ['150000', '150100', '150121'],
    value3: ['130000', '130200', '130204'],
    value4: [],
    value5: [],
    value6: ['130000', '130200', '130204'],
    value7: [],
    value8: [],
    value9: [],
    value10: [],
    value11: [],
    value12: [],
    value13: [],
    value14: [],
    value15: [],
    displayValue: '',
    areaData1: [Object.keys(areaData[86]).map(key => {
      return {
        value: key,
        label: areaData[86][key]
      }
    })],
    areaData2: [],
    areaData3: [Object.keys(areaData[86]).map(key => {
      return {
        value: key,
        label: areaData[86][key]
      }
    }), Object.keys(areaData[130000]).map(key => {
      return {
        value: key,
        label: areaData[130000][key]
      }
    }), Object.keys(areaData[130200]).map(key => {
      return {
        value: key,
        label: areaData[130200][key]
      }
    })],
    areaData4: [Object.keys(areaData[86]).map(key => {
      return {
        value: key,
        label: areaData[86][key],
        disabled: key === '140000'
      }
    })],
    areaData5: [Object.keys(areaData[86]).map(key => {
      return {
        value: key,
        label: areaData[86][key],
        disabled: key === '140000',
        tip: key === '140000' ? '该地区无货，暂时无法选择' : (key === '150000' ? '该地区配送时间可能较长' : '')
      }
    })],
    columnChange1 ({ selectedItem, resolve, finish, index, rowIndex }) {
      const value = index === -1 ? 86 : selectedItem.value
      if (areaData[value]) {
        resolve(Object.keys(areaData[value]).map(key => {
          return {
            value: key,
            label: areaData[value][key]
          }
        }))
      } else {
        finish()
      }
    },
    columnChange2 ({ selectedItem, resolve, finish }) {
      setTimeout(() => {
        if (Math.random() > 0.7) {
          finish(false)
          Toast.error('数据请求失败，请重试')
          return
        }
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
      }, 300)
    },
    displayFormat (selectedItems) {
      return selectedItems[selectedItems.length - 2].label + '-' + selectedItems[selectedItems.length - 1].label
    },
    beforeConfirm (value, selectedItems, resolve) {
      if (parseInt(value[2]) > 120000) {
        Toast.error('该地区库存不足')
        resolve(false)
      } else {
        resolve(true)
      }
    }
  },
  handleConfirm ({ detail: { selectedItems } }) {
    this.setData({
      displayValue: selectedItems.map(item => {
        return item.label
      }).join('')
    })
  },
  handleValue ({ detail: { value } }) {
    this.setData({
      value1: value
    })
  }
})