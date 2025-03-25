# useUpload

用于处理文件上传相关的逻辑。

## 基础用法

```ts
import { useUpload } from '@/uni_modules/wot-design-uni'

const { startUpload, abort, UPLOAD_STATUS } = useUpload()

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

| 方法名 | 说明 | 参数 | 返回值 |
|-------|------|------|--------|
| startUpload | 开始上传文件 | file: UploadFileItem, options: UseUploadOptions | UniApp.UploadTask \| void |
| abort | 中断上传 | task?: UniApp.UploadTask | void |

### UseUploadOptions

| 参数 | 说明 | 类型 | 默认值 |
|-----|------|------|--------|
| action | 上传地址 | string | - |
| header | 请求头 | Record<string, any> | {} |
| name | 文件对应的 key | string | 'file' |
| formData | 其它表单数据 | Record<string, any> | {} |
| fileType | 文件类型 | 'image' \| 'video' \| 'audio' | 'image' |
| statusCode | 成功状态码 | number | 200 |
| uploadMethod | 自定义上传方法 | UploadMethod | - |
| onSuccess | 上传成功回调 | Function | - |
| onError | 上传失败回调 | Function | - |
| onProgress | 上传进度回调 | Function | - |
