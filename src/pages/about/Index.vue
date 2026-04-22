<template>
  <page-wraper :use-wx-ad="false" :use-reward-fab="true">
    <view class="page">
      <view class="page__hd">
        <view class="page__title">{{ $t('guanYuWoMen') }}</view>
        <view class="page__desc">
          {{ $t('woShiBuRuMoYuQuYiGeQianDuanDaGongZiWoHeWoDeXiaoHuoBanMenZhengZaiZhiLiYuKaiFaQingLiangGaoXiaoDeUniappZuJianKu') }}
        </view>
      </view>
      <view class="page__bd">
        <view class="core-team">
          <view class="core-team__title">{{ $t('heXinTuanDui') }}</view>
          <view class="core-team__list">
            <view v-for="(collaborator, index) in githubData.collaborators" :key="index" class="core-team__member">
              <image :src="collaborator.avatar_url" class="core-team__avatar" />
              <view class="core-team__name" :title="collaborator.login">{{ collaborator.login }}</view>
            </view>
          </view>
        </view>

        <view class="additional-links">
          <view class="additional-links__title">{{ $t('gengDuoXinXi') }}</view>
          <wd-cell-group border>
            <wd-cell
              :title="$t('yuYanQieHuan')"
              title-width="200px"
              :label="$t('dangQianYuYan') + ': ' + (currentLang === 'zh-CN' ? '中文' : 'English')"
              is-link
              @click="showLanguageSwitch = true"
            ></wd-cell>
            <!-- #ifndef MP-ALIPAY -->

            <wd-cell
              :title="$t('guanZhuGongZhongHao')"
              title-width="200px"
              :label="$t('uniappJiaoChengZuJianKuXunXiYiShouZhangWo')"
              @click="openWeChat"
              is-link
            ></wd-cell>
            <wd-cell
              :title="$t('juanZeng')"
              title-width="200px"
              :label="$t('meiYiFenJuanZengDuShiDuiWoMenMoDaDeGuLi')"
              @click="donate"
              is-link
            ></wd-cell>
            <!-- #ifdef MP-WEIXIN -->
            <wd-cell
              :title="$t('guanKanJiLiGuangGao')"
              title-width="200px"
              :label="$t('meiCiGuanKanDuShiDuiWoMenDeZhiChiXieXie')"
              @click="watchAd"
              is-link
            ></wd-cell>
            <!-- #endif -->
            <!-- #endif -->
          </wd-cell-group>
        </view>
      </view>
      <wd-action-sheet
        v-model="showLanguageSwitch"
        :actions="languageActions"
        :cancel-text="$t('qu-xiao')"
        :title="$t('yuYanQieHuan')"
        @select="handleLanguageSelect"
      />
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useI18nSync } from '../../hooks/useI18nSync'

// 使用国际化钩子
const { setLocale, currentLang } = useI18nSync()

// 控制语言切换弹出层的显示
const showLanguageSwitch = ref(false)

// 语言切换选项
const languageActions = computed(() => [
  {
    name: '中文 🇨🇳',
    color: currentLang.value === 'zh-CN' ? '#0083ff' : ''
  },
  {
    name: 'English 🇺🇸',
    color: currentLang.value === 'en-US' ? '#0083ff' : ''
  }
])

// 处理语言选择
const handleLanguageSelect = ({ index }: { index: number }) => {
  const locale = index === 0 ? 'zh-CN' : 'en-US'
  switchLanguage(locale)
}

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

// 切换语言
const switchLanguage = (locale: string) => {
  setLocale(locale)
}

// 打开公众号二维码
const openWeChat = () => {
  uni.previewImage({
    urls: ['https://v1.wot-ui.cn/wechatPublicAccount.png']
  })
}

// 打开捐赠二维码
const donate = () => {
  uni.previewImage({
    urls: ['https://v1.wot-ui.cn/weixinQrcode.jpg']
  })
  // 打开捐赠页面
}

const watchAd = () => {
  uni.navigateTo({
    url: '/subPages/wxRewardAd/Index'
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
  text-align: left;
  font-size: 14px;
}

.page__bd {
  padding: 0 15px 30px 20px;
  user-select: none;
  border-radius: 10px;
}

.core-team {
  margin-top: 20px;
}

.core-team__title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
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
}

// 移除了不再需要的language-switch相关样式

.additional-links {
  margin-top: 20px;
}

.additional-links__title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.additional-links__icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}
</style>
