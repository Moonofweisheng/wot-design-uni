<template>
  <page-wraper>
    <wd-cell-group border>
      <wd-cell title="单个日期选择" :value="cellValue.value1" is-link @click="visible.visible1 = true" />
      <wd-cell title="多个日期选择" :value="cellValue.value2" is-link @click="visible.visible2 = true" />
      <wd-cell title="日期范围选择" :value="cellValue.value3" is-link @click="visible.visible3 = true" />
      <wd-cell title="日期时间选择" :value="cellValue.value4" is-link @click="visible.visible4 = true" />
      <wd-cell title="日期时间范围选择" :value="cellValue.value5" is-link @click="visible.visible5 = true" />
      <wd-cell title="周选择" :value="cellValue.value6" is-link @click="visible.visible6 = true" />

      <wd-calendar label="周选择" type="week" v-model="value6" />
      <wd-calendar label="月选择" type="month" :min-date="minDate" v-model="value7" />
      <wd-calendar label="周范围选择" :first-day-of-week="1" type="weekrange" v-model="value8" />
      <wd-calendar label="月范围选择" type="monthrange" v-model="value9" />
      <wd-calendar label="日周月切换" :first-day-of-week="1" show-type-switch v-model="value10" />
      <wd-calendar label="快捷操作" v-model="value16" :show-confirm="false" />
      <wd-calendar label="日期格式化" type="daterange" v-model="value11" :formatter="formatter" />
      <wd-calendar
        label="快捷选项"
        :shortcuts="shortcuts"
        :on-shortcuts-click="onShortcutsClick"
        type="daterange"
        const
        v-model="value12"
        @confirm="handleConfirm3"
      />
      <wd-calendar
        label="自定义展示"
        type="daterange"
        const
        v-model="value13"
        :display-format="displayFormat"
        :inner-display-format="innerDisplayFormat"
      />
      <wd-calendar label="before-confirm" v-model="value14" :before-confirm="beforeConfirm" />
    </wd-cell-group>
    <wd-calendar v-model:visible="visible.visible1" v-model="value1" @confirm="(result) => handleConfirm({ ...result, index: 1 })" />
    <wd-calendar v-model:visible="visible.visible2" v-model="value2" type="dates" @confirm="(result) => handleConfirm({ ...result, index: 2 })" />
    <wd-calendar
      v-model:visible="visible.visible3"
      v-model="value3"
      type="daterange"
      @confirm="(result) => handleConfirm({ ...result, index: 3, connectors: ' 至 ' })"
    />
    <wd-calendar
      v-model:visible="visible.visible4"
      v-model="value4"
      type="datetime"
      @confirm="(result) => handleConfirm({ ...result, index: 4, type: 'datetime' })"
    />
    <wd-calendar
      v-model:visible="visible.visible5"
      v-model="value5"
      type="datetimerange"
      @confirm="(result) => handleConfirm({ ...result, type: 'datetime', index: 5, connectors: ' 至 ' })"
    />
    <wd-calendar v-model:visible="visible.visible6" v-model="value6" type="week" @confirm="(result) => handleConfirm({ ...result, index: 6 })" />
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import { dayjs } from '@/uni_modules/wot-design-uni'
import { isArray } from '@/uni_modules/wot-design-uni/components/common/util'
import type { CalendarDayItem, CalendarFormatter } from '@/uni_modules/wot-design-uni/components/wd-calendar-view/types'
import type { CalendarOnShortcutsClickOption } from '@/uni_modules/wot-design-uni/components/wd-calendar/types'
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

