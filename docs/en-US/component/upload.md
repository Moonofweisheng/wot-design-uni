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

```html
<wd-upload
  :file-list="fileList"
  reupload
  action="https://mockapi.eolink.com/zhTuw2P8c29bc981a741931bdd86eb04dc1e8fd64865cb5/upload"
  @change="handleChange"
></wd-upload>
```

## Valid Values for accept

| name  | Description                                                                                   | Minimum Version |
| ----- | --------------------------------------------------------------------------------------------- | --------------- |
| image | Images, supported on all platforms                                                           | -               |
| video | Videos, supported on all platforms                                                           | 1.3.0           |
| media | Images and videos, WeChat only, implemented using `chooseMedia`                              | 1.3.0           |
| file  | Files other than images and videos from client sessions, WeChat only, implemented using `chooseMessageFile` | 1.3.0           |
| all   | All types of files, WeChat and H5 only, WeChat uses `chooseMessageFile`, H5 uses `chooseFile` | 1.3.0           |

## File Selection Quantity Limits

Different platforms have different file selection methods with varying maximum quantity limits, which are determined by the uni-app platform APIs:

### WeChat Platform

WeChat Mini Program platform offers richer file selection capabilities with higher quantity limits:

| Selection Method | Maximum Count | Description | Applicable File Types |
| ---------------- | ------------- | ----------- | -------------------- |
| `chooseMedia` | 20 | Maximum selection count for images and videos | Used when accept is `image`, `video`, or `media` |
| `chooseMessageFile` | 100 | Maximum selection count for files from client sessions | Used when accept is `file` or `all` |

### H5 Platform

H5 platform supports multiple file selection methods:

| Selection Method | Maximum Count | Description | Applicable File Types |
| ---------------- | ------------- | ----------- | -------------------- |
| `chooseImage` | 9 | Maximum selection count for images | Used when accept is `image` |
| `chooseVideo` | 1 | Does not support multiple selection, single video file only | Used when accept is `video` |
| `chooseFile` | 100 | Maximum selection count for files | Used when accept is `all` |

::: warning H5 Platform Special Note
The behavior of the count value on the H5 platform is based on the browser's own specifications. Current test results show that it can only limit single/multiple selection, but cannot limit the specific quantity. Moreover, very few mobile browsers actually support multiple selection.
:::

### Other Platforms

Other platforms (such as Alipay Mini Program, DingTalk Mini Program, App, etc.) have relatively limited file selection capabilities:

| Selection Method | Maximum Count | Description | Applicable File Types |
| ---------------- | ------------- | ----------- | -------------------- |
| `chooseImage` | 9 | Maximum selection count for images | Used when accept is `image` |
| `chooseVideo` | 1 | Does not support multiple selection, single video file only | Used when accept is `video` |

::: tip Tips
- When the set `limit` or `maxCount` exceeds the above platform limits, the actual selection count will be subject to platform limits
- WeChat Mini Program platform prioritizes using `chooseMedia` for selecting images and videos, which has higher selection count limits
- Video selection on non-WeChat platforms is limited by the `chooseVideo` API and only supports single selection
- Platform capability priority: WeChat Platform > H5 Platform > Other Platforms
:::