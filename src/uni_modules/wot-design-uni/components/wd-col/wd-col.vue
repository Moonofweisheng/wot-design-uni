<!--
 * @Author: weisheng
 * @Date: 2023-06-13 11:34:35
 * @LastEditTime: 2023-08-15 13:06:34
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-col\wd-col.vue
 * 记得注释
-->
<template>
  <view :class="['wd-col', span && 'wd-col__' + span, offset && 'wd-col__offset-' + offset, customClass]" :style="style">
    <!-- 每一列 -->
    <slot />
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-col',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import { inject, provide, watch } from 'vue'
import { ref } from 'vue'
interface Props {
  span?: number
  offset?: number
  customClass?: string
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
@import './index.scss';
</style>
