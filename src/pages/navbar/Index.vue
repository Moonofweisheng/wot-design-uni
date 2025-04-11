<!--
 * @Author: weisheng
 * @Date: 2023-10-17 17:20:31
 * @LastEditTime: 2025-03-31 22:54:02
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: /wot-design-uni/src/pages/navbar/Index.vue
 * 记得注释
-->
<template>
  <wd-toast></wd-toast>
  <page-wraper>
    <wd-navbar fixed placeholder :title="$t('navbar-dao-hang-tiao')" left-arrow safeAreaInsetTop @click-left="handleClickLeft"></wd-navbar>

    <demo-block :title="$t('ji-chu-yong-fa-0')" transparent>
      <wd-navbar :title="$t('biaoTi-0')"></wd-navbar>
    </demo-block>

    <demo-block :title="$t('fan-hui-shang-ji')" transparent>
      <wd-navbar :title="$t('biaoTi-0')" :left-text="$t('fan-hui')" left-arrow @click-left="handleClickLeft"></wd-navbar>
    </demo-block>

    <demo-block :title="$t('you-ce-an-niu')" transparent>
      <wd-navbar
        :title="$t('biaoTi-0')"
        :left-text="$t('fan-hui')"
        left-arrow
        :right-text="$t('an-niu')"
        @click-left="handleClickLeft"
        @click-right="handleClickRight"
      ></wd-navbar>
    </demo-block>

    <demo-block :title="$t('shi-yong-cha-cao')" transparent>
      <wd-navbar :title="$t('biaoTi-0')" @click-left="handleClickLeft">
        <template #left>
          <wd-icon name="arrow-left" size="24px" class="wd-navbar__arrow" />
        </template>
        <template #right>
          <wd-icon name="search" size="18" />
        </template>
      </wd-navbar>
    </demo-block>

    <demo-block :title="$t('jin-yong-an-niu')" transparent>
      <wd-navbar :title="$t('biaoTi-0')" :left-text="$t('fan-hui')" :right-text="$t('an-niu')" left-arrow left-disabled right-disabled></wd-navbar>
    </demo-block>

    <demo-block :title="$t('jiao-nang-yang-shi')" transparent>
      <wd-navbar :title="$t('biaoTi-0')" :left-text="$t('fan-hui')" :right-text="$t('she-zhi')" left-arrow>
        <template #capsule>
          <wd-navbar-capsule @back="handleBack" @back-home="handleBackHome"></wd-navbar-capsule>
        </template>
      </wd-navbar>
    </demo-block>

    <demo-block :title="$t('dai-sou-suo-lan')" transparent>
      <wd-navbar :left-text="$t('fan-hui')" :right-text="$t('she-zhi')" left-arrow>
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
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const keyword = ref('')
const { show: showToast } = useToast()

function handleClickLeft() {
  uni.navigateBack({})
}

function handleClickRight() {
  showToast(t('an-niu-0'))
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
  :deep() {
    .wd-search {
      background: transparent;
    }
  }
}
</style>
