# Watermark

Add specified images or text on pages or components, which can be used for copyright protection, brand promotion, and other scenarios.

## Basic Usage

Place the WaterMark component in the page, you can set the watermark display content through the `content` field, and set the height and width of a single watermark through `width` and `height` to display a full-screen watermark.

```html
<wd-watermark content="wot-design-uni" :width="130" :height="130"></wd-watermark>
```

### Image Watermark

Set the network image address or Base64 image through the `image` field, and set the width and height of the watermark image through the `image-width` and `image-height` fields.
**Note: DingTalk Mini Program platform only supports network images.**

```html
<wd-watermark image="https://wot-ui.cn/logo.png" :image-width="38" :image-height="38"></wd-watermark>
```

### Local Watermark

Set whether it is a full-screen watermark through `full-screen`.

```html
<wd-watermark content="wot-design-uni" :full-screen="false"></wd-watermark>
```

### Custom Layer Level and Opacity

Set opacity through `opacity` and watermark layer level through `z-index`.

```html
<wd-watermark content="wot-design-uni" :opacity="0.4"></wd-watermark>
```

## Attributes

| Parameter | Description | Type | Accepted Values | Default | Version |
|-------------|--------------------------|---------|-----------------------------------|---------|----------|
| `content` | Display content | string | - | `''` | 0.1.16 |
| `image` | Image address, supports network images and base64 (DingTalk Mini Program supports network images) | string | - | `''` | 0.1.16 |
| `imageHeight` | Image height | number | - | `100` | 0.1.16 |
| `imageWidth` | Image width | number | - | `100` | 0.1.16 |
| `gutterX` | X-axis spacing, unit px | number | - | `0` | 0.1.16 |
| `gutterY` | Y-axis spacing, unit px | number | - | `0` | 0.1.16 |
| `width` | Canvas width, unit px | number | - | `100` | 0.1.16 |
| `height` | Canvas height, unit px | number | - | `100` | 0.1.16 |
| `fullScreen` | Whether it is a full-screen watermark | boolean | - | `true` | 0.1.16 |
| `color` | Watermark font color | string | - | `'#8c8c8c'` | 0.1.16 |
| `size` | Watermark font size, unit px | number | - | `14` | 0.1.16 |
| `fontStyle` | Watermark font style (only supported by WeChat, Alipay and H5) | string | `normal` / `italic` / `oblique` | `'normal'` | 0.1.16 |
| `fontWeight` | Watermark font weight (only supported by WeChat, Alipay and H5) | string | `normal` / `bold` / `bolder` | `'normal'` | 0.1.16 |
| `fontFamily` | Watermark font family (only supported by WeChat, Alipay and H5) | string | - | `'PingFang SC'` | 0.1.16 |
| `rotate` | Watermark rotation angle | number | - | `-25` | 0.1.16 |
| `zIndex` | Custom layer level | number | - | `1100` | 0.1.16 |
| `opacity` | Custom opacity, value range 0~1 | number | - | `0.5` | 0.1.16 |