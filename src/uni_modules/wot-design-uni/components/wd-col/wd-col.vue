<template>
  <view :class="['wd-col', span && 'wd-col__' + span, offset && 'wd-col__offset-' + offset, 'custom-class']" :style="style">
    <!-- 每一列 -->
    <slot />
  </view>
</template>

<script lang="ts" setup>
import { inject, provide, watch } from 'vue'
import { ref } from 'vue'
interface Props {
  span?: number
  offset?: number
}

const props = withDefaults(defineProps<Props>(), {
  span: 24,
  offset: 0
})

const style = ref<string>('')
const row: any = inject('$row')

watch([() => props.span, () => props.offset], () => {
  check()
})

watch(
  () => row.gutter,
  (newVal) => {
    setGutter(newVal || 0)
  },
  { deep: true, immediate: true }
)

function check() {
  const { span, offset } = props
  if (span < 0 || offset < 0) {
    console.warn('[wot-design] warning(wd-col): attribute span/offset must be greater than or equal to 0')
  }
}

function setGutter(gutter: number) {
  const padding = `${gutter / 2}px`
  const customStyle = gutter > 0 ? `padding-left: ${padding}; padding-right: ${padding};background-clip: content-box;` : ''

  if (customStyle !== style.value) {
    style.value = customStyle
  }
}

provide('setGutter', setGutter) // 将设置子项方法导出
</script>

<style lang="scss" scoped>
@import '../common/abstracts/variable';
@import '../common/abstracts/mixin';

$i: 1;

@include b(col) {
  float: left;
  box-sizing: border-box;
}

@while $i <= 24 {
  .wd-col__#{$i} {
    width: calc(100% / 24 * $i);
  }
  .wd-col__offset-#{$i} {
    margin-left: calc(100% / 24 * $i);
  }
  $i: $i + 1;
}
</style>
