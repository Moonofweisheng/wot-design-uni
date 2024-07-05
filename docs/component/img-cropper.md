<frame/>

#  ImgCropper 图片裁剪


- 1、图片裁剪
- 2、支持拖拽，用于移动图片使其位于对应位置
- 3、支持缩放，用于截取限定区域
- 4、支持旋转，用于截取对应角度


## 基本用法

图片裁剪组件需要绑定 `v-model` 来控制组件的显示与隐藏，通过属性 `img-src` 控制展示的图片资源位，也可以通过函数 `resetImg` 来控制组件图片的初始化。进入组件后，可以对图片进行拖拽、双指缩放、旋转等操作。监听 `confirm` 事件获取选中值。

> *注意：在使用组件时，最好在一个新页面中使用图片裁剪组件，图片裁剪保持`show`为true，完成裁剪时，返回上一页。*

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
