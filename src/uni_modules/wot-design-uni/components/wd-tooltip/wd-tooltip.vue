<!--
 * @Author: weisheng
 * @Date: 2023-06-12 18:40:58
 * @LastEditTime: 2023-06-19 12:34:50
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-tooltip\wd-tooltip.vue
 * 记得注释
-->
<!--
 * @Author: weisheng
 * @Date: 2023-06-12 18:40:58
 * @LastEditTime: 2023-06-19 12:32:11
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-tooltip\wd-tooltip.vue
 * 记得注释
-->
<template>
  <view class="wd-tooltip custom-class" id="tooltip" catchtap="noop">
    <!-- 用于为渲染获取宽高的元素 -->
    <view class="wd-tooltip__pos wd-tooltip__hidden" id="pos">
      <view class="wd-tooltip__container custom-pop">
        <view v-if="{{ !useContentSlot }}" class="wd-tooltip__inner">{{ content }}</view>
      </view>
    </view>
    <wd-transition show="{{ show }}" name="fade">
      <view class="wd-tooltip__pos" style="{{ popStyle }};">
        <view class="wd-tooltip__container custom-pop">
          <view v-if="{{ visibleArrow }}" class="wd-tooltip__arrow {{ arrowClass }} custom-arrow" style="{{arrowStyle}}"></view>
          <!-- 普通模式 -->
          <view v-if="{{ !useContentSlot }}" class="wd-tooltip__inner">{{ content }}</view>
          <!-- 用户自定义样式 -->
          <slot name="content" v-else />
        </view>
        <wd-icon v-if="{{ showClose }}" name="close" class="wd-tooltip__close-icon" bindtap="toggle"></wd-icon>
      </view>
    </wd-transition>
    <view catchtap="toggle" class="wd-tooltip__target" id="target">
      <slot />
    </view>
  </view>
</template>
<script></script>
<style lang="scss" scoped>
@import './index.scss';
</style>
