<!--
 * @Author: weisheng
 * @Date: 2023-07-20 00:34:54
 * @LastEditTime: 2023-07-20 12:56:29
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-card\wd-card.vue
 * 记得注释
-->
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
