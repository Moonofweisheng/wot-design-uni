<template>
  <button
    hover-class="wd-button--active"
    :style="customStyle"
    :class="[
      'wd-button',
      'is-' + type,
      'is-' + size,
      plain ? 'is-plain' : '',
      disabled ? 'is-disabled' : '',
      round ? 'is-round' : '',
      suck ? 'is-suck' : '',
      block ? 'is-block' : '',
      loading ? 'is-loading' : '',
      customClass
    ]"
    :hover-start-time="hoverStartTime"
    :hover-stay-time="hoverStayTime"
    :open-type="openType"
    :send-message-title="sendMessageTitle"
    :send-message-path="sendMessagePath"
    :send-message-img="sendMessageImg"
    :app-parameter="appParameter"
    :show-message-card="showMessageCard"
    :session-from="sessionFrom"
    :lang="lang"
    :hover-stop-propagation="hoverStopPropagation"
    :form-type="formType"
    @click="handleClick"
    @getuserinfo="handleGetuserinfo"
    @contact="handleConcat"
    @getphonenumber="handleGetphonenumber"
    @error="handleError"
    @launchapp="handleLaunchapp"
    @opensetting="handleOpensetting"
  >
    <view v-if="loading" class="wd-button__loading"/>
    <wd-icon v-if="icon" custom-class="wd-button__icon" :name="icon"></wd-icon>
    <view class="wd-button__text"><slot /></view>
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
import { watch } from 'vue'
import { ref } from 'vue'

type ButtonType = 'primary' | 'success' | 'info' | 'warning' | 'error' | 'default' | 'text' | 'icon'
type ButtonSize = 'small' | 'medium' | 'large'

interface Props {
  plain?: boolean
  disabled?: boolean
  round?: boolean
  suck?: boolean
  block?: boolean
  type?: ButtonType
  size?: ButtonSize
  icon?: string
  loading?: boolean
  loadingColor?: string
  openType?: string
  formType?: string
  hoverStopPropagation?: boolean
  lang?: string
  sessionFrom?: string
  sendMessageTitle?: string
  sendMessagePath?: string
  sendMessageImg?: string
  appParameter?: string
  showMessageCard?: boolean
  customClass?: string
  customStyle?: string
}
const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  size: 'medium',
  round: true,
  plain: false,
  loading: false,
  suck: false,
  block: false,
  disabled: false,
  customClass: '',
  customStyle: ''
})

const hoverStartTime = ref<number>(20)
const hoverStayTime = ref<number>(70)

watch(
  () => props.loading,
  () => {
    buildLoadingSvg()
  },
  { deep: true, immediate: true }
)

const emit = defineEmits(['click', 'getuserinfo', 'contact', 'getphonenumber', 'error', 'launchapp', 'opensetting'])

function handleClick(event) {
  if (!props.disabled && !props.loading) {
    emit('click', event.detail)
  }
}

function handleGetuserinfo(event) {
  emit('getuserinfo', event.detail)
}

function handleConcat(event) {
  emit('contact', event.detail)
}

function handleGetphonenumber(event) {
  emit('getphonenumber', event.detail)
}

function handleError(event) {
  emit('error', event.detail)
}

function handleLaunchapp(event) {
  emit('launchapp', event.detail)
}

function handleOpensetting(event) {
  emit('opensetting', event.detail)
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
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
