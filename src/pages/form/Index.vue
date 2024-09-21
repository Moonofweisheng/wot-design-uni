<template>
  <page-wraper>
    <demo-block title="基础表单" transparent>
      <wd-form ref="form1" :model="model1">
        <wd-cell-group border>
          <wd-input
            label="用户名"
            label-width="100px"
            prop="value1"
            clearable
            v-model="model1.value1"
            placeholder="请输入用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <wd-input
            label="密码"
            label-width="100px"
            prop="value2"
            show-password
            clearable
            v-model="model1.value2"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </wd-cell-group>
        <view class="footer">
          <wd-button type="primary" size="large" @click="handleSubmit1" block>提交</wd-button>
        </view>
      </wd-form>
    </demo-block>

    <demo-block title="校验规则" transparent>
      <wd-form ref="form2" :model="model2">
        <wd-cell-group border>
          <wd-input
            label="校验"
            label-width="100px"
            prop="value1"
            clearable
            v-model="model2.value1"
            placeholder="正则校验"
            :rules="[{ required: false, pattern: /\d{6}/, message: '请输入6位字符' }]"
          />
          <wd-input
            label="校验"
            label-width="100px"
            prop="value2"
            clearable
            v-model="model2.value2"
            placeholder="函数校验"
            :rules="[
              {
                required: false,
                validator: validatorMessage,
                message: '请输入正确的玛卡巴卡'
              }
            ]"
          />
          <wd-input
            label="校验"
            label-width="100px"
            prop="value3"
            clearable
            v-model="model2.value3"
            placeholder="校验函数返回错误提示"
            :rules="[
              {
                required: false,
                message: '请输入内容',
                validator: validator
              }
            ]"
          />
          <wd-input
            label="校验"
            label-width="100px"
            prop="value4"
            clearable
            v-model="model2.value4"
            placeholder="异步函数校验"
            :rules="[{ required: false, validator: asyncValidator, message: '请输入1234' }]"
          />
        </wd-cell-group>
        <view class="footer">
          <wd-button type="primary" size="large" @click="handleSubmit2" block>提交</wd-button>
        </view>
      </wd-form>
    </demo-block>

    <demo-block title="动态表单" transparent>
      <view class="demo-button">
        <wd-button @click="handleClick1" :round="false" block size="large">动态表单</wd-button>
      </view>
    </demo-block>

    <demo-block title="失焦校验" transparent>
      <view class="demo-button">
        <wd-button @click="handleClick2" :round="false" block size="large">失焦校验</wd-button>
      </view>
    </demo-block>

    <demo-block title="复杂表单" transparent>
      <view class="demo-button">
        <wd-button @click="handleClick3" :round="false" block size="large">复杂表单</wd-button>
      </view>
    </demo-block>

    <demo-block title="校验提示方式" transparent>
      <view class="demo-button">
        <wd-button @click="handleClick4" :round="false" block size="large">校验提示方式</wd-button>
      </view>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import type { FormInstance } from '@/uni_modules/wot-design-uni/components/wd-form/types'
import { reactive, ref } from 'vue'

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
    return Promise.reject('长度不得小于4')
  }
}

// 校验函数可以返回 Promise，实现异步校验
const asyncValidator = (val: string) =>
  new Promise((resolve) => {
    showLoading('验证中...')

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
          msg: '提交成功'
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
          msg: '提交成功'
        })
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}

function handleClick1() {
  uni.navigateTo({ url: '/pages/form/demo1' })
}

function handleClick2() {
  uni.navigateTo({ url: '/pages/form/demo2' })
}

function handleClick3() {
  uni.navigateTo({ url: '/pages/form/demo3' })
}

function handleClick4() {
  uni.navigateTo({ url: '/pages/form/demo4' })
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
