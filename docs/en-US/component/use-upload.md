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
| extension | Filter by file extension (H5 supports all type filtering, WeChat Mini Program supports filtering when all and file, other platforms do not support) | string[] | - |