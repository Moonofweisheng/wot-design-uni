<!--
 * @Author: weisheng
 * @Date: 2023-06-12 18:40:58
 * @LastEditTime: 2023-07-01 18:13:00
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-radio\wd-radio.vue
 * 记得注释
-->
<template>
  <view
    class="wd-radio {{cell ? 'is-cell-radio':''}} {{cell && shape == 'button' ? 'is-button-radio':''}} {{ size && ('is-' + size) }} {{ inline ? 'is-inline' : '' }} {{ isChecked ? 'is-checked' : '' }} {{shape !== 'check' ? 'is-'+shape : '' }} {{ disabled ? 'is-disabled' : ''}} custom-class"
    bindtap="handleClick"
  >
    <view
      class="wd-radio__label"
      style="{{ maxWidth ? 'max-width:'+ maxWidth : '' }}; {{(isChecked && shape === 'button' && !disabled ) ? 'color :' + checkedColor : '' }} "
    >
      <slot></slot>
    </view>
    <view class="wd-radio__shape" style="{{ (isChecked && !disabled) ? 'color: ' + checkedColor : '' }}">
      <wd-icon v-if="{{shape === 'check'}}" style="{{ (isChecked && !disabled) ? 'color: ' + checkedColor : '' }}" name="check"></wd-icon>
    </view>
  </view>
</template>
<script lang="ts">
export default {
  options: {
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>
<script lang="ts" setup></script>
<style lang="scss" scoped>
@import './index.scss';
</style>
