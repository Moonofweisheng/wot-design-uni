<template>
  <page-wraper>
    <demo-block title="点状指示器">
      <wd-swiper :list="swiperList" autoplay :current="0" :indicator="{ type: 'dots' }" @click="handleClick" @change="onChange"></wd-swiper>
    </demo-block>

    <demo-block title="点条状指示器">
      <wd-swiper :list="swiperList" autoplay :current="1" :indicator="{ type: 'dots-bar' }" @click="handleClick" @change="onChange"></wd-swiper>
    </demo-block>

    <demo-block title="数字指示器">
      <wd-swiper
        :list="swiperList"
        autoplay
        :current="2"
        :indicator="{ type: 'fraction' }"
        indicator-position="bottom-right"
        @click="handleClick"
        @change="onChange"
      ></wd-swiper>
    </demo-block>

    <demo-block title="手动切换">
      <wd-swiper
        :list="swiperList"
        :autoplay="false"
        :current="3"
        :indicator="{ showControls: true }"
        :loop="false"
        @click="handleClick"
        @change="onChange"
      ></wd-swiper>
    </demo-block>

    <demo-block title="卡片样式">
      <view class="card-swiper">
        <wd-swiper
          autoplay
          :current="4"
          custom-indicator-class="custom-indicator-class"
          custom-image-class="custom-image"
          custom-next-image-class="custom-image-prev"
          custom-prev-image-class="custom-image-prev"
          :indicator="{ type: 'dots' }"
          :list="swiperList"
          previousMargin="24px"
          nextMargin="24px"
        ></wd-swiper>
      </view>
    </demo-block>

    <demo-block title="同时展示2个滑块">
      <view class="card-swiper">
        <wd-swiper
          autoplay
          :current="4"
          :display-multiple-items="2"
          custom-indicator-class="custom-indicator-class"
          custom-image-class="custom-image"
          custom-next-image-class="custom-image-prev"
          custom-prev-image-class="custom-image-prev"
          :indicator="{ type: 'dots' }"
          :list="swiperList"
          previousMargin="24px"
          nextMargin="24px"
        ></wd-swiper>
      </view>
    </demo-block>

    <demo-block title="垂直方向">
      <wd-swiper
        :list="swiperList"
        direction="vertical"
        indicator-position="right"
        autoplay
        :current="1"
        :indicator="{ type: 'dots-bar' }"
        @click="handleClick"
        @change="onChange"
      ></wd-swiper>
    </demo-block>

    <demo-block title="自定义指示器">
      <wd-swiper :list="swiperList" direction="vertical" indicator-position="right" autoplay :current="1" @click="handleClick" @change="onChange">
        <template #indicator="{ current, total }">
          <view class="custom-indicator" style="position: absolute; bottom: 24rpx; right: 24rpx">{{ current + 1 }}/{{ total }}</view>
        </template>
      </wd-swiper>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const swiperList = ref([
  'https://unpkg.com/wot-design-uni-assets/redpanda.jpg',
  'https://unpkg.com/wot-design-uni-assets/capybara.jpg',
  'https://unpkg.com/wot-design-uni-assets/panda.jpg',
  'https://img.yzcdn.cn/vant/cat.jpeg',
  'https://unpkg.com/wot-design-uni-assets/meng.jpg'
])
function handleClick(e) {
  console.log(e)
}
function onChange(e) {
  console.log(e)
}
</script>
<style lang="scss" scoped>
.card-swiper {
  --wot-swiper-radius: 0;
  --wot-swiper-item-padding: 0 24rpx;
  --wot-swiper-nav-dot-color: #e7e7e7;
  --wot-swiper-nav-dot-active-color: #4d80f0;
  padding-bottom: 24rpx;
  :deep(.custom-indicator-class) {
    bottom: -16px;
  }
  :deep(.custom-image) {
    border-radius: 12rpx;
  }
  :deep(.custom-image-prev) {
    height: 168px !important;
  }
}

.custom-indicator {
  padding: 0 12rpx;
  height: 48rpx;
  line-height: 48rpx;
  border-radius: 45%;
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  font-size: 24rpx;
}
</style>
