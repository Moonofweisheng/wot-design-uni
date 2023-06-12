<template>
  <button
    hover-class="wd-button--active"
    :class="[
      'wd-button',
      'custom-class',
      'is-' + type,
      'is-' + size,
      plain ? 'is-plain' : '',
      disabled ? 'is-disabled' : '',
      round ? 'is-round' : '',
      suck ? 'is-suck' : '',
      block ? 'is-block' : '',
      loading ? 'is-loading' : ''
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
    <view v-if="loading" class="wd-button__loading">
      <view class="wd-button__loading-svg" :style="loadingStyle"></view>
    </view>
    <wd-icon v-if="icon" class="wd-button__icon" :name="icon"></wd-icon>
    <view class="wd-button__text"><slot /></view>
  </button>
</template>

<script lang="ts">
export default {
  // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，可以去掉微信小程序自定义组件多出的最外层标签
  options: {
    virtualHost: true
  }
}
</script>

<script lang="ts" setup>
import { computed, watch } from 'vue'
import { ref } from 'vue'
import base64 from '../common/base64'

const loadingIcon = (color = '#4D80F0', reverse = true) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42"><defs><linearGradient x1="100%" y1="0%" x2="0%" y2="0%" id="a"><stop stop-color="${
    reverse ? color : '#fff'
  }" offset="0%" stop-opacity="0"/><stop stop-color="${
    reverse ? color : '#fff'
  }" offset="100%"/></linearGradient></defs><g fill="none" fill-rule="evenodd"><path d="M21 1c11.046 0 20 8.954 20 20s-8.954 20-20 20S1 32.046 1 21 9.954 1 21 1zm0 7C13.82 8 8 13.82 8 21s5.82 13 13 13 13-5.82 13-13S28.18 8 21 8z" fill="${
    reverse ? '#fff' : color
  }"/><path d="M4.599 21c0 9.044 7.332 16.376 16.376 16.376 9.045 0 16.376-7.332 16.376-16.376" stroke="url(#a)" stroke-width="3.5" stroke-linecap="round"/></g></svg>`
}
type ButtonType = 'primary' | 'success' | 'info' | 'warning' | 'error' | 'default'
type ButtonSize = 'small' | 'medium' | 'large'

interface Props {
  plain: boolean
  disabled: boolean
  round: {
    type: boolean
    value: true
  }
  suck: boolean
  block: boolean
  type: ButtonType
  size: ButtonSize
  icon: string
  loading: boolean
  loadingColor: string
  openType: string
  formType: string
  hoverStopPropagation: boolean
  lang: string
  sessionFrom: string
  sendMessageTitle: string
  sendMessagePath: string
  sendMessageImg: string
  appParameter: string
  showMessageCard: boolean
}
const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  size: 'medium'
})

const hoverStartTime = ref<number>(20)
const hoverStayTime = ref<number>(70)
const loadingIconSvg = ref<string>('')

watch(
  () => props.loading,
  () => {
    buildLoadingSvg()
  },
  { deep: true, immediate: true }
)

const loadingStyle = computed(() => {
  return `background-image: url(${loadingIconSvg.value});`
})

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

  const svg = loadingIcon(color, !plain)
  loadingIconSvg.value = `"data:image/svg+xml;base64,${base64(svg)}"`
}
</script>

<style lang="scss" scoped>
@import './../common/abstracts/_mixin.scss';
@import './../common/abstracts/variable.scss';

@mixin button-type-style($color, $normal, $active, $disabled, $disabledcolor) {
  background: $normal;
  color: $color;
  font-weight: $-fw-medium;

  &::after {
    border-color: $normal;
  }
  &.wd-button--active {
    background: $active;
  }
  @include when(disabled) {
    &.wd-button--active {
      background: $disabled;
      color: $disabledcolor;
    }

    background: $disabled;
    color: $disabledcolor;

    &::after {
      border-color: $disabled;
    }
  }
  @include when(loading) {
    &,
    &.wd-button--active {
      color: $color;
      background: $normal;
    }
    &::after {
      border-color: $normal;
    }
  }
  @include when(suck) {
    border-radius: 0;
  }
}

