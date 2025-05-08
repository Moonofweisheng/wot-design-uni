---
url: 'https://wot-design-uni.cn/component/count-to.md'
---
# CountTo 数字滚动1.3.8

数字滚动组件。

## 基本用法

设置 `endVal` 属性，表示最终值。
设置 `startVal` 属性，表示起始值。
设置 `duration` 属性，表示从起始值到结束值数字变动的时间。
设置 `autoplay` 属性，表示是否自动播放。
设置 `decimals` 属性，表示保留的小数位数。
设置 `decimal` 属性，表示小数点符号。
设置 `prefix` 属性，表示数字前缀。
设置 `suffix` 属性，表示数字后缀。
设置 `fontSize` 属性，表示字体大小。
设置 `color` 属性，表示文本颜色。

```vue
<wd-count-to :endVal="2024" suffix="年" color="#16baaa"></wd-count-to>
<wd-count-to prefix="￥" :startVal="0" :decimals="2" :endVal="186.321" :fontSize="32" suffix="%" color="#1e9fff"></wd-count-to>
<wd-count-to prefix="￥" :startVal="0" :decimals="2" :endVal="21286.321" :fontSize="32" suffix="%" color="#ff5722"></wd-count-to>
<wd-count-to prefix="￥" :startVal="0" :decimals="2" :endVal="21286.321" :fontSize="32" suffix="%" color="#ffb800" :duration="2000"></wd-count-to>
```

## 设置主题

通过type参数设置文本主题，我们提供了五类属性：primary error success warning default-默认。

```html
<wd-count-to type="primary" prefix="￥" :startVal="0" :endVal="888888" suffix="%"></wd-count-to>
<wd-count-to type="error" prefix="￥" :startVal="0" :endVal="888888" suffix="%"></wd-count-to>
<wd-count-to type="success" prefix="￥" :startVal="0" :endVal="888888" suffix="%"></wd-count-to>
<wd-count-to type="warning" prefix="￥" :startVal="0" :endVal="888888" suffix="%"></wd-count-to>
<wd-count-to type="info" prefix="￥" :startVal="0" :endVal="888888" suffix="%"></wd-count-to>
```

## 手动控制

通过 `start` 方法开始倒计时，通过 `pause` 方法暂停倒计时，通过 `reset` 方法重置倒计时。

```html
<wd-count-to
  ref="countTo"
  :auto-start="false"
  prefix="￥"
  :startVal="1000"
  :decimals="3"
  :endVal="9999.32"
  :fontSize="32"
  suffix="%"
  color="#1e9fff"
></wd-count-to>
<wd-grid clickable border>
  <wd-grid-item text="开始" icon="play-circle-stroke" @itemclick="start" />
  <wd-grid-item text="暂停" icon="pause-circle" @itemclick="pause" />
  <wd-grid-item text="重置" icon="refresh" @itemclick="reset" />
</wd-grid>
```

```ts
import type { CountToInstance } from '@/uni_modules/wot-design-uni/components/wd-count-to/types'

const countTo = ref<CountToInstance>()

const start = () => {
  countTo.value!.start()
}
const pause = () => {
  countTo.value!.pause()
}
const reset = () => {
  countTo.value!.reset()
}
```

## Attributes

| 参数      | 说明                           | 类型    | 可选值                                      | 默认值  | 最低版本 |
| --------- | ------------------------------ | ------- | ------------------------------------------- | ------- | -------- |
| fontSize  | 字体大小                       | number  | 16                                          | default | 1.3.8    |
| color     | 文本颜色                       | string  | -                                           | ''      | 1.3.8    |
| type      | 主题类型                       | string  | 'primary' / 'error' / 'warning' / 'success' | default | 1.3.9    |
| startVal  | 起始值                         | number  | -                                           | 0       | 1.3.8    |
| endVal    | 最终值                         | number  | -                                           | 2024    | 1.3.8    |
| duration  | 从起始值到结束值数字变动的时间 | number  | -                                           | 3000    | 1.3.8    |
| autoplay  | 是否自动播放                   | boolean | -                                           | true    | 1.3.8    |
| decimals  | 保留的小数位数                 | number  | (需大于等于 0)                              | 0       | 1.3.8    |
| decimal   | 小数点符号                     | string  | -                                           | '.'     | 1.3.8    |
| separator | 三位三位的隔开效果             | string  | -                                           | ','     | 1.3.8    |
| prefix    | 前缀                           | string  | -                                           | -       | 1.3.8    |
| suffix    | 后缀                           | string  | -                                           | -       | 1.3.8    |
| useEasing | 是否具有连贯性                 | boolean | -                                           | true    | 1.3.8    |

## Events

| 事件名称 | 说明                 | 参数 | 最低版本 |
| -------- | -------------------- | ---- | -------- |
| finish   | 动画完成时触发       | —    | 1.3.8    |
| mounted  | 组件加载完成时时触发 | -    | 1.3.8    |

## Methods

| 方法名 | 说明                                                        | 参数 | 最低版本 |
| ------ | ----------------------------------------------------------- | ---- | -------- |
| start  | 开始动画                                                    | —    | 1.3.8    |
| pause  | 暂停动画                                                    | —    | 1.3.8    |
| reset  | 重置动画，若 `auto-start` 为 `true`，重设后会自动开始倒计时 | —    | 1.3.8    |

## Slots

| 名称    | 说明     | 最低版本 |
| ------- | -------- | -------- |
| default | 默认插槽 | 1.3.8    |
| prefix  | 前缀插槽 | 1.3.8    |
| suffix  | 后缀插槽 | 1.3.8    |

## 外部样式类

| 类名         | 说明       | 最低版本 |
| ------------ | ---------- | -------- |
| custom-class | 根节点样式 | 1.3.8    |
| custom-style | 根节点样式 | 1.3.8    |
