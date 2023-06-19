<template>
  <wd-transition
    :show="show"
    name="fade"
    custom-class="wd-modal"
    :duration="duration"
    :custom-style="`z-index: ${zIndex}; ${customStyle}`"
    @click="handleClick"
    @touchmove="noop"
  />
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
interface Props {
  show: boolean
  duration: Record<string, number> | number
  zIndex: number
  customStyle: string
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  duration: 300,
  zIndex: 10
})

const emit = defineEmits(['click'])

function handleClick() {
  emit('click')
}
function noop() {}
</script>

<style lang="scss" scoped>
@import './../common/abstracts/_mixin.scss';
@import './../common/abstracts/variable.scss';
// @import './index.scss';

:deep(.wd-modal) {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: $-modal-bg;
}
</style>
