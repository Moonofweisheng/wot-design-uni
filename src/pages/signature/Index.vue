<!--
 * @Author: 810505339
 * @Date: 2025-02-11 21:17:21
 * @LastEditors: weisheng
 * @LastEditTime: 2025-03-23 14:12:32
 * @FilePath: /wot-design-uni/src/pages/signature/Index.vue
 * 记得注释
-->
<template>
  <page-wraper>
    <demo-block title="基础用法">
      <wd-signature @confirm="confirm" @clear="clear" :export-scale="2" background-color="#ffffff" />
    </demo-block>

    <demo-block title="历史记录">
      <wd-signature enable-history background-color="#f5f5f5" />
    </demo-block>

    <demo-block title="笔锋模式-基础">
      <wd-signature pressure :height="300" />
    </demo-block>

    <demo-block title="笔锋模式-自定义">
      <wd-signature pressure :height="300" :min-width="1" :max-width="6" :min-speed="1.5" background-color="#f5f5f5" />
      <view class="tip-text">快速书写产生细线条，慢速书写产生粗线条</view>
    </demo-block>

    <demo-block title="笔锋模式 + 历史记录">
      <wd-signature pressure enable-history :height="300" :min-width="1" :max-width="6" background-color="#f5f5f5" />
      <view class="tip-text">结合历史记录，支持笔锋效果的撤销与恢复</view>
    </demo-block>

    <demo-block title="自定义按钮">
      <wd-signature :disabled="disabled" enable-history :step="3">
        <template #footer="{ clear, confirm, currentStep, restore, revoke, historyList }">
          <wd-button block @click="changeDisabled" v-if="disabled">开始签名</wd-button>
          <block v-if="!disabled">
            <wd-button size="small" plain @click="revoke" :disabled="currentStep <= 0">撤回</wd-button>
            <wd-button size="small" plain @click="restore" :disabled="currentStep >= historyList.length">恢复</wd-button>
            <wd-button size="small" plain @click="clear">清除</wd-button>
            <wd-button size="small" @click="confirm">确定</wd-button>
          </block>
        </template>
      </wd-signature>
    </demo-block>

    <demo-block title="自定义画笔">
      <wd-signature pen-color="#0083ff" :line-width="4" />
    </demo-block>

    <demo-block title="弹窗中使用">
      <wd-button type="primary" @click="showPopup = true">打开签名板</wd-button>

      <wd-popup
        v-model="showPopup"
        closable
        safe-area-inset-bottom
        position="bottom"
        custom-style="padding: 48px 20px 20px 20px; border-radius: 16px 16px 0 0;"
        @after-enter="signatureRef?.init()"
      >
        <wd-signature ref="signatureRef" :height="300" enable-history pressure background-color="#f5f5f5" @confirm="handlePopupConfirm" />
      </wd-popup>
    </demo-block>

    <demo-block title="横屏签名">
      <wd-button type="primary" @click="toSignatureLandscape">使用横屏签名</wd-button>
    </demo-block>
  </page-wraper>
</template>

<script lang="ts" setup>
import type { SignatureInstance, SignatureResult } from '@/uni_modules/wot-design-uni/components/wd-signature/types'
import { ref } from 'vue'

const img = ref<Partial<SignatureResult>>({})

const disabled = ref(true)

function confirm(result: SignatureResult) {
  debugger
  if (result.success) {
    uni.previewImage({
      urls: [result.tempFilePath]
    })
  }
}

function clear() {
  img.value = {}
}

function changeDisabled() {
  disabled.value = false
}

const showPopup = ref(false)
const signatureRef = ref<SignatureInstance>()

function handlePopupConfirm(result: SignatureResult) {
  showPopup.value = false
  if (result.success) {
    uni.previewImage({
      urls: [result.tempFilePath]
    })
  }
}

function toSignatureLandscape() {
  console.log(232)

  uni.navigateTo({
    url: '/pages/signature/Landscape'
  })
}
</script>

<style lang="scss" scoped>
.tip-text {
  font-size: 12px;
  color: #999;
  margin-top: 8px;
  text-align: center;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;

  .button-row {
    display: flex;
    justify-content: center;
    gap: 8px;
  }
}

.popup-footer {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
