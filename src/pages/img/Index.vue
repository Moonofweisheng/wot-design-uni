<template>
  <page-wraper>
    <demo-block title="基本用法">
      <wd-img :width="100" :height="100" :src="joy" />
      <!-- 以组件位置为定位原点 -->
      <wd-img :width="100" :height="100" :src="img" custom-class="border" />
    </demo-block>
    <demo-block title="填充">
      <view class="col" v-for="(mode, index) in modes" :key="index">
        <wd-img width="100%" height="27vw" :src="joy" :mode="mode" />
        <view class="center">{{ mode }}</view>
      </view>
    </demo-block>
    <demo-block title="圆形">
      <view class="col" v-for="(mode, index) in modes" :key="index">
        <wd-img round width="100%" height="27vw" :src="joy" :mode="mode" />
        <view class="center">{{ mode }}</view>
      </view>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { joy } from '../images/joy'
import img from '../images/jd.png'
const modes = [
  'top left',
  'top right',
  'bottom left',
  'bottom right',
  'right',
  'left',
  'center',
  'bottom',
  'top',
  'heightFix',
  'widthFix',
  'scaleToFill',
  'aspectFit',
  'aspectFill'
]
</script>

<style lang="scss" scoped>
.col {
  float: left;
  width: 33.333%;
  box-sizing: border-box;
  min-height: 1px;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 20px;
}
.center {
  text-align: center;
}
:deep(.border) {
  border: 1px solid red;
  margin: 0 10px;
}
</style>
