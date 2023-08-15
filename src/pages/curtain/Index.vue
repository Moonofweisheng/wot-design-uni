<template>
  <page-wraper>
    <demo-block title="基本用法">
      <wd-button @click="handleClick1">关闭按钮在内部</wd-button>
    </demo-block>
    <demo-block title="修改按钮位置">
      <view>
        <wd-button @click="handleClick2">左上</wd-button>
        <wd-button @click="handleClick3">顶部</wd-button>
        <wd-button @click="handleClick4">右上</wd-button>
      </view>
      <view>
        <wd-button @click="handleClick5">左下</wd-button>
        <wd-button @click="handleClick6">底部</wd-button>
        <wd-button @click="handleClick7">右下</wd-button>
      </view>
    </demo-block>
    <demo-block title="点击遮罩关闭">
      <wd-button @click="handleClick8">点击遮罩关闭</wd-button>
    </demo-block>

    <wd-curtain :value="value1" :src="img" :to="link" @close="handleClose1" :width="280"></wd-curtain>
    <wd-curtain :value="value2" :src="img" :to="link" close-position="top-left" :width="200" @close="handleClose2"></wd-curtain>
    <wd-curtain :value="value3" :src="img" :to="link" close-position="top" :width="200" @close="handleClose3"></wd-curtain>
    <wd-curtain :value="value4" :src="img" :to="link" close-position="top-right" :width="240" @close="handleClose4"></wd-curtain>
    <wd-curtain :value="value5" :src="img" :to="link" close-position="bottom-left" :width="240" @close="handleClose5"></wd-curtain>
    <wd-curtain :value="value6" :src="img" :to="link" close-position="bottom" :width="240" @close="handleClose6"></wd-curtain>
    <wd-curtain :value="value7" :src="img" :to="link" close-position="bottom-right" :width="240" @close="handleClose7"></wd-curtain>
    <wd-curtain
      :value="value8"
      :src="img"
      :to="link"
      close-position="bottom-right"
      :width="240"
      @close="handleClose8"
      :close-on-click-modal="true"
    ></wd-curtain>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref<boolean>(false)
const value2 = ref<boolean>(false)
const value3 = ref<boolean>(false)
const value4 = ref<boolean>(false)
const value5 = ref<boolean>(false)
const value6 = ref<boolean>(false)
const value7 = ref<boolean>(false)
const value8 = ref<boolean>(false)
const img = ref<string>('https://img20.360buyimg.com/da/jfs/t1/141592/25/8861/261559/5f68d8c1E33ed78ab/698ad655bfcfbaed.png')
const link = ref<string>('/pages/index/index')

function handleClick1() {
  value1.value = true
}
function handleClose1() {
  value1.value = false
}
function handleClick2() {
  value2.value = true
}
function handleClose2() {
  value2.value = false
}
function handleClick3() {
  value3.value = true
}
function handleClose3() {
  value3.value = false
}
function handleClick4() {
  value4.value = true
}
function handleClose4() {
  value4.value = false
}
function handleClick5() {
  value5.value = true
}
function handleClose5() {
  value5.value = false
}
function handleClick6() {
  value6.value = true
}
function handleClose6() {
  value6.value = false
}
function handleClick7() {
  value7.value = true
}
function handleClose7() {
  value7.value = false
}
function handleClick8() {
  value8.value = true
}
function handleClose8() {
  value8.value = false
}
function clickImg() {
  uni.navigateTo({
    url: '/pages/index/index'
  })
}
</script>
<style lang="scss" scoped>
:deep(button) {
  margin: 0 10px 10px 0;
}
</style>
