<template>
  <page-wraper>
    <demo-block transparent>
      <wd-cell-group border>
        <wd-datetime-picker :label="$t('ri-qi-xuan-ze')" v-model="value1" @confirm="handleConfirm1" />
        <wd-datetime-picker :label="$t('ri-qi-xuan-ze-dai-miao')" use-second v-model="value18" />
        <wd-datetime-picker :label="$t('nian-yue-ri')" v-model="value2" type="date" @confirm="handleConfirm2" />
        <wd-datetime-picker :label="$t('nian-yue')" v-model="value3" type="year-month" @confirm="handleConfirm3" />
        <wd-datetime-picker :label="$t('nian')" v-model="value16" type="year" @confirm="handleConfirm16" />
        <wd-datetime-picker :label="$t('shi-fen')" v-model="value4" type="time" @confirm="handleConfirm4" />
        <wd-datetime-picker :label="$t('shi-jian-xuan-ze-dai-miao')" v-model="value19" type="time" use-second />
        <wd-datetime-picker :label="$t('zhan-shi-ge-shi')" v-model="value5" :display-format="displayFormat" @confirm="handleConfirm5" />
        <wd-datetime-picker :label="$t('nei-bu-ge-shi')" v-model="value6" :formatter="formatter" @confirm="handleConfirm6" />
        <wd-datetime-picker :label="$t('guo-lv-xuan-xiang')" v-model="value7" :filter="filter" @confirm="handleConfirm7" />
        <wd-datetime-picker label="before-confirm" v-model="value8" :before-confirm="beforeConfirm" @confirm="handleConfirm8" />
        <wd-datetime-picker :label="$t('cuo-wu')" v-model="value9" error @confirm="handleConfirm9" />
        <wd-datetime-picker :label="$t('bi-tian')" v-model="value10" required @confirm="handleConfirm10" />
        <wd-datetime-picker :label="$t('bi-tian-xing-hao-zai-you-ce')" v-model="value20" required marker-side="after" @confirm="handleConfirm20" />
        <wd-datetime-picker :label="$t('mo-ren-ri-qi')" v-model="value2" :default-value="value2" />
        <wd-datetime-picker
          :label="$t('shi-jian-fan-wei-yi-nian')"
          :minDate="minDate"
          :maxDate="maxDate"
          v-model="value17"
          @confirm="handleConfirm1"
        />
      </wd-cell-group>
    </demo-block>
    <demo-block :title="$t('label-bu-chuan-0')" transparent>
      <wd-datetime-picker v-model="value11" @confirm="handleConfirm11" />
    </demo-block>
    <demo-block :title="$t('da-xiao')" transparent>
      <wd-datetime-picker :label="$t('ri-qi-xuan-ze-0')" size="large" v-model="value12" @confirm="handleConfirm12" />
    </demo-block>
    <demo-block :title="$t('ke-qing-kong')" transparent>
      <wd-cell-group border>
        <wd-datetime-picker
          :label="$t('ri-qi-xuan-ze-ke-qing-kong')"
          v-model="valueClear1"
          clearable
          @clear="handleClear1"
          @confirm="handleConfirmClear1"
        />
        <wd-datetime-picker
          :label="$t('qu-yu-xuan-ze-ke-qing-kong')"
          v-model="valueClear2"
          clearable
          @clear="handleClear2"
          @confirm="handleConfirmClear2"
        />
      </wd-cell-group>
    </demo-block>
    <demo-block :title="$t('zhi-kao-you-zhan-shi')" transparent>
      <wd-datetime-picker :label="$t('ri-qi-xuan-ze-1')" align-right v-model="value13" @confirm="handleConfirm13" />
    </demo-block>
    <demo-block :title="$t('qu-yu-xuan-ze')" transparent>
      <wd-datetime-picker
        :label="$t('ri-qi-xuan-ze-2')"
        :title="$t('qing-xuan-ze-qu-jian')"
        v-model="value14"
        use-second
        @confirm="handleConfirm14"
      />
    </demo-block>
    <demo-block :title="$t('fan-wei-tab-zhan-shi-ge-shi')" transparent>
      <wd-datetime-picker
        :label="$t('ri-qi-xuan-ze-3')"
        v-model="value15"
        @confirm="handleConfirm15"
        :display-format-tab-label="displayFormatTabLabel"
      />
    </demo-block>
    <demo-block title="超出隐藏" transparent>
      <wd-cell-group border>
        <wd-datetime-picker label="日期选择器超出隐藏" v-model="valueEllipsis" ellipsis @confirm="handleConfirmEllipsis" />
        <wd-datetime-picker label="日期区间超出隐藏" v-model="valueRangeEllipsis" ellipsis @confirm="handleConfirmRangeEllipsis" />
      </wd-cell-group>
    </demo-block>
    <wd-toast />
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import type { DatetimePickerViewFilter, DatetimePickerViewFormatter } from '@/uni_modules/wot-design-uni/components/wd-datetime-picker-view/types'
import type {
  DatetimePickerDisplayFormat,
  DatetimePickerDisplayFormatTabLabel,
  DatetimePickerInstance
} from '@/uni_modules/wot-design-uni/components/wd-datetime-picker/types'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const value1 = ref<string>('')
const value2 = ref<number>(Date.now())
const value3 = ref<number>(Date.now())
const value4 = ref<string>('09:20')
const value5 = ref<number>(Date.now())
const value6 = ref<number>(Date.now())
const value7 = ref<number>(Date.now())
const value8 = ref<number>(Date.now())
const value9 = ref<number>(Date.now())
const value10 = ref<number>(Date.now())
const value11 = ref<string>('')
const value12 = ref<string>('')
const value13 = ref<number>(Date.now())
const value14 = ref<any[]>(['', ''])
const value15 = ref<any[]>(['', Date.now()])
const value16 = ref(Date.now())
const value17 = ref(Date.now())
const value18 = ref(Date.now())
const value19 = ref('09:20:26')
const value20 = ref<number>(Date.now())
const valueClear1 = ref<number>(Date.now())
const valueClear2 = ref<any[]>([Date.now(), Date.now()])
const valueEllipsis = ref<number>(Date.now())
const valueRangeEllipsis = ref<any[]>([Date.now(), Date.now() + 7 * 24 * 60 * 60 * 1000])
const minDate = ref<number>(Date.now())
const maxDate = ref<number>(new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()).getTime())

