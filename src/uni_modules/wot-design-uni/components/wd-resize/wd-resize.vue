<template>
  <view class="wd-resize custom-class" style="width:{{width}}px;height:{{height}}px;">
    <!--插槽需要脱离父容器文档流，防止父容器固宽固高，进而导致插槽大小被被父容器限制-->
    <view class="wd-resize__container custom-container-class">
      <!--被监听的插槽-->
      <slot />
      <!--监听插槽变大-->
      <scroll-view
        class="wd-resize__wrapper"
        scroll-y="{{true}}"
        scroll-top="{{expandScrollTop}}"
        scroll-x="{{true}}"
        scroll-left="{{expandScrollLeft}}"
        bindscroll="onScrollHandler"
      >
        <view class="wd-resize__wrapper--placeholder" style="height: 100000px; width: 100000px"></view>
      </scroll-view>
      <!--监听插槽变小-->
      <scroll-view
        class="wd-resize__wrapper"
        scroll-y="{{true}}"
        scroll-top="{{shrinkScrollTop}}"
        scroll-x="{{true}}"
        scroll-left="{{shrinkScrollLeft}}"
        bindscroll="onScrollHandler"
      >
        <view class="wd-resize__wrapper--placeholder" style="height: 250%; width: 250%"></view>
      </scroll-view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const expandScrollTop = ref<number>(0)
const shrinkScrollTop = ref<number>(0)
const expandScrollLeft = ref<number>(0)
const shrinkScrollLeft = ref<number>(0)
const height = ref<number>(0)
const width = ref<number>(0)
const scrollEventCount = ref<number>(0)

const onScrollHandler = () => {}

function scrollToBottom({ width, height }) {
  renderData(this, {
    expandScrollTop: 100000 + height,
    shrinkScrollTop: 3 * this.data.height + height,
    expandScrollLeft: 100000 + width,
    shrinkScrollLeft: 3 * this.data.width + width
  })
}
</script>
<style lang="scss" scoped>
@import '../common/abstracts/variable';
@import '../common/abstracts/mixin';

@include b(resize) {
  @include e(container) {
    position: absolute;
    min-width: 1px;
    min-height: 1px;
  }

  @include e(wrapper) {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -9999;
    overflow: hidden;
    visibility: hidden;

    @include m(placeholder) {
      transition: 0s;
      animation: none;
    }
  }
}
</style>
