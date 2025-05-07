<template>
  <page-wraper show-dark-mode>
    <wd-message-box />
    <wd-toast />
    <wd-action-sheet v-model="showAction" :actions="actions" />

    <form @submit="formSubmit">
      <wd-cell-group custom-class="group" :title="$t('ji-chu-xin-xi')" border>
        <wd-input
          :label="$t('you-hui-quan-ming-cheng')"
          label-width="100px"
          :maxlength="20"
          show-word-limit
          name="couponName"
          required
          suffix-icon="warn-bold"
          clearable
          v-model="couponName"
          :placeholder="$t('qing-shu-ru-you-hui-quan-ming-cheng')"
          @change="handleCouponName"
          @clicksuffixicon="handleIconClick"
        />
        <wd-select-picker
          :label="$t('tui-guang-ping-tai')"
          label-width="100px"
          name="platform"
          v-model="platform"
          :columns="platformList"
          :placeholder="$t('qing-xuan-ze-tui-guang-ping-tai')"
          @confirm="handlePlatform"
        />
        <wd-picker :label="$t('you-hui-fang-shi')" label-width="100px" name="promotion" align-right v-model="promotion" :columns="promotionlist" />
        <wd-cell :title="$t('quan-mian-e')" required title-width="100px" custom-value-class="cell-left">
          <view style="text-align: left">
            <view class="inline-txt" style="margin-left: 0">{{ $t('man') }}</view>
            <wd-input
              no-border
              custom-style="display: inline-block; width: 70px; vertical-align: middle"
              :placeholder="$t('qing-shu-ru-jin-e')"
              v-model="threshold"
              name="threshold"
              @change="handleThreshold"
            />
            <view class="inline-txt">{{ $t('jian') }}</view>
            <wd-input
              no-border
              custom-style="display: inline-block; width: 70px; vertical-align: middle"
              :placeholder="$t('qing-shu-ru-jin-e-0')"
              v-model="price"
              name="price"
              @change="handlePrice"
            />
          </view>
        </wd-cell>
      </wd-cell-group>
      <wd-cell-group custom-class="group" :title="$t('shi-jian-he-di-zhi')" border>
        <wd-datetime-picker :label="$t('shi-jian')" label-width="100px" name="date" v-model="date" @confirm="handleDate" />
        <wd-col-picker
          :label="$t('di-zhi')"
          label-width="100px"
          name="address"
          v-model="address"
          :columns="area"
          :column-change="areaChange"
          @confirm="handleAddress"
        />
      </wd-cell-group>
      <wd-cell-group custom-class="group" :title="$t('qi-ta-xin-xi')" border>
        <wd-input
          :label="$t('huo-dong-xi-ze')"
          label-width="100px"
          v-model="content"
          :maxlength="300"
          show-word-limit
          :placeholder="$t('qing-shu-ru-huo-dong-xi-ze-xin-xi')"
          clearable
          name="content"
          @change="handleContent"
        />
        <wd-cell :title="$t('fa-huo-shu-liang')" center>
          <wd-input-number v-model="count" name="count" @change="handleCount" />
        </wd-cell>
        <wd-cell :title="$t('zhe-li-xian-shi-de-shi-duo-wen-zi-biao-ti-bao-han-fei-chang-de-wen-zi')" title-width="240px" center>
          <wd-switch v-model="switchVal" name="switchVal" @change="handleSwitch" />
        </wd-cell>
        <wd-input
          :label="$t('wai-bi-ba-bu')"
          label-width="100px"
          name="cardId"
          suffix-icon="camera"
          :placeholder="$t('qing-shu-ru-wai-bi-ba-bu')"
          clearable
          v-model="cardId"
          @change="handleCardId"
        />
        <wd-input
          :label="$t('ma-ka-ba-ka')"
          label-width="100px"
          name="phone"
          :placeholder="$t('qing-shu-ru-ma-ka-ba-ka')"
          clearable
          v-model="phone"
          @change="handlePhone"
        />
      </wd-cell-group>
      <view class="tip">
        <wd-checkbox v-model="read" name="read" @change="handleRead" custom-label-class="label-class">
          {{ $t('yi-yue-du-bing-tong-yi') }}
          <text style="color: #4d80f0">{{ $t('ba-la-ba-la-ba-la-xie-yi') }}</text>
        </wd-checkbox>
      </view>
      <view class="footer">
        <wd-button block round size="large">{{ $t('ti-jiao') }}</wd-button>
      </view>
    </form>
  </page-wraper>
