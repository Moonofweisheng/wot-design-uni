<!--
 * @Author: weisheng
 * @Date: 2023-06-13 11:34:35
 * @LastEditTime: 2024-03-15 16:49:17
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
import { computed, watch } from 'vue'
import { ref } from 'vue'
import { useParent } from '../composables/useParent'
import { ROW_KEY } from '../wd-row/types'
import { colProps } from './types'

const props = defineProps(colProps)

const style = ref<string>('')

const { parent: row } = useParent(ROW_KEY)

const gutter = computed(() => {
  if (row) {
    return row.props.gutter || 0
  } else {
    return 0
  }
})

watch([() => props.span, () => props.offset], () => {
  check()
})

watch(
  () => gutter.value,
  (newVal) => {
    setGutter(newVal || 0)
  },
  { deep: true, immediate: true }
)

function check() {
  const { span, offset } = props
  if (span < 0 || offset < 0) {
    console.error('[wot-design] warning(wd-col): attribute span/offset must be greater than or equal to 0')
  }
}

function setGutter(gutter: number) {
  const padding = `${gutter / 2}px`
  const customStyle = gutter > 0 ? `padding-left: ${padding}; padding-right: ${padding};background-clip: content-box;` : ''

  if (customStyle !== style.value) {
    style.value = customStyle
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
