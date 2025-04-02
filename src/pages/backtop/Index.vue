<template>
  <page-wraper>
    <demo-block>
      <wd-checkbox shape="square" size="large" v-model="isSquare">{{ $t('xianShiFangXing') }}</wd-checkbox>
      <wd-checkbox shape="square" size="large" v-model="isCustomIcon">{{ $t('ziDingYiTuBiao') }}</wd-checkbox>
      <wd-checkbox shape="square" size="large" v-model="isTop">{{ $t('ziDingYiJuLi') }}</wd-checkbox>
      <wd-checkbox shape="square" size="large" v-model="isStyle">{{ $t('ziDingYiYangShi') }}</wd-checkbox>
      <wd-checkbox shape="square" size="large" v-model="isDuration">{{ $t('ziDingYiFanHuiDingBuGunDongShiJian') }}</wd-checkbox>
    </demo-block>
    <wd-backtop
      v-if="isCustomIcon"
      :scrollTop="scrollTop"
      :shape="isSquare ? 'square' : undefined"
      :top="isTop ? 600 : undefined"
      :customStyle="isStyle ? 'background: #007aff;color:white;' : undefined"
      :duration="isDuration ? 1000 : undefined"
    >
      <text :style="`color: ${isStyle ? 'white' : '#333'};`">TOP</text>
    </wd-backtop>
    <wd-backtop
      v-else
      :scrollTop="scrollTop"
      :shape="isSquare ? 'square' : undefined"
      :top="isTop ? 600 : undefined"
      :customStyle="isStyle ? 'background: #007aff;color:white;' : undefined"
      :duration="isDuration ? 1000 : undefined"
    ></wd-backtop>
    <view style="height: 2000px; color: red"></view>
  </page-wraper>
</template>
<script lang="ts" setup>
import { onPageScroll } from '@dcloudio/uni-app'
import { ref } from 'vue'

const scrollTop = ref(0)
onPageScroll((e) => {
  scrollTop.value = e.scrollTop
})

const isSquare = ref(false)
const isCustomIcon = ref(false)
const isTop = ref(false)
const isStyle = ref(false)
const isDuration = ref(false)
</script>
<style lang="scss" scoped></style>
