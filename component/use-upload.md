---
url: 'https://wot-design-uni.cn/component/use-upload.md'
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
