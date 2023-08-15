<template>
  <page-wraper>
    <demo-block title="基本用法">
      <wd-input type="text" v-model="value" placeholder="请输入用户名" @change="handleChange" @blur="handleBlur" />
    </demo-block>
    <demo-block title="禁用状态">
      <wd-input type="text" v-model="value1" disabled />
    </demo-block>
    <demo-block title="只读状态">
      <wd-input type="text" v-model="value2" readonly />
    </demo-block>
    <demo-block title="错误状态">
      <wd-input type="text" v-model="value3" placeholder="请输入用户名" error />
    </demo-block>
    <demo-block title="清空按钮">
      <wd-input type="text" v-model="value4" clearable @change="handleChange1" />
    </demo-block>
    <demo-block title="密码框">
      <wd-input type="text" v-model="value5" clearable show-password @change="handleChange2" />
    </demo-block>
    <demo-block title="设置前后Icon">
      <wd-input type="text" v-model="value6" prefix-icon="dong" suffix-icon="list" clearable @change="handleChange3" />
    </demo-block>
    <demo-block title="字数限制">
      <wd-input type="text" v-model="value7" :maxlength="20" show-word-limit />
    </demo-block>
    <demo-block title="取消底部边框，自定义使用">
      <wd-input v-model="value8" no-border placeholder="请输入价格" custom-style="display: inline-block; width: 70px; vertical-align: middle;" />
      <text class="custom-txt" style="display: inline-block; vertical-align: middle; font-size: 14px">元</text>
    </demo-block>
    <demo-block title="textarea" transparent>
      <wd-input type="textarea" v-model="value9" placeholder="请填写评价" @blur="handleBlur" />
    </demo-block>
    <demo-block title="textarea 清空按钮 和 字数限制" transparent>
      <wd-input type="textarea" v-model="value10" :maxlength="120" clearable show-word-limit />
    </demo-block>
    <demo-block title="textarea 高度自适应">
      <wd-input type="textarea" v-model="value11" auto-height clearable></wd-input>
    </demo-block>
    <demo-block title="cell 类型" transparent>
      <wd-cell-group border>
        <wd-input type="text" label="基本用法" v-model="value12" placeholder="请输入..." />
        <wd-input type="text" label="禁用" v-model="value13" disabled placeholder="用户名" />
        <wd-input type="text" label="清除、密码" v-model="value14" placeholder="密码" clearable show-password />
        <wd-input type="text" label="错误状态" v-model="value15" placeholder="请输入用户名" error />
        <wd-input type="text" label="必填" v-model="value16" placeholder="请输入用户名" required />
        <wd-input type="text" label="图标" v-model="value17" placeholder="请输入..." prefix-icon="dong" suffix-icon="list" />
        <wd-input type="text" label="自定义插槽" v-model="value18" placeholder="请输入..." use-suffix-slot clearable>
          <template #suffix>
            <wd-button size="small" custom-class="button">获取验证码</wd-button>
          </template>
        </wd-input>
        <wd-input type="text" label="大尺寸" size="large" v-model="value19" placeholder="请输入..." />
      </wd-cell-group>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<string>('')
const value1 = ref<string>('这是禁用状态')
const value2 = ref<string>('这是只读状态')
const value3 = ref<string>('123456')
const value4 = ref<string>('支持清空')
const value5 = ref<string>('password')
const value6 = ref<string>('')
const value7 = ref<string>('1234')
const value8 = ref<string>('')
const value9 = ref<string>('')
const value10 = ref<string>('支持清空和字数限制的文本域')
const value11 = ref<string>('输入文字后，输入框高度跟随字数多少变化')
const value12 = ref<string>('')
const value13 = ref<string>('该输入框禁用')
const value14 = ref<string>('12345678')
const value15 = ref<string>('')
const value16 = ref<string>('')
const value17 = ref<string>('')
const value18 = ref<string>('')
const value19 = ref<string>('')

function handleChange(event) {
  console.log(event)
}
function handleChange1(event) {
  console.log(event)
}
function handleChange2(event) {
  console.log(event)
}
function handleChange3(event) {
  console.log(event)
}
function handleBlur(event) {
  console.log('失焦', event)
}
</script>
<style lang="scss" scoped>
.wot-theme-dark {
  .custom-txt {
    color: $-dark-color;
  }
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.suffix-slot {
  display: inline-block;
  height: 37px;
  line-height: 37px;
  margin-left: 8px;
  vertical-align: middle;
}
:deep(.button) {
  margin-left: 8px;
  vertical-align: middle;
}
</style>
