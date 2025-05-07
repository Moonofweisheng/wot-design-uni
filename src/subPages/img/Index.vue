<template>
  <page-wraper>
    <demo-block :title="$t('jiBenYongFa')">
      <wd-img :width="100" :height="100" :src="joy" />
      <!-- 以组件位置为定位原点 -->
      <wd-img :width="100" :height="100" :src="img" custom-class="border" />
    </demo-block>

    <demo-block :title="$t('cha-cao-yong-fa')">
      <wd-img :width="100" :height="100" src="https://www.123.com/a.jpg">
        <template #error>
          <view class="error-wrap">{{ $t('jia-zai-shi-bai') }}</view>
        </template>
        <template #loading>
          <view class="loading-wrap">
            <wd-loading />
          </view>
        </template>
      </wd-img>
    </demo-block>

    <demo-block :title="$t('tian-chong')">
      <view class="col" v-for="(mode, index) in modes" :key="index">
        <wd-img width="100%" height="27vw" :src="joy" :mode="mode" />
        <view class="center">{{ mode }}</view>
      </view>
    </demo-block>
    <demo-block :title="$t('yuan-xing')">
      <view class="col" v-for="(mode, index) in modes" :key="index">
        <wd-img round width="100%" height="27vw" :src="joy" :mode="mode" />
        <view class="center">{{ mode }}</view>
      </view>
    </demo-block>
    <demo-block :title="$t('yuan-jiao')">
      <view class="col" v-for="(mode, index) in modes" :key="index">
        <wd-img width="100%" height="27vw" :radius="5" :src="joy" :mode="mode" />
        <view class="center">{{ mode }}</view>
      </view>
    </demo-block>

    <demo-block :title="$t('ke-yu-lan')">
      <view class="col">
        <wd-img :width="100" :height="100" :src="joy" :enable-preview="true" />
      </view>
      <view class="col">
        <wd-img :width="100" :height="100" :src="joy" :preview-src="img" :enable-preview="true" />
      </view>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { joy } from '../../pages/images/joy'
import img from '../../pages/images/jd.png'
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
