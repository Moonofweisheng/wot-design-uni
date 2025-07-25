---
url: 'https://wot-design-uni.cn/component/img-cropper.md'
---
# ImgCropper 图片裁剪

图片剪裁组件，用于图片裁剪，支持拖拽、缩放、旋转等操作。

## 基本用法

图片裁剪组件需要绑定 `v-model` 来控制组件的显示与隐藏，通过属性 `img-src` 控制展示的图片资源。进入组件后，可以对图片进行拖拽、双指缩放、旋转等操作，监听 `confirm` 事件获取裁剪结果。

> *注意：建议在新页面中使用图片裁剪组件，保持 `show` 为 true，完成裁剪后返回上一页。*

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
  <view style="font-size: 14px;">点击上传头像</view>
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
  console.log('加载失败', res)
}
function imgLoaded(res) {
  console.log('加载成功', res)
}
function handleCancel(event) {
  console.log('取消', event)
}
```

## 自定义裁剪比例

通过 `aspect-ratio` 属性可以设置裁剪框的宽高比，格式为 `width:height`。

### 3:2 适合拍照

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

### 16:9 影视比例

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

### 16:10 这么阔 很有型

16:10 的显示比例非常适合展示风景照片或者电影海报等宽屏内容。

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

## 裁剪后上传

结合 `useUpload` 可以实现裁剪完成后自动上传图片的功能。

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
  
  // 构建上传文件对象
  const file: UploadFileItem = {
    url: tempFilePath,
    status: UPLOAD_STATUS.PENDING,
    percent: 0,
    uid: new Date().getTime()
  }

  try {
    // 开始上传
    await startUpload(file, {
      action: 'https://your-upload-url',
      onSuccess() {
        imgSrc.value = tempFilePath
        showToast({
          msg: '上传成功'
        })
      },
      onError() {
        showToast({
          msg: '上传失败'
        })
      },
      onProgress(res) {
        console.log('上传进度:', res.progress)
      }
    })
  } catch (error) {
    console.error('上传失败:', error)
  }
}
```

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值| 最低版本 |
|-----|------|-----|-------|-------|--------|
| v-model | 打开图片裁剪组件 | boolean | - | false | - |
| img-src | 图片资源链接 | string | - | - | - |
| img-width | 截屏预览图片的初始宽度; `1、设置宽度不设置高度，按照宽度等比缩放；2、如果都不设置，预览时图片大小会根据裁剪框大小进行等比缩放，进行锁边处理；`; string 类型只支持 % 单位，number 类型时单位为 px | number / string | - | - | - |
| img-height | 截屏预览图片的初始高度; `1、设置高度不设置宽度，按照高度等比缩放；2、如果都不设置，预览时图片大小会根据裁剪框大小进行等比缩放，进行锁边处理；`; string 类型只支持 % 单位，number 类型时单位为 px | number / string | - | - | - |
| disabled-rotate | 禁止图片旋转 | boolean | - | false | - |
| export-scale | 设置导出图片尺寸 | number | - | 2 | - |
| max-scale | 最大缩放倍数 | number | - | 3 | - |
| cancel-button-text | 取消按钮文案 | string | - | 取消 | - |
| confirm-button-text | 确认按钮文案 | string | - | 完成 | - |
| quality | 生成的图片质量 [wx.canvasToTempFilePath属性介绍](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.canvasToTempFilePath.html#%E5%8F%82%E6%95%B0) | number | 0/1 | 1 | - |
| file-type | 目标文件的类型，[wx.canvasToTempFilePath属性介绍](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.canvasToTempFilePath.html#%E5%8F%82%E6%95%B0) | string | - | png | - |
| aspect-ratio | 裁剪框宽高比，格式为 width:height | string | - | 1:1 | 1.9.0 |

## Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|---------|-----|-----|---------|
| confirm | 完成截图时触发 |  `{tempFilePath, width, height}` 分别为生成文件的临时路径 (本地路径)、生成图片宽、生成图片高| - |
| cancel | 当取消截图时触发 | - | - |
| imgloaderror | 当图片加载错误时触发 |  `{err} `| - |
| imgloaded | 当图片加载完成时触发 |  `{res}` | - |

## Methods

对外暴露函数

| 事件名称 | 说明 | 参数 | 最低版本 |
|--------|------|-----|---------|
| setRoate | 设置图片旋转角度 | deg (设置的旋转角度)| - |
| resetImg | 重置图片的角度、缩放、位置 | - | - |

## 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根节点样式 | - |
