<template>
  <page-wraper>
    <view>
      <wd-cell-group border>
        <wd-col-picker :label="$t('xuan-ze-di-zhi')" v-model="value1" :columns="areaData1" :column-change="columnChange1" @confirm="handleValue" />
        <wd-col-picker :label="$t('chu-shi-xuan-xiang')" v-model="value2" :columns="areaData2" :column-change="columnChange" auto-complete />
        <wd-col-picker :label="$t('jinYong')" disabled v-model="value3" :columns="areaData3" :column-change="columnChange1" />
        <wd-col-picker :label="$t('zhi-du')" readonly v-model="value3" :columns="areaData3" :column-change="columnChange1" />
        <wd-col-picker :label="$t('jin-yong-xuan-xiang')" v-model="value4" :columns="areaData4" :column-change="columnChange1" />
        <wd-col-picker :label="$t('xuan-xiang-ti-shi-xin-xi')" v-model="value5" :columns="areaData5" :column-change="columnChange1" />
        <wd-col-picker
          :label="$t('zhan-shi-ge-shi-hua')"
          v-model="value6"
          :columns="areaData3"
          :column-change="columnChange1"
          :display-format="displayFormat"
        />
        <wd-col-picker :label="$t('biaoTi-0')" v-model="value7" :title="$t('xuan-ze-di-zhi')" :columns="areaData1" :column-change="columnChange1" />
        <wd-col-picker label="before-confirm" v-model="value8" :columns="areaData1" :column-change="columnChange1" :before-confirm="beforeConfirm" />
        <wd-col-picker :label="$t('cuo-wu')" error v-model="value9" :columns="areaData1" :column-change="columnChange1" />
        <wd-col-picker :label="$t('bi-tian')" required v-model="value10" :columns="areaData1" :column-change="columnChange1" />
        <wd-col-picker
          :label="$t('bi-tian-xing-hao-zai-you-ce')"
          required
          v-model="value16"
          :columns="areaData1"
          :column-change="columnChange1"
          marker-side="after"
        />
      </wd-cell-group>
    </view>
    <demo-block
      :title="
        $t(
          'yi-ban-columnchange-shi-ge-yi-bu-huo-qu-shu-ju-de-cao-zuo-chu-fa-columnchange-zu-jian-hui-you-mo-ren-loading-shu-ju-xiang-ying-hou-guan-bi-loading'
        )
      "
      transparent
    >
      <wd-col-picker :label="$t('xuan-ze-di-zhi')" v-model="value11" :columns="areaData1" :column-change="columnChange2" />
    </demo-block>
    <demo-block :title="$t('label-bu-chuan')" transparent>
      <wd-col-picker v-model="value12" :columns="areaData1" :column-change="columnChange1" />
    </demo-block>
    <demo-block :title="$t('da-xiao')" transparent>
      <wd-col-picker :label="$t('xuan-ze-di-zhi')" v-model="value13" size="large" :columns="areaData1" :column-change="columnChange1" />
    </demo-block>
    <demo-block :title="$t('zhi-kao-you-zhan-shi')" transparent>
      <wd-col-picker :label="$t('xuan-ze-di-zhi')" align-right v-model="value14" :columns="areaData1" :column-change="columnChange1" />
    </demo-block>

    <demo-block :title="$t('zi-ding-yi-xuan-ze-qi')" transparent>
      <view style="margin-left: 15px">
        <view style="margin-bottom: 10px"></view>
        <view style="margin-bottom: 10px">{{ $t('dang-qian-xuan-zhong-xiang-displayvalue') }} {{ displayValue }}</view>

        <wd-col-picker
          v-model="value15"
          use-default-slot
          :columns="areaData1"
          :column-change="columnChange1"
          style="display: inline-block"
          @confirm="handleConfirm"
        >
          <wd-button>{{ $t('xuan-ze-di-zhi') }}</wd-button>
        </wd-col-picker>
      </view>
    </demo-block>
    <wd-toast />
  </page-wraper>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useToast } from '@/uni_modules/wot-design-uni'
import type { ColPickerColumnChange } from '@/uni_modules/wot-design-uni/components/wd-col-picker/types'
import { useColPickerData } from '@/hooks/useColPickerData'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { colPickerData, findChildrenByCode } = useColPickerData()
const toast = useToast()

onMounted(async () => {
  toast.loading(t('shu-ju-jia-zai-zhong'))
  await sleep()
  toast.close()
  value2.value = ['150000', '150100', '150121']
})

const value1 = ref<any[]>([])
const value2 = ref<string[]>([])
const value3 = ref<any[]>(['130000', '130200', '130204'])
const value4 = ref<any[]>([])
const value5 = ref<any[]>([])
const value6 = ref<any[]>(['130000', '130200', '130204'])
const value7 = ref<any[]>([])
const value8 = ref<any[]>([])
const value9 = ref<any[]>([])
const value10 = ref<any[]>([])
const value11 = ref<any[]>([])
const value12 = ref<any[]>([])
const value13 = ref<any[]>([])
const value14 = ref<any[]>([])
const value15 = ref<any[]>([])
const value16 = ref<any[]>([])
const displayValue = ref<string>('')
const areaData1 = ref<any[]>([
  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text
    }
  })
])

const areaData2 = ref<any[]>([])
const areaData3 = ref<any[]>([
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
const areaData4 = ref<any[]>([
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
      tip:
        item.value === '140000'
          ? t('gai-di-qu-wu-huo-zan-shi-wu-fa-xuan-ze')
          : item.value === '150000'
          ? t('gai-di-qu-pei-song-shi-jian-ke-neng-jiao-chang')
          : ''
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

const columnChange: ColPickerColumnChange = async ({ selectedItem, resolve, finish }) => {
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
      toast.error(t('shu-ju-qing-qiu-shi-bai-qing-zhong-shi'))
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
const displayFormat = (selectedItems: Record<string, any>[]) => {
  return selectedItems[selectedItems.length - 2].label + '-' + selectedItems[selectedItems.length - 1].label
}
const beforeConfirm = (value: (string | number)[], selectedItems: Record<string, any>[], resolve: (isPass: boolean) => void) => {
  if (parseInt(String(value[2])) > 120000) {
    toast.error(t('gai-di-qu-ku-cun-bu-zu'))
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

function handleConfirm({ selectedItems }: any) {
  displayValue.value = selectedItems
    .map((item: any) => {
      return item.label
    })
    .join('')
}
function handleValue({ value }: any) {
  console.log(value)
}
</script>
<style lang="scss" scoped></style>
