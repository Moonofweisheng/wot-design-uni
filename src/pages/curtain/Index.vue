<template>
  <page-wraper>
    <demo-block title="基本用法">
      <wd-button @click="handleClick1">关闭按钮在内部</wd-button>
    </demo-block>
    <demo-block title="修改按钮位置">
      <view>
        <wd-button @click="handleClick2">左上</wd-button>
        <wd-button @click="handleClick3">顶部</wd-button>
        <wd-button @click="handleClick4">右上</wd-button>
      </view>
      <view>
        <wd-button @click="handleClick5">左下</wd-button>
        <wd-button @click="handleClick6">底部</wd-button>
        <wd-button @click="handleClick7">右下</wd-button>
      </view>
    </demo-block>
    <demo-block title="点击遮罩关闭">
      <wd-button @click="handleClick8">点击遮罩关闭</wd-button>
    </demo-block>

    <demo-block title="自定义关闭按钮">
      <wd-button @click="handleClick9">自定义关闭按钮</wd-button>
    </demo-block>

    <wd-curtain v-model="value1" :src="img" :to="link" :width="280"></wd-curtain>
    <wd-curtain v-model="value2" :src="img" :to="link" close-position="top-left" :width="200"></wd-curtain>
    <wd-curtain v-model="value3" :src="img" :to="link" close-position="top" :width="200"></wd-curtain>
    <wd-curtain v-model="value4" :src="img" :to="link" close-position="top-right" :width="240"></wd-curtain>
    <wd-curtain v-model="value5" :src="img" :to="link" close-position="bottom-left" :width="240"></wd-curtain>
    <wd-curtain v-model="value6" :src="img" :to="link" close-position="bottom" :width="240"></wd-curtain>
    <wd-curtain v-model="value7" :src="img" :to="link" close-position="bottom-right" :width="240"></wd-curtain>
    <wd-curtain v-model="value8" :src="img" :to="link" close-position="bottom-right" :width="240" :close-on-click-modal="true"></wd-curtain>
    <wd-curtain v-model="value9" :src="img" :width="280">
      <template #close>
        <view class="custom-close" @click="handleClose9">关闭</view>
      </template>
    </wd-curtain>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref<boolean>(false)
const value2 = ref<boolean>(false)
const value3 = ref<boolean>(false)
const value4 = ref<boolean>(false)
const value5 = ref<boolean>(false)
const value6 = ref<boolean>(false)
const value7 = ref<boolean>(false)
const value8 = ref<boolean>(false)
const value9 = ref<boolean>(false)

const img = ref<string>('https://img20.360buyimg.com/da/jfs/t1/141592/25/8861/261559/5f68d8c1E33ed78ab/698ad655bfcfbaed.png')
const link = ref<string>('/pages/index/index')

function handleClick1() {
  value1.value = true
}
function handleClick2() {
  value2.value = true
}
function handleClick3() {
  value3.value = true
}
function handleClick4() {
  value4.value = true
}
function handleClick5() {
  value5.value = true
}
function handleClick6() {
  value6.value = true
}
function handleClick7() {
  value7.value = true
}
function handleClick8() {
  value8.value = true
}
function handleClick9() {
  value9.value = true
}
function handleClose9() {
  value9.value = false
}
</script>
<style lang="scss" scoped>
:deep(button) {
  margin: 0 10px 10px 0;
}
.custom-close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #ffffff;
  font-size: 32rpx;
}
</style>
