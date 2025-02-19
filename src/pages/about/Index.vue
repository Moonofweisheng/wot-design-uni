<!--
 * @Author: weisheng
 * @Date: 2025-02-16 16:04:20
 * @LastEditTime: 2025-02-19 22:51:30
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: /wot-design-uni/src/pages/about/Index.vue
 * 记得注释
-->
<template>
  <view class="page">
    <view class="page__hd">
      <view class="page__title">关于我们</view>
      <view class="page__desc">我是不如摸鱼去，一个前端打工仔，我和我的小伙伴们正在致力于开发轻量、高效的uni-app组件库。</view>
    </view>
    <view class="page__bd">
      <view class="core-team">
        <view class="core-team__title">核心团队</view>
        <view class="core-team__list">
          <view v-for="(collaborator, index) in githubData.collaborators" :key="index" class="core-team__member">
            <image :src="collaborator.avatar_url" class="core-team__avatar" />
            <view class="core-team__name" :title="collaborator.login">{{ collaborator.login }}</view>
          </view>
        </view>
      </view>
      <!-- #ifndef MP-ALIPAY -->
      <view class="additional-links">
        <view class="additional-links__title">更多信息</view>
        <wd-cell-group border>
          <wd-cell title="关注公众号" title-width="200px" label="uni-app教程、组件库讯息一手掌握！" @click="openWeChat" is-link></wd-cell>
          <wd-cell title="捐赠" title-width="200px" label="每一份捐赠都是对我们莫大的鼓励！" @click="donate" is-link></wd-cell>
          <!-- #ifdef MP-WEIXIN -->
          <wd-cell title="观看激励广告" title-width="200px" label="每次观看都是对我们的支持，谢谢！" @click="watchAd" is-link></wd-cell>
          <!-- #endif -->
        </wd-cell-group>
      </view>
      <!-- #endif -->
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const githubData = ref<any>({
  collaborators: [
    {
      login: '不如摸鱼去',
      avatar_url: 'https://avatars.githubusercontent.com/u/26426873?v=4'
    },
    {
      login: 'jasper-ops',
      avatar_url: 'https://avatars.githubusercontent.com/u/85024227?v=4'
    },
    {
      login: '二狗',
      avatar_url: 'https://avatars.githubusercontent.com/u/50100966?v=4'
    },
    {
      login: 'RJQingHuan',
      avatar_url: 'https://avatars.githubusercontent.com/u/53939074?v=4'
    },
    {
      login: 'skiyee',
      avatar_url: 'https://avatars.githubusercontent.com/u/120664167?v=4'
    }
  ],
  contributors: [
    {
      login: 'contributor1',
      avatar_url: 'https://avatars.githubusercontent.com/u/12345678?v=4'
    },
    {
      login: 'contributor2',
      avatar_url: 'https://avatars.githubusercontent.com/u/87654321?v=4'
    }
  ]
})

// 打开公众号二维码
const openWeChat = () => {
  uni.previewImage({
    urls: ['/static/WeChatOfficialAccounts.jpg']
  })
}

// 打开捐赠二维码
const donate = () => {
  uni.getImageInfo({ src: '/static/weixinQrcode.jpg' }).then((res) => {
    uni.previewImage({
      urls: [res.path]
    })
  })
  // 打开捐赠页面
}

const watchAd = () => {
  uni.navigateTo({
    url: '/pages/wxRewardAd/Index'
  })
}
</script>

<style lang="scss" scoped>
.page__hd {
  padding: 15px 15px 0 20px;
}

.page__title {
  text-align: left;
  font-size: 24px;
  font-weight: 600;
}

.page__desc {
  margin-top: 20px;
  text-align: left;
  font-size: 14px;
}

.page__intro {
  margin-top: 10px;
  color: #333;
  text-align: left;
  font-size: 14px;
}

.page__bd {
  padding: 0 15px 30px 20px;
  user-select: none;
  background: #f9f9f9;
  border-radius: 10px;
}

.core-team {
  margin-top: 20px;
}

.core-team__title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.core-team__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.core-team__member {
  flex: 1 1 25%;
  max-width: 25%;
  box-sizing: border-box;
  margin-bottom: 10px;
  text-align: center;
  transition: transform 0.3s;
}

.core-team__member:hover {
  transform: scale(1.05);
}

.core-team__avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 0 auto;
  border: 2px solid #0083ff;
}

.core-team__name {
  margin-top: 5px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 auto;
  color: #333;
}

.additional-links {
  margin-top: 20px;
}

.additional-links__title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.additional-links__icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}
</style>
