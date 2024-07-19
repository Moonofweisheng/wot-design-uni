<template>
  <view>
    <page-wraper>
      <wd-message-box />
      <wd-toast />
      <wd-form ref="form" :model="model" :rules="rules">
        <wd-cell-group custom-class="group" title="基础信息" border>
          <wd-input
            label="优惠券名称"
            label-width="100px"
            :maxlength="20"
            show-word-limit
            prop="couponName"
            required
            suffix-icon="warn-bold"
            clearable
            v-model="model.couponName"
            placeholder="请输入优惠券名称"
            @clicksuffixicon="handleIconClick"
          />
          <wd-select-picker
            label="推广平台"
            label-width="100px"
            prop="platform"
            v-model="model.platform"
            :columns="platformList"
            placeholder="请选择推广平台"
          />
          <wd-picker
            label="优惠方式"
            placeholder="请选择优惠方式"
            label-width="100px"
            prop="promotion"
            v-model="model.promotion"
            :columns="promotionlist"
          />
          <wd-cell prop="threshold" title="券面额" required title-width="100px" custom-value-class="cell-left">
            <view style="text-align: left">
              <view class="inline-txt" style="margin-left: 0">满</view>
              <wd-input
                no-border
                custom-style="display: inline-block; width: 70px; vertical-align: middle"
                placeholder="请输入金额"
                v-model="model.threshold"
              />
              <view class="inline-txt">减</view>
              <wd-input
                no-border
                custom-style="display: inline-block; width: 70px; vertical-align: middle"
                placeholder="请输入金额"
                v-model="model.price"
              />
            </view>
          </wd-cell>
        </wd-cell-group>
        <wd-cell-group custom-class="group" title="时间和地址" border>
          <wd-datetime-picker label="时间" label-width="100px" placeholder="请选择时间" prop="time" v-model="model.time" />
          <wd-calendar label="日期" label-width="100px" placeholder="请选择日期" prop="date" v-model="model.date" />

          <wd-col-picker
            label="地址"
            placeholder="请选择地址"
            label-width="100px"
            prop="address"
            v-model="model.address"
            :columns="area"
            :column-change="areaChange"
          />
        </wd-cell-group>
        <wd-cell-group custom-class="group" title="其他信息" border>
          <wd-textarea
            label="活动细则"
            label-width="100px"
            type="textarea"
            v-model="model.content"
            :maxlength="300"
            show-word-limit
            placeholder="请输入活动细则信息"
            clearable
            prop="content"
          />
          <wd-cell title="发货数量" title-width="100px" prop="count">
            <view style="text-align: left">
              <wd-input-number v-model="model.count" />
            </view>
          </wd-cell>
          <wd-cell title="开启折扣" title-width="100px" prop="switchVal" center>
            <view style="text-align: left">
              <wd-switch v-model="model.switchVal" />
            </view>
          </wd-cell>
          <wd-input
            label="歪比巴卜"
            label-width="100px"
            prop="cardId"
            suffix-icon="camera"
            placeholder="请输入歪比巴卜"
            clearable
            v-model="model.cardId"
          />
          <wd-input label="玛卡巴卡" label-width="100px" prop="phone" placeholder="请输入玛卡巴卡" clearable v-model="model.phone" />
          <wd-cell title="活动图片" title-width="100px" prop="fileList">
            <wd-upload :file-list="model.fileList" action="https://ftf.jd.com/api/uploadImg" @change="handleFileChange"></wd-upload>
          </wd-cell>
        </wd-cell-group>
        <view class="tip">
          <wd-checkbox v-model="model.read" prop="read" custom-label-class="label-class">
            已阅读并同意
            <text style="color: #4d80f0">《巴拉巴拉吧啦协议》</text>
          </wd-checkbox>
        </view>
        <view class="footer">
          <wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
        </view>
      </wd-form>
    </page-wraper>
  </view>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import { isArray } from '@/uni_modules/wot-design-uni/components/common/util'
import type { ColPickerColumnChange } from '@/uni_modules/wot-design-uni/components/wd-col-picker/types'
import { type FormInstance, type FormRules } from '@/uni_modules/wot-design-uni/components/wd-form/types'
import type { UploadFileItem } from '@/uni_modules/wot-design-uni/components/wd-upload/types'
import { useColPickerData } from '@/hooks/useColPickerData'

const { colPickerData, findChildrenByCode } = useColPickerData()

import { reactive, ref } from 'vue'

