<template>
  <view>
    <view :class="`wd-navbar ${customClass} ${fixed ? 'is-fixed' : ''} ${safeAreaInsetTop ? 'is-safe' : ''} ${bordered ? 'is-border' : ''}`">
      <view class="wd-navbar__content">
        <view class="wd-navbar__capsule" v-if="$slots.capsule">
          <slot name="capsule" />
        </view>
        <view
          :class="`wd-navbar__left ${leftDisabled ? 'is-disabled' : ''}`"
          @click="handleClickLeft"
          v-if="!$slots.capsule && ($slots.left || leftArrow || leftText)"
        >
          <slot name="left" />
          <block v-if="!$slots.left && (leftArrow || leftText)">
            <wd-icon v-if="leftArrow" size="24px" name="arrow-left" custom-class="wd-navbar__arrow" />
            <view v-if="leftText" class="wd-navbar__text">{{ leftText }}</view>
          </block>
        </view>
        <view class="wd-navbar__title">
          <slot name="title" />
          <block v-if="!$slots.title && title">{{ title }}</block>
        </view>
        <view :class="`wd-navbar__right ${rightDisabled ? 'is-disabled' : ''}`" @click="handleClickRight" v-if="$slots.right || rightText">
          <slot name="right" />

          <view v-if="!$slots.right && rightText" class="wd-navbar__text" hover-class="wd-navbar__text--hover" hover-stay-time="70">
            {{ rightText }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-navbar',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
interface Props {
  customClass?: string
  customStyle?: string
  // 标题文字
  title?: string
  // 左侧文案
  leftText?: string
  // 右侧文案
  rightText?: string
  // 是否显示左侧箭头
  leftArrow?: boolean
  // 是否显示下边框
  bordered?: boolean
  // 是否固定到顶部
  fixed?: boolean
  // 固定在顶部时，是否在标签位置生成一个等高的占位元素
  placeholder?: boolean
  // 导航栏 z-index
  zIndex?: number
  // 是否开启顶部安全区适配
  safeAreaInsetTop?: boolean
  // 是否禁用左侧按钮，禁用时透明度降低，且无法点击
  leftDisabled?: boolean
  // 是否禁用右侧按钮，禁用时透明度降低，且无法点击
  rightDisabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  customStyle: '',
  customClass: '',
  title: '',
  leftText: '',
  rightText: '',
  leftArrow: true,
  bordered: true,
  fixed: false,
  placeholder: false,
  zIndex: 1,
  safeAreaInsetTop: false,
  leftDisabled: false,
  rightDisabled: false
})

const emit = defineEmits(['click-left', 'click-right'])

function handleClickLeft() {
  emit('click-left')
}

function handleClickRight() {
  emit('click-right')
}
</script>

<style lang="scss">
@import './index.scss';
</style>
