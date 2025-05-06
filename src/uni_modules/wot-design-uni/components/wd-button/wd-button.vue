<template>
  <button
    :id="buttonId"
    :hover-class="`${disabled || loading ? '' : 'wd-button--active'}`"
    :style="customStyle"
    :class="[
      'wd-button',
      'is-' + type,
      'is-' + size,
      round ? 'is-round' : '',
      hairline ? 'is-hairline' : '',
      plain ? 'is-plain' : '',
      disabled ? 'is-disabled' : '',
      block ? 'is-block' : '',
      loading ? 'is-loading' : '',
      customClass
    ]"
    :hover-start-time="hoverStartTime"
    :hover-stay-time="hoverStayTime"
    :open-type="disabled || loading ? undefined : openType"
    :send-message-title="sendMessageTitle"
    :send-message-path="sendMessagePath"
    :send-message-img="sendMessageImg"
    :app-parameter="appParameter"
    :show-message-card="showMessageCard"
    :session-from="sessionFrom"
    :lang="lang"
    :hover-stop-propagation="hoverStopPropagation"
    :scope="scope"
    @click="handleClick"
    @getAuthorize="handleGetAuthorize"
    @getuserinfo="handleGetuserinfo"
    @contact="handleConcat"
    @getphonenumber="handleGetphonenumber"
    @error="handleError"
    @launchapp="handleLaunchapp"
    @opensetting="handleOpensetting"
    @chooseavatar="handleChooseavatar"
    @agreeprivacyauthorization="handleAgreePrivacyAuthorization"
  >
    <view class="wd-button__content">
      <view v-if="loading" class="wd-button__loading">
        <view class="wd-button__loading-svg" :style="loadingStyle"></view>
      </view>
      <wd-icon v-else-if="icon" custom-class="wd-button__icon" :name="icon" :classPrefix="classPrefix"></wd-icon>
      <view class="wd-button__text"><slot /></view>
    </view>
  </button>
</template>

<script lang="ts">
export default {
  name: 'wd-button',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import wdIcon from '../wd-icon/wd-icon.vue'
import { computed, watch } from 'vue'
import { ref } from 'vue'
import base64 from '../common/base64'
import { buttonProps } from './types'

const loadingIcon = (color = '#4D80F0', reverse = true) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42"><defs><linearGradient x1="100%" y1="0%" x2="0%" y2="0%" id="a"><stop stop-color="${
    reverse ? color : '#fff'
  }" offset="0%" stop-opacity="0"/><stop stop-color="${
    reverse ? color : '#fff'
  }" offset="100%"/></linearGradient></defs><g fill="none" fill-rule="evenodd"><path d="M21 1c11.046 0 20 8.954 20 20s-8.954 20-20 20S1 32.046 1 21 9.954 1 21 1zm0 7C13.82 8 8 13.82 8 21s5.82 13 13 13 13-5.82 13-13S28.18 8 21 8z" fill="${
    reverse ? '#fff' : color
  }"/><path d="M4.599 21c0 9.044 7.332 16.376 16.376 16.376 9.045 0 16.376-7.332 16.376-16.376" stroke="url(#a)" stroke-width="3.5" stroke-linecap="round"/></g></svg>`
}
const props = defineProps(buttonProps)
const emit = defineEmits([
  'click',
  'getuserinfo',
  'contact',
  'getphonenumber',
  'error',
  'launchapp',
  'opensetting',
  'chooseavatar',
  'agreeprivacyauthorization'
])

const hoverStartTime = ref<number>(20)
const hoverStayTime = ref<number>(70)
const loadingIconSvg = ref<string>('')

const loadingStyle = computed(() => {
  return `background-image: url(${loadingIconSvg.value});`
})

watch(
  () => props.loading,
  () => {
    buildLoadingSvg()
  },
  { deep: true, immediate: true }
)

function handleClick(event: any) {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}

/**
 * 支付宝小程序授权
 * @param event
 */
function handleGetAuthorize(event: any) {
  if (props.scope === 'phoneNumber') {
    handleGetphonenumber(event)
  } else if (props.scope === 'userInfo') {
    handleGetuserinfo(event)
  }
}

function handleGetuserinfo(event: any) {
  emit('getuserinfo', event.detail)
}

function handleConcat(event: any) {
  emit('contact', event.detail)
}

function handleGetphonenumber(event: any) {
  emit('getphonenumber', event.detail)
}

function handleError(event: any) {
  emit('error', event.detail)
}

function handleLaunchapp(event: any) {
  emit('launchapp', event.detail)
}

function handleOpensetting(event: any) {
  emit('opensetting', event.detail)
}

function handleChooseavatar(event: any) {
  emit('chooseavatar', event.detail)
}

function handleAgreePrivacyAuthorization(event: any) {
  emit('agreeprivacyauthorization', event.detail)
}
function buildLoadingSvg() {
  const { loadingColor, type, plain } = props
  let color = loadingColor
  if (!color) {
    switch (type) {
      case 'primary':
        color = '#4D80F0'
        break
      case 'success':
        color = '#34d19d'
        break
      case 'info':
        color = '#333'
        break
      case 'warning':
        color = '#f0883a'
        break
      case 'error':
        color = '#fa4350'
        break
      case 'default':
        color = '#333'
        break
    }
  }

  const svg = loadingIcon(color, !plain)
  loadingIconSvg.value = `"data:image/svg+xml;base64,${base64(svg)}"`
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