</template>
<script setup lang="ts">
import { useToast, useMessage } from '@/uni_modules/wot-design-uni'
import type { ColPickerColumnChangeOption } from '@/uni_modules/wot-design-uni/components/wd-col-picker/types'
import { ref } from 'vue'
import { useColPickerData } from '@/hooks/useColPickerData'
import { useI18n } from 'vue-i18n'
import { type Action } from '@/uni_modules/wot-design-uni/components/wd-action-sheet/types'
const { colPickerData, findChildrenByCode } = useColPickerData()

const { t } = useI18n()

const showAction = ref<boolean>(false)
const actions = ref<Action[]>([])

const couponName = ref<string>('')
const couponNameErr = ref<boolean>(false)
const platform = ref<any>([])
const platformList = ref<any>([
  {
    value: '1',
    label: t('jing-dong')
  },
  {
    value: '2',
    label: t('kai-pu-le')
  },
  {
    value: '3',
    label: t('shou-q')
  },
  {
    value: '4',
    label: t('wei-xin')
  },
  {
    value: '5',
    label: t('1-hao-dian')
  },
  {
    value: '6',
    label: t('shi-yuan-jie')
  },
  {
    value: '7',
    label: t('jing-dong-ji-su-ban')
  }
])
const promotion = ref<string>('1')
const promotionlist = ref<any[]>([
  {
    value: '1',
    label: t('man-jian')
  },
  {
    value: '2',
    label: t('wu-men-jian')
  }
])
const threshold = ref<string>('')
const price = ref<string>('')
const date = ref<number>(new Date().getTime())
const address = ref<any[]>([])

const count = ref<number>(1)

const area = ref<any[]>([
  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text
    }
  })
])
const areaChange = ({ selectedItem, resolve, finish }: ColPickerColumnChangeOption) => {
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
const content = ref<string>('')
const coun = ref<number>(1)
const read = ref<boolean>(false)
const switchVal = ref<boolean>(true)
const cardId = ref<string>('')
const phone = ref<string>('')

const toast = useToast()
const messageBox = useMessage()

function showActions() {
  showAction.value = true
  actions.value = [
    {
      name: t('xuanXiang_1-0')
    },
    {
      name: t('xuanXiang_2-0')
    },
    {
      name: t('xuanXiang_3-0'),
      subname: t('miaoShuXinXi-0')
    }
  ]
}

function handleCouponName({ value }: any) {
  console.log(value)

  couponNameErr.value = false
}
function handlePlatform({ value }: any) {
  console.log(value)
}
function handleThreshold({ value }: any) {
  console.log(value)
}
function handlePrice({ value }: any) {
  console.log(value)
}
function handleAddress({ value }: any) {
  console.log(value)
}
function handleContent({ value }: any) {
  console.log(value)
}
function handleCount({ value }: any) {
  console.log(value)
}
function handleSwitch({ value }: any) {
  console.log(value)
}
function handleRead({ value }: any) {
  read.value = value
}
function handleCardId({ value }: any) {
  console.log(value)
}
function handlePhone({ value }: any) {
  console.log(value)
}
function formSubmit(event: any) {
  console.log(event)

  if (!couponName.value) {
    toast.error(t('qing-tian-xie-you-hui-quan-ming-cheng'))
    return
  }
  messageBox.alert(t('ti-jiao-cheng-gong'))
}
function handleIconClick() {
  toast.info(t('you-hui-quan-ti-shi-xin-xi'))
}
function handleDate({ value }: any) {
  console.log(value)
}
</script>
<style lang="scss" scoped>
.wot-theme-dark {
  .inline-txt {
    color: $-dark-color;
  }
}
.custom-value {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
  white-space: nowrap;
}
.inline-txt {
  display: inline-block;
  font-size: 14px;
  margin: 0 8px;
  color: rgba(0, 0, 0, 0.45);
  vertical-align: middle;
}
:deep(.group) {
  margin-top: 12px;
}
.tip {
  margin: 10px 15px 21px;
  color: #999;
  font-size: 12px;
}
.footer {
  padding: 0 25px 21px;
}
:deep(.label-class) {
  color: #999 !important;
  font-size: 12px !important;
}
</style>
