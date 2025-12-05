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

## Vertical Direction

Set `direction` to `vertical` to arrange slides vertically.

```html
<wd-swiper
  :list="swiperList"
  direction="vertical"
  indicatorPosition="right"
  autoplay
  v-model:current="current"
  :indicator="{ type: 'dots-bar' }"
  @click="handleClick"
  @change="onChange"
></wd-swiper>
```

## Custom Indicator

Use the `indicator` slot to customize the indicator style.

```html
<wd-swiper
  :list="swiperList"
  direction="vertical"
  indicatorPosition="right"
  autoplay
  v-model:current="current"
  @click="handleClick"
  @change="onChange"
>
  <template #indicator="{ current, total }">
    <view class="custom-indicator" style="position: absolute; bottom: 24rpx; right: 24rpx">{{ current + 1 }}/{{ total }}</view>
  </template>
</wd-swiper>
```

```scss
.custom-indicator {
  padding: 0 12rpx;
  height: 48rpx;
  line-height: 48rpx;
  border-radius: 45%;
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  font-size: 24rpx;
}
```

## Specify valueKey and textKey

Use `value-key` to specify the image address field in each object of the `list`, default is `value`.

Use `text-key` to specify the title field in each object of the `list`, default is `text`.

```html
<wd-swiper
  value-key="url"
  text-key="title"
  :list="customSwiperList"
  autoplay
  v-model:current="current"
  @click="handleClick"
  @change="onChange"
></wd-swiper>
```

```ts
const current = ref<number>(0)

const customSwiperList = ref([
  { url: 'https://wot-ui.cn/assets/redpanda.jpg', title: 'Red Panda!' },
  { url: 'https://wot-ui.cn/assets/capybara.jpg', title: 'Capybara!' },
  { url: 'https://wot-ui.cn/assets/panda.jpg', title: 'Giant Panda!' },
  { url: 'https://wot-ui.cn/assets/moon.jpg', title: 'Poetic China!' }
])
```

## Property Control Switching

```html
<wd-swiper :loop="isLoop" :autoplay="false" :list="swiperList" v-model:current="current" />
<wd-gap />
<wd-cell-group>
  <wd-cell title="loop">
    <wd-switch v-model="isLoop" size="24px" />
  </wd-cell>
  <wd-cell title="current" :value="current.toString()" />
</wd-cell-group>
<view style="display: flex; justify-content: space-between">
  <wd-button @click="current--">prev</wd-button>
  <wd-button type="success" @click="current++">next</wd-button>
</view>
```

```javascript
const current = ref<number>(0)
const isLoop = ref(false)
```

## Slot Usage

Use the default slot to customize the content of carousel items.

```html
<wd-swiper
  :list="swiperList"
  autoplay
  v-model:current="current"
  :indicator="{ type: 'dots-bar' }"
  @click="handleClick"
  @change="onChange"
>
  <template #default="{ item }">
    <image :src="item as string" mode="aspectFill" style="width: 100%; height: 100%" />
  </template>
</wd-swiper>
```

## Attributes

