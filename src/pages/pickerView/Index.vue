<template>
  <page-wraper>
    <demo-block :title="`基本用法，数值: ${value1}`">
      <wd-picker-view v-model="value1" :columns="columns1" @change="(e) => onChange(1, e)" />
    </demo-block>

    <demo-block :title="`禁用选项，数值: ${value2}`">
      <wd-picker-view v-model="value2" :columns="columns2" @change="(e) => onChange(2, e)" />
    </demo-block>

    <demo-block :title="`立即触发 change，数值: ${value6}`">
      <wd-picker-view v-model="value6" :immediate-change="true" :columns="columns2" @change="(e) => onChange(2, e)" />
    </demo-block>

    <demo-block :title="`加载中，数值: ${value3}`">
      <wd-picker-view v-model="value3" :columns="columns3" loading @change="(e) => onChange(3, e)" />
    </demo-block>

    <demo-block :title="`多列，数值: [${value4}]`">
      <wd-picker-view v-model="value4" :columns="columns4" @change="(e) => onChange(4, e)" />
    </demo-block>

    <demo-block :title="`多级联动，数值: [${value5}]`">
      <wd-picker-view v-model="value5" :columns="columns5" :column-change="onChangeDistrict" @change="(e) => onChange(5, e)" />
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import type { PickerViewColumnChange } from '@/uni_modules/wot-design-uni/components/wd-picker-view/types'
import { ref } from 'vue'

const district: Record<string, Array<{ label: string; value: string }>> = {
  0: [
    { label: '北京', value: '110000' },
    { label: '广东省', value: '440000' }
  ],
  110000: [{ label: '北京', value: '110100' }],
  440000: [
    { label: '广州市', value: '440100' },
    { label: '韶关市', value: '440200' },
    { label: '深圳市', value: '440300' },
    { label: '珠海市', value: '440400' },
    { label: '汕头市', value: '440500' }
  ],
  110100: [
    { label: '东城区', value: '110101' },
    { label: '西城区', value: '110102' },
    { label: '朝阳区', value: '110105' },
    { label: '丰台区', value: '110106' },
    { label: '石景山区', value: '110107' }
  ],
  440100: [
    { label: '荔湾区', value: '440103' },
    { label: '越秀区', value: '440104' },
    { label: '海珠区', value: '440105' }
  ],
  440200: [{ label: '武江区', value: '440203' }],
  440300: [
    { label: '罗湖区', value: '440303' },
    { label: '福田区', value: '440304' }
  ],
  440400: [
    { label: '香洲区', value: '440402' },
    { label: '斗门区', value: '440403' },
    { label: '金湾区', value: '440404' }
  ],
  440500: [
    { label: '龙湖区', value: '440507' },
    { label: '金平区', value: '440511' }
  ]
}

const value1 = ref<string>('选项1')
const columns1 = ref(['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'])

const value2 = ref<string>('选项1')
const value6 = ref<string>('选项1')

const columns2 = ref([
  { label: '选项1' },
  { label: '选项2' },
  {
    label: '选项3',
    disabled: true
  },
  { label: '选项4' },
  { label: '选项5' },
  { label: '选项6' },
  { label: '选项7' }
])

const value3 = ref<string>('选项1')
const columns3 = ref(['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'])

const value4 = ref(['中南大学', '软件工程'])
const columns4 = ref([
  ['中山大学', '中南大学', '华南理工大学'],
  ['计算机科学与技术', '软件工程', '通信工程', '法学', '经济学']
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

function onChange(index: number, e: any) {
  console.log(e)
  if (index === 1) {
    // toast.show(`当前选中项: ${value}, 下标: ${index}`)
  }
  // this.setData({ [`value${dataset.index}`]: value })
}
</script>
<style lang="scss" scoped></style>
