<template>
  <wd-transition
    show="{{ show }}"
    name="fade"
    custom-class="wd-modal"
    duration="{{ duration }}"
    custom-style="z-index: {{ zIndex }}; {{ customStyle }}"
    bind:tap="handleClick"
    catch:touchmove="noop"
  />
</template>

<script></script>

<style lang="scss" scoped>
@import './../common/abstracts/_mixin.scss';
@import './../common/abstracts/variable.scss';

@include b(modal) {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: $-modal-bg;
}
</style>
