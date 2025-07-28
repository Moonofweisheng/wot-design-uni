<template>
  <page-wraper>
    <demo-block transparent>
      <wd-cell-group border>
        <wd-picker :label="$t('dan-lie-xuan-xiang')" v-model="value0" :columns="columns0" />
        <wd-picker :label="$t('jinYong')" disabled v-model="value1" :columns="columns1" />
        <wd-picker :label="$t('zhi-du')" readonly v-model="value2" :columns="columns2" />
        <wd-picker label="loading" v-model="value3" loading :columns="columns3" />
        <wd-picker :label="$t('duo-lie')" v-model="value4" :columns="columns4" />
        <wd-picker :label="$t('duo-ji-lian-dong')" v-model="value5" :columns="columns5" :column-change="onChangeDistrict" />
        <wd-picker :label="$t('fen-ge-fu')" v-model="value6" :columns="columns6" :display-format="displayFormat" />
        <wd-picker :label="$t('biaoTi-0')" v-model="value9" :columns="columns7" :title="$t('wen-an-biao-ti')" />
        <wd-picker label="before-confirm" :columns="columns0" v-model="value7" :before-confirm="beforeConfirm" />
        <wd-picker :label="$t('cuo-wu')" v-model="value10" error :columns="columns0" />
        <wd-picker :label="$t('bi-tian')" v-model="value11" :columns="columns0" required />
        <wd-picker :label="$t('bi-tian-xing-hao-zai-you-ce')" v-model="value16" :columns="columns0" required marker-side="after" />
        <wd-picker
          :label="$t('duo-ji-lian-dong-ke-qing-kong')"
          clearable
          v-model="value15"
          :columns="columns5"
          :column-change="onChangeDistrict"
          @clear="handleClear"
          @confirm="handleConfirmClear"
        />
      </wd-cell-group>
    </demo-block>
    <demo-block :title="$t('label-bu-chuan-0')" transparent>
      <wd-picker :columns="columns0" v-model="value12" />
    </demo-block>
    <demo-block :title="$t('da-xiao')" transparent>
      <wd-picker :label="$t('dan-lie-xuan-xiang')" v-model="value13" size="large" :columns="columns0" />
    </demo-block>
    <demo-block :title="$t('zhi-kao-you-xian-shi')" transparent>
      <wd-picker :label="$t('dan-lie-xuan-xiang')" v-model="value14" align-right :columns="columns0" />
    </demo-block>
    <demo-block :title="$t('mo-ren-cha-cao')" transparent>
      <view class="default-slot">
        <view class="default-slot-txt">
          {{ $t('xuan-zhong-zhi') }}
          <text style="color: #34d19d">{{ value8 }}</text>
        </view>
        <wd-picker :columns="columns0" v-model="value8" use-default-slot @confirm="handleConfirm">
          <wd-button>{{ $t('cha-cao-huan-qi') }}</wd-button>
        </wd-picker>
      </view>
    </demo-block>
    <wd-toast />
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import type { ColumnItem, PickerViewColumnChange } from '@/uni_modules/wot-design-uni/components/wd-picker-view/types'
import type { PickerBeforeConfirm, PickerDisplayFormat } from '@/uni_modules/wot-design-uni/components/wd-picker/types'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const toast = useToast()

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

const columns0 = ref([
  t(
    'xuan-xiang-1-xuan-xiang-1-xuan-xiang-1-xuan-xiang-1-xuan-xiang-1-xuan-xiang-1-xuan-xiang-1-xuan-xiang-1-xuan-xiang-1-xuan-xiang-1-xuan-xiang-1-xuan-xiang-1-xuan-xiang-1'
  ),
  t('xuanXiang_2-0'),
  t('xuanXiang_3-0'),
  t('xuan-xiang-4'),
  t('xuan-xiang-5'),
  t('xuan-xiang-6'),
  t('xuan-xiang-7')
])
const value0 = ref('')

const value1 = ref(t('xuanXiang_3-0'))
const columns1 = ref([
  t('xuanXiang_1-0'),
  t('xuanXiang_2-0'),
  t('xuanXiang_3-0'),
  t('xuan-xiang-4'),
  t('xuan-xiang-5'),
  t('xuan-xiang-6'),
  t('xuan-xiang-7')
])
const value2 = ref(t('xuan-xiang-4'))
const columns2 = ref([
  t('xuanXiang_1-0'),
  t('xuanXiang_2-0'),
  t('xuanXiang_3-0'),
  t('xuan-xiang-4'),
  t('xuan-xiang-5'),
  t('xuan-xiang-6'),
  t('xuan-xiang-7')
])

const columns3 = ref([
  t('xuanXiang_1-0'),
  t('xuanXiang_2-0'),
  t('xuanXiang_3-0'),
  t('xuan-xiang-4'),
  t('xuan-xiang-5'),
  t('xuan-xiang-6'),
  t('xuan-xiang-7')
])
const value3 = ref(t('xuan-xiang-4'))

const value4 = ref([])
const columns4 = ref([
  [t('zhong-shan-da-xue'), t('zhong-nan-da-xue'), t('hua-nan-li-gong-da-xue')],
  [t('ji-suan-ji-ke-xue-yu-ji-shu'), t('ruan-jian-gong-cheng'), t('tong-xin-gong-cheng'), t('fa-xue'), t('jing-ji-xue')]
])

const value5 = ref(['110000', '110100', '110102'])
const value15 = ref(['110000', '110100', '110102'])
const columns5 = ref([district[0], district[district[0][0].value], district[district[district[0][0].value][0].value]])

const value6 = ref([t('zhong-nan-da-xue-0'), t('ruan-jian-gong-cheng-0')])
const value8 = ref(t('xuanXiang_2-0'))
const value9 = ref(t('xuanXiang_1-0'))
const value10 = ref(t('xuanXiang_2-0'))

const value11 = ref(t('xuanXiang_3-0'))
const value12 = ref(t('xuanXiang_3-0'))
const value13 = ref(t('xuanXiang_3-0'))
const value14 = ref(t('xuanXiang_3-0'))
const value16 = ref(t('xuanXiang_2-0'))

const columns6 = ref([
  [t('zhong-shan-da-xue-0'), t('zhong-nan-da-xue-1'), t('hua-nan-li-gong-da-xue-0')],
  [t('ji-suan-ji-ke-xue-yu-ji-shu-0'), t('ruan-jian-gong-cheng-1'), t('tong-xin-gong-cheng-0'), t('fa-xue-0'), t('jing-ji-xue-0')]
])

const columns7 = ref([
  t('xuanXiang_1-0'),
  t('xuanXiang_2-0'),
  t('xuanXiang_3-0'),
  t('xuan-xiang-4'),
  t('xuan-xiang-5'),
  t('xuan-xiang-6'),
  t('xuan-xiang-7')
])

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
    if ([t('xuanXiang_2-0'), t('xuanXiang_3-0')].indexOf(value as string) > -1) {
      resolve(false)
      toast.error(t('xuan-xiang-xiao-yan-bu-tong-guo-qing-zhong-xin-xuan-ze'))
    } else {
      resolve(true)
    }
  }, 2000)
}

function handleConfirm({ value }: any) {
  value8.value = value
}

function handleClear() {
  value15.value = []
  toast.success(t('xuan-xiang-yi-jing-qing-kong'))
}

function handleConfirmClear({ value }: any) {
  value15.value = value
  toast.success(t('xuan-xiang-yi-jing-qing-kong'))
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
