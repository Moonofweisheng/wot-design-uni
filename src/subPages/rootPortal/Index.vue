<template>
  <view class="root-portal-demo">
    <demo-block :title="$t('ji-chu-yong-fa')">
      <wd-button type="primary" @click="showBasic = true">{{ $t('xian-shi-ji-ben-tan-chuang') }}</wd-button>
      <wd-root-portal v-if="showBasic">
        <view class="basic-modal">
          <view class="basic-modal-content">
            <text class="basic-modal-title">{{ $t('ji-ben-tan-chuang') }}</text>
            <text class="basic-modal-text">{{ $t('zhe-shi-yi-ge-shi-yong-root-portal-de-ji-ben-tan-chuang-shi-li') }}</text>
            <wd-button type="primary" @click="showBasic = false">{{ $t('guan-bi') }}</wd-button>
          </view>
        </view>
      </wd-root-portal>
    </demo-block>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showBasic = ref(false)
</script>

<style lang="scss" scoped>
.root-portal-demo {
  padding: 16px;
}

.basic-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.basic-modal-content {
  background-color: #fff;
  padding: 24px;
  border-radius: 12px;
  width: 280px;
  text-align: center;
}

.basic-modal-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
  display: block;
}

.basic-modal-text {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
  display: block;
}
</style>
