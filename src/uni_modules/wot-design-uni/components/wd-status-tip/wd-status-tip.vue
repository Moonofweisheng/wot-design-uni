<!--
 * @Author: weisheng
 * @Date: 2023-06-12 10:04:19
 * @LastEditTime: 2024-01-26 12:42:13
 * @LastEditors: weisheng
 * @Description: 
 * @FilePath: \wot-design-uni\src\uni_modules\wot-design-uni\components\wd-status-tip\wd-status-tip.vue
 * 记得注释
-->
<template>
  <view :class="`wd-status-tip  ${customClass}`" :style="customStyle">
    <image v-if="imgUrl" class="wd-status-tip__image" :src="imgUrl" :style="imgStyle"></image>
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
import { computed, ref, watch, type CSSProperties } from 'vue'
import { addUnit, objToStyle } from '../common/util'

interface Props {
  customClass?: string
  customStyle?: string
  image?: string
  imageSize?: string
  tip?: string
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  customStyle: '',
  image: 'network',
  imageSize: '',
  tip: ''
})

const imgUrl = ref<string>('') // 图片地址

watch(
  () => props.image,
  () => {
    checkType()
  },
  {
    deep: true,
    immediate: true
  }
)

const imgStyle = computed(() => {
  let style: CSSProperties = {}
  if (props.imageSize) {
    style = {
      height: addUnit(props.imageSize),
      width: addUnit(props.imageSize)
    }
  }
  return `${objToStyle(style)}`
})

function checkType() {
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
  imgUrl.value = img
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
