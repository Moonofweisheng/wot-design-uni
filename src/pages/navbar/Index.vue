<!--
 * @Author: weisheng
 * @Date: 2023-10-17 17:20:31
 * @LastEditTime: 2024-03-04 12:48:00
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\src\pages\navbar\Index.vue
 * 记得注释
-->
<template>
  <wd-toast></wd-toast>
  <page-wraper>
    <wd-navbar fixed placeholder title="Navbar 导航条" left-arrow safeAreaInsetTop @click-left="handleClickLeft"></wd-navbar>

    <demo-block title="基础用法" transparent>
      <wd-navbar title="标题"></wd-navbar>
    </demo-block>

    <demo-block title="返回上级" transparent>
      <wd-navbar title="标题" left-text="返回" left-arrow @click-left="handleClickLeft"></wd-navbar>
    </demo-block>

    <demo-block title="右侧按钮" transparent>
      <wd-navbar title="标题" left-text="返回" left-arrow right-text="按钮" @click-left="handleClickLeft" @click-right="handleClickRight"></wd-navbar>
    </demo-block>

    <demo-block title="使用插槽" transparent>
      <wd-navbar title="标题" @click-left="handleClickLeft">
        <template #left>
          <wd-icon name="arrow-left" size="24px" class="wd-navbar__arrow" />
        </template>
        <template #right>
          <wd-icon name="search" size="18" />
        </template>
      </wd-navbar>
    </demo-block>

    <demo-block title="禁用按钮" transparent>
      <wd-navbar title="标题" left-text="返回" right-text="按钮" left-arrow left-disabled right-disabled></wd-navbar>
    </demo-block>

    <demo-block title="胶囊样式" transparent>
      <wd-navbar title="标题" left-text="返回" right-text="设置" left-arrow>
        <template #capsule>
          <wd-navbar-capsule @back="handleBack" @back-home="handleBackHome"></wd-navbar-capsule>
        </template>
      </wd-navbar>
    </demo-block>

    <demo-block title="带搜索栏" transparent>
      <wd-navbar left-text="返回" right-text="设置" left-arrow>
        <template #title>
          <view class="search-box">
            <wd-search v-model="keyword" hide-cancel placeholder-left></wd-search>
          </view>
        </template>
      </wd-navbar>
    </demo-block>
    <view style="height: 500rpx"></view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { useToast } from '@/uni_modules/wot-design-uni'
import { ref } from 'vue'

const keyword = ref('')
const { show: showToast } = useToast()

function handleClickLeft() {
  uni.navigateBack({})
}

function handleClickRight() {
  showToast('按钮')
}

function handleBack() {
  uni.navigateBack({})
}

function handleBackHome() {
  uni.reLaunch({ url: '/pages/index/Index' })
}
</script>
<style lang="scss" scoped>
.search-box {
  display: flex;
  height: 100%;
  align-items: center;
  --wot-search-padding: 0;
  --wot-search-side-padding: 0;
}
</style>
