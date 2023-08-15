<template>
  <view :class="['wd-card', type == 'rectangle' ? 'is-rectangle' : '', customClass]">
    <view :class="['wd-card__title-content', customTitleClass]">
      <view class="wd-card__title">
        <text v-if="title">{{ title }}</text>
        <slot v-else name="title"></slot>
      </view>
    </view>
    <view :class="`wd-card__content ${customContentClass}`">
      <slot></slot>
    </view>
    <view :class="`wd-card__footer ${customFooterClass}`">
      <slot name="footer"></slot>
    </view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-card',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
interface Props {
  title?: string
  type?: string
  customClass?: string
  customTitleClass?: string
  customContentClass?: string
  customFooterClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: '',
  customClass: '',
  customTitleClass: '',
  customContentClass: '',
  customFooterClass: ''
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
