# Swiper

Used to create carousels, supporting horizontal and vertical sliding, customizable styles and indicator positions, supports video and image resource carousels, and allows setting carousel titles and custom title styles.

:::danger Please Note
Embedded video is only supported in `h5`, `WeChat Mini Program`, and `DingTalk Mini Program`. Other platforms do not support it, please be aware before using.
:::

## Basic Usage

Control whether the carousel automatically plays through the `autoplay` property, initialize the displayed slide with the `v-model:current` property, handle click events by listening to the slide's `click`, and trigger the `change` event after each page carousel ends.

```html
<wd-swiper :list="swiperList" autoplay v-model:current="current" @click="handleClick" @change="onChange"></wd-swiper>
```

```ts
const current = ref<number>(0)

const swiperList = ref([
  'https://wot-ui.cn/assets/redpanda.jpg',
  'https://wot-ui.cn/assets/capybara.jpg',
  'https://wot-ui.cn/assets/panda.jpg',
  'https://wot-ui.cn/assets/moon.jpg',
  'https://wot-ui.cn/assets/meng.jpg'
])
function handleClick(e) {
  console.log(e)
}
function onChange(e) {
  console.log(e)
}
```

## Dots Bar Indicator

```html
<wd-swiper :list="swiperList" autoplay v-model:current="current" :indicator="{ type: 'dots-bar' }" @click="handleClick" @change="onChange"></wd-swiper>
```

## Fraction Indicator

```html
<wd-swiper
  :list="swiperList"
  autoplay
  v-model:current="current"
  :indicator="{ type: 'fraction' }"
  indicatorPosition="bottom-right"
  @click="handleClick"
  @change="onChange"
></wd-swiper>
```

## Video Carousel<el-tag text style="vertical-align: middle;margin-left:8px;" effect="plain">1.3.13</el-tag>

:::danger Please Note
Embedded video is only supported in `h5`, `WeChat Mini Program`, and `DingTalk Mini Program`. Other platforms do not support it, please be aware before using.
:::

```html
<wd-swiper :list="videoList" autoplay :indicator="false" indicator-position="bottom-right"></wd-swiper>
```

```ts
const videoList = ref([
  'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_115503.mp4',
  'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_150752.mp4',
  'https://unpkg.com/wot-design-uni-assets@1.0.3/VID_155516.mp4',
  'https://wot-ui.cn/assets/moon.jpg'
])
```

## Manual Video Playback

```html
<wd-swiper :list="videoList" autoplay :autoplayVideo="false" :indicator="{ type: 'fraction' }" indicator-position="top-right"></wd-swiper>
```

```ts
const videoList = ref([
  'https://unpkg.com/wot-design-uni-assets/VID_115503.mp4',
  'https://unpkg.com/wot-design-uni-assets/VID_150752.mp4',
  'https://unpkg.com/wot-design-uni-assets/VID_155516.mp4'
])
```

## Stop Carousel When Playing Video

```html
<wd-swiper
  :list="videoList"
  autoplay
  stopAutoplayWhenVideoPlay
  :autoplayVideo="false"
  :indicator="{ type: 'fraction' }"
  indicator-position="top-right"
></wd-swiper>
```

```ts
const videoList = ref([
  'https://unpkg.com/wot-design-uni-assets/VID_115503.mp4',
  'https://unpkg.com/wot-design-uni-assets/VID_150752.mp4',
  'https://unpkg.com/wot-design-uni-assets/VID_155516.mp4'
])
```

## Manual Switching

```html
<wd-swiper
  :list="swiperList"
  :autoplay="false"
  v-model:current="current"
  :indicator="{ showControls: true }"
  :loop="false"
  @click="handleClick"
  @change="onChange"
></wd-swiper>
```

## Card Style

Set `previousMargin` and `nextMargin` to achieve card carousel style.

```html
<view class="card-swiper">
  <wd-swiper
    autoplay
    v-model:current="current"
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
```

```scss
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
```

## Display Multiple Items

Set the `display-multiple-items` property to control the number of slides displayed simultaneously.

```html
<view class="card-swiper">
  <wd-swiper
    autoplay
    v-model:current="current"
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
```

```scss
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
```

## Attributes

| Attribute | Description | Type | Default | Version |
|-----------|-------------|------|---------|----------|
| list | List of images or videos to display | array | [] | - |
| v-model:current | Current slide index | number | 0 | - |
| autoplay | Whether to enable auto-play | boolean | false | - |
| interval | Auto-play interval (ms) | number | 3000 | - |
| duration | Slide animation duration (ms) | number | 500 | - |
| indicator | Indicator configuration object | object | { type: 'dots' } | - |
| indicator-position | Indicator position | string | 'bottom' | - |
| previous-margin | Previous slide margin | string | '0px' | - |
| next-margin | Next slide margin | string | '0px' | - |
| display-multiple-items | Number of slides to display simultaneously | number | 1 | - |
| autoplay-video | Whether to auto-play videos | boolean | true | - |
| stop-autoplay-when-video-play | Whether to stop carousel when playing video | boolean | false | - |
| loop | Whether to enable loop mode | boolean | true | - |
| custom-indicator-class | Custom indicator class | string | - | - |
| custom-image-class | Custom image class | string | - | - |
| custom-next-image-class | Custom next image class | string | - | - |
| custom-prev-image-class | Custom previous image class | string | - | - |

## Events

| Event | Description | Parameters |
|-------|-------------|------------|
| click | Triggered when clicking a slide | event: Event |
| change | Triggered when current slide changes | index: number |