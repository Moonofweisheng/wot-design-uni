<template>
  <page-wraper :use-wx-ad="false">
    <div class="ad-completion-message">
      <div class="message-title">感谢你愿意来观看广告！</div>
      <div class="message-content">观看成功就已经成功为我助力！</div>
      <div class="message-content">观看一次即可免除24h内的页面贴片和插屏广告！</div>
      <view class="button-group">
        <wd-button type="success" block @click="back">返回使用</wd-button>
        <wd-button type="error" block @click="showAd">再次观看</wd-button>
      </view>
    </div>
  </page-wraper>
</template>
<script setup lang="ts">
import { useRewardAd } from '@/store/useRewardAd'
import { pause } from '@/uni_modules/wot-design-uni/components/common/util'
import { onMounted } from 'vue'
const { createRewardVideoAd, showRewardAd, isFree } = useRewardAd()

onMounted(async () => {
  await pause()
  createRewardVideoAd()
  await pause()
  showRewardAd()
})

function back() {
  uni.navigateBack()
}

function showAd() {
  showRewardAd()
}
</script>
<style lang="scss" scoped>
.ad-completion-message {
  text-align: center;
  padding: 20px;
}

.message-title {
  font-size: 24px;
  color: #4caf50;
}

.message-content {
  font-size: 16px;
  margin: 16px 0;
}

.continue-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.continue-button:hover {
  background-color: #0056b3;
}

.button-group {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
</style>
