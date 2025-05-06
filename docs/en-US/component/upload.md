# Upload

Component for uploading images, videos and files

::: tip Note
All currently supported platforms in the component library support video uploading. Video covers implemented using the `video` component are supported on `H5`, `WeChat Mini Program` and `Alipay Mini Program` platforms, while on `DingTalk Mini Program` and `App` platforms, they are limited by the capabilities of the `video` tag on these two platforms and cannot be used as video covers. Therefore, it is recommended to get the video cover in the `change` event and add a cover: `thumb` to the corresponding video in `fileList` (when uploading to various cloud servers, each vendor should provide video cover functionality).
:::

::: warning About WeChat Mini Program Privacy Agreement
`upload` uses three privacy interfaces on the WeChat Mini Program platform: `wx.chooseImage`, `wx.chooseMedia`, and `wx.chooseVideo`, which require configuration of the WeChat privacy agreement. You can refer to the [Mini Program Privacy Agreement Development Guide](https://developers.weixin.qq.com/miniprogram/dev/framework/user-privacy/PrivacyAuthorize.html) for related configuration and development, otherwise the upload function will not work. It is recommended to use [WeChat Mini Program Privacy Protection Pop-up](https://ext.dcloud.net.cn/plugin?id=14346) or the [WeChat Privacy Agreement Pop-up](https://github.com/Moonofweisheng/wot-design-uni/tree/master/src/components/wd-privacy-popup) used in the component library demo.
:::

## Basic Usage

`file-list` sets the upload list, with array as the data type;

After data changes, assign values to fileList through binding the `change` event.

`action` sets the upload address;

```html
<wd-upload :file-list="fileList" image-mode="aspectFill" :action="action" @change="handleChange"></wd-upload>
```

```typescript
const fileList = ref<any[]>([
  {
    url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
  }
])

const action: string = 'https://mockapi.eolink.com/zhTuw2P8c29bc981a741931bdd86eb04dc1e8fd64865cb5/upload'

function handleChange({ fileList: files }) {
  fileList.value = files
}
```

## Two-way Binding `1.3.8`

`file-list` supports two-way binding using `v-model`.

Operations such as uploading and deleting will synchronize data, no need to bind through the `change` event

```html
<wd-upload v-model:file-list="fileList1" image-mode="aspectFill" :action="action"></wd-upload>
```

```typescript
const fileList = ref<any[]>([
  {
    url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
  }
])

const action: string = 'https://mockapi.eolink.com/zhTuw2P8c29bc981a741931bdd86eb04dc1e8fd64865cb5/upload'
```

## Disabled

Set `disabled` to enable disabled upload

```html
<wd-upload
  :file-list="fileList"
  action="https://mockapi.eolink.com/zhTuw2P8c29bc981a741931bdd86eb04dc1e8fd64865cb5/upload"
  @change="handleChange"
  disabled
></wd-upload>
```

## Multiple Selection Upload

Enable multiple file selection upload by setting `multiple`.

```html
<wd-upload
  :file-list="fileList"
  multiple
  action="https://mockapi.eolink.com/zhTuw2P8c29bc981a741931bdd86eb04dc1e8fd64865cb5/upload"
  @change="handleChange"
></wd-upload>
```

## Maximum Upload Limit

The upload component can limit the number of uploaded files by setting `limit`.

```html
<wd-upload
  :file-list="fileList"
  :limit="3"
  action="https://mockapi.eolink.com/zhTuw2P8c29bc981a741931bdd86eb04dc1e8fd64865cb5/upload"
  @change="handleChange"
></wd-upload>
```

## Overwrite Upload

The upload component can automatically replace the previous file when selected by setting `reupload`.