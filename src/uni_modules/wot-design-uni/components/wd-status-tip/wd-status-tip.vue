<template>
  <div :class="`wd-status-tip  ${customClass}`" :style="customStyle">
    <image v-if="imgUrl" class="wd-status-tip__image" :src="imgUrl"></image>
    <view v-if="tip" class="wd-status-tip__text">{{ tip }}</view>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'

interface Props {
  customClass?: string
  customStyle: string
  type: string
  tip: string
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  customStyle: ''
})

const imgUrl = ref<string>('') // 图片地址

watch(
  () => props.type,
  () => {
    checkType()
  },
  {
    deep: true,
    immediate: true
  }
)

function checkType() {
  // 改用网络地址，避免小程序打包的时候统一打包进去导致包过大问题
  let img = 'https://img11.360buyimg.com/ftfman/jfs/t1/148420/6/17526/26156/5fd03b9eE0119edb0/0d93541f6085c74c.png'
  switch (props.type) {
    case 'collect':
      img = 'https://img11.360buyimg.com/ftfman/jfs/t1/146876/19/17683/28878/5fd03b70E2e029d9d/b3ebf4444ec144cf.png'
      break
    case 'comment':
      img = 'https://img11.360buyimg.com/ftfman/jfs/t1/136543/33/19003/31469/5fd03b92E510000ff/0f9f2f302d8c084f.png'
      break
    case 'content':
      img = 'https://img11.360buyimg.com/ftfman/jfs/t1/140894/19/17605/31485/5fd03b8dE22c82234/0506be411332b914.png'
      break
    case 'halo':
      img = 'https://img11.360buyimg.com/ftfman/jfs/t1/137867/20/17583/28484/5fd03b96E99da5386/eae93dc441c061b6.png'
      break
    case 'message':
      img = 'https://img11.360buyimg.com/ftfman/jfs/t1/145522/14/17551/32214/5fd03b9aE7de897d8/066e511adebe4223.png'
      break
    case 'network':
      img = 'https://img11.360buyimg.com/ftfman/jfs/t1/148420/6/17526/26156/5fd03b9eE0119edb0/0d93541f6085c74c.png'
      break
    case 'search':
      img = 'https://img11.360buyimg.com/ftfman/jfs/t1/130609/24/19259/35205/5fd03cc7E49456a46/4fb443c24e0cf799.png'
      break
    default:
      img = 'https://img11.360buyimg.com/ftfman/jfs/t1/148420/6/17526/26156/5fd03b9eE0119edb0/0d93541f6085c74c.png'
  }
  imgUrl.value = img
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
