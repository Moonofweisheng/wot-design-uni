# ImgCropper

Image cropping component, used for image cropping, supporting drag, zoom, rotation, and other operations.

## Basic Usage

The image cropping component needs to bind `v-model` to control the component's display and hide, and control the displayed image resource through the `img-src` property. After entering the component, you can perform operations such as dragging, two-finger zooming, rotating, etc., and listen to the `confirm` event to get the cropping result.

> *Note: It is recommended to use the image cropping component in a new page, keep `show` as true, and return to the previous page after cropping is completed.*

```html
<wd-img-cropper
  v-model="show"
  :img-src="src"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
</wd-img-cropper>
<view class="profile">
  <view v-if="!imgSrc" class="img" @click="upload">
    <wd-icon name="fill-camera" custom-class="img-icon"></wd-icon>
  </view>
  <wd-img v-if="imgSrc" round width="200px" height="200px" :src="imgSrc" mode="aspectFit" custom-class="profile-img" @click="upload" />
  <view style="font-size: 14px;">Click to upload avatar</view>
</view>
```

```typescript
const src = ref<string>('')
const imgSrc = ref<string>('')
const show = ref<boolean>(false)

function upload() {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      const tempFilePaths = res.tempFilePaths[0]
      src.value = tempFilePaths
      show.value = true
    }
  })
}
function handleConfirm(event) {
  const { tempFilePath } = event
  imgSrc.value = tempFilePath
}
function imgLoaderror(res) {
  console.log('Loading failed', res)
}
function imgLoaded(res) {
  console.log('Loading successful', res)
}
function handleCancel(event) {
  console.log('Cancel', event)
}
```

## Custom Cropping Ratio

You can set the aspect ratio of the cropping box through the `aspect-ratio` property, in the format of `width:height`.

### 3:2 Suitable for Photography

```html
<wd-img-cropper
  v-model="show"
  :img-src="src"
  aspect-ratio="3:2"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
</wd-img-cropper>
```

### 16:9 Cinema Ratio

```html
<wd-img-cropper
  v-model="show"
  :img-src="src"
  aspect-ratio="16:9"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
</wd-img-cropper>
```

### 16:10 Wide and Stylish

The 16:10 display ratio is very suitable for displaying landscape photos or movie posters and other widescreen content.

```html
<wd-img-cropper
  v-model="show"
  :img-src="src"
  aspect-ratio="16:10"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
</wd-img-cropper>
```

## Upload After Cropping

Combined with `useUpload`, you can implement automatic image upload after cropping is completed.

```html
<wd-img-cropper
  v-model="show"
  :img-src="src"
  @confirm="handleConfirmUpload"
  @cancel="handleCancel"
>
</wd-img-cropper>
```

```typescript
import { ref } from 'vue'
import { useUpload, useToast } from '@/uni_modules/wot-design-uni'
import { type UploadFileItem } from '@/uni_modules/wot-design-uni/components/wd-upload/types'

const { startUpload, UPLOAD_STATUS } = useUpload()
const { show: showToast } = useToast()

const show = ref(false)
const src = ref('')
const imgSrc = ref('')

async function handleConfirmUpload(event) {
  const { tempFilePath } = event
  
  // Build upload file object
  const file: UploadFileItem = {
    url: tempFilePath,
    status: UPLOAD_STATUS.PENDING,
    percent: 0,
    uid: new Date().getTime()
  }

  try {
    // Start upload
    await startUpload(file, {
      action: 'https://your-upload-url',
      onSuccess() {
        imgSrc.value = tempFilePath
        showToast({
          msg: 'Upload successful'
        })
      },
      onError() {
        showToast({
          msg: 'Upload failed'
        })
      },
      onProgress(res) {
        console.log('Upload progress:', res.progress)
      }
    })
  } catch (error) {
    console.error('Upload failed:', error)
  }
}
```

## Attributes

| Parameter | Description | Type | Options | Default | Version |
|-----------|-------------|------|----------|---------|----------|
| v-model | Open image cropping component | boolean | - | false | - |
| img-src | Image resource link | string | - | - | - |
| img-width | Initial width of screenshot preview image; `1. Set width without height for proportional scaling; 2. If neither is set, preview image size will scale proportionally based on crop box size and lock edges;`; string type only supports % unit, number type unit is px | number / string | - | - | - |
| img-height | Initial height of screenshot preview image; `1. Set height without width for proportional scaling; 2. If neither is set, preview image size will scale proportionally based on crop box size and lock edges;`; string type only supports % unit, number type unit is px | number / string | - | - | - |
| disabled-rotate | Disable image rotation | boolean | - | false | - |
| export-scale | Set exported image size | number | - | 2 | - |
| max-scale | Maximum zoom scale | number | - | 3 | - |
| cancel-button-text | Cancel button text | string | - | Cancel | - |
| confirm-button-text | Confirm button text | string | - | Complete | - |
| quality | Generated image quality [wx.canvasToTempFilePath property introduction](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.canvasToTempFilePath.html#%E5%8F%82%E6%95%B0) | number | 0/1 | 1 | - |
| file-type | Target file type, [wx.canvasToTempFilePath property introduction](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.canvasToTempFilePath.html#%E5%8F%82%E6%95%B0) | string | - | png | - |
| aspect-ratio | Crop box aspect ratio, format is width:height | string | - | 1:1 | 1.9.0 |

## Events

| Event Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| confirm | Triggered when screenshot is completed | `{tempFilePath, width, height}` are the temporary path (local path), generated image width, and generated image height respectively | - |
| cancel | Triggered when screenshot is cancelled | - | - |
| imgloaderror | Triggered when image loading fails | `{err}` | - |
| imgloaded | Triggered when image loading completes | `{res}` | - |

## Methods

Externally exposed functions

| Method Name | Description | Parameters | Version |
|------------|-------------|------------|----------|
| setRoate | Set image rotation angle | deg (set rotation angle) | - |
| resetImg | Reset image angle, zoom, and position | - | - |

## External Classes

| Class Name | Description | Version |
|------------|-------------|----------|
| custom-class | Custom style class | - |