| Parameter                 | Description                                                        | Type                              | Optional Values                                                                                        | Default Value | Minimum Version  |
| ------------------------- | ------------------------------------------------------------------ | --------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------- | ---------------- |
| autoplay                  | Whether to enable auto-play                                        | `boolean`                         | -                                                                                                      | true          | 0.1.22           |
| v-model:current           | Control which carousel item is currently displayed (index)         | `number`                          | -                                                                                                      | 0             | 0.1.22           |
| direction                 | Carousel sliding direction                                         | `DirectionType`                   | `horizontal, vertical`                                                                                 | horizontal    | 0.1.22           |
| displayMultipleItems      | Number of slides displayed simultaneously                          | `number`                          | -                                                                                                      | 1             | 0.1.22           |
| duration                  | Slide animation duration                                           | `number`                          | -                                                                                                      | 300           | 0.1.22           |
| easingFunction            | Switching easing animation type (WeChat Mini Program, Kuaishou Mini Program, JD Mini Program) | `EasingType`                      | -                                                                                                      | default       | 0.1.22           |
| height                    | Height of the carousel                                             | `string / number`                 | -                                                                                                      | 192           | 0.1.22           |
| interval                  | Carousel interval time                                             | `number`                          | -                                                                                                      | 5000          | 0.1.22           |
| list                      | Image list                                                         | `string[] / SwiperList[]`         | -                                                                                                      | -             | 0.1.22           |
| loop                      | Whether to enable loop playback                                    | `boolean`                         | -                                                                                                      | true          | 0.1.22           |
| nextMargin                | Next margin                                                        | `string / number`                 | -                                                                                                      | 0             | 0.1.22           |
| indicatorPosition         | Indicator display position                                         | `IndicatorPositionType`           | `left, top-left, top, top-right, bottom-left, bottom, bottom-right, right`                            | bottom        | 0.1.22           |
| previousMargin            | Previous margin                                                    | `string / number`                 | -                                                                                                      | 0             | 0.1.22           |
| snapToEdge                | Whether margins should apply to first and last elements           | `boolean`                         | -                                                                                                      | false         | 0.1.22           |
| indicator                 | Complete indicator configuration                                   | `SwiperIndicatorProps / boolean`  | -                                                                                                      | true          | 0.1.22           |
| imageMode                 | Image cropping and scaling mode                                    | `string`                          | Refer to official documentation [mode](https://uniapp.dcloud.net.cn/component/image.html#mode-%E6%9C%89%E6%95%88%E5%80%BC) | `aspectFill`  | 0.1.55           |
| autoplayVideo             | Whether videos auto-play, default is auto-play                    | `boolean`                         | -                                                                                                      | true          | 1.3.13           |
| stopPreviousVideo         | Whether to stop previous video playback when switching carousel items, default stops previous video when switching | `boolean`                         | -                                                                                                      | true          | 1.3.13           |
| stopAutoplayWhenVideoPlay | Whether to stop auto-carousel when video is playing               | `boolean`                         | -                                                                                                      | false         | 1.3.13           |
| customStyle               | External custom style                                              | `string`                          | -                                                                                                      | ''            | 0.1.22           |
| value-key                 | Key corresponding to value in option object                       | `string`                          | -                                                                                                      | `value`       | 1.3.7            |
| text-key                  | Key corresponding to title text in option object                  | `string`                          | -                                                                                                      | `text`        | 1.3.13           |
| adjust-height             | Automatically use specified slide height as entire container height. When vertical is true, default is not adjusted, only supported by Alipay Mini Program. | `string`                          | `'first' / 'current' / 'highest' / 'none'`                                                           | `highest`     | 1.3.13           |
| adjust-vertical-height    | Force adjust-height to take effect when vertical is true. Only supported by Alipay Mini Program. | `boolean`                         | -                                                                                                      | `false`       | 1.3.13           |
| muted                     | Whether video plays muted                                          | `boolean`                         | -                                                                                                      | `true`        | 1.6.0            |
| videoLoop                 | Whether video loops                                                | `boolean`                         | -                                                                                                      | `true`        | 1.6.0            |

### DirectionType

Carousel sliding direction, optional values are `'horizontal'` and `'vertical'`.

### EasingType

Switching easing animation type, optional values are `'default'`, `'linear'`, `'easeInCubic'`, `'easeOutCubic'` and `'easeInOutCubic'`.

### IndicatorPositionType

Page information display position, optional values are `'left'`, `'top-left'`, `'top'`, `'top-right'`, `'bottom-left'`, `'bottom'`, `'bottom-right'` and `'right'`.

### SwiperList

Carousel item list configuration, including image or video address `value`, video cover `poster`, file resource type `type` and other attributes, supports extended attributes. After specifying `type`, the component will not internally determine the file type and will use `type` as the standard.

| name   | Description                    | Minimum Version |
| ------ | ------------------------------ | --------------- |
| value  | Image or video address         | -               |
| poster | Video cover                    | -               |
| type   | Used to specify file resource type, optional values `image`, `video` | 1.4.0           |

### SwiperIndicatorProps

| Parameter           | Description                    | Type                  | Optional Values                                                                    | Default Value | Minimum Version |
| ------------------- | ------------------------------ | --------------------- | ---------------------------------------------------------------------------------- | ------------- | --------------- |
| current             | Current carousel item (index)  | Number                | -                                                                                  | 0             | 0.1.22          |
| direction           | Carousel sliding direction     | DirectionType         | `horizontal, vertical`                                                             | horizontal    | 0.1.22          |
| min-show-num        | Won't show navigator below this number | Number                | -                                                                                  | 2             | 0.1.22          |
| pagination-position | Page information display position | IndicatorPositionType | `left, top-left, top, top-right, bottom-left, bottom, bottom-right, right`        | bottom        | 0.1.22          |
| show-controls       | Whether to show control buttons | Boolean               | -                                                                                  | false         | 0.1.22          |
| total               | Total number of items          | Number                | -                                                                                  | 0             | 0.1.22          |
| type                | Navigator type                 | SwiperIndicatorType   | `dots, dots-bar, fraction`                                                         | dots          | 0.1.22          |
| autoplay            | Whether to enable auto-play    | boolean               | -                                                                                  | true          | 0.1.22          |

## Events

| Event Name | Description              | Parameters                                                  | Minimum Version |
| ---------- | ------------------------ | ----------------------------------------------------------- | --------------- |
| click      | Triggered when clicking carousel item | `(index: number, item: SwiperList \| string)`                                           | 0.1.22          |
| change     | Triggered when carousel switches | `(current: number, source: 'autoplay' \| 'touch' \| 'nav')` | 0.1.22          |

## Slot

| name      | Description         | Parameters                           | Minimum Version |
| --------- | ------------------- | ------------------------------------ | --------------- |
| indicator | Custom indicator    | `{ current: number, total: number }` | 1.13.0          |
| default   | Item display content | `{ item: string | SwiperList, index: number }`       | 1.13.0          |

## External Style Classes

| Class Name           | Description                 | Minimum Version |
| -------------------- | --------------------------- | --------------- |
| customClass          | External custom class name  | 0.1.22          |
| customIndicatorClass | Custom indicator class name | 0.1.22          |
| customImageClass     | Custom image class name, will be deprecated in version 1.3, please use `customItemClass` instead | 0.1.22          |
| customPrevImageClass | Custom previous image class name, will be deprecated in version 1.3, please use `customPrevClass` instead | 0.1.22          |
| customNextImageClass | Custom next image class name, will be deprecated in version 1.3, please use `customNextClass` instead | 0.1.22          |
| customItemClass      | Custom item class name      | 1.3.13          |
| customPrevClass      | Custom previous item class name | 1.3.13          |
| customNextClass      | Custom next item class name | 1.3.13          |
| customTextClass      | Custom text title class name | 1.3.13          |
| customTextStyle      | Custom text title style     | 1.3.13          |