<template>
  <view :class="['wd-card', type == 'rectangle' ? 'is-rectangle' : '', 'custom-class']">
    <view class="wd-card__title-content custom-title-class">
      <view class="wd-card__title">
        <text v-if="title">{{ title }}</text>
        <slot v-else name="title"></slot>
      </view>
    </view>
    <view class="wd-card__content custom-content-class">
      <slot></slot>
    </view>
    <view class="wd-card__footer custom-footer-class">
      <slot name="footer"></slot>
    </view>
  </view>
</template>

<script lang="ts" setup>
interface Props {
  title?: string
  type?: string
  'custom-title-class'?: string
  'custom-content-class'?: string
  'custom-footer-class'?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: ''
})
</script>

<style lang="scss" scoped>
@import '../common/abstracts/variable.scss';
@import '../common/abstracts/_mixin.scss';

@include b(card) {
  padding: $-card-padding;
  background-color: $-card-bg;
  line-height: $-card-line-height;
  margin: $-card-margin;
  border-radius: $-card-radius;
  box-shadow: $-card-shadow-color;
  font-size: $-card-fs;
  margin-bottom: 12px;

  @include when(rectangle) {
    margin-left: 0;
    margin-right: 0;
    border-radius: 0;
    box-shadow: none;

    .wd-card__title-content {
      font-size: $-card-fs;
    }
    .wd-card__content {
      position: relative;
      padding: $-card-rectangle-content-padding;

      @include halfPixelBorder('top', 0, $-card-content-border-color);
    }
    .wd-card__footer {
      position: relative;
      padding: $-card-rectangle-footer-padding;

      @include halfPixelBorder('top', 0, $-card-content-border-color);
    }
  }
  @include e(title-content) {
    padding: 16px 0;
    color: $-card-title-color;
    font-size: $-card-title-fs;
  }
  @include e(content) {
    color: $-card-content-color;
    line-height: $-card-content-line-height;
  }
  @include e(footer) {
    padding: $-card-footer-padding;
    text-align: right;
  }
}
</style>
