<!--
 * @Author: weisheng
 * @Date: 2023-11-02 18:57:41
 * @LastEditTime: 2023-11-02 19:02:24
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \wot-design-uni\src\pages\img\Index.vue
 * 记得注释
-->
<template>
  <page-wraper>
    <demo-block title="基本用法">
      <wd-img :width="100" :height="100" :src="joy" />
      <!-- 以组件位置为定位原点 -->
      <wd-img :width="100" :height="100" :src="img" custom-class="border" />
    </demo-block>

    <demo-block title="插槽用法">
      <wd-img :width="100" :height="100" src="https://www.123.com/a.jpg">
        <template #error>
          <view class="error-wrap">加载失败</view>
        </template>
        <template #loading>
          <view class="loading-wrap">
            <wd-loading />
          </view>
        </template>
      </wd-img>
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
    <demo-block title="圆角">
      <view class="col" v-for="(mode, index) in modes" :key="index">
        <wd-img width="100%" height="27vw" :radius="5" :src="joy" :mode="mode" />
        <view class="center">{{ mode }}</view>
      </view>
    </demo-block>

    <demo-block title="可预览">
      <wd-img :width="100" :height="100" :src="joy" :enable-preview="true" />
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { joy } from '../images/joy'
import img from '../images/jd.png'
import type { ImageMode } from '@/uni_modules/wot-design-uni/components/wd-img/types'

const modes: ImageMode[] = [
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
  display: inline-block;
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

.error-wrap {
  width: 100%;
  height: 100%;
  background-color: red;
  color: white;
  line-height: 100px;
  text-align: center;
}

.loading-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
