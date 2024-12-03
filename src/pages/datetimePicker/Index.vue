<template>
  <page-wraper>
    <wd-cell-group border>
      <wd-cell title="日期选择" :value="cellValue.value1" is-link @click="visible.visible1 = true"></wd-cell>
      <wd-cell title="年月日" :value="cellValue.value2" is-link @click="visible.visible2 = true"></wd-cell>
      <wd-cell title="年月" :value="cellValue.value3" is-link @click="visible.visible3 = true"></wd-cell>
      <wd-cell title="年" :value="cellValue.value4" is-link @click="visible.visible4 = true"></wd-cell>
      <wd-cell title="时分" :value="cellValue.value5" is-link @click="visible.visible5 = true"></wd-cell>
      <wd-cell title="过滤选项" :value="cellValue.value6" is-link @click="visible.visible6 = true"></wd-cell>
      <wd-cell title="before-confirm" :value="cellValue.value7" is-link @click="visible.visible7 = true"></wd-cell>
      <wd-cell title="时间范围一年" :value="cellValue.value8" is-link @click="visible.visible8 = true"></wd-cell>
      <wd-cell title="区间选择" :value="cellValue.value9" is-link @click="visible.visible9 = true"></wd-cell>
      <wd-cell title="范围tab展示格式" :value="cellValue.value10" is-link @click="visible.visible10 = true"></wd-cell>
    </wd-cell-group>
    <wd-datetime-picker v-model="value1" v-model:visible="visible.visible1" @confirm="(result) => handleConfirm({ ...result, index: 1 })" />
    <wd-datetime-picker
      v-model="value2"
      v-model:visible="visible.visible2"
      type="date"
      @confirm="(result) => handleConfirm({ ...result, index: 2, type: 'date' })"
    />

    <wd-datetime-picker
      v-model="value3"
      v-model:visible="visible.visible3"
      type="year-month"
      @confirm="(result) => handleConfirm({ ...result, index: 3, type: 'year-month' })"
    />

    <wd-datetime-picker
      v-model="value4"
      v-model:visible="visible.visible4"
      type="year"
      @confirm="(result) => handleConfirm({ ...result, index: 4, type: 'year' })"
    />

    <wd-datetime-picker
      v-model="value5"
      v-model:visible="visible.visible5"
      type="time"
      @confirm="(result) => handleConfirm({ ...result, index: 5, type: 'time' })"
    />

    <wd-datetime-picker
      v-model="value6"
      v-model:visible="visible.visible6"
      :filter="filter"
      @confirm="(result) => handleConfirm({ ...result, index: 6 })"
    />

    <wd-datetime-picker
      v-model="value7"
      v-model:visible="visible.visible7"
      :before-confirm="beforeConfirm"
      @confirm="(result) => handleConfirm({ ...result, index: 7 })"
    />

    <wd-datetime-picker
      v-model="value8"
      v-model:visible="visible.visible8"
      :minDate="minDate"
      :maxDate="maxDate"
      @confirm="(result) => handleConfirm({ ...result, index: 8 })"
    />

    <wd-datetime-picker
      v-model:visible="visible.visible9"
      title="请选择区间"
      v-model="value9"
      @confirm="(result) => handleConfirm({ ...result, index: 9 })"
    />

    <wd-datetime-picker
      v-model:visible="visible.visible10"
      v-model="value10"
      @confirm="(result) => handleConfirm({ ...result, index: 10 })"
      :display-format-tab-label="displayFormatTabLabel"
    />
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast, dayjs } from '@/uni_modules/wot-design-uni'
import { isArray } from '@/uni_modules/wot-design-uni/components/common/util'
import type {
  DatetimePickerViewFilter,
  DatetimePickerViewFormatter,
  DateTimeType
} from '@/uni_modules/wot-design-uni/components/wd-datetime-picker-view/types'
import type { DatetimePickerDisplayFormatTabLabel, DatetimePickerInstance } from '@/uni_modules/wot-design-uni/components/wd-datetime-picker/types'
import { reactive, ref } from 'vue'

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
  visible10: false
})

const value1 = ref<string>('')
const value2 = ref<number>(Date.now())
const value3 = ref<number>(Date.now())
const value4 = ref<number>(Date.now())
const value5 = ref<string>('09:20')
const value6 = ref<number>(Date.now())
const value7 = ref<number>(Date.now())
const value8 = ref<number>(Date.now())
const value9 = ref<any[]>(['', ''])
const value10 = ref<any[]>(['', ''])

const cellValue = reactive<{ [key: PropertyKey]: any }>({
  value1: '',
  value2: formatDate(value2.value, 'date'),
  value3: formatDate(value3.value, 'year-month'),
  value4: formatDate(value4.value, 'year'),
  value5: '09:20',
  value6: formatDate(value6.value),
  value7: formatDate(value7.value),
  value8: formatDate(value8.value),
  value9: '',
  value10: ''
})

const minDate = ref<number>(Date.now())
const maxDate = ref<number>(new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()).getTime())

const formatter: DatetimePickerViewFormatter = (type, value) => {
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
}
const filter: DatetimePickerViewFilter = (type, values) => {
  if (type === 'minute') {
    return values.filter((value) => value % 5 === 0)
  }
  return values
}

const toast = useToast()
const beforeConfirm = (value: number | string | (number | string)[], resolve: (isPass: boolean) => void, picker: DatetimePickerInstance) => {
  picker.setLoading(true)
  setTimeout(() => {
    picker.setLoading(false)
    if ((value as number) > Date.now()) {
      resolve(false)
      toast.error('不能选择大于今天的日期')
    } else {
      resolve(true)
    }
  }, 2000)
}
const displayFormatTabLabel: DatetimePickerDisplayFormatTabLabel = (items) => {
  return `${items[0].label}年${items[1].label}月${items[2].label}日 ${items[3].label}:${items[4].label}`
}

function handleConfirm({ value, index, type }: { value: string | number | (string | number)[]; index: number; type?: DateTimeType }) {
  cellValue[`value${index}`] = (isArray(value) ? value : [value]).map((item) => formatDate(item, type)).join('至')
}

function formatDate(date: number | string, type?: DateTimeType) {
  switch (type) {
    case 'date':
      return dayjs(date).format('YYYY-MM-DD')
    case 'year-month':
      return dayjs(date).format('YYYY-MM')
    case 'time':
      return date
    case 'datetime':
      return dayjs(date).format('YYYY-MM-DD HH:mm')
    case 'year':
      return dayjs(date).format('YYYY')
    default:
      return dayjs(date).format('YYYY-MM-DD HH:mm')
  }
}
</script>
<style lang="scss" scoped></style>
