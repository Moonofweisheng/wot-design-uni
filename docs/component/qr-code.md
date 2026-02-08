# QRCode 二维码

用于生成二维码。

## 基本用法

设置 `text` 属性为二维码内容。

```html
<wd-qr-code text="wot-design-uni" />
```

## 自定义尺寸

设置 `size` 属性，单位 px，默认为 200。

```html
<wd-qr-code text="wot-design-uni" :size="300" />
```

## 自定义颜色

设置 `color-dark` 和 `color-light` 属性，分别对应实点颜色和空白颜色。

```html
<wd-qr-code text="wot-design-uni" color-dark="#3c9cff" color-light="#fff" />
```

## 带 Logo

设置 `logo` 属性为 Logo 图片路径。
可以通过 `logo-width` 和 `logo-height` 设置 Logo 大小。
通过 `logo-radius` 设置 Logo 圆角（包括边框和图片）。
通过 `logo-border-color` 和 `logo-border-width` 设置边框样式。

```html
<wd-qr-code
  text="wot-design-uni"
  logo="/static/logo.png"
  :logo-width="50"
  :logo-height="50"
  logo-background-color="#FFFFFF"
  :logo-radius="6"
  logo-border-color="#fff"
  :logo-border-width="4"
/>
```

## 码点样式

设置 `dot-type` 属性，支持 `square` (默认)、`dots` (圆点)、`rounded` (圆角)、`liquid` (液态)。
可以通过 `dot-scale` 调整码点大小缩放。

```html
<!-- 圆点样式 -->
<wd-qr-code text="wot-design-uni" dot-type="dots" :dot-scale="0.9" />

<!-- 圆角样式 -->
<wd-qr-code text="wot-design-uni" dot-type="rounded" />

<!-- 液态样式 -->
<wd-qr-code text="wot-design-uni" dot-type="liquid" />
```

## 渐变颜色

开启 `enable-gradient` 属性。
- `gradient-color`: 渐变结束色（默认从 `color-dark` 渐变到此颜色）。
- `gradient-direction`: 渐变方向，支持 `'diagonal'` (对角)、`'horizontal'` (水平)、`'vertical'` (垂直)，也支持传入数字表示角度（如 `45`）。
- `gradient-colors`: 多色渐变数组，优先级高于 `color-dark` 和 `gradient-color`。

```html
<!-- 基础渐变 -->
<wd-qr-code text="wot-design-uni" enable-gradient gradient-color="#00FF00" />

<!-- 自定义角度和多色渐变 -->
<wd-qr-code 
  text="wot-design-uni" 
  enable-gradient 
  :gradient-direction="45" 
  :gradient-colors="['#FF0000', '#00FF00', '#0000FF']" 
/>
```

## 背景图片

设置 `background-image` 属性。

```html
<wd-qr-code text="wot-design-uni" background-image="/static/bg.png" />
```

## 导出图片

通过 ref 调用 `exportImage` 方法，返回临时文件路径。

```html
<wd-qr-code ref="qrCode" text="wot-design-uni" />
<wd-button @click="exportImage">导出图片</wd-button>

<script lang="ts" setup>
import { ref } from 'vue'

const qrCode = ref()

function exportImage() {
  qrCode.value
    .exportImage()
    .then((res) => {
      console.log('图片路径:', res)
    })
    .catch((err) => {
      console.error('导出失败:', err)
    })
}
</script>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
|-----|------|-----|-------|
| text | 二维码内容 | string | - |
| size | 二维码大小，单位 px | number | 200 |
| correct-level | 纠错级别，可选值为 `L` `M` `Q` `H` | string | 'H' |
| color-dark | 实点颜色 | string | '#000000' |
| color-light | 空白颜色 | string | '#FFFFFF' |
| margin | 外边距，单位 px | number | 0 |
| logo | Logo 图片路径 | string | - |
| logo-width | Logo 宽度，单位 px | number | 70 |
| logo-height | Logo 高度，单位 px | number | 70 |
| logo-background-color | Logo 背景色 | string | '#FFFFFF' |
| logo-radius | Logo 圆角，单位 px | number | 0 |
| logo-border-color | Logo 边框颜色 | string | - |
| logo-border-width | Logo 边框宽度，单位 px | number | 0 |
| dot-type | 码点类型，可选值为 `square` `dots` `rounded` `liquid` | string | 'square' |
| dot-scale | 码点缩放比例 | number | 1 |
| enable-gradient | 是否启用渐变 | boolean | false |
| gradient-color | 渐变结束色 | string | '#000000' |
| gradient-colors | 多色渐变颜色数组 | string[] | [] |
| gradient-direction | 渐变方向，可选值为 `diagonal` `horizontal` `vertical` 或 角度数值 | string \| number | 'diagonal' |
| background-image | 背景图片路径 | string | - |
| canvas-id | Canvas ID，不传自动生成 | string | - |

## Events

| 事件名称 | 说明 | 回调参数 |
|---------|-----|---------|
| click | 点击组件时触发 | event: Event |
| error | 发生错误时触发 | error: Error |

## Methods

| 方法名称 | 说明 | 参数 | 返回值 |
|---------|-----|-----|-------|
| exportImage | 导出二维码图片 | - | Promise&lt;string&gt; |
