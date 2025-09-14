# Img

Enhanced img tag that provides multiple image filling modes and supports image lazy loading, loading completion, and loading failure.

## Basic Usage

Basic usage is consistent with the native image tag. You can set native attributes such as `src`, `width`, `height`, etc.

For native attributes, refer to [uni-app image official documentation](https://uniapp.dcloud.net.cn/component/image.html#image).

Note about the src attribute:

When using `relative paths`, note that `src` needs to be a relative path from the component's location to the image's location.

When using `file import`, note that WeChat Mini Program image tag paths accept binary data and base64 encoding. Using import image paths alone cannot be accessed.

```html
<wd-img :width="100" :height="100" :src="joy" />
```

```typescript
// import { joy } from '../images/joy'
const joy = 'data:image/jpeg;base64,...' // Image file base64
```

:::tip
You can configure `transformAssetUrls` so that the `src` attribute works consistently with the native `image` component.

```typescript
// vite.config.(js|ts)

import uni from '@dcloudio/vite-plugin-uni'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    // ...
    uni({
      vueOptions: {
        template: {
          transformAssetUrls: {
            tags: {
              'wd-img': ['src']
            }
          }
        }
      }
    })
  ]
})
```

After updating the configuration, restart the development server to apply the changes.
For more details, see [uni-app issue#4997](https://github.com/dcloudio/uni-app/issues/4997#issuecomment-2456851123).
:::

## Slots

Use `loading` and `error` slots to set display content during image loading and after loading failure

```vue
<template>
  <wd-img :width="100" :height="100" src="https://www.123.com/a.jpg">
    <template #error>
      <view class="error-wrap">Loading Failed</view>
    </template>
    <template #loading>
      <view class="loading-wrap">
        <wd-loading />
      </view>
    </template>
  </wd-img>
</template>

<style>
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
```

## Fill Mode

You can set the image fill mode through the `mode` property. See the table below for available values.

Mode is a Mini Program native property, refer to [WeChat Mini Program image official documentation](https://developers.weixin.qq.com/miniprogram/dev/component/image.html).

```html
<wd-img :width="100" :height="100" mode="center" :src="joy" />
```

## Round Setting

You can set to display as a circle through the `round` property.

```html
<wd-img :width="100" :height="100" round :src="joy" />
```

## Preview Enabled

By setting the `enable-preview` property, you can support click preview. It uses uni.previewImage under the hood to implement the preview effect

```html
<wd-img :width="100" :height="100" :src="joy" :enable-preview="true" />
```

You can also pass in the `preview-src` property to preview another image

```html
<wd-img :width="100" :height="100" :src="joy" :preview-src="img" :enable-preview="true" />
```

## Attributes

| Parameter | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| src | Image URL | string | - | - | - |
| width | Width, default unit is px | number / string | - | - | - |
| height | Height, default unit is px | number / string | - | - | - |
| mode | Fill mode | ImageMode | 'top left' / 'top right' / 'bottom left' / 'bottom right' / 'right' / 'left' / 'center' / 'bottom' / 'top' / 'heightFix' / 'widthFix' / 'aspectFill' / 'aspectFit' / 'scaleToFill' | 'scaleToFill' | - |
| round | Whether to display as circle | boolean | - | false | - |
| radius | Border radius size, default unit is px | number / string | - | - | - |
| enable-preview | Whether to support click preview | boolean | - | false | 1.2.11 |
| show-menu-by-longpress | Enable long press image to show Mini Program code recognition menu, only supported in WeChat Mini Program | boolean | - | false | 1.3.11 |
| preview-src | Preview image URL | string | - | - | 1.8.0 |

## Events

| Event Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| click | Click event | (event: MouseEvent) => void | - |
| load | Triggered when image is loaded | `{height, width}` | - |
| error | Triggered when error occurs | `{errMsg}` | - |

## Slots

| Name | Description | Version |
|------|-------------|----------|
| loading | Display during image loading | 1.2.21 |
| error | Display after image loading failure | 1.2.21 |

## External Classes

| Class Name | Description | Version |
|------------|-------------|----------|
| custom-class | Root node style | - |
| custom-image | Image external custom style | - |