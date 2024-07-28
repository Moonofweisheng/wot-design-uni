<template>
  <page-wraper>
    <wd-toast />
    <view style="margin: 20px 0">
      <wd-cell-group border>
        <wd-col-picker label="选择地址" v-model="value1" :columns="areaData1" :column-change="columnChange1" @confirm="handleValue" />
        <wd-col-picker label="初始选项" v-model="value2" :columns="areaData2" :column-change="columnChange" auto-complete />
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
import { onMounted, ref } from 'vue'
import { useToast } from '@/uni_modules/wot-design-uni'
import type { ColPickerColumnChange } from '@/uni_modules/wot-design-uni/components/wd-col-picker/types'
import { useColPickerData } from '@/hooks/useColPickerData'

const { colPickerData, findChildrenByCode } = useColPickerData()
const toast = useToast()

onMounted(async () => {
  toast.loading('数据加载中')
  await sleep()
  toast.close()
  value2.value = ['150000', '150100', '150121']
})

const value1 = ref<any[]>([])
const value2 = ref<string[]>([])
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
  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text
    }
  })
])

const areaData2 = ref<any[]>([])
const areaData3 = ref<any[]>([
  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text
    }
  }),
  findChildrenByCode(colPickerData, '130000')!.map((item) => {
    return {
      value: item.value,
      label: item.text
    }
  }),
  findChildrenByCode(colPickerData, '130200')!.map((item) => {
    return {
      value: item.value,
      label: item.text
    }
  })
])
const areaData4 = ref<any[]>([
  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text,
      disabled: item.value === '140000'
    }
  })
])
const areaData5 = ref<any[]>([
  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text,
      disabled: item.value === '140000',
      tip: item.value === '140000' ? '该地区无货，暂时无法选择' : item.value === '150000' ? '该地区配送时间可能较长' : ''
    }
  })
])

const columnChange1: ColPickerColumnChange = ({ selectedItem, resolve, finish }) => {
  const areaData = findChildrenByCode(colPickerData, selectedItem.value)
  if (areaData && areaData.length) {
    resolve(
      areaData.map((item) => {
        return {
          value: item.value,
          label: item.text
        }
      })
    )
  } else {
    finish()
  }
}

const columnChange: ColPickerColumnChange = async ({ selectedItem, resolve, finish }) => {
  await sleep(0.3)
  const areaData = findChildrenByCode(colPickerData, selectedItem.value)
  if (areaData && areaData.length) {
    resolve(
      areaData.map((item) => {
        return {
          value: item.value,
          label: item.text
        }
      })
    )
  } else {
    finish()
  }
}

const columnChange2: ColPickerColumnChange = ({ selectedItem, resolve, finish }) => {
  setTimeout(() => {
    if (Math.random() > 0.7) {
      finish(false)
      toast.error('数据请求失败，请重试')
      return
    }
    const areaData = findChildrenByCode(colPickerData, selectedItem.value)
    if (areaData && areaData.length) {
      resolve(
        areaData.map((item) => {
          return {
            value: item.value,
            label: item.text
          }
        })
      )
    } else {
      finish()
    }
  }, 300)
}
const displayFormat = (selectedItems: Record<string, any>[]) => {
  return selectedItems[selectedItems.length - 2].label + '-' + selectedItems[selectedItems.length - 1].label
}
const beforeConfirm = (value: (string | number)[], selectedItems: Record<string, any>[], resolve: (isPass: boolean) => void) => {
  if (parseInt(String(value[2])) > 120000) {
    toast.error('该地区库存不足')
    resolve(false)
  } else {
    resolve(true)
  }
}

function sleep(second: number = 1) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 1000 * second)
  })
}

function handleConfirm({ selectedItems }: any) {
  displayValue.value = selectedItems
    .map((item: any) => {
      return item.label
    })
    .join('')
}
function handleValue({ value }: any) {
  console.log(value)
}
</script>
<style lang="scss" scoped></style>
