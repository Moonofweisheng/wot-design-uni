<template>
  <wd-toast />
  <view class="fab" @click="closeOutside">
    <page-wraper>
      <demo-block :title="$t('xuan-fu-an-niu-zhu-ti-se')">
        <wd-radio-group v-model="type" inline shape="dot">
          <wd-radio value="primary" custom-class="custom-radio">{{ $t('zhu-yao-an-niu') }}</wd-radio>
          <wd-radio value="success" custom-class="custom-radio">{{ $t('cheng-gong-an-niu-0') }}</wd-radio>
          <wd-radio value="warning" custom-class="custom-radio">{{ $t('jing-gao-an-niu-0') }}</wd-radio>
          <wd-radio value="error" custom-class="custom-radio">{{ $t('wei-xian-an-niu') }}</wd-radio>
          <wd-radio value="info" custom-class="custom-radio">{{ $t('xin-xi-an-niu') }}</wd-radio>
        </wd-radio-group>
      </demo-block>
      <demo-block :title="$t('xuan-fu-an-niu-wei-zhi')">
        <wd-radio-group v-model="position" inline shape="dot">
          <wd-radio value="left-top" custom-class="custom-radio">{{ $t('zuo-shang') }}</wd-radio>
          <wd-radio value="right-top" custom-class="custom-radio">{{ $t('you-shang') }}</wd-radio>
          <wd-radio value="left-center" custom-class="custom-radio">{{ $t('zuo-zhong') }}</wd-radio>
          <wd-radio value="right-center" custom-class="custom-radio">{{ $t('you-zhong') }}</wd-radio>
          <wd-radio value="top-center" custom-class="custom-radio">{{ $t('shang-zhong') }}</wd-radio>
          <wd-radio value="bottom-center" custom-class="custom-radio">{{ $t('xia-zhong') }}</wd-radio>
          <wd-radio value="left-bottom" custom-class="custom-radio">{{ $t('zuo-xia') }}</wd-radio>
          <wd-radio value="right-bottom" custom-class="custom-radio">{{ $t('you-xia') }}</wd-radio>
        </wd-radio-group>
      </demo-block>
      <demo-block :title="$t('cai-dan-dan-chu-fang-xiang')">
        <wd-radio-group v-model="direction" inline shape="dot">
          <wd-radio value="top" custom-class="custom-radio">{{ $t('xiang-shang') }}</wd-radio>
          <wd-radio value="bottom" custom-class="custom-radio">{{ $t('xiang-xia') }}</wd-radio>
          <wd-radio value="right" custom-class="custom-radio">{{ $t('xiang-you') }}</wd-radio>
          <wd-radio value="left" custom-class="custom-radio">{{ $t('xiang-zuo') }}</wd-radio>
        </wd-radio-group>
      </demo-block>
      <demo-block :title="$t('jinYong')">
        <view @click.stop="">
          <wd-switch v-model="disabled" size="22px" />
        </view>
      </demo-block>
      <demo-block :title="$t('ke-tuo-dong')">
        <view @click.stop="">
          <wd-switch v-model="draggable" size="22px" />
        </view>
      </demo-block>

      <demo-block :title="$t('qie-huan-zhan-shi')">
        <view @click.stop="">
          <wd-button type="primary" @click="active = !active" round>{{ $t('qie-huan') }}</wd-button>
        </view>
      </demo-block>

      <demo-block :title="$t('zi-ding-yi-chu-fa-qi')">
        <view @click.stop="">
          <wd-switch v-model="useTriggerSlot" size="22px" />
        </view>
      </demo-block>
      <wd-fab
        v-if="!useTriggerSlot"
        v-model:active="active"
        :disabled="disabled"
        :type="type"
        :position="position"
        :direction="direction"
        :draggable="draggable"
        @click="showToast('我被点了')"
      >
        <wd-button @click="showToast('一键三连')" :disabled="disabled" custom-class="custom-button" type="primary" round>
          <wd-icon name="github-filled" size="22px"></wd-icon>
        </wd-button>
        <wd-button @click="showToast('我要收藏')" :disabled="disabled" custom-class="custom-button" type="success" round>
          <wd-icon name="star" size="22px"></wd-icon>
        </wd-button>

        <wd-button @click="showToast('我要投币')" :disabled="disabled" custom-class="custom-button" type="error" round>
          <wd-icon name="money-circle" size="22px"></wd-icon>
        </wd-button>
        <wd-button @click="showToast('我要点赞')" :disabled="disabled" custom-class="custom-button" type="warning" round>
          <wd-icon name="thumb-up" size="22px"></wd-icon>
        </wd-button>
      </wd-fab>

      <wd-fab v-else position="left-bottom" :draggable="draggable" :expandable="false">
        <template #trigger>
          <wd-button @click="handleCustomClick" icon="share" type="error">{{ $t('fen-xiang-gei-peng-you') }}</wd-button>
        </template>
      </wd-fab>
    </page-wraper>
  </view>
</template>
<script lang="ts" setup>
import { useQueue, useToast } from '@/uni_modules/wot-design-uni'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { show: showToast } = useToast()
const active = ref<boolean>(false)
const type = ref<'primary' | 'success' | 'info' | 'warning' | 'error' | 'default'>('primary')
const position = ref<'left-top' | 'right-top' | 'left-bottom' | 'right-bottom' | 'left-center' | 'right-center' | 'top-center' | 'bottom-center'>(
  'left-bottom'
)
const direction = ref<'top' | 'right' | 'bottom' | 'left'>('top')
const disabled = ref<boolean>(false)
const draggable = ref<boolean>(false)
const useTriggerSlot = ref<boolean>(false)

const { closeOutside } = useQueue()

function handleCustomClick() {
  showToast(t('fen-xiang-gei-peng-you-0'))
}
</script>
<style lang="scss" scoped>
.fab {
  position: relative;
  height: 100%;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding-bottom: 88rpx;
  :deep(.custom-button) {
    min-width: auto !important;
    box-sizing: border-box;
    width: 32px !important;
    height: 32px !important;
    border-radius: 16px !important;
    margin: 8rpx;
  }

  :deep(.custom-radio) {
    height: 32px !important;
    line-height: 32px !important;
  }
}
</style>
