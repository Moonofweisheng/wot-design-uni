<!--
 * @Author: weisheng
 * @Date: 2023-06-12 10:04:19
 * @LastEditTime: 2024-09-20 10:23:38
 * @LastEditors: jiaoxueyan
 * @Description: 
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-status-tip\wd-status-tip.vue
 * 记得注释
-->
<template>
  <view :class="`wd-status-tip  ${customClass}`" :style="customStyle">
    <slot name="image" v-if="$slots.image"></slot>
    <wd-img v-else-if="imgUrl" :mode="imageMode" :src="imgUrl" custom-class="wd-status-tip__image" :custom-style="imgStyle"></wd-img>
    <view v-if="tip" class="wd-status-tip__text">{{ tip }}</view>
  </view>
</template>

<script lang="ts">
export default {
  name: 'wd-status-tip',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>

<script lang="ts" setup>
import wdImg from '../wd-img/wd-img.vue'
import { computed, type CSSProperties } from 'vue'
import { addUnit, isDef, isObj, objToStyle } from '../common/util'
import { statusTipProps } from './types'

const props = defineProps(statusTipProps)

// 图片地址
const imgUrl = computed(() => {
  // 改用网络地址，避免小程序打包的时候统一打包进去导致包过大问题
  let img: string = ''
  if (['search', 'network', 'content', 'collect', 'comment', 'halo', 'message'].includes(props.image)) {
    img = `${props.urlPrefix}${props.image}.png`
  } else {
    img = props.image
  }
  return img
})

/**
 * 图片样式
 */
const imgStyle = computed(() => {
  let style: CSSProperties = {}
  if (props.imageSize) {
    if (isObj(props.imageSize)) {
      isDef(props.imageSize.height) && (style.height = addUnit(props.imageSize.height))
      isDef(props.imageSize.width) && (style.width = addUnit(props.imageSize.width))
    } else {
      style = {
        height: addUnit(props.imageSize),
        width: addUnit(props.imageSize)
      }
    }
  }
  return `${objToStyle(style)}`
})
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
