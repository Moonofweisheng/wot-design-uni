<template>
  <view class="wd-badge custom-class">
    <slot></slot>
    <view
      v-if="!hidden && (content || content === 0 || isDot)"
      :class="['wd-badge__content', 'is-fixed', type ? 'wd-badge__content--' + type : '', isDot ? 'is-dot' : '']"
      :style="contentStyle"
    >
      {{ content }}
    </view>
  </view>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

interface Props {
  modelValue: number | null
  bgColor?: string
  max?: number
  isDot?: boolean
  hidden?: boolean
  type?: string
  top?: number
  right?: number
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: null
})
const content = ref<number | null>(null)

watch(
  [() => props.modelValue, () => props.max, () => props.isDot],
  () => {
    notice()
  },
  { immediate: true, deep: true }
)

const contentStyle = computed(() => {
  return `'background-color': ${props.bgColor};top:${props.top || 0}px; right: ${props.right || 0} px`
})

function notice() {
  if (props.isDot) return
  let value = props.modelValue
  const max = props.max
  if (value && max && !Number.isNaN(value) && !Number.isNaN(max)) {
    value = max < value ? max : value
  }
  content.value = value
}
</script>

<script></script>

<style lang="scss" scoped>
@import './../common/abstracts/_mixin.scss';
@import './../common/abstracts/variable.scss';

@include b(badge) {
  position: relative;
  vertical-align: middle;
  display: inline-block;

  @include e(content) {
    display: inline-block;
    height: $-badge-height;
    line-height: $-badge-height;
    padding: $-badge-padding;
    background-color: $-badge-bg;
    border-radius: calc($-badge-height / 2 + 2px);
    color: $-badge-color;
    font-size: $-badge-fs;
    text-align: center;
    white-space: nowrap;
    border: $-badge-border;
    font-weight: 500;

    @include when(fixed) {
      position: absolute;
      transform: translateY(-50%) translateX(50%);
    }

    @include when(dot) {
      height: $-badge-dot-size;
      width: $-badge-dot-size;
      padding: 0;
      border-radius: 50%;
    }

    @each $type in (primary, success, warning, info, danger) {
      @include m($type) {
        @if $type == primary {
          background-color: $-badge-primary;
        } @else if $type == success {
          background-color: $-badge-success;
        } @else if $type == warning {
          background-color: $-badge-warning;
        } @else if $type == info {
          background-color: $-badge-info;
        } @else {
          background-color: $-badge-danger;
        }
      }
    }
  }
}
</style>
