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
    <demo-block title="无输入框">
      <view class="flex">
        <view>数量：{{ value5 }}</view>
        <wd-input-number v-model="value5" @change="handleChange5" without-input />
      </view>
    </demo-block>
    <demo-block title="设置小数精度">
      <wd-input-number v-model="value6" @change="handleChange6" :precision="2" :step="0.1" />
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
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref<number>(1)
const value2 = ref<number>(1)
const value3 = ref<number>(1)
const value4 = ref<number>(2)
const value5 = ref<number>(1)
const value6 = ref<string>('1.205')
const value7 = ref<number>(1)
const value8 = ref<number>(2)
const value9 = ref<string>('')

function handleChange1({ value }) {
  console.log(value)
}
function handleChange2({ value }) {
  console.log(value)
}
function handleChange3({ value }) {
  console.log(value)
}
function handleChange4({ value }) {
  console.log(value)
}
function handleChange5({ value }) {
  console.log(value)
}
function handleChange6({ value }) {
  console.log(value)
}
function handleChange7({ value }) {
  console.log(value)
}
function handleChange8({ value }) {
  console.log(value)
}
function handleChange9({ value }) {
  console.log(value)
}
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
