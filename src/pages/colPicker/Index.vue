<template>
  <page-wraper>
    <wd-col-picker
      v-model:visible="visible.visible1"
      v-model="value1"
      :columns="areaData1"
      :column-change="columnChange1"
      @confirm="(result) => handleConfirm({ ...result, index: 1 })"
    />

    <wd-col-picker
      v-model:visible="visible.visible2"
      v-model="value2"
      :columns="areaData2"
      :column-change="columnChange"
      @confirm="(result) => handleConfirm({ ...result, index: 2 })"
      auto-complete
    />
    <wd-col-picker
      v-model:visible="visible.visible3"
      v-model="value4"
      :columns="areaData4"
      :column-change="columnChange1"
      @confirm="(result) => handleConfirm({ ...result, index: 3 })"
    />

    <wd-col-picker
      v-model:visible="visible.visible4"
      v-model="value4"
      :columns="areaData5"
      :column-change="columnChange1"
      @confirm="(result) => handleConfirm({ ...result, index: 4 })"
    />

    <wd-col-picker
      v-model="value7"
      v-model:visible="visible.visible5"
      title="选择地址"
      :columns="areaData1"
      :column-change="columnChange1"
      @confirm="(result) => handleConfirm({ ...result, index: 5 })"
    />

    <wd-col-picker
      v-model:visible="visible.visible6"
      v-model="value8"
      :columns="areaData1"
      :column-change="columnChange1"
      :before-confirm="beforeConfirm"
      @confirm="(result) => handleConfirm({ ...result, index: 6 })"
    />

    <wd-col-picker
      label="选择地址"
      v-model="value11"
      v-model:visible="visible.visible7"
      :columns="areaData1"
      @confirm="(result) => handleConfirm({ ...result, index: 7 })"
      :column-change="columnChange2"
    />

    <view style="margin: 20px 0">
      <wd-cell-group border>
        <wd-cell title="选择地址" :value="cellValue.value1" is-link @click="visible.visible1 = true"></wd-cell>
        <wd-cell title="初始选项" :value="cellValue.value2" is-link @click="visible.visible2 = true"></wd-cell>
        <wd-cell title="禁用选项" :value="cellValue.value3" is-link @click="visible.visible3 = true"></wd-cell>
        <wd-cell title="选项提示信息" :value="cellValue.value4" is-link @click="visible.visible4 = true"></wd-cell>
        <wd-cell title="自定义标题" :value="cellValue.value5" is-link @click="visible.visible5 = true"></wd-cell>
        <wd-cell title="before-confirm" :value="cellValue.value6" is-link @click="visible.visible6 = true"></wd-cell>
        <wd-cell title="加载动画" :value="cellValue.value7" is-link @click="visible.visible7 = true"></wd-cell>
      </wd-cell-group>
    </view>
    <wd-toast />
  </page-wraper>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { useToast } from '@/uni_modules/wot-design-uni'
import type { ColPickerColumnChange, ColPickerOption } from '@/uni_modules/wot-design-uni/components/wd-col-picker/types'
import { useColPickerData } from '@/hooks/useColPickerData'

const { colPickerData, findChildrenByCode, findNodeByCodeList } = useColPickerData()
const toast = useToast()

onMounted(async () => {
  await sleep()
  value2.value = ['150000', '150100', '150121']
  const result = findNodeByCodeList(value2.value)
  cellValue.value2 = result.map((item) => item.text).join('/')
})

const visible = reactive({
  visible1: false,
  visible2: false,
  visible3: false,
  visible4: false,
  visible5: false,
  visible6: false,
  visible7: false,
  visible8: false,
  visible9: false,
  visible10: false,
  visible11: false,
  visible12: false,
  visible13: false,
  visible14: false,
  visible15: false
})

const cellValue = reactive<{ [key: PropertyKey]: any }>({
  value1: '',
  value2: '',
  value3: '',
  value4: '',
  value5: '',
  value6: '',
  value7: '',
  value8: '',
  value9: '',
  value10: '',
  value11: ''
})

const value1 = ref<string[]>([])
const value2 = ref<string[]>([])
const value3 = ref<string[]>(['130000', '130200', '130204'])
const value4 = ref<string[]>([])
const value5 = ref<string[]>([])
const value6 = ref<string[]>(['130000', '130200', '130204'])
const value7 = ref<string[]>([])
const value8 = ref<string[]>([])
const value9 = ref<string[]>([])
const value10 = ref<string[]>([])
const value11 = ref<string[]>([])
const value12 = ref<string[]>([])
const value13 = ref<string[]>([])
const value14 = ref<string[]>([])
const value15 = ref<string[]>([])
const displayValue = ref<string>('')
const areaData1 = ref<ColPickerOption[][]>([
  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text
    }
  })
])

const areaData2 = ref<ColPickerOption[][]>([])
const areaData3 = ref<ColPickerOption[][]>([
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
const areaData4 = ref<ColPickerOption[][]>([
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

const columnChange: ColPickerColumnChange = async ({ selectedItem, index, resolve, finish }) => {
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
const displayFormat = (selectedItems: ColPickerOption[]) => {
  return selectedItems[selectedItems.length - 2].label + '-' + selectedItems[selectedItems.length - 1].label
}
const beforeConfirm = (value: (string | number)[], selectedItems: ColPickerOption[], resolve: (isPass: boolean) => void) => {
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

function handleConfirm({ selectedItems, index }: { selectedItems: ColPickerOption[]; index: number }) {
  cellValue[`value${index}`] = selectedItems
    .map((item) => {
      return item.label
    })
    .join('/')
}
</script>
<style lang="scss" scoped></style>
