<template>
  <page-wraper>
    <wd-toast />
    <view style="margin: 20px 0">
      <wd-cell-group border>
        <wd-col-picker label="选择地址" v-model="value1" :columns="areaData1" :column-change="columnChange1" @confirm="handleValue" />
        <wd-col-picker label="初始选项" v-model="value2" :columns="areaData2" :column-change="columnChange1" auto-complete />
        <wd-col-picker label="禁用" disabled v-model="value3" :columns="areaData3" :column-change="columnChange1" />
        <wd-col-picker label="只读" readonly v-model="value3" :columns="areaData3" :column-change="columnChange1" />
        <wd-col-picker label="禁用选项" v-model="value4" :columns="areaData4" :column-change="columnChange1" />
        <wd-col-picker label="选项提示信息" v-model="value5" :columns="areaData5" :column-change="columnChange1" />
        <wd-col-picker label="展示格式化" v-model="value6" :columns="areaData3" :column-change="columnChange1" :display-format="displayFormat" />
        <wd-col-picker label="标题" v-model="value7" title="选择地址" :columns="areaData1" :column-change="columnChange1" />
        <wd-col-picker label="before-confirm" v-model="value8" :columns="areaData1" :column-change="columnChange1" :before-confirm="beforeConfirm" />
        <wd-col-picker label="错误" error v-model="value9" :columns="areaData1" :column-change="columnChange1" />
        <wd-col-picker label="必填" required v-model="value10" :columns="areaData1" :column-change="columnChange1" />
      </wd-cell-group>
    </view>
    <demo-block title="一般column-change是个异步获取数据的操作，触发column-change组件会有默认loading，数据响应后关闭loading" transparent>
      <wd-col-picker label="选择地址" v-model="value11" :columns="areaData1" :column-change="columnChange2" />
    </demo-block>
    <demo-block title="label不传" transparent>
      <wd-col-picker v-model="value12" :columns="areaData1" :column-change="columnChange1" />
    </demo-block>
    <demo-block title="大小" transparent>
      <wd-col-picker label="选择地址" v-model="value13" size="large" :columns="areaData1" :column-change="columnChange1" />
    </demo-block>
    <demo-block title="值靠右展示" transparent>
      <wd-col-picker label="选择地址" align-right v-model="value14" :columns="areaData1" :column-change="columnChange1" />
    </demo-block>
    <demo-block title="自定义选择器" transparent>
      <view style="margin-left: 15px">
        <view style="margin-bottom: 10px">当前选中项: {{ displayValue }}</view>
        <wd-col-picker
          v-model="value15"
          use-default-slot
          :columns="areaData1"
          :column-change="columnChange1"
          style="display: inline-block"
          @confirm="handleConfirm"
        >
          <wd-button>选择地址</wd-button>
        </wd-col-picker>
      </view>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { areaData } from '../../utils/area'
import { useToast } from '@/uni_modules/wot-design-uni'

const value1 = ref<any[]>([])
const value2 = ref<any[]>(['150000', '150100', '150121'])
const value3 = ref<any[]>(['130000', '130200', '130204'])
const value4 = ref<any[]>([])
const value5 = ref<any[]>([])
const value6 = ref<any[]>(['130000', '130200', '130204'])
const value7 = ref<any[]>([])
const value8 = ref<any[]>([])
const value9 = ref<any[]>([])
const value10 = ref<any[]>([])
const value11 = ref<any[]>([])
const value12 = ref<any[]>([])
const value13 = ref<any[]>([])
const value14 = ref<any[]>([])
const value15 = ref<any[]>([])
const displayValue = ref<string>('')
const areaData1 = ref<any[]>([
  Object.keys(areaData[86]).map((key) => {
    return {
      value: key,
      label: areaData[86][key]
    }
  })
])
const areaData2 = ref<any[]>([])
const areaData3 = ref<any[]>([
  Object.keys(areaData[86]).map((key) => {
    return {
      value: key,
      label: areaData[86][key]
    }
  }),
  Object.keys(areaData[130000]).map((key) => {
    return {
      value: key,
      label: areaData[130000][key]
    }
  }),
  Object.keys(areaData[130200]).map((key) => {
    return {
      value: key,
      label: areaData[130200][key]
    }
  })
])
const areaData4 = ref<any[]>([
  Object.keys(areaData[86]).map((key) => {
    return {
      value: key,
      label: areaData[86][key],
      disabled: key === '140000'
    }
  })
])
const areaData5 = ref<any[]>([
  Object.keys(areaData[86]).map((key) => {
    return {
      value: key,
      label: areaData[86][key],
      disabled: key === '140000',
      tip: key === '140000' ? '该地区无货，暂时无法选择' : key === '150000' ? '该地区配送时间可能较长' : ''
    }
  })
])

const toast = useToast()

const columnChange1 = ({ selectedItem, resolve, finish, index, rowIndex }) => {
  const value = index === -1 ? 86 : selectedItem.value
  if (areaData[value]) {
    resolve(
      Object.keys(areaData[value]).map((key) => {
        return {
          value: key,
          label: areaData[value][key]
        }
      })
    )
  } else {
    finish()
  }
}
const columnChange2 = ({ selectedItem, resolve, finish }) => {
  setTimeout(() => {
    if (Math.random() > 0.7) {
      finish(false)
      toast.error('数据请求失败，请重试')
      return
    }
    if (areaData[selectedItem.value]) {
      resolve(
        Object.keys(areaData[selectedItem.value]).map((key) => {
          return {
            value: key,
            label: areaData[selectedItem.value][key]
          }
        })
      )
    } else {
      finish()
    }
  }, 300)
}
const displayFormat = (selectedItems) => {
  return selectedItems[selectedItems.length - 2].label + '-' + selectedItems[selectedItems.length - 1].label
}
const beforeConfirm = (value, selectedItems, resolve) => {
  if (parseInt(value[2]) > 120000) {
    toast.error('该地区库存不足')
    resolve(false)
  } else {
    resolve(true)
  }
}

function handleConfirm({ selectedItems }) {
  displayValue.value = selectedItems
    .map((item) => {
      return item.label
    })
    .join('')
}
function handleValue({ value }) {
  console.log(value)
}
</script>
<style lang="scss" scoped></style>