@mixin button-plain-style($color, $normal, $active, $disabled) {
  color: $color;
  background: transparent;

  &::after {
    border-color: $normal;
  }
  &.wd-button--active {
    color: $active;
    background: transparent;

    &::after {
      border-color: $active;
    }
  }
  @include when(disabled) {
    color: $disabled;
    background: transparent;

    &::after {
      border-color: $disabled;
    }
    &.wd-button--active {
      background: transparent;

      &::after {
        border-color: $disabled;
      }
    }
  }
  @include when(loading) {
    &,
    &.wd-button--active {
      color: $color;
      background: transparent;

      &::after {
        border-color: $normal;
      }
    }
  }
}
@include b(button) {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  outline: none;
  -webkit-appearance: none;
  outline: none;
  background: transparent;
  box-sizing: border-box;
  border: none;
  color: $-button-normal-color;
  transition: all 0.2s;
  user-select: none;
  font-weight: normal;

  &::after {
    display: none;
  }
  &.wd-button--active {
    color: $-button-normal-active-color;
    background: $-button-normal-active-bg;

    &::after {
      border-color: $-button-normal-border-active-color;
    }
  }
  @include when(disabled) {
    color: $-button-normal-disabled-color;
    background: $-button-normal-disabled-bg;

    &::after {
      border-color: $-button-normal-border-disabled-color;
    }
    &.wd-button--active {
      color: $-button-normal-disabled-color;
      background: $-button-normal-disabled-bg;

      &::after {
        border-color: $-button-normal-border-disabled-color;
      }
    }
  }

  @include e(loading) {
    margin-right: 5px;
    animation: wd-rotate 0.8s linear infinite;
    animation-duration: 2s;
  }
  @include e(loading-svg) {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
  }
  @include when(loading) {
    &.wd-button--active {
      color: $-button-normal-color;
      background: transparent;

      &::after {
        border-color: $-button-border-color;
      }
    }
  }

  @include when(primary) {
    @include button-type-style(
      $-color-white,
      $-button-primary-bg-color,
      $-button-primary-active-color,
      $-button-primary-disabled-color,
      $-color-white
    );
  }
  @include when(success) {
    @include button-type-style($-color-white, $-button-success-color, $-button-success-active-color, $-button-success-disabled-color, $-color-white);
  }
  @include when(info) {
    @include button-type-style(
      $-button-info-color,
      $-button-info-bg-color,
      $-button-info-active-bg-color,
      $-button-info-disabled-bg-color,
      $-button-info-disabled-color
    );
  }
  @include when(warning) {
    @include button-type-style($-color-white, $-button-warning-color, $-button-warning-active-color, $-button-warning-disabled-color, $-color-white);
  }
  @include when(error) {
    @include button-type-style($-color-white, $-button-error-color, $-button-error-active-color, $-button-error-disabled-color, $-color-white);
  }

  @include when(small) {
    height: $-button-small-height;
    padding: $-button-small-padding;
    border-radius: $-button-small-radius;
    font-size: $-button-small-fs;
    font-weight: normal;

    @include when(round) {
      border-radius: calc($-button-small-height / 2);

      &::after {
        border-radius: $-button-small-height;
      }
    }

    .wd-button__loading {
      width: $-button-small-loading;
      height: $-button-small-loading;
    }
  }

  @include when(medium) {
    height: $-button-medium-height;
    padding: $-button-medium-padding;
    border-radius: $-button-medium-radius;
    font-size: $-button-medium-fs;

    &::after {
      border-radius: $-button-medium-radius * 2;
    }
    @include when(primary) {
      box-shadow: $-button-medium-box-shadow-size $-button-primary-box-shadow-color;
    }

    @include when(success) {
      box-shadow: $-button-medium-box-shadow-size $-button-success-box-shadow-color;
    }

    @include when(warning) {
      box-shadow: $-button-medium-box-shadow-size $-button-warning-box-shadow-color;
    }

    @include when(error) {
      box-shadow: $-button-medium-box-shadow-size $-button-error-box-shadow-color;
    }

    @include when(plain) {
      box-shadow: none;
    }

    @include when(round) {
      min-width: 118px;
      border-radius: calc($-button-medium-height / 2);

      &::after {
        border-radius: $-button-medium-height;
      }
      @include when(icon) {
        min-width: 0;
        border-radius: 50%;
      }

      @include when(text) {
        min-width: 0;
        border-radius: 0;
      }
    }

    .wd-button__loading {
      width: $-button-medium-loading;
      height: $-button-medium-loading;
    }
  }
  @include when(large) {
    height: $-button-large-height;
    padding: $-button-large-padding;
    border-radius: $-button-large-radius;
    font-size: $-button-large-fs;

    &::after {
      border-radius: $-button-large-radius * 2;
    }
    &:not(.is-plain) {
      @include when(primary) {
        box-shadow: $-button-large-box-shadow-size $-button-primary-box-shadow-color;
      }

      @include when(success) {
        box-shadow: $-button-large-box-shadow-size $-button-success-box-shadow-color;
      }

      @include when(warning) {
        box-shadow: $-button-large-box-shadow-size $-button-warning-box-shadow-color;
      }

      @include when(error) {
        box-shadow: $-button-large-box-shadow-size $-button-error-box-shadow-color;
      }
    }

    @include when(round) {
      border-radius: calc($-button-large-height / 2);

      &::after {
        border-radius: $-button-large-height;
      }
      @include when(icon) {
        border-radius: 50%;
      }
      @include when(text) {
        border-radius: 0;
      }
    }
    .wd-button__loading {
      width: $-button-large-loading;
      height: $-button-large-loading;
    }
  }

  @include when(text) {
    color: $-button-primary-color;
    padding: 4px 0;

    &::after {
      display: none;
    }
    &.wd-button--active {
      color: $-button-primary-active-color;
      background: transparent;
    }
    @include when(disabled) {
      color: $-button-normal-disabled-color;
      background: transparent;
    }
  }

  @include when(plain) {
    background: $-color-white;

    &::after {
      position: absolute;
      display: block;
      content: '';
      width: 200%;
      height: 200%;
      left: 0;
      top: 0;
      border: 1px solid $-button-border-color;
      box-sizing: border-box;
      transform: scale(0.5);
      transform-origin: left top;
    }
    @include when(primary) {
      @include button-plain-style($-button-primary-color, $-button-primary-color, $-button-primary-active-color, $-button-primary-disabled-color);
      &.wd-button--active {
        background-color: $-button-primary-plain-active-bg-color;
      }
      @include when(disabled) {
        &.wd-button--active {
          background-color: $-button-primary-plain-active-bg-color;
        }
        opacity: 1;
        background-color: $-button-primary-plain-active-bg-color;
        color: $-button-primary-plain-disabled-color;
      }
    }
    @include when(success) {
      @include button-plain-style($-button-success-color, $-button-success-color, $-button-success-active-color, $-button-success-disabled-color);
    }
    @include when(info) {
      @include button-plain-style($-button-info-plain-normal-color, $-button-info-bg-color, $-button-info-active-color, $-button-info-disabled-color);
      &::after {
        border-color: $-button-info-plain-border-color;
      }
      &.wd-button--active {
        background-color: $-button-info-plain-active-bg-color;

        &::after {
          border-color: $-button-info-plain-active-color;
        }
      }
      @include when(disabled) {
        &,
        &.wd-button--active {
          background-color: $-button-info-plain-disabled-bg-color;

          &::after {
            border-color: $-button-info-plain-disabled-bg-color;
          }
        }
      }
      @include when(loading) {
        &::after,
        &.wd-button--active::after {
          border-color: $-button-info-plain-border-color;
        }
      }
    }
    @include when(warning) {
      @include button-plain-style($-button-warning-color, $-button-warning-color, $-button-warning-active-color, $-button-warning-disabled-color);
    }
    @include when(error) {
      @include button-plain-style($-button-error-color, $-button-error-color, $-button-error-active-color, $-button-error-disabled-color);
    }
    @include when(suck) {
      &.wd-button--active {
        background: $-button-suck-active-color;
      }
      @include when(disabled) {
        background: $-color-white;
      }
    }
  }

  @include when(suck) {
    display: flex;
    font-size: $-button-large-fs;
    height: $-button-suck-height;
    border-radius: 0;

    &::after {
      display: none;
    }
  }

  @include when(block) {
    display: flex;
  }

  @include when(icon) {
    width: $-button-icon-size;
    height: $-button-icon-size;
    padding: 0;
    border-radius: 50%;
    font-size: 0;
    color: $-button-icon-color;

    &::after {
      display: none;
    }
    &.wd-button--active {
      background: $-button-icon-active-color;
    }
    .wd-button__icon {
      margin-right: 0;
    }
    @include when(disabled) {
      color: $-button-icon-disabled-color;
      background: transparent;

      &.wd-button--active {
        background: transparent;
      }
    }
  }

  @include e(icon) {
    display: block;
    margin-right: 6px;
    font-size: $-button-icon-fs;
    vertical-align: middle;
  }

  @include e(text) {
    user-select: none;
    white-space: nowrap;
  }
}
// 微信2.8.0以上版本加了较高层级的默认样式，需要重置掉
.wd-button {
  min-height: auto;
  width: auto;
}
@keyframes wd-rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
