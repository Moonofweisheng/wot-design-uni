<template>
  <page-wraper>
    <view>
      <demo-block title="基本使用" transparent>
        <wd-gap bg-color="#FFFFFF"></wd-gap>
      </demo-block>
      <demo-block title="自定义背景颜色" transparent>
        <wd-gap bg-color="#4D80F0"></wd-gap>
      </demo-block>
      <demo-block title="自定义高度" transparent>
        <wd-gap bg-color="#4D80F0" height="120rpx"></wd-gap>
      </demo-block>
      <demo-block title="自定义样式" transparent>
        <wd-gap custom-class="custom-gap"></wd-gap>
      </demo-block>
      <demo-block custom-class="custom-safe-area-bottom" title="底部安全区" transparent>
        <wd-gap bg-color="#FFFFFF" safe-area-bottom height="120rpx"></wd-gap>
      </demo-block>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
:deep(.custom-safe-area-bottom) {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
:deep(.custom-gap) {
  padding-bottom: 120rpx;
  background: #34d19d !important;
}
</style>
