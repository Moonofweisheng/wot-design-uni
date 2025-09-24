# useUpload

Used for handling file upload and selection related logic.

## Basic Usage

```ts
import { useUpload } from '@/uni_modules/wot-design-uni'

const { startUpload, abort, chooseFile, UPLOAD_STATUS } = useUpload()

// Choose files
const files = await chooseFile({
  accept: 'image',
  multiple: true,
  maxCount: 9
})

// Start upload
const file = {
  url: 'file://temp/image.png',
  status: UPLOAD_STATUS.PENDING,
  percent: 0
}

startUpload(file, {
  action: 'https://upload-url',
  onSuccess(res) {
    console.log('Upload successful', res)
  },
  onError(err) {
    console.log('Upload failed', err) 
  },
  onProgress(progress) {
    console.log('Upload progress', progress)
  }
})

// Abort upload
abort()
```

## API

### Methods

| Method Name | Description | Parameters | Return Value | Minimum Version |
|-------|------|------|--------|----------|
| startUpload | Start uploading file | file: UploadFileItem, options: UseUploadOptions | UniApp.UploadTask \| void | - |
| abort | Abort upload | task?: UniApp.UploadTask | void | - |
| chooseFile | Choose file | options: ChooseFileOption | Promise<ChooseFile[]> | - |

### UseUploadOptions

| Parameter | Description | Type | Default | Minimum Version |
|-----|------|------|--------|----------|
| action | Upload URL | string | - | - |
| header | Request headers | Record<string, any> | {} | - |
| name | Key corresponding to the file | string | 'file' | - |
| formData | Other form data | Record<string, any> | {} | - |
| fileType | File type | 'image' \| 'video' \| 'audio' | 'image' | - |
| statusCode | Success status code | number | 200 | - |
| uploadMethod | Custom upload method | UploadMethod | - | - |
| onSuccess | Upload success callback | Function | - | - |
| onError | Upload failure callback | Function | - | - |
| onProgress | Upload progress callback | Function | - | - |

### ChooseFileOption

| Parameter | Description | Type | Default | Minimum Version |
|-----|------|------|--------|----------|
| multiple | Whether to support multiple file selection | boolean | false | - |
| sizeType | Size of selected images | Array | ['original', 'compressed'] | - |
| sourceType | Source of file selection | Array | ['album', 'camera'] | - |
| maxCount | Maximum number of selections | number | 9 | - |
| accept | Accepted file types | 'image' \| 'video' \| 'media' \| 'file' \| 'all' | 'image' | - |
| compressed | Whether to compress video | boolean | true | - |
| maxDuration | Maximum video duration (seconds) | number | 60 | - |
| camera | Camera direction | 'back' \| 'front' | 'back' | - |
| extension | Filter by file extension (H5 supports all types; WeChat Mini Program supports filtering when accept is 'all' or 'file'; other platforms do not support) | string[] | - | - |



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

### Other Platforms

Other platforms (such as Alipay Mini Program, DingTalk Mini Program, App, etc.) have relatively limited file selection capabilities:

| Selection Method | Maximum Count | Description | Applicable File Types |
| ---------------- | ------------- | ----------- | -------------------- |
| `chooseImage` | 9 | Maximum selection count for images | Used when accept is `image` |
| `chooseVideo` | 1 | Does not support multiple selection, single video file only | Used when accept is `video` |

::: tip Tips
- When the set `maxCount` exceeds the above platform limits, the actual selection count will be subject to platform limits
- The `chooseFile` function will automatically choose the optimal method based on platform capabilities
- WeChat Mini Program platform prioritizes using `chooseMedia` for selecting images and videos, which has higher selection count limits
- Video selection on non-WeChat platforms is limited by the `chooseVideo` API and only supports single selection
- Platform capability priority: WeChat Platform > H5 Platform > Other Platforms
:::

::: warning maxCount Parameter Limitation
The `maxCount` parameter in `ChooseFileOption` is limited by the underlying platform APIs. Setting a value higher than the platform limit will be automatically capped to the maximum supported value.
:::