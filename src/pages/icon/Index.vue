<template>
  <view>
    <page-wraper>
      <view class="icon">
        <view style="position: sticky; top: 0; z-index: 2">
          <wd-search hide-cancel placeholder="查找图标" light v-model="keyword" @search="handleSearch" @clear="handleClear" />
        </view>
        <view class="icon-list">
          <view v-for="(icon, index) in showIcons" :key="index" class="icon-item" @click="handleClick(icon)">
            <view><wd-icon :name="icon" size="22px" custom-class="icon-item-class" /></view>
            <view class="icon-item-name">{{ icon }}</view>
          </view>
          <wd-status-tip v-if="!showIcons.length" image="search" tip="当前无相关图标" />
        </view>
      </view>
    </page-wraper>
  </view>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useNotify } from '@/uni_modules/wot-design-uni'
const { showNotify } = useNotify()
const keyword = ref<string>('')

const icons = ref<Array<string>>([
  'check',
  'refresh',
  'phone',
  'filter',
  'thin-arrow-left',
  'more',
  'delete',
  'search',
  'close',
  'translate-bold',
  'scan',
  'add',
  'delete-thin',
  'chat',
  'keywords',
  'transfer',
  'camera',
  'warning',
  'video',
  'note',
  'list',
  'lenovo',
  'goods',
  'evaluation',
  'picture',
  'eye-close',
  'view',
  'clock',
  'computer',
  'phone-compute',
  'download',
  'spool',
  'jdm',
  'decrease',
  'bags',
  'copy',
  'add-circle',
  'edit-outline',
  'dong',
  'fill-arrow-down',
  'read',
  'detection',
  'subscribe',
  'wifi-error',
  'check-outline',
  'close-bold',
  'close-outline',
  'warn-bold',
  'error-fill',
  'check-bold',
  'star-on',
  'fill-camera',
  'arrow-left',
  'arrow-up',
  'arrow-down',
  'arrow-right',
  'setting',
  'rotate',
  'arrow-thin-down',
  'arrow-thin-up',
  'keyboard-delete',
  'keyboard-collapse',
  'usergroup-clear',
  'user-circle',
  'user-talk',
  'user-clear',
  'user',
  'usergroup-add',
  'usergroup',
  'user-add',
  'user-avatar',
  'pointing-hand',
  'cursor',
  'fullsreen',
  'cloud-download',
  'chevron-down-rectangle',
  'edit',
  'fullscreen-exit',
  'circle1',
  'close-normal',
  'browse',
  'browse-off',
  'chevron-up-rectangle',
  'add-rectangle',
  'add1',
  'add-circle1',
  'download1',
  'link',
  'edit-1',
  'jump',
  'chevron-down-circle',
  'delete1',
  'filter-clear',
  'check-rectangle-filled',
  'minus-circle-filled',
  'play',
  'pause-circle-filled',
  'filter1',
  'move',
  'login',
  'minus-circle',
  'close-circle',
  'logout',
  'search1',
  'pause-circle',
  'play-circle',
  'more1',
  'minus-rectangle',
  'stop',
  'scan1',
  'close-rectangle',
  'rollback',
  'a-order-adjustmentcolumn',
  'pause',
  'ellipsis',
  'cloud-upload',
  'stop-circle-filled',
  'clear',
  'remove',
  'zoom-out',
  'thumb-down',
  'setting1',
  'save',
  'unfold-more',
  'zoom-in',
  'thumb-up',
  'unfold-less',
  'play-circle-filled',
  'poweroff',
  'share',
  'refresh1',
  'link-unlink',
  'upload',
  'rectangle',
  'stop-circle',
  'backtop-rectangle',
  'caret-down',
  'arrow-left1',
  'help-circle',
  'help-circle-filled',
  'time-filled',
  'close-circle-filled',
  'info-circle',
  'info-circle-filled',
  'check1',
  'help',
  'error',
  'check-circle',
  'error-circle-filled',
  'error-circle',
  'check-rectangle',
  'check-circle-filled',
  'chevron-up',
  'chevron-up-circle',
  'chevron-right',
  'arrow-down-rectangle',
  'caret-up-small',
  'chevron-right-rectangle',
  'caret-right-small',
  'arrow-right1',
  'backtop',
  'arrow-up1',
  'caret-up',
  'backward',
  'arrow-down1',
  'chevron-left',
  'caret-right',
  'caret-left',
  'page-last',
  'next',
  'swap',
  'round',
  'previous',
  'enter',
  'chevron-down',
  'caret-down-small',
  'swap-right',
  'chevron-left-circle',
  'caret-left-small',
  'chevron-right-circle',
  'a-chevron-leftdouble',
  'chevron-left-rectangle',
  'a-chevron-rightdouble',
  'page-first',
  'forward',
  'view-column',
  'view-module',
  'format-vertical-align-right',
  'view-list',
  'order-descending',
  'format-horizontal-align-bottom',
  'queue',
  'menu-fold',
  'menu-unfold',
  'format-horizontal-align-top',
  'a-rootlist',
  'order-ascending',
  'format-vertical-align-left',
  'format-horizontal-align-center',
  'format-vertical-align-center',
  'swap-left',
  'flag',
  'code',
  'cart',
  'attach',
  'chart',
  'creditcard',
  'calendar',
  'app',
  'books',
  'barcode',
  'chart-pie',
  'chart-bar',
  'chart-bubble',
  'bulletpoint',
  'bianjiliebiao',
  'image',
  'laptop',
  'hourglass',
  'call',
  'mobile-vibrate',
  'mail',
  'notification-filled',
  'desktop',
  'history',
  'discount-filled',
  'dashboard',
  'discount',
  'heart-filled',
  'chat1',
  'a-controlplatform',
  'gift',
  'photo',
  'play-circle-stroke',
  'notification',
  'cloud',
  'gender-female',
  'fork',
  'layers',
  'lock-off',
  'location',
  'mobile',
  'qrcode',
  'home1',
  'time',
  'heart',
  'lock-on',
  'print',
  'slash',
  'usb',
  'tools',
  'wifi',
  'star-filled',
  'server',
  'sound',
  'a-precisemonitor',
  'service',
  'tips',
  'pin',
  'secured',
  'star',
  'gender-male',
  'shop',
  'money-circle',
  'file-word',
  'file-unknown',
  'folder-open',
  'file-pdf',
  'folder',
  'folder-add',
  'file',
  'file-image',
  'file-powerpoint',
  'file-add',
  'file-icon',
  'file-paste',
  'file-excel',
  'file-copy',
  'video1',
  'wallet',
  'ie',
  'logo-codepen',
  'github-filled',
  'ie-filled',
  'apple',
  'windows-filled',
  'internet',
  'github',
  'windows',
  'apple-filled',
  'chrome-filled',
  'chrome',
  'android',
  'circle',
  'home'
])

const showIcons = ref<Array<string>>([])

onMounted(() => {
  showIcons.value = icons.value
})

function handleSearch() {
  showIcons.value = icons.value.filter((str) => str.includes(keyword.value))
}

function handleClear() {
  keyword.value = ''
  showIcons.value = icons.value
}

function handleClick(icon: string) {
  // #ifdef H5
  uni.setClipboardData({
    data: `<wd-icon name="${icon}" size="22px"></wd-icon>`,
    showToast: false,
    success: () => {
      showNotify({
        type: 'success',
        duration: 1500,
        message: `复制成功: <wd-icon name="${icon}" size="22px"></wd-icon>`
      })
    }
  })

  // #endif
}
</script>
<style lang="scss" scoped>
$-light-color: #999;

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

.icon {
  position: relative;
  height: 100vh;
  overflow: auto;
  height: calc(100vh - var(--window-top));
  height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom));
  height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom));
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

:deep(.icon-item-class) {
  color: $-light-color;
}

.icon-item-name {
  margin: 10px 0;
  color: $-light-color;
}
</style>
