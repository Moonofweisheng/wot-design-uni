<template>
  <page-wraper>
    <wd-toast />
    <demo-block transparent>
      <wd-cell-group border>
        <wd-picker label="单列选项" v-model="value0" :columns="columns0" />
        <wd-picker label="禁用" disabled v-model="value1" :columns="columns1" />
        <wd-picker label="只读" readonly v-model="value2" :columns="columns2" />
        <wd-picker label="loading" v-model="value3" loading :columns="columns3" />
        <wd-picker label="多列" v-model="value4" :columns="columns4" />
        <wd-picker label="多级联动" v-model="value5" :columns="columns5" :column-change="onChangeDistrict" />
        <wd-picker label="分隔符" v-model="value6" :columns="columns6" :display-format="displayFormat" />
        <wd-picker label="标题" v-model="value9" :columns="columns7" title="文案标题" />
        <wd-picker label="before-confirm" :columns="columns0" v-model="value7" :before-confirm="beforeConfirm" />
        <wd-picker label="错误" v-model="value10" error :columns="columns0" />
        <wd-picker label="必填" v-model="value11" :columns="columns0" required />
      </wd-cell-group>
    </demo-block>
    <demo-block title="label 不传" transparent>
      <wd-picker :columns="columns0" v-model="value12" />
    </demo-block>
    <demo-block title="大小" transparent>
      <wd-picker label="单列选项" v-model="value13" size="large" :columns="columns0" />
    </demo-block>
    <demo-block title="值靠右显示" transparent>
      <wd-picker label="单列选项" v-model="value14" align-right :columns="columns0" />
    </demo-block>
    <demo-block title="默认插槽" transparent>
      <view class="default-slot">
        <view class="default-slot-txt">
          选中值：
          <text style="color: #34d19d">{{ value8 }}</text>
        </view>
        <wd-picker :columns="columns0" v-model="value8" use-default-slot @confirm="handleConfirm">
          <wd-button>插槽唤起</wd-button>
        </wd-picker>
      </view>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import type { ColumnItem, PickerViewColumnChange } from '@/uni_modules/wot-design-uni/components/wd-picker-view/types'
import type { PickerBeforeConfirm, PickerDisplayFormat } from '@/uni_modules/wot-design-uni/components/wd-picker/types'
import { ref } from 'vue'

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
const value0 = ref('')

const value1 = ref('选项3')
const columns1 = ref(['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'])
const value2 = ref('选项4')
const columns2 = ref(['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'])

const columns3 = ref(['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'])
const value3 = ref('选项4')

const value4 = ref([])
const columns4 = ref([
  ['中山大学', '中南大学', '华南理工大学'],
  ['计算机科学与技术', '软件工程', '通信工程', '法学', '经济学']
])

const value5 = ref(['110000', '110100', '110102'])
const columns5 = ref([district[0], district[district[0][0].value], district[district[district[0][0].value][0].value]])

const value6 = ref(['中南大学', '软件工程'])
const value8 = ref('选项2')
const value9 = ref('选项1')
const value10 = ref('选项2')

const value11 = ref('选项3')
const value12 = ref('选项3')
const value13 = ref('选项3')
const value14 = ref('选项3')

const columns6 = ref([
  ['中山大学', '中南大学', '华南理工大学'],
  ['计算机科学与技术', '软件工程', '通信工程', '法学', '经济学']
])

const columns7 = ref(['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'])

const value7 = ref('')

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

const displayFormat: PickerDisplayFormat = (items) => {
  return (items as ColumnItem[])
    .map((item) => {
      return item.label
    })
    .join('-')
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

function handleConfirm({ value }: any) {
  value8.value = value
}
</script>
<style lang="scss" scoped>
.wot-theme-dark {
  .default-slot {
    background: $-dark-background2;
  }
  .default-slot-txt {
    color: $-dark-color3;
  }
}
.default-slot {
  background: #fff;
  padding: 15px;
}

.default-slot-txt {
  margin-bottom: 10px;
  color: rgba(0, 0, 0, 0.45);
}
</style>
