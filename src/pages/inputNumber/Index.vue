<template>
  <page-wraper>
    <demo-block title="基本用法">
      <wd-input-number v-model="value1" @change="handleChange1" />
    </demo-block>
    <demo-block title="设置步长">
      <wd-input-number v-model="value2" @change="handleChange2" :step="2" />
    </demo-block>
    <demo-block title="限制最大最小值">
      <wd-input-number v-model="value3" @change="handleChange3" :min="3" :max="10" />
    </demo-block>
    <demo-block title="禁用">
      <wd-input-number v-model="value4" @change="handleChange4" disabled />
    </demo-block>
    <demo-block title="禁用输入框">
      <wd-input-number v-model="value10" @change="handleChange4" disable-input />
    </demo-block>
    <demo-block title="无输入框">
      <view class="flex">
        <view>数量：{{ value5 }}</view>
        <wd-input-number v-model="value5" @change="handleChange5" without-input />
      </view>
    </demo-block>
    <demo-block title="设置小数精度">
      <wd-input-number v-model="value6" @change="handleChange6" :precision="1" :step="0.1" />
    </demo-block>
    <demo-block title="输入严格为步数的倍数">
      <wd-input-number v-model="value7" @change="handleChange7" step-strictly :step="2" />
    </demo-block>
    <demo-block title="修改输入框宽度">
      <wd-input-number v-model="value8" input-width="70px" @change="handleChange8" />
    </demo-block>
    <demo-block title="允许空值，并设置 placeholder">
      <wd-input-number v-model="value9" allow-null placeholder="不限" input-width="70px" @change="handleChange9" />
    </demo-block>
    <demo-block title="异步变更">
      <wd-input-number v-model="value11" :before-change="beforeChange" />
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import type { InputNumberBeforeChange } from '@/uni_modules/wot-design-uni/components/wd-input-number/types'
import { ref } from 'vue'
const { loading, close } = useToast()

const value1 = ref<number>(1)
const value2 = ref<number>(1)
const value3 = ref<number>(1)
const value4 = ref<number>(2)
const value5 = ref<number>(1)
const value6 = ref<string>('1.2')
const value7 = ref<number>(1)
const value8 = ref<number>(2)
const value9 = ref<string>('')
const value10 = ref<number>(1)
const value11 = ref<number>(1)

function handleChange1({ value }: any) {
  console.log(value)
}
function handleChange2({ value }: any) {
  console.log(value)
}
function handleChange3({ value }: any) {
  console.log(value)
}
function handleChange4({ value }: any) {
  console.log(value)
}
function handleChange5({ value }: any) {
  console.log(value)
}
function handleChange6({ value }: any) {
  console.log(value)
}
function handleChange7({ value }: any) {
  console.log(value)
}
function handleChange8({ value }: any) {
  console.log(value)
}
function handleChange9({ value }: any) {
  console.log(value)
}

const beforeChange: InputNumberBeforeChange = (value) => {
  loading({ msg: `正在更新到${value}...` })
  return new Promise((resolve) => {
    setTimeout(() => {
      close()
      resolve(true)
    }, 500)
  })
}
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