const formatter: DatetimePickerViewFormatter = (type, value) => {
  let formatValue = ''

  switch (type) {
    case 'year':
      formatValue = value + t('nian-0')
      break
    case 'month':
      formatValue = value + t('yue')
      break
    case 'date':
      formatValue = value + t('ri')
      break
    case 'hour':
      formatValue = value + t('shi')
      break
    case 'minute':
      formatValue = value + t('fen')
      break
  }
  return formatValue
}
const filter: DatetimePickerViewFilter = (type, values) => {
  if (type === 'minute') {
    return values.filter((value) => value % 5 === 0)
  }
  return values
}
const displayFormat: DatetimePickerDisplayFormat = (items) => {
  return t('items0label-nian-items1label-yue-items2label-ri-items3labelitems4label-0', [
    items[0].label,
    items[1].label,
    items[2].label,
    items[3].label,
    items[4].label
  ])
}
const toast = useToast()
const beforeConfirm = (value: number | string | (number | string)[], resolve: (isPass: boolean) => void, picker: DatetimePickerInstance) => {
  picker.setLoading(true)
  setTimeout(() => {
    picker.setLoading(false)
    if ((value as number) > Date.now()) {
      resolve(false)
      toast.error(t('bu-neng-xuan-ze-da-yu-jin-tian-de-ri-qi'))
    } else {
      resolve(true)
    }
  }, 2000)
}
const displayFormatTabLabel: DatetimePickerDisplayFormatTabLabel = (items) => {
  return t('items0label-nian-items1label-yue-items2label-ri-items3labelitems4label', [
    items[0].label,
    items[1].label,
    items[2].label,
    items[3].label,
    items[4].label
  ])
}

/** picker触发confirm事件，同步触发confirm事件 */
function handleConfirm1({ value }: any) {
  console.log(new Date(value))
}
function handleConfirm2({ value }: any) {
  console.log(value)
}
function handleConfirm3({ value }: any) {
  console.log(value)
}
function handleConfirm4({ value }: any) {
  console.log(value)
}
function handleConfirm5({ value }: any) {
  console.log(value)
}
function handleConfirm6({ value }: any) {
  console.log(value)
}
function handleConfirm7({ value }: any) {
  console.log(value)
}

function handleConfirm8({ value }: any) {
  console.log(value)
}
function handleConfirm9({ value }: any) {
  console.log(value)
}
function handleConfirm10({ value }: any) {
  console.log(value)
}
function handleConfirm11({ value }: any) {
  console.log(value)
}
function handleConfirm12({ value }: any) {
  console.log(value)
}
function handleConfirm13({ value }: any) {
  console.log(value)
}
function handleConfirm14({ value }: any) {
  console.log(value)
}
function handleConfirm15({ value }: any) {
  console.log(value)
}
function handleConfirm16({ value }: any) {
  console.log(value)
}
function handleConfirm20({ value }: any) {
  console.log(value)
}

function handleClear1() {
  console.log('datetime picker 1 cleared')
}

function handleConfirmClear1({ value }: any) {
  console.log('datetime picker 1 confirmed:', value)
}

function handleClear2() {
  console.log('datetime picker 2 cleared')
}

function handleConfirmClear2({ value }: any) {
  console.log('datetime picker 2 confirmed:', value)
}

function handleConfirmEllipsis({ value }: any) {
  console.log('ellipsis datetime picker confirmed:', value)
}

function handleConfirmRangeEllipsis({ value }: any) {
  console.log('range ellipsis datetime picker confirmed:', value)
}

/** picker触发cancel事件，同步触发cancel事件 */
function onCancel() {}
</script>
<style lang="scss" scoped></style>