const model = reactive<{
  couponName: string
  platform: any[]
  promotion: string
  threshold: string
  price: string
  time: number | string
  date: null | number
  address: string[]
  count: number
  content: string
  switchVal: boolean
  cardId: string
  phone: string
  read: boolean
  fileList: UploadFileItem[]
}>({
  couponName: '',
  platform: [],
  promotion: '',
  threshold: '',
  price: '',
  date: null,
  time: '',
  address: [],
  count: 1,
  content: '',
  switchVal: true,
  cardId: '',
  phone: '',
  read: false,
  fileList: []
})

const rules: FormRules = {
  couponName: [
    {
      required: true,
      pattern: /\d{6}/,
      message: '优惠券名称6个字以上',
      validator: (value) => {
        if (value) {
          return Promise.resolve()
        } else {
          return Promise.reject('请输入优惠券名称')
        }
      }
    }
  ],
  content: [
    {
      required: true,
      message: '请输入活动细则信息',
      validator: (value) => {
        if (value && value.length > 2) {
          return Promise.resolve()
        } else {
          return Promise.reject('请输入活动细则信息')
        }
      }
    }
  ],
  threshold: [
    {
      required: true,
      message: '请输入满减金额',
      validator: (value) => {
        if (value && model.price) {
          return Promise.resolve()
        } else {
          return Promise.reject()
        }
      }
    }
  ],
  platform: [
    {
      required: true,
      message: '请选择推广平台',
      validator: (value) => {
        if (value && isArray(value) && value.length) {
          return Promise.resolve()
        } else {
          return Promise.reject('请选择推广平台')
        }
      }
    }
  ],
  promotion: [
    {
      required: true,
      message: '请选择推广平台',
      validator: (value) => {
        if (value) {
          return Promise.resolve()
        } else {
          return Promise.reject('请选择推广平台')
        }
      }
    }
  ],
  time: [
    {
      required: true,
      message: '请选择时间',
      validator: (value) => {
        if (value) {
          return Promise.resolve()
        } else {
          return Promise.reject('请选择时间')
        }
      }
    }
  ],
  date: [
    {
      required: true,
      message: '请选择日期',
      validator: (value) => {
        if (value) {
          return Promise.resolve()
        } else {
          return Promise.reject()
        }
      }
    }
  ],
  address: [
    {
      required: true,
      message: '请选择地址',
      validator: (value) => {
        if (isArray(value) && value.length) {
          return Promise.resolve()
        } else {
          return Promise.reject('请选择地址')
        }
      }
    }
  ],
  count: [
    {
      required: true,
      message: '发货数量需要大于1',
      validator: (value) => {
        if (Number(value) > 1) {
          return Promise.resolve()
        } else {
          return Promise.reject('发货数量需要大于1')
        }
      }
    }
  ],
  cardId: [
    {
      required: true,
      message: '请输入歪比巴卜',
      validator: (value) => {
        if (value) {
          return Promise.resolve()
        } else {
          return Promise.reject('请输入歪比巴卜')
        }
      }
    }
  ],
  phone: [
    {
      required: true,
      message: '请输入玛卡巴卡',
      validator: (value) => {
        if (value) {
          return Promise.resolve()
        } else {
          return Promise.reject()
        }
      }
    }
  ],
  fileList: [
    {
      required: true,
      message: '请选择活动图片',
      validator: (value) => {
        if (isArray(value) && value.length) {
          return Promise.resolve()
        } else {
          return Promise.reject()
        }
      }
    }
  ]
}

const platformList = ref<any>([
  {
    value: '1',
    label: '京东'
  },
  {
    value: '2',
    label: '开普勒'
  },
  {
    value: '3',
    label: '手Q'
  },
  {
    value: '4',
    label: '微信'
  },
  {
    value: '5',
    label: '1号店'
  },
  {
    value: '6',
    label: '十元街'
  },
  {
    value: '7',
    label: '京东极速版'
  }
])
const promotionlist = ref<any[]>([
  {
    value: '1',
    label: '满减'
  },
  {
    value: '2',
    label: '无门槛'
  }
])

const area = ref<any[]>([
  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text
    }
  })
])
const areaChange: ColPickerColumnChange = ({ selectedItem, resolve, finish }) => {
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
const toast = useToast()
const form = ref<FormInstance>()

function handleFileChange({ fileList }: any) {
  model.fileList = fileList
}

function handleSubmit() {
  form
    .value!.validate()
    .then(({ valid, errors }) => {
      console.log(valid)
      console.log(errors)
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}

function handleIconClick() {
  toast.info('优惠券提示信息')
}
</script>
<style lang="scss" scoped>
.wot-theme-dark {
  .inline-txt {
    color: $-dark-color3;
  }
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
@/uni_modules/wot-design-uni/components/wd-form/type
