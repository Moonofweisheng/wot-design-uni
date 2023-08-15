<template>
  <view>
    <page-wraper>
      <view class="icon-list">
        <view v-for="(icon, index) in icons" :key="index" class="icon-item">
          <view><wd-icon :name="icon" size="22px" custom-class="icon-item-class" /></view>
          <view class="icon-item-name">{{ icon }}</view>
        </view>
      </view>
    </page-wraper>
  </view>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const icons = ref([
  'keyboard-collapse',
  'keyboard-delete',
  'arrow-thin-up',
  'arrow-thin-down',
  'rotate',
  'setting',
  'arrow-right',
  'arrow-down',
  'arrow-up',
  'arrow-left',
  'fill-camera',
  'star-on',
  'check-bold',
  'error-fill',
  'warn-bold',
  'close-outline',
  'close-bold',
  'check-outline',
  'wifi-error',
  'subscribe',
  'detection',
  'read',
  'fill-arrow-down',
  'dong',
  'edit-outline',
  'add-circle',
  'copy',
  'bags',
  'decrease',
  'jdm',
  'spool',
  'download',
  'phone-compute',
  'computer',
  'clock',
  'view',
  'eye-close',
  'picture',
  'evaluation',
  'goods',
  'lenovo',
  'list',
  'note',
  'video',
  'warning',
  'camera',
  'transfer',
  'keywords',
  'chat',
  'delete-thin',
  'add',
  'scan',
  'translate-bold',
  'close',
  'search',
  'delete',
  'more',
  'thin-arrow-left',
  'filter',
  'phone',
  'refresh',
  'check'
])
</script>
<style lang="scss" scoped>
.wot-theme-dark {
  .icon-list {
    background: $-dark-background2;
    :deep(.icon-item-class) {
      color: $-dark-color;
    }
  }
  .icon-item-name {
    color: $-dark-color3;
  }
}

.icon-list {
  box-sizing: border-box;
  display: flex;
  padding: 15px;
  flex-wrap: wrap;
  background: #fff;
}
.icon-item {
  width: 25%;
  padding: 15px 0;
  text-align: center;
}
.icon-item-name {
  margin: 10px 0;
  color: #999;
}
</style>
