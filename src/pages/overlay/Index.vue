<template>
  <page-meta :page-style="`overflow:${show ? 'hidden' : 'visible'};`"></page-meta>
  <view>
    <page-wraper>
      <demo-block title="基础用法">
        <wd-button type="primary" @click="show = true">显示遮罩层</wd-button>
      </demo-block>

      <demo-block title="嵌入内容">
        <wd-button type="primary" @click="show1 = true">嵌入内容</wd-button>
      </demo-block>
    </page-wraper>
    <wd-overlay :show="show" @click="show = false" />

    <wd-overlay :show="show1" @click="show1 = false">
      <view class="wrapper">
        <view class="block" @click.stop="" />
      </view>
    </wd-overlay>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const show = ref<boolean>(false)
const show1 = ref<boolean>(false)
</script>
<style lang="scss" scoped>
.wot-theme-dark {
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
</style>
