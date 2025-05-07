<template>
  <page-wraper>
    <demo-block :title="$t('ji-chu-biao-dan')" transparent>
      <wd-form ref="form1" :model="model1">
        <wd-cell-group border>
          <wd-input
            :label="$t('wai-bi-ba-bu')"
            label-width="100px"
            prop="value1"
            clearable
            v-model="model1.value1"
            :placeholder="$t('qing-shu-ru-wai-bi-ba-bu')"
            :rules="[{ required: true, message: $t('qing-shu-ru-wai-bi-ba-bu') }]"
          />
          <wd-input
            :label="$t('sha-ka-la-ka')"
            label-width="100px"
            prop="value2"
            show-password
            clearable
            v-model="model1.value2"
            :placeholder="$t('qing-shu-ru-sha-ka-la-ka')"
            :rules="[{ required: true, message: $t('qing-shu-ru-sha-ka-la-ka') }]"
          />
        </wd-cell-group>
        <view class="footer">
          <wd-button type="primary" size="large" @click="handleSubmit1" block>{{ $t('ti-jiao') }}</wd-button>
        </view>
      </wd-form>
    </demo-block>

    <demo-block :title="$t('xiao-yan-gui-ze')" transparent>
      <wd-form ref="form2" :model="model2">
        <wd-cell-group border>
          <wd-input
            :label="$t('xiao-yan')"
            label-width="100px"
            prop="value1"
            clearable
            v-model="model2.value1"
            :placeholder="$t('zheng-ze-xiao-yan')"
            :rules="[{ required: false, pattern: /\d{6}/, message: $t('qing-shu-ru-6-wei-zi-fu') }]"
          />
          <wd-input
            :label="$t('xiao-yan')"
            label-width="100px"
            prop="value2"
            clearable
            v-model="model2.value2"
            :placeholder="$t('han-shu-xiao-yan')"
            :rules="[
              {
                required: false,
                validator: validatorMessage,
                message: $t('qing-shu-ru-zheng-que-de-ma-ka-ba-ka')
              }
            ]"
          />
          <wd-input
            :label="$t('xiao-yan-1')"
            label-width="100px"
            prop="value3"
            clearable
            v-model="model2.value3"
            :placeholder="$t('xiao-yan-han-shu-fan-hui-cuo-wu-ti-shi')"
            :rules="[
              {
                required: false,
                message: $t('qing-shu-ru-nei-rong'),
                validator: validator
              }
            ]"
          />
          <wd-input
            :label="$t('xiao-yan')"
            label-width="100px"
            prop="value4"
            clearable
            v-model="model2.value4"
            :placeholder="$t('yi-bu-han-shu-xiao-yan')"
            :rules="[{ required: false, validator: asyncValidator, message: $t('qing-shu-ru-1234') }]"
          />
        </wd-cell-group>
        <view class="footer">
          <wd-button type="primary" size="large" @click="handleSubmit2" block>{{ $t('ti-jiao') }}</wd-button>
        </view>
      </wd-form>
    </demo-block>

    <demo-block :title="$t('dong-tai-biao-dan')" transparent>
      <view class="demo-button">
        <wd-button @click="handleClick1" :round="false" block size="large">{{ $t('dong-tai-biao-dan-0') }}</wd-button>
      </view>
    </demo-block>

    <demo-block :title="$t('shi-jiao-xiao-yan')" transparent>
      <view class="demo-button">
        <wd-button @click="handleClick2" :round="false" block size="large">{{ $t('shi-jiao-xiao-yan-0') }}</wd-button>
      </view>
    </demo-block>

    <demo-block :title="$t('fu-za-biao-dan')" transparent>
      <view class="demo-button">
        <wd-button @click="handleClick3" :round="false" block size="large">{{ $t('fu-za-biao-dan-0') }}</wd-button>
      </view>
    </demo-block>

    <demo-block :title="$t('xiao-yan-ti-shi-fang-shi')" transparent>
      <view class="demo-button">
        <wd-button @click="handleClick4" :round="false" block size="large">{{ $t('xiao-yan-ti-shi-fang-shi') }}</wd-button>
      </view>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import type { FormInstance } from '@/uni_modules/wot-design-uni/components/wd-form/types'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const model1 = reactive<{
  value1: string
  value2: string
}>({
  value1: '',
  value2: ''
})

const model2 = reactive<{
  value1: string
  value2: string
  value3: string
  value4: string
}>({
  value1: '',
  value2: '',
  value3: '',
  value4: ''
})

const { success: showSuccess, loading: showLoading, close: closeToast } = useToast()
const form1 = ref<FormInstance>()
const form2 = ref<FormInstance>()

const validatorMessage = (val: string) => {
  return /1\d{10}/.test(val)
}

const validator = (val: any) => {
  if (String(val).length >= 4) {
    return Promise.resolve()
  } else {
    return Promise.reject(new Error(t('chang-du-bu-de-xiao-yu-4')))
  }
}

// 校验函数可以返回 Promise，实现异步校验
const asyncValidator = (val: string) =>
  new Promise((resolve) => {
    showLoading(t('yan-zheng-zhong'))

    setTimeout(() => {
      closeToast()
      resolve(val === '1234')
    }, 1000)
  })

function handleSubmit1() {
  form1
    .value!.validate()
    .then(({ valid, errors }) => {
      if (valid) {
        showSuccess({
          msg: t('ti-jiao-cheng-gong')
        })
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}

function handleSubmit2() {
  form2
    .value!.validate()
    .then(({ valid, errors }) => {
      if (valid) {
        showSuccess({
          msg: t('ti-jiao-cheng-gong')
        })
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}

function handleClick1() {
  uni.navigateTo({ url: '/subPages/form/demo1' })
}

function handleClick2() {
  uni.navigateTo({ url: '/subPages/form/demo2' })
}

function handleClick3() {
  uni.navigateTo({ url: '/subPages/form/demo3' })
}

function handleClick4() {
  uni.navigateTo({ url: '/subPages/form/demo4' })
}
</script>
<style lang="scss" scoped>
.demo-button {
  width: 100%;
  box-sizing: border-box;
  padding: 0 24rpx;
}
.footer {
  padding: 16px;
}
</style>
