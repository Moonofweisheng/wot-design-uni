---
url: 'https://wot-design-uni.cn/component/watermark.md'
---
# Watermark 水印 0.1.16

在页面或组件上添加指定的图片或文字，可用于版权保护、品牌宣传等场景。

## 基础用法

将 WaterMark 组件放在页面中，可以通过`content`字段设置水印显示内容，通过`width`和`height`设置单个水印的高度与宽度，展示一个全屏的水印。

```html
<wd-watermark content="wot-design-uni" :width="130" :height="130"></wd-watermark>
```

### 图片水印

通过`image`字段设置网络图片地址或Base64图片，通过`image-width`和`image-height`字段设置水印图片的宽高。
**注意：钉钉小程序平台仅支持网络图片。**

```html
<wd-watermark image="https://wot-design-uni.cn/logo.png" :image-width="38" :image-height="38"></wd-watermark>

```

### 局部水印

通过`full-screen`设置是否为全屏水印。

```html
<wd-watermark content="wot-design-uni" :full-screen="false"></wd-watermark>
```

### 自定义层级和透明度

通过`opacity`设置透明度、`z-index`设置水印层级。

```html
<wd-watermark content="wot-design-uni" :opacity="0.4"></wd-watermark>
```

## Attributes

| 参数          | 说明                     | 类型    | 可选值                               | 默认值 | 最低版本 |
| ------------- | ------------------------ | ------- | ------------------------------------ | ------ | -------- |
| `content`      | 显示内容                   | string  | -                                    | `''`   | 0.1.16   |
| `image`        | 显示图片的地址，支持网络图片和base64（钉钉小程序支持网络图片） | string  | -                                    | `''`   | 0.1.16   |
| `imageHeight`  | 图片高度                   | number  | -                                    | `100`  | 0.1.16   |
| `imageWidth`   | 图片宽度                   | number  | -                                    | `100`  | 0.1.16   |
| `gutterX`      | X轴间距，单位px           | number  | -                                    | `0`    | 0.1.16   |
| `gutterY`      | Y轴间距，单位px           | number  | -                                    | `0`    | 0.1.16   |
| `width`        | canvas画布宽度，单位px    | number  | -                                    | `100`  | 0.1.16   |
| `height`       | canvas画布高度，单位px    | number  | -                                    | `100`  | 0.1.16   |
| `fullScreen`   | 是否为全屏水印            | boolean | -                                    | `true` | 0.1.16   |
| `color`        | 水印字体颜色              | string  | -                                    | `'#8c8c8c'` | 0.1.16   |
| `size`         | 水印字体大小，单位px      | number  | -                                    | `14`   | 0.1.16   |
| `fontStyle`    | 水印字体样式（仅微信、支付宝和h5支持） | string  | `normal` / `italic` / `oblique`  | `'normal'`  | 0.1.16   |
| `fontWeight`   | 水印字体的粗细（仅微信、支付宝和h5支持） | string  | `normal` / `bold` / `bolder`   | `'normal'`  | 0.1.16   |
| `fontFamily`   | 水印字体系列（仅微信、支付宝和h5支持） | string  | -                             | `'PingFang SC'` | 0.1.16   |
| `rotate`       | 水印旋转角度              | number  | -                             | `-25`  | 0.1.16   |
| `zIndex`       | 自定义层级                | number  | -                             | `1100` | 0.1.16   |
| `opacity`      | 自定义透明度，取值 0~1     | number  | -                             | `0.5`  | 0.1.16   |