const value1 = ref<number>(Date.now())
const value2 = ref<number[]>([Date.now() - 24 * 60 * 60 * 1000 * 3, Date.now()])
const value3 = ref<number[]>([])
const value4 = ref<number>(Date.now())
const value5 = ref<number[]>([Date.now() - 24 * 60 * 60 * 1000 * 3, Date.now() - 24 * 60 * 60 * 1000])
const value6 = ref<number>(Date.now())
const value7 = ref<number>(Date.now())
const value8 = ref<number[]>([Date.now() - 24 * 60 * 60 * 1000 * 14, Date.now()])
const value9 = ref<number[]>([Date.now() - 24 * 60 * 60 * 1000 * 33, Date.now()])
const value10 = ref<number>(Date.now())
const value11 = ref<number[]>([Date.now() - 24 * 60 * 60 * 1000 * 3, Date.now()])
const value12 = ref<number[]>([])
const value13 = ref<number[]>([Date.now() - 24 * 60 * 60 * 1000 * 3, Date.now()])
const value14 = ref<number | null>(null)
const value15 = ref<number | null>(null)
const value16 = ref<number>(Date.now())
const value17 = ref<number>(Date.now())

const cellValue = reactive<{ [key: PropertyKey]: string }>({
  value1: formatDate(value1.value),
  value2: value2.value.map((item) => formatDate(item)).join(','),
  value3: '',
  value4: formatDate(value4.value, 'datetime'),
  value5: value5.value.map((item) => formatDate(item, 'datetime')).join(' 至 '),
  value6: '',
  value7: '',
  value8: '',
  value9: '',
  value10: ''
})

const minDate = ref<number>(new Date(new Date().getFullYear() - 20, new Date().getMonth() - 6, new Date().getDate()).getTime())

const formatter: CalendarFormatter = (day: CalendarDayItem) => {
  const date = new Date(day.date)
  const now = new Date()

  const year = date.getFullYear()
  const month = date.getMonth()
  const da = date.getDate()
  const nowYear = now.getFullYear()
  const nowMonth = now.getMonth()
  const nowDa = now.getDate()

  if (year === nowYear && month === nowMonth && da === nowDa) {
    day.topInfo = '今天'
  }

  if (month === 5 && da === 18) {
    day.topInfo = '618大促'
  }

  if (month === 10 && da === 11) {
    day.topInfo = '京东双11'
  }

  if (day.type === 'start') {
    day.bottomInfo = '开始'
  }

  if (day.type === 'end') {
    day.bottomInfo = '结束'
  }

  if (day.type === 'same') {
    day.bottomInfo = '开始/结束'
  }

  return day
}
const shortcuts = ref<Record<string, any>[]>([
  {
    text: '近7天',
    id: 7
  },
  {
    text: '近15天',
    id: 15
  },
  {
    text: '近30天',
    id: 30
  }
])

const toast = useToast()
const onShortcutsClick = ({ item }: CalendarOnShortcutsClickOption) => {
  const dayDiff = item.id
  const endDate = Date.now() - 24 * 60 * 60 * 1000
  const startDate = endDate - dayDiff * 24 * 60 * 60 * 1000

  return [startDate, endDate]
}
const displayFormat = (value: any) => {
  return dayjs(value[0]).format('YY年MM月DD日') + ' - ' + dayjs(value[1]).format('YY年MM月DD日')
}
const innerDisplayFormat = (value: string | number | Date | undefined, rangeType: string) => {
  if (!value) {
    return rangeType === 'start' ? '活动开始时间' : '活动结束时间'
  }

  return dayjs(value).format('YY年MM月DD日')
}
const beforeConfirm = ({ value, resolve }: any) => {
  if (value > Date.now()) {
    toast.error('该日期暂无数据')
    resolve(false)
  } else {
    resolve(true)
  }
}

function handleConfirm({
  value,
  type,
  index,
  connectors
}: {
  value: string | number | (string | number)[]
  type?: 'date' | 'datetime'
  index: number
  connectors?: string
}) {
  cellValue[`value${index}`] = (isArray(value) ? value : [value]).map((item) => formatDate(item, type)).join(connectors || ',')
}

function handleConfirm3({ value }: any) {
  console.log(value)
}

function formatDate(date: number | string, type?: 'date' | 'datetime') {
  switch (type) {
    case 'date':
      return dayjs(date).format('YYYY-MM-DD')
    case 'datetime':
      return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
    default:
      return dayjs(date).format('YYYY-MM-DD')
  }
}
</script>
<style lang="scss" scoped></style>
