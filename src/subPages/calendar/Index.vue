<template>
  <page-wraper>
    <view>
      <wd-cell-group border>
        <wd-calendar :label="$t('dan-ge-ri-qi-xuan-ze')" v-model="value1" @confirm="handleConfirm1" />
        <wd-calendar :label="$t('duo-ge-ri-qi-xuan-ze')" type="dates" v-model="value2" @confirm="handleConfirm2" />
        <wd-calendar :label="$t('ri-qi-fan-wei-xuan-ze')" type="daterange" v-model="value3" />
        <wd-calendar :label="$t('ri-qi-shi-jian-xuan-ze')" type="datetime" v-model="value4" />
        <wd-calendar :label="$t('ri-qi-shi-jian-fan-wei-xuan-ze')" type="datetimerange" v-model="value5" />
        <wd-calendar :label="$t('zhou-xuan-ze')" type="week" v-model="value6" />
        <wd-calendar :label="$t('yue-xuan-ze')" type="month" :min-date="minDate" v-model="value7" />
        <wd-calendar :label="$t('zhou-fan-wei-xuan-ze')" :first-day-of-week="1" type="weekrange" v-model="value8" />
        <wd-calendar :label="$t('yue-fan-wei-xuan-ze')" type="monthrange" v-model="value9" />
        <wd-calendar :label="$t('ri-zhou-yue-qie-huan')" :first-day-of-week="1" show-type-switch v-model="value10" />
        <wd-calendar :label="$t('kuai-jie-cao-zuo')" v-model="value16" :show-confirm="false" />
        <wd-calendar :label="$t('ri-qi-ge-shi-hua')" type="daterange" v-model="value11" :formatter="formatter" />
        <wd-calendar
          :label="$t('kuai-jie-xuan-xiang')"
          :shortcuts="shortcuts"
          :on-shortcuts-click="onShortcutsClick"
          type="daterange"
          const
          v-model="value12"
          @confirm="handleConfirm3"
        />
        <wd-calendar
          :label="$t('zi-ding-yi-zhan-shi')"
          type="daterange"
          const
          v-model="value13"
          :display-format="displayFormat"
          :inner-display-format="innerDisplayFormat"
        />
        <wd-calendar label="before-confirm" v-model="value14" :before-confirm="beforeConfirm" />
        <wd-calendar
          :label="$t('dan-ge-ri-qi-xuan-ze-ke-qing-kong')"
          v-model="valueClear1"
          clearable
          @clear="handleClear1"
          @confirm="handleConfirmClear1"
        />
        <wd-calendar
          :label="$t('ri-qi-fan-wei-xuan-ze-ke-qing-kong')"
          type="daterange"
          v-model="valueClear2"
          clearable
          @clear="handleClear2"
          @confirm="handleConfirmClear2"
        />
        <wd-calendar :label="$t('bi-tian-xing-hao-zai-you-ce')" v-model="value18" required marker-side="after" @confirm="handleConfirm6" />
      </wd-cell-group>
    </view>

    <demo-block transparent :title="$t('zi-ding-yi-xuan-ze-qi')">
      <view style="margin: 0 15px">
        <view style="margin-bottom: 10px">{{ $t('dang-qian-xuan-zhong-ri-qi-formatvalue') + formatValue }}</view>
        <wd-calendar v-model="value15" use-default-slot @confirm="handleConfirm4">
          <wd-button>{{ $t('xuan-ze-ri-qi') }}</wd-button>
        </wd-calendar>
      </view>
    </demo-block>
    <demo-block :title="$t('zu-jian-shi-li-shi-jian')">
      <wd-button @click="openCalendar">{{ $t('da-kai-ri-li') }}</wd-button>
      <wd-calendar ref="calendarRef" v-model="value17" :with-cell="false" @confirm="handleConfirm5" />
    </demo-block>
  </page-wraper>
  <wd-toast />

  <wd-message-box />
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import { dayjs } from '@/uni_modules/wot-design-uni'
import type { CalendarDayItem, CalendarFormatter } from '@/uni_modules/wot-design-uni/components/wd-calendar-view/types'
import type { CalendarInstance, CalendarOnShortcutsClickOption } from '@/uni_modules/wot-design-uni/components/wd-calendar/types'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const minDate = ref<number>(new Date(new Date().getFullYear() - 20, new Date().getMonth() - 6, new Date().getDate()).getTime())

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
const value18 = ref<number>(Date.now())
const valueClear1 = ref<number | null>(Date.now())
const valueClear2 = ref<number[]>([Date.now() - 24 * 60 * 60 * 1000 * 3, Date.now()])

const calendarRef = ref<CalendarInstance>()

function openCalendar() {
  calendarRef.value?.open()
}

const formatValue = ref<string>('')
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
    day.topInfo = t('jin-tian')
  }

  if (month === 5 && da === 18) {
    day.topInfo = t('618-da-cu')
  }

  if (month === 10 && da === 11) {
    day.topInfo = t('jing-dong-shuang-11')
  }

  if (day.type === 'start') {
    day.bottomInfo = t('kai-shi')
  }

  if (day.type === 'end') {
    day.bottomInfo = t('jie-shu')
  }

  if (day.type === 'same') {
    day.bottomInfo = t('kai-shi-jie-shu')
  }

  return day
}
const shortcuts = ref<Record<string, any>[]>([
  {
    text: t('jin-7-tian'),
    id: 7
  },
  {
    text: t('jin-15-tian'),
    id: 15
  },
  {
    text: t('jin-30-tian'),
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
  return dayjs(value[0]).format(t('yy-nian-mm-yue-dd-ri')) + ' - ' + dayjs(value[1]).format(t('yy-nian-mm-yue-dd-ri-0'))
}
const innerDisplayFormat = (value: string | number | Date | undefined, rangeType: string) => {
  if (!value) {
    return rangeType === 'start' ? t('huo-dong-kai-shi-shi-jian') : t('huo-dong-jie-shu-shi-jian')
  }

  return dayjs(value).format(t('yy-nian-mm-yue-dd-ri-1'))
}
const beforeConfirm = ({ value, resolve }: any) => {
  if (value > Date.now()) {
    toast.error(t('gai-ri-qi-zan-wu-shu-ju'))
    resolve(false)
  } else {
    resolve(true)
  }
}

function handleConfirm1({ value }: any) {
  console.log(value)
}
function handleConfirm2({ value }: any) {
  console.log(value)
}
function handleConfirm3({ value }: any) {
  console.log(value)
}
function handleConfirm4({ value }: any) {
  console.log(new Date(value).toString())
  formatValue.value = new Date(value).toString()
}

function handleConfirm5({ value }: any) {
  toast.success(t('yi-xuan-ze') + dayjs(value).format(t('yyyy-nian-mm-yue-dd-ri')))
}

function handleConfirm6({ value }: any) {
  console.log(value)
}

function handleClear1() {
  console.log('calendar 1 cleared')
}

function handleConfirmClear1({ value }: any) {
  console.log('calendar 1 confirmed:', value)
}

function handleClear2() {
  console.log('calendar 2 cleared')
}

function handleConfirmClear2({ value }: any) {
  console.log('calendar 2 confirmed:', value)
}
</script>
<style lang="scss" scoped></style>
