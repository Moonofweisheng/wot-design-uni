<!--
 * @Author: weisheng
 * @Date: 2024-12-12 21:33:43
 * @LastEditTime: 2024-12-12 22:52:14
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: /wot-design-uni/src/pages/wxRewardAd/Index.vue
 * 记得注释
-->
<template>
  <page-wraper :use-wx-ad="false">
    <div class="ad-completion-message">
      <div class="message-title">感谢你愿意来观看广告！</div>
      <div class="message-content">观看成功就已经成功为我助力！</div>
      <div class="message-content">请继续使用我们的组件，您的支持对我们非常重要！</div>
      <view class="button-group">
        <wd-button type="success" block @click="back">返回使用</wd-button>
        <wd-button type="error" block @click="showAd">再次观看</wd-button>
      </view>
    </div>
  </page-wraper>
</template>
<script setup lang="ts">
import { useToast } from '@/uni_modules/wot-design-uni'
import { onMounted } from 'vue'
const { loading: showLoading, close: closeLoading } = useToast()
let rewardVideoAd: UniApp.InterstitialAdContext | null = null

function showRewardAd() {
  showLoading({ msg: '正在加载激励视频...' })
  rewardVideoAd &&
    rewardVideoAd
      .show()
      .then(() => {
        closeLoading()
      })
      .catch(() => {
        rewardVideoAd!
          .load()
          .then(() =>
            rewardVideoAd!.show().finally(() => {
              closeLoading()
            })
          )
          .catch((err) => {
            closeLoading()
            console.log('激励视频 广告显示失败')
          })
      })
}

onMounted(() => {
  // 接入微信小程序激励视频广告
  if (uni.createRewardedVideoAd) {
    rewardVideoAd = uni.createRewardedVideoAd({ adUnitId: 'adunit-91e0e9b07b57557a' })
    rewardVideoAd.onLoad(() => {
      console.log('激励视频 广告加载成功')
    })
    rewardVideoAd.onError((err) => {
      console.log('激励视频 广告加载失败', err)
    })
    showRewardAd()
  }
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
