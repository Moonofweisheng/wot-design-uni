<template>
  <view>
    <page-wraper>
      <wd-message-box />
      <wd-form ref="form" :model="model" :rules="rules">
        <wd-cell-group custom-class="group" :title="$t('ji-chu-xin-xi')" border>
          <wd-input
            :label="$t('you-hui-quan-ming-cheng')"
            label-width="100px"
            :maxlength="20"
            show-word-limit
            prop="couponName"
            required
            suffix-icon="warn-bold"
            clearable
            v-model="model.couponName"
            :placeholder="$t('qing-shu-ru-you-hui-quan-ming-cheng')"
            @clicksuffixicon="handleIconClick"
          />
          <wd-select-picker
            :label="$t('tui-guang-ping-tai')"
            label-width="100px"
            prop="platform"
            v-model="model.platform"
            :columns="platformList"
            :placeholder="$t('qing-xuan-ze-tui-guang-ping-tai')"
          />
          <wd-picker
            :label="$t('you-hui-fang-shi')"
            :placeholder="$t('qing-xuan-ze-you-hui-fang-shi')"
            label-width="100px"
            prop="promotion"
            v-model="model.promotion"
            :columns="promotionlist"
          />
          <wd-cell prop="threshold" :title="$t('quan-mian-e')" required title-width="100px" custom-value-class="cell-left">
            <view style="text-align: left">
              <view class="inline-txt" style="margin-left: 0">{{ $t('man') }}</view>
              <wd-input
                no-border
                custom-style="display: inline-block; width: 70px; vertical-align: middle"
                :placeholder="$t('qing-shu-ru-jin-e-0')"
                v-model="model.threshold"
              />
              <view class="inline-txt">{{ $t('jian') }}</view>
              <wd-input
                no-border
                custom-style="display: inline-block; width: 70px; vertical-align: middle"
                :placeholder="$t('qing-shu-ru-jin-e-0')"
                v-model="model.price"
              />
            </view>
          </wd-cell>
        </wd-cell-group>
        <wd-cell-group custom-class="group" :title="$t('shi-jian-he-di-zhi')" border>
          <wd-datetime-picker
            :label="$t('shi-jian')"
            label-width="100px"
            :placeholder="$t('qing-xuan-ze-shi-jian')"
            prop="time"
            v-model="model.time"
          />
          <wd-calendar :label="$t('ri-qi')" label-width="100px" :placeholder="$t('qing-xuan-ze-ri-qi')" prop="date" v-model="model.date" />

          <wd-col-picker
            :label="$t('di-zhi')"
            :placeholder="$t('qing-xuan-ze-di-zhi')"
            label-width="100px"
            prop="address"
            v-model="model.address"
            :columns="area"
            :column-change="areaChange"
          />
        </wd-cell-group>
        <wd-cell-group custom-class="group" :title="$t('qi-ta-xin-xi')" border>
          <wd-textarea
            :label="$t('huo-dong-xi-ze')"
            label-width="100px"
            type="textarea"
            v-model="model.content"
            :maxlength="300"
            show-word-limit
            :placeholder="$t('qing-shu-ru-huo-dong-xi-ze-xin-xi')"
            clearable
            prop="content"
          />
          <wd-cell :title="$t('fa-huo-shu-liang')" title-width="100px" prop="count">
            <view style="text-align: left">
              <wd-input-number v-model="model.count" />
            </view>
          </wd-cell>
          <wd-cell :title="$t('kai-qi-zhe-kou')" title-width="100px" prop="switchVal" center>
            <view style="text-align: left">
              <wd-switch v-model="model.switchVal" />
            </view>
          </wd-cell>
          <wd-input
            :label="$t('zhe-kou')"
            v-if="model.switchVal"
            label-width="100px"
            prop="discount"
            :placeholder="$t('qing-shu-ru-you-hui-jin-e')"
            clearable
            v-model="model.discount"
          />
          <wd-input
            :label="$t('wai-bi-ba-bu')"
            label-width="100px"
            prop="cardId"
            suffix-icon="camera"
            :placeholder="$t('qing-shu-ru-wai-bi-ba-bu')"
            clearable
            v-model="model.cardId"
          />
          <wd-input
            :label="$t('ma-ka-ba-ka')"
            label-width="100px"
            prop="phone"
            :placeholder="$t('qing-shu-ru-ma-ka-ba-ka')"
            clearable
            v-model="model.phone"
          />
          <wd-cell :title="$t('huo-dong-tu-pian')" title-width="100px" prop="fileList">
            <wd-upload
              :file-list="model.fileList"
              action="https://mockapi.eolink.com/zhTuw2P8c29bc981a741931bdd86eb04dc1e8fd64865cb5/upload"
              @change="handleFileChange"
            ></wd-upload>
          </wd-cell>
        </wd-cell-group>
        <view class="tip">
          <wd-checkbox v-model="model.read" prop="read" custom-label-class="label-class">
            {{ $t('yi-yue-du-bing-tong-yi') }}
            <text style="color: #4d80f0">{{ $t('ba-la-ba-la-ba-la-xie-yi') }}</text>
          </wd-checkbox>
        </view>
        <view class="footer">
          <wd-button type="primary" size="large" @click="handleSubmit" block>{{ $t('ti-jiao') }}</wd-button>
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
const { t } = useI18n()
const { colPickerData, findChildrenByCode } = useColPickerData()

