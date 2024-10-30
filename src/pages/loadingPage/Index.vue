<template>
  <page-wraper>
    <demo-block title="基本用法">
      <view class="flex" @click="clickShow">基本用法</view>
      <wd-loading-page :loading="show" />
    </demo-block>
    <demo-block title="自定义背景色">
      <view class="flex" @click="clickShow2">自定义背景色</view>
      <wd-loading-page :loading="show2" bgColor="rgba(0, 0, 0, .9)" />
    </demo-block>
    <demo-block title="自定义图片">
      <view class="flex" @click="clickShow3">自定义图片</view>
      <wd-loading-page :loading="show3" loadingImage="https://wot-design-uni.pages.dev/wot-design.png" />
    </demo-block>
    <demo-block title="自定义插槽内容">
      <view class="flex" @click="clickShow4">自定义插槽内容</view>
      <wd-loading-page :loading="show4">
        <template #default>
          <view class="custom-class">
            <view class="loading">
              <wd-loading />
            </view>
            <view class="mt-2">加载中...</view>
          </view>
        </template>
      </wd-loading-page>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
const clickShow = () => {
  show.value = !show.value

  // 模拟请求-3秒后关闭
  setTimeout(() => {
    show.value = false
  }, 3000)
}
const clickShow2 = () => {
  show2.value = !show2.value

  // 模拟请求-3秒后关闭
  setTimeout(() => {
    show2.value = false
  }, 3000)
}

const clickShow3 = () => {
  show3.value = !show3.value

  // 模拟请求-3秒后关闭
  setTimeout(() => {
    show3.value = false
  }, 6000)
}

const clickShow4 = () => {
  show4.value = !show4.value

  // 模拟请求-3秒后关闭
  setTimeout(() => {
    show4.value = false
  }, 3000)
}
</script>
<style lang="scss" scoped>
.custom-class {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba($color: #000000, $alpha: 0.8);
}

.mt-2 {
  margin-top: 8px;
}
</style>
