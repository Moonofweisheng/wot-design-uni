<template>
  <page-wraper>
    <demo-block transparent>
      <wd-cell-group border>
        <wd-cell title="单列选项" :value="cellValue.value1" is-link @click="visible.visible1 = true"></wd-cell>
        <wd-cell title="loading" :value="cellValue.value2" is-link @click="visible.visible2 = true"></wd-cell>
        <wd-cell title="多列" :value="cellValue.value3" is-link @click="visible.visible3 = true"></wd-cell>
        <wd-cell title="多级联动" :value="cellValue.value4" is-link @click="visible.visible4 = true"></wd-cell>
        <wd-cell title="自定义标题" :value="cellValue.value5" is-link @click="visible.visible5 = true" />
        <wd-cell title="before-confirm" :value="cellValue.value6" is-link @click="visible.visible6 = true" />
      </wd-cell-group>
    </demo-block>
    <wd-picker
      v-model:visible="visible.visible1"
      v-model="value1"
      :columns="columns0"
      @confirm="(result) => handleConfirm({ ...result, index: 1 })"
    />
    <wd-picker
      v-model:visible="visible.visible2"
      v-model="value2"
      loading
      :columns="columns1"
      @confirm="(result) => handleConfirm({ ...result, index: 2 })"
    />
    <wd-picker
      v-model="value3"
      v-model:visible="visible.visible3"
      :columns="columns2"
      @confirm="(result) => handleConfirm({ ...result, index: 3 })"
    />
    <wd-picker
      v-model="value4"
      v-model:visible="visible.visible4"
      :columns="columns3"
      :column-change="onChangeDistrict"
      @confirm="(result) => handleConfirm({ ...result, index: 4 })"
    />

    <wd-picker
      v-model="value5"
      v-model:visible="visible.visible5"
      :columns="columns4"
      title="文案标题"
      @confirm="(result) => handleConfirm({ ...result, index: 5 })"
    />

    <wd-picker
      v-model="value6"
      v-model:visible="visible.visible6"
      :columns="columns0"
      :before-confirm="beforeConfirm"
      @confirm="(result) => handleConfirm({ ...result, index: 6 })"
    />
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import { isArray } from '@/uni_modules/wot-design-uni/components/common/util'
import type { PickerViewColumnChange } from '@/uni_modules/wot-design-uni/components/wd-picker-view/types'
import type { PickerBeforeConfirm } from '@/uni_modules/wot-design-uni/components/wd-picker/types'
import { reactive, ref } from 'vue'

const toast = useToast()

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

const columns0 = ref(['选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'])
const columns1 = ref(['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'])
const columns2 = ref([
  ['中山大学', '中南大学', '华南理工大学'],
  ['计算机科学与技术', '软件工程', '通信工程', '法学', '经济学']
])
const columns3 = ref([district[0], district[district[0][0].value], district[district[district[0][0].value][0].value]])
const columns4 = ref(['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'])

const value1 = ref('')
const value2 = ref('选项4')
const value3 = ref([])
const value4 = ref([])
const value5 = ref('选项1')
const value6 = ref('')

const onChangeDistrict: PickerViewColumnChange = (pickerView, value, columnIndex, resolve) => {
  const item = (value as Record<string, any>[])[columnIndex]
  if (columnIndex === 0) {
    pickerView.setColumnData(1, district[item.value])
    pickerView.setColumnData(2, district[district[item.value][0].value])
  } else if (columnIndex === 1) {
    pickerView.setColumnData(2, district[item.value])
  }
  resolve()
}

const beforeConfirm: PickerBeforeConfirm = (value, resolve, picker) => {
  picker.setLoading(true)
  setTimeout(() => {
    picker.setLoading(false)
    if (['选项2', '选项3'].indexOf(value as string) > -1) {
      resolve(false)
      toast.error('选项校验不通过，请重新选择')
    } else {
      resolve(true)
    }
  }, 2000)
}

function handleConfirm({ selectedItems, index }: { selectedItems: Record<string, any> | Record<string, any>[]; index: number }) {
  cellValue[`value${index}`] = (isArray(selectedItems) ? selectedItems : [selectedItems])
    .map((item) => {
      return item.label
    })
    .join('/')
}

const visible = reactive({
  visible1: false,
  visible2: false,
  visible3: false,
  visible4: false,
  visible5: false,
  visible6: false
})

const cellValue = reactive<{ [key: PropertyKey]: any }>({
  value1: '',
  value2: '选项4',
  value3: '',
  value4: '',
  value5: '选项1',
  value6: ''
})
</script>
<style lang="scss" scoped></style>