import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

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
  discount: number
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
  fileList: [],
  discount: 1
})

const rules: FormRules = {
  couponName: [
    {
      required: true,
      pattern: /\d{6}/,
      message: t('you-hui-quan-ming-cheng-6-ge-zi-yi-shang'),
      validator: (value) => {
        if (value) {
          return Promise.resolve()
        } else {
          return Promise.reject(t('qing-shu-ru-you-hui-quan-ming-cheng'))
        }
      }
    }
  ],
  content: [
    {
      required: true,
      message: t('qing-shu-ru-huo-dong-xi-ze-xin-xi'),
      validator: (value) => {
        if (value && value.length > 2) {
          return Promise.resolve()
        } else {
          return Promise.reject(t('qing-shu-ru-huo-dong-xi-ze-xin-xi'))
        }
      }
    }
  ],
  threshold: [
    {
      required: true,
      message: t('qing-shu-ru-man-jian-jin-e'),
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
      message: t('qing-xuan-ze-tui-guang-ping-tai'),
      validator: (value) => {
        if (value && isArray(value) && value.length) {
          return Promise.resolve()
        } else {
          return Promise.reject(t('qing-xuan-ze-tui-guang-ping-tai'))
        }
      }
    }
  ],
  promotion: [
    {
      required: true,
      message: t('qing-xuan-ze-tui-guang-ping-tai'),
      validator: (value) => {
        if (value) {
          return Promise.resolve()
        } else {
          return Promise.reject(t('qing-xuan-ze-tui-guang-ping-tai'))
        }
      }
    }
  ],
  time: [
    {
      required: true,
      message: t('qing-xuan-ze-shi-jian-0'),
      validator: (value) => {
        if (value) {
          return Promise.resolve()
        } else {
          return Promise.reject(t('qing-xuan-ze-shi-jian-1'))
        }
      }
    }
  ],
  date: [
    {
      required: true,
      message: t('qing-xuan-ze-ri-qi-0'),
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
      message: t('qing-xuan-ze-di-zhi-0'),
      validator: (value) => {
        if (isArray(value) && value.length) {
          return Promise.resolve()
        } else {
          return Promise.reject(t('qing-xuan-ze-di-zhi-1'))
        }
      }
    }
  ],
  count: [
    {
      required: true,
      message: t('fa-huo-shu-liang-xu-yao-da-yu-1'),
      validator: (value) => {
        if (Number(value) > 1) {
          return Promise.resolve()
        } else {
          return Promise.reject(t('fa-huo-shu-liang-xu-yao-da-yu-1-0'))
        }
      }
    }
  ],
  cardId: [
    {
      required: true,
      message: t('qing-shu-ru-wai-bi-ba-bu'),
      validator: (value) => {
        if (value) {
          return Promise.resolve()
        } else {
          return Promise.reject(t('qing-shu-ru-wai-bi-ba-bu'))
        }
      }
    }
  ],
  phone: [
    {
      required: true,
      message: t('qing-shu-ru-ma-ka-ba-ka'),
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
      message: t('qing-xuan-ze-huo-dong-tu-pian'),
      validator: (value) => {
        if (isArray(value) && value.length) {
          return Promise.resolve()
        } else {
          return Promise.reject()
        }
      }
    }
  ],
  discount: [
    {
      required: true,
      message: t('qing-shu-ru-you-hui-jin-e-0'),
      validator: (value) => {
        if (value) {
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
      if (valid) {
        toast.success(t('ti-jiao-cheng-gong'))
      }
      console.log(valid)
      console.log(errors)
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}

function handleIconClick() {
  toast.info(t('you-hui-quan-ti-shi-xin-xi'))
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
