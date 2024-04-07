<!--
 * @Author: weisheng
 * @Date: 2023-06-12 10:04:19
 * @LastEditTime: 2024-04-07 14:01:12
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-status-tip\wd-status-tip.vue
 * 记得注释
-->
<template>
  <view :class="`wd-status-tip  ${customClass}`" :style="customStyle">
    <wd-img v-if="imgUrl" :mode="imageMode" :src="imgUrl" custom-class="wd-status-tip__image" :custom-style="imgStyle"></wd-img>
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
import { computed, type CSSProperties } from 'vue'
import { addUnit, isDef, isObj, objToStyle } from '../common/util'
import { statusTipProps } from './types'

const props = defineProps(statusTipProps)

// 图片地址
const imgUrl = computed(() => {
  // 改用网络地址，避免小程序打包的时候统一打包进去导致包过大问题
  let img: string = ''
  switch (props.image) {
    case 'collect':
      img = 'https://img.wot-design-uni.cn/wdu/collect.png'
      break
    case 'comment':
      img = 'https://img.wot-design-uni.cn/wdu/comment.png'
      break
    case 'content':
      img = 'https://img.wot-design-uni.cn/wdu/content.png'
      break
    case 'halo':
      img = 'https://img.wot-design-uni.cn/wdu/halo.png'
      break
    case 'message':
      img = 'https://img.wot-design-uni.cn/wdu/message.png'
      break
    case 'network':
      img = 'https://img.wot-design-uni.cn/wdu/network.png'
      break
    case 'search':
      img = 'https://img.wot-design-uni.cn/wdu/search.png'
      break
    default:
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
