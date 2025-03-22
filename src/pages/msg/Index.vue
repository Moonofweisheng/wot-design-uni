<template>
  <page-wraper>
    <demo-block title="Msg">
      <wd-text text="提示页，常用布局"></wd-text>

      <view class="mt-5"><wd-button size="medium" block @click="handleClick(`/pages/msg/success`)">成功提示页</wd-button></view>
      <view class="mt-5"><wd-button size="medium" block @click="handleClick(`/pages/msg/warn`)">失败提示页</wd-button></view>
      <view class="mt-5"><wd-button size="medium" block @click="handleClick(`/pages/msg/clear`)">错误提示页</wd-button></view>
      <view class="mt-5"><wd-button size="medium" block @click="handleClick(`/pages/msg/waiting`)">进行中提示页</wd-button></view>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

function handleClick(url: string) {
  uni.navigateTo({
    url
  })
}
</script>
<style lang="scss" scoped>
.mt-5 {
  margin-top: 20px;
}
</style>
