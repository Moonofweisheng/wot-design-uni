import Toast from '../../wot-design/toast/toast.js'

const district = {
  0: [{ label: '北京', value: '110000' }, { label: '广东省', value: '440000' }],
  110000: [{ label: '北京', value: '110100' }],
  440000: [{ label: '广州市', value: '440100' }, { label: '韶关市', value: '440200' }, { label: '深圳市', value: '440300' }, { label: '珠海市', value: '440400' }, { label: '汕头市', value: '440500' }],
  110100: [{ label: '东城区', value: '110101' }, { label: '西城区', value: '110102' }, { label: '朝阳区', value: '110105' }, { label: '丰台区', value: '110106' }, { label: '石景山区', value: '110107' }],
  440100: [{ label: '荔湾区', value: '440103' }, { label: '越秀区', value: '440104' }, { label: '海珠区', value: '440105' }],
  440200: [{ label: '武江区', value: '440203' }],
  440300: [{ label: '罗湖区', value: '440303' }, { label: '福田区', value: '440304' }],
  440400: [{ label: '香洲区', value: '440402' }, { label: '斗门区', value: '440403' }, { label: '金湾区', value: '440404' }],
  440500: [{ label: '龙湖区', value: '440507' }, { label: '金平区', value: '440511' }]
}

Page({
  data: {
    columns0: ['选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'],

    value1: '选项3',
    columns1: ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'],

    value2: '选项4',
    columns2: ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'],

    columns3: ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'],

    value4: ['中南大学', '软件工程'],
    columns4: [
      ['中山大学', '中南大学', '华南理工大学'],
      ['计算机科学与技术', '软件工程', '通信工程', '法学', '经济学']
    ],

    value5: ['110000', '110100', '110102'],
    columns5: [
      district[0],
      district[district[0][0].value],
      district[district[district[0][0].value][0].value]
    ],

    value6: ['中南大学', '软件工程'],
    value8: '选项1',
    columns6: [
      ['中山大学', '中南大学', '华南理工大学'],
      ['计算机科学与技术', '软件工程', '通信工程', '法学', '经济学']
    ],

    columns7: ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'],

    onChangeDistrict (pickerView, value, columnIndex, resolve) {
      const item = value[columnIndex]
      if (columnIndex === 0) {
        pickerView.setColumnData(1, district[item.value])
        pickerView.setColumnData(2, district[district[item.value][0].value])
      } else if (columnIndex === 1) {
        pickerView.setColumnData(2, district[item.value])
      }
      resolve()
    },

    displayFormat (items) {
      return items.map(item => {
        return item.label
      }).join('-')
    },

    value7: '',
    beforeConfirm: function (value, resolve, picker) {
      picker.setData({
        loading: true
      })
      setTimeout(() => {
        picker.setData({
          loading: false
        })
        if (['选项2', '选项3'].indexOf(value) > -1) {
          resolve(false)
          Toast.error('选项校验不通过，请重新选择')
        } else {
          resolve(true)
        }
      }, 2000)
    }
  },
  handleConfirm ({ detail: { value } }) {
    this.setData({
      value8: value
    })
  }
})