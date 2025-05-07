<template>
  <page-wraper>
    <demo-block :title="$t('ji-ben-yong-fa-shu-zhi-value1') + value1">
      <wd-picker-view v-model="value1" :columns="columns1" />
    </demo-block>

    <demo-block :title="$t('jin-yong-xuan-xiang-shu-zhi-value2') + value2">
      <wd-picker-view v-model="value2" :columns="columns2" />
    </demo-block>

    <demo-block :title="$t('li-ji-chu-fa-change-shu-zhi-value6') + value6">
      <wd-picker-view v-model="value6" :immediate-change="true" :columns="columns2" />
    </demo-block>

    <demo-block :title="$t('jia-zai-zhong-shu-zhi-value3') + value3">
      <wd-picker-view v-model="value3" :columns="columns3" loading />
    </demo-block>

    <demo-block :title="$t('duo-lie-shu-zhi-value4') + `[${value4}]`">
      <wd-picker-view v-model="value4" :columns="columns4" />
    </demo-block>

    <demo-block :title="$t('duo-ji-lian-dong-shu-zhi-value5') + `[${value5}]`">
      <wd-picker-view v-model="value5" :columns="columns5" :column-change="onChangeDistrict" />
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import type { PickerViewColumnChange } from '@/uni_modules/wot-design-uni/components/wd-picker-view/types'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const district: Record<string, Array<{ label: string; value: string }>> = {
  0: [
    { label: t('bei-jing'), value: '110000' },
    { label: t('guang-dong-sheng'), value: '440000' }
  ],
  110000: [{ label: t('bei-jing'), value: '110100' }],
  440000: [
    { label: t('guang-zhou-shi'), value: '440100' },
    { label: t('shao-guan-shi'), value: '440200' },
    { label: t('shen-zhen-shi'), value: '440300' },
    { label: t('zhu-hai-shi'), value: '440400' },
    { label: t('shan-tou-shi'), value: '440500' }
  ],
  110100: [
    { label: t('dong-cheng-qu'), value: '110101' },
    { label: t('xi-cheng-qu'), value: '110102' },
    { label: t('zhao-yang-qu'), value: '110105' },
    { label: t('feng-tai-qu'), value: '110106' },
    { label: t('shi-jing-shan-qu'), value: '110107' }
  ],
  440100: [
    { label: t('li-wan-qu'), value: '440103' },
    { label: t('yue-xiu-qu'), value: '440104' },
    { label: t('hai-zhu-qu'), value: '440105' }
  ],
  440200: [{ label: t('wu-jiang-qu'), value: '440203' }],
  440300: [
    { label: t('luo-hu-qu'), value: '440303' },
    { label: t('fu-tian-qu'), value: '440304' }
  ],
  440400: [
    { label: t('xiang-zhou-qu'), value: '440402' },
    { label: t('dou-men-qu'), value: '440403' },
    { label: t('jin-wan-qu'), value: '440404' }
  ],
  440500: [
    { label: t('long-hu-qu'), value: '440507' },
    { label: t('jin-ping-qu'), value: '440511' }
  ]
}

const value1 = ref<string>(t('xuanXiang_1-0'))
const columns1 = ref([
  t('xuanXiang_1-0'),
  t('xuanXiang_2-0'),
  t('xuanXiang_3-0'),
  t('xuan-xiang-4'),
  t('xuan-xiang-5'),
  t('xuan-xiang-6'),
  t('xuan-xiang-7')
])

const value2 = ref<string>(t('xuanXiang_1-0'))
const value6 = ref<string>(t('xuanXiang_1-0'))

const columns2 = ref([
  { label: t('xuanXiang_1-0') },
  { label: t('xuanXiang_2-0') },
  {
    label: t('xuanXiang_3-0'),
    disabled: true
  },
  { label: t('xuan-xiang-4') },
  { label: t('xuan-xiang-5') },
  { label: t('xuan-xiang-6') },
  { label: t('xuan-xiang-7') }
])

const value3 = ref<string>(t('xuanXiang_1-0'))
const columns3 = ref([
  t('xuanXiang_1-0'),
  t('xuanXiang_2-0'),
  t('xuanXiang_3-0'),
  t('xuan-xiang-4'),
  t('xuan-xiang-5'),
  t('xuan-xiang-6'),
  t('xuan-xiang-7')
])

const value4 = ref([t('zhong-nan-da-xue-0'), t('ruan-jian-gong-cheng-0')])
const columns4 = ref([
  [t('zhong-shan-da-xue-0'), t('zhong-nan-da-xue-0'), t('hua-nan-li-gong-da-xue-0')],
  [t('ji-suan-ji-ke-xue-yu-ji-shu-0'), t('ruan-jian-gong-cheng-0'), t('tong-xin-gong-cheng-0'), t('fa-xue-0'), t('jing-ji-xue-0')]
])

const value5 = ref(['110000', '110100', '110102'])
const columns5 = ref([district[0], district[district[0][0].value], district[district[district[0][0].value][0].value]])

const onChangeDistrict: PickerViewColumnChange = (picker, value, columnIndex, resolve) => {
  const item = (value as Record<string, any>[])[columnIndex]
  if (columnIndex === 0) {
    picker.setColumnData(1, district[item.value])
    picker.setColumnData(2, district[district[item.value][0].value])
  } else if (columnIndex === 1) {
    picker.setColumnData(2, district[item.value])
  }
  resolve()
}
</script>
<style lang="scss" scoped></style>
