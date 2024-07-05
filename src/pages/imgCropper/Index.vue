<!--
 * @Author: weisheng
 * @Date: 2023-09-20 11:10:41
 * @LastEditTime: 2024-06-06 21:45:41
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: /wot-design-uni/src/pages/imgCropper/Index.vue
 * 记得注释
-->
<template>
  <page-wraper>
    <!-- #ifdef MP-WEIXIN -->
    <wd-privacy-popup></wd-privacy-popup>
    <!-- #endif -->
    <demo-block title="基本用法" style="text-align: center">
      <wd-img-cropper
        v-model="show"
        :img-src="src"
        @confirm="handleConfirm"
        @cancel="handleCancel"
        @imgloaderror="imgLoaderror"
        @imgloaded="imgLoaded"
      ></wd-img-cropper>
      <view class="profile">
        <view v-if="!imgSrc" class="img" @click="upload">
          <wd-icon name="fill-camera" custom-class="img-icon"></wd-icon>
        </view>
        <wd-img v-if="imgSrc" round width="200px" height="200px" :src="imgSrc" mode="aspectFit" custom-class="profile-img" @click="upload" />
        <view style="font-size: 14px">点击上传头像</view>
      </view>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const src = ref<string>('')
const imgSrc = ref<string>('')
const show = ref<boolean>(false)

function upload() {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      const tempFilePaths = res.tempFilePaths[0]
      src.value = tempFilePaths
      show.value = true
    }
  })
}
function handleConfirm(event: any) {
  const { tempFilePath } = event
  imgSrc.value = tempFilePath
}
function imgLoaderror(res: any) {
  console.log('加载失败', res)
}
function imgLoaded(res: any) {
  console.log('加载成功', res)
}
function handleCancel(event: any) {
  console.log('取消', event)
}
</script>
<style lang="scss" scoped>
.wot-theme-dark {
  :deep(.profile-img) {
    border: 1px solid $-dark-border-color;
  }
  .img {
    background-color: $-dark-background4;
  }
}

.profile {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 300px;
}

:deep(.profile-img) {
  border: 1px solid rgba(0, 0, 0, 0.09);
}
.img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.04);
  position: relative;
}
:deep(.img-icon) {
  font-size: 60px;
  color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
