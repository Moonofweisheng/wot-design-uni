---
url: 'https://wot-ui.cn/component/use-upload.md'
---
# useUpload

用于处理文件上传和选择相关的逻辑。

## 基础用法

```ts
import { useUpload } from '@/uni_modules/wot-design-uni'

const { startUpload, abort, chooseFile, UPLOAD_STATUS } = useUpload()

// 选择文件
const files = await chooseFile({
  accept: 'image',
  multiple: true,
  maxCount: 9
})

// 开始上传
const file = {
  url: 'file://temp/image.png',
  status: UPLOAD_STATUS.PENDING,
  percent: 0
}

startUpload(file, {
  action: 'https://upload-url',
  onSuccess(res) {
    console.log('上传成功', res)
  },
  onError(err) {
    console.log('上传失败', err) 
  },
  onProgress(progress) {
    console.log('上传进度', progress)
  }
})

// 中断上传
abort()
```

## API

### 方法

| 方法名 | 说明 | 参数 | 返回值 | 最低版本 |
|-------|------|------|--------|---------|
| startUpload | 开始上传文件 | file: UploadFileItem, options: UseUploadOptions | UniApp.UploadTask | void | - |
| abort | 中断上传 | task?: UniApp.UploadTask | void | - |
| chooseFile | 选择文件 | options: ChooseFileOption | Promise\<ChooseFile\[]> | - |

### UseUploadOptions

| 参数 | 说明 | 类型 | 默认值 | 最低版本 |
|-----|------|------|--------|---------|
| action | 上传地址 | string | - | - |
| header | 请求头 | Record\<string, any> | {} | - |
| name | 文件对应的 key | string | 'file' | - |
| formData | 其它表单数据 | Record\<string, any> | {} | - |
| fileType | 文件类型 | 'image' | 'video' | 'audio' | 'image' | - |
| statusCode | 成功状态码 | number | 200 | - |
| uploadMethod | 自定义上传方法 | UploadMethod | - | - |
| onSuccess | 上传成功回调 | Function | - | - |
| onError | 上传失败回调 | Function | - | - |
| onProgress | 上传进度回调 | Function | - | - |

### ChooseFileOption

| 参数 | 说明 | 类型 | 默认值 | 最低版本 |
|-----|------|------|--------|---------|
| multiple | 是否支持多选文件 | boolean | false | - |
| sizeType | 所选的图片的尺寸 | Array | \['original', 'compressed'] | - |
| sourceType | 选择文件的来源 | Array | \['album', 'camera'] | - |
| maxCount | 最大可选数量 | number | 9 | - |
| accept | 接受的文件类型 | 'image' | 'video' | 'media' | 'file' | 'all' | 'image' | - |
| compressed | 是否压缩视频 | boolean | true | - |
| maxDuration | 视频最大时长(秒) | number | 60 | - |
| camera | 摄像头朝向 | 'back' | 'front' | 'back' | - |
| extension | 根据文件拓展名过滤(H5支持全部类型过滤,微信小程序支持all和file时过滤,其余平台不支持) | string\[] | - |

## 文件选择数量限制

不同平台对文件选择数量有不同的限制，这些限制由 uni-app 平台 API 本身决定：

### 微信平台

| 选择方法 | 最大数量 | 说明 | 适用场景 |
|---------|---------|------|----------|
| `chooseMedia` | 20 | 选择图片和视频时的最大数量限制 | accept 为 `image`、`video`、`media` 时使用 |
| `chooseMessageFile` | 100 | 选择文件时的最大数量限制 | accept 为 `file`、`all` 时使用 |

### H5平台

| 选择方法 | 最大数量 | 说明 | 适用场景 |
|---------|---------|------|----------|
| `chooseImage` | 9 | 选择图片时的最大数量限制 | accept 为 `image` 时使用 |
| `chooseVideo` | 1 | 不支持多选，只能选择单个视频文件 | accept 为 `video` 时使用 |
| `chooseFile` | 100 | 选择文件时的最大数量限制 | accept 为 `all` 时使用 |

::: warning H5平台特别说明
count 值在 H5 平台的表现基于浏览器本身的规范。目前测试结果来看，只能限制单选/多选，并不能限制具体数量。并且，在实际的手机浏览器中很少有能够支持多选的。
:::

### 其他平台

| 选择方法 | 最大数量 | 说明 | 适用场景 |
|---------|---------|------|----------|
| `chooseImage` | 9 | 选择图片时的最大数量限制 | accept 为 `image` 时使用 |
| `chooseVideo` | 1 | 不支持多选，只能选择单个视频文件 | accept 为 `video` 时使用 |

::: tip 提示

* 微信平台优先使用 `chooseMedia` 和 `chooseMessageFile`，具有更高的选择数量限制
* 视频选择在大多数平台都不支持多选
* 实际可选择的数量还会受到 `maxCount` 参数的进一步限制
  :::
