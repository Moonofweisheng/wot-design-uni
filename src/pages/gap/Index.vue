<!--
 * @Author: weisheng
 * @Date: 2023-06-13 11:47:12
 * @LastEditTime: 2023-08-11 18:49:11
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-design-uni\src\pages\card\Index.vue
 * 记得注释
-->
<template>
  <page-wraper>
    <view>
      <demo-block title="基本使用" transparent>
        <wd-gap></wd-gap>
      </demo-block>
      <demo-block title="自定义背景颜色" transparent>
        <wd-gap bg-color="#4D80F0"></wd-gap>
      </demo-block>
      <demo-block title="自定义高度" transparent>
        <wd-gap bg-color="#4D80F0" height="100rpx"></wd-gap>
      </demo-block>

      <demo-block custom-class="fixed-bottom" title="底部安全区" transparent>
        <wd-gap bg-color="#4D80F0" safe-area-bottom></wd-gap>
      </demo-block>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.custom-fixed-bottom {
  position: fixed;
  bottom: 0;
}
</style>
