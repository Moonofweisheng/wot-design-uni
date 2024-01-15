<frame/>

# Upload 上传

图片上传组件

## 基本用法

`file-list` 设置上传列表，数据类型为数组；

数据更改后通过绑定 `change` 事件给 fileList 赋值。

`action` 设置图片上传的地址；

```html
<wd-upload :file-list="fileList" :action="action" @change="handleChange"></wd-upload>
```

```typescript
const fileList = ref<any[]>([
  {
    url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
  }
])

const action: string = 'https://ftf.jd.com/api/uploadImg'

function handleChange({ files }) {
  fileList.value = files
}
```

## 禁用

设置 `disabled` 开启禁用上传

```html
<wd-upload :file-list="fileList" action="https://ftf.jd.com/api/uploadImg" @change="handleChange" disabled></wd-upload>
```

## 多选上传

通过设置 `multiple` 开启文件多选上传。

```html
<wd-upload :file-list="fileList" multiple action="https://ftf.jd.com/api/uploadImg" @change="handleChange"></wd-upload>
```

## 最大上传数限制

上传组件可通过设置 `limit` 来限制上传文件的个数。

```html
<wd-upload :file-list="fileList" :limit="3" action="https://ftf.jd.com/api/uploadImg" @change="handleChange"></wd-upload>
```

## 拦截预览图片操作

设置 `before-preview` 函数，在用户点击图片进行预览时，会执行 `before-preview` 函数，接收 { index: 当前预览的下标, imgList: 所有图片地址列表, resolve }，通过 `resolve` 函数告知组件是否确定通过，`resolve` 接受 1 个 boolean 值，`resolve(true)` 表示选项通过，`resolve(false)` 表示选项不通过，不通过时不会执行预览图片操作。

```html
<wd-upload :file-list="fileList" action="https://ftf.jd.com/api/uploadImg" @change="handleChange" :before-preview="beforePreview"></wd-upload>
```

```typescript
import { useToast, useMessage } from '@/uni_modules/wot-design-uni'

const messageBox = useMessage()
const toast = useToast()
const fileList = ref<any[]>([
  {
    url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
  }
])

const beforePreview = ({ file, resolve }) => {
  messageBox
    .confirm({
      msg: '是否预览图片',
      title: '提示'
    })
    .then(() => {
      resolve(true)
    })
    .catch(() => {
      toast.show('取消预览操作')
    })
}

function handleChange({ files }) {
  fileList.value = files
}
```

## 上传前置处理

设置 `before-upload` 函数，弹出图片选择界面，在用户选择图片点击确认后，会执行 `before-upload` 函数，接收 { files: 当前上传的文件, fileList: 文件列表, resolve }，可以对 `file` 进行处理，并通过 `resolve` 函数告知组件是否确定通过，`resolve` 接受 1 个 boolean 值，`resolve(true)` 表示选项通过，`resolve(false)` 表示选项不通过，不通过时不会执行上传操作。

```html
<wd-upload :file-list="fileList" action="https://ftf.jd.com/api/uploadImg" @change="handleChange" :before-upload="beforeUpload"></wd-upload>
```

```typescript
import { useToast, useMessage } from '@/uni_modules/wot-design-uni'

const messageBox = useMessage()
const toast = useToast()
const fileList = ref<any[]>([
  {
    url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
  }
])

const beforeUpload = ({ files, resolve }) => {
  messageBox
    .confirm({
      msg: '是否上传',
      title: '提示'
    })
    .then(() => {
      resolve(true)
    })
    .catch(() => {
      toast.show('取消上传操作')
    })
}

function handleChange({ files }) {
  fileList.value = files
}
```

## 移除图片前置处理

设置 `before-remove` 函数，在用户点击关闭按钮时，会执行 `before-remove` 函数，接收 { file: 移除的文件, index: 移除文件的下标, fileList: 文件列表, resolve }，可以对 `file` 进行处理，并通过 `resolve` 函数告知组件是否确定通过，`resolve` 接受 1 个 boolean 值，`resolve(true)` 表示选项通过，`resolve(false)` 表示选项不通过，不通过时不会执行移除图片操作。

```html
<wd-upload :file-list="fileList" action="https://ftf.jd.com/api/uploadImg" @change="handleChange" :before-remove="beforeRemove"></wd-upload>
```

```typescript
import { useToast, useMessage } from '@/uni_modules/wot-design-uni'

const messageBox = useMessage()
const toast = useToast()
const fileList = ref<any[]>([
  {
    url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
  }
])

const beforeRemove = ({ file, fileList, resolve }) => {
  messageBox
    .confirm({
      msg: '是否删除',
      title: '提示'
    })
    .then(() => {
      toast.success('删除成功')
      resolve(true)
    })
    .catch(() => {
      toast.show('取消删除操作')
    })
}

function handleChange({ files }) {
  fileList.value = files
}
```

## 选择文件前置处理

设置 `before-choose` 函数，在用户点击唤起项时，会执行 `before-choose` 函数，接收 { fileList: 文件列表, resolve }，通过 `resolve` 函数告知组件是否确定通过，`resolve` 接受 1 个 boolean 值，`resolve(true)` 表示选项通过，`resolve(false)` 表示选项不通过，不通过时不会执行选择文件操作。

```html
<wd-upload :file-list="fileList" action="https://ftf.jd.com/api/uploadImg" @change="handleChange" :before-choose="beforeChoose"></wd-upload>
```

```typescript
import { useToast, useMessage } from '@/uni_modules/wot-design-uni'

const messageBox = useMessage()
const toast = useToast()
const fileList = ref<any[]>([
  {
    url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
  }
])

const beforeChoose = (file, resolve) => {
  messageBox
    .confirm({
      msg: '是否选择',
      title: '提示'
    })
    .then(() => {
      resolve(true)
    })
    .catch(() => {
      toast.show('取消选择操作')
    })
}

function handleChange({ files }) {
  fileList.value = files
}
```

## 上传至云存储

设置 `buildFormData` 函数，在用户点击上传时，会执行 `buildFormData` 函数，接收 `{ file, formData, resolve }`
- `file` 当前上传的文件
- `formData` 待处理的`formData`
- `resolve` 函数，用于告知组件是否组装`formData`成功，`resolve(formData)` 表示组装成功。

 

```html
<wd-upload :file-list="files" :action="host" :build-form-data="buildFormData" @change="handleChange"></wd-upload>
```

:::tip 参考
- 上传至阿里云 OSS 的示例，参考[地址](https://help.aliyun.com/zh/oss/use-cases/use-wechat-mini-programs-to-upload-objects)
- 上传至腾讯云 COS 的示例，参考[地址](https://cloud.tencent.com/document/product/436/34929)
- 上传至华为云 OBS 的示例，参考[地址](https://support.huaweicloud.com/bestpractice-obs/obs_05_2000.html)
:::

::: code-group

```ts [阿里云OSS]
const host = ref<string>('Bucket访问域名，例如https://examplebucket.oss-cn-zhangjiakou.aliyuncs.com')

const files = ref<Record<string, any>[]>([])

function handleChange({ fileList }) {
  files.value = fileList
}

/* *
 * 构建 formData
 * @param {Object} { file, formData, resolve }
 * @return {Object} formData
 * */
const buildFormData = ({ file, formData, resolve }) => {
  let imageName = file.url.substring(file.url.lastIndexOf('/') + 1) // 从图片路径中截取图片名称
  // #ifdef H5
  // h5端url中不包含扩展名，可以拼接一下name
  imageName = imageName + file.name
  // #endif
  const signature = 'your <signatureString>' // 签名信息
  const ossAccessKeyId = 'your <accessKey>' // 你的AccessKey ID
  const policy = 'your <policyBase64Str>' // policy信息
  const key = `20231120/${imageName}` // 图片上传到oss的路径(拼接你的文件夹和文件名)
  const success_action_status = '200' // 将上传成功状态码设置为200，默认状态码为204

  formData = {
    ...formData,
    key: key,
    OSSAccessKeyId: ossAccessKeyId,
    policy: policy,
    signature: signature,
    success_action_status: success_action_status
  }
  resolve(formData) // 组装成功后返回 formData，必须返回
}
```

```TS [腾讯云COS]
const host = ref<string>('Bucket访问域名，例如https://examplebucket.oss-cn-zhangjiakou.aliyuncs.com')

const files = ref<Record<string, any>[]>([])

function handleChange({ fileList }) {
  files.value = fileList
}

/* *
 * 构建 formData
 * @param {Object} { file, formData, resolve }
 * @return {Object} formData
 * */
const buildFormData = ({ file, formData, resolve }) => {
  let imageName = file.url.substring(file.url.lastIndexOf('/') + 1) // 从图片路径中截取图片名称
  // #ifdef H5
  // h5端url中不包含扩展名，可以拼接一下name
  imageName = imageName + file.name
  // #endif
  const policy = 'your policy' // policy信息
  const key = `20231120/${imageName}` // 图片上传到oss的路径(拼接你的文件夹和文件名)
  const qAk = 'your qAk'
  const qSignAlgorithm = 'your qSignAlgorithm'
  const qKeyTime = 'your qKeyTime'  
  const qSignature = 'your qSignature'  
  const success_action_status = '200' // 将上传成功状态码设置为200
  formData = {
    ...formData,
    key: key,
    policy: policy,
    'q-sign-algorithm': qSignAlgorithm,
    'q-ak': qAk,
    'q-key-time': qKeyTime,
    'q-signature': qSignature,
    success_action_status: success_action_status
  }
  resolve(formData) // 组装成功后返回 formData，必须返回
}
```

```ts [华为云OBS]
const host = ref<string>('Bucket访问域名，例如https://examplebucket.oss-cn-zhangjiakou.aliyuncs.com')

const files = ref<Record<string, any>[]>([])

function handleChange({ fileList }) {
  files.value = fileList
}

/* *
 * 构建 formData
 * @param {Object} { file, formData, resolve }
 * @return {Object} formData
 * */
const buildFormData = ({ file, formData, resolve }) => {
  let imageName = file.url.substring(file.url.lastIndexOf('/') + 1) // 从图片路径中截取图片名称
  // #ifdef H5
  // h5端url中不包含扩展名，可以拼接一下name
  imageName = imageName + file.name
  // #endif
  const signature = 'your <signature>' // 签名信息
  const accessKeyId = 'your <accessKeyId>' // 你的AccessKey ID
  const policy = 'your <policyBase64Str>' // policy信息
  const key = `20231120/${imageName}` // 图片上传到oss的路径(拼接你的文件夹和文件名)
  const success_action_status = '200' // 将上传成功状态码设置为200，默认状态码为204

  formData = {accessKeyId
    ...formData,
    key: key,
    policy: policy,
    AccessKeyId: accessKeyId,
    signature: signature
    success_action_status: success_action_status
  }
  resolve(formData) // 组装成功后返回 formData，必须返回
}
```

:::

## 自定义唤起上传样式

使用默认插槽可以修改唤起上传的样式。

开启`use-default-slot`属性。

```html
<wd-upload :file-list="fileList" use-default-slot action="https://ftf.jd.com/api/uploadImg" @change="handleChange">
  <wd-button>上传</wd-button>
</wd-upload>
```

```typescript
const fileList = ref<any[]>([
  {
    url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg'
  }
])
```

## Attributes

| 参数             | 说明                                                                                                                                                                           | 类型                                  | 可选值 | 默认值                     | 最低版本 |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- | ------ | -------------------------- | -------- |
| file-list        | 上传的文件列表, 例如: [{ name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg' }]                                                                                               | array                                 | -      | []                         | -        |
| action           | 必选参数，上传的地址                                                                                                                                                           | string                                | -      | -                          | -        |
| header           | 设置上传的请求头部                                                                                                                                                             | object                                | -      | -                          | -        |
| multiple         | 是否支持多选文件                                                                                                                                                               | boolean                               | -      | -                          | -        |
| disabled         | 是否禁用                                                                                                                                                                       | boolean                               | -      | false                      | -        |
| limit            | 最大允许上传个数                                                                                                                                                               | number                                | -      | -                          | -        |
| show-limit-num   | 限制上传个数的情况下，是否展示当前上传的个数                                                                                                                                   | boolean                               | -      | false                      | -        |
| max-size         | 文件大小限制，单位为`byte`                                                                                                                                                     | number                                | -      | -                          | -        |
| source-type      | 选择图片的来源，chooseImage 接口详细参数，查看[官方手册](https://uniapp.dcloud.net.cn/api/media/image.html#chooseimage)                                                        | array / string                        | -      | ['album', 'camera']        | -        |
| size-type        | 所选的图片的尺寸，chooseImage 接口详细参数，查看[官方手册](https://uniapp.dcloud.net.cn/api/media/image.html#chooseimage)                                                      | array / string                        | -      | ['original', 'compressed'] | -        |
| name             | 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容，uploadFile 接口详细参数，查看[官方手册](https://uniapp.dcloud.net.cn/api/request/network-file#uploadfile) | string                                | -      | file                       | -        |
| formData         | HTTP 请求中其他额外的 form data，uploadFile 接口详细参数，查看[官方手册](https://uniapp.dcloud.net.cn/api/request/network-file#uploadfile)                                     | object                                | -      | -                          | -        |
| header           | HTTP 请求 Header，Header 中不能设置 Referer，uploadFile 接口详细参数，查看[官方手册](https://uniapp.dcloud.net.cn/api/request/network-file#uploadfile)                         | object                                | -      | -                          | -        |
| on-preview-fail  | 预览失败执行操作                                                                                                                                                               | function({ index, imgList })          | -      | -                          | -        |
| before-upload    | 上传文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止上传。                                                                        | function({ files, fileList, resolve })	 | -      | -                          | -        |
| before-choose    | 选择图片之前的钩子，参数为文件列表，若返回 false 或者返回 Promise 且被 reject，则停止上传。                                                                                    | function({ fileList, resolve })       | -      | -                          | -        |
| before-remove    | 删除文件之前的钩子，参数为要删除的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止上传。                                                                      | function({ file, fileList, resolve }) | -      | -                          | -        |
| before-preview   | 图片预览前的钩子，参数为预览的图片下标和图片列表，若返回 false 或者返回 Promise 且被 reject，则停止上传。                                                                      | function({ index, imgList, resolve }) | -      | -                          | -        |
| build-form-data   | 构建上传`formData`的钩子，参数为上传的文件、待处理的`formData`，返回值为处理后的`formData`，若返回 false 或者返回 Promise 且被 reject，则停止上传。  | function({ file, formData, resolve }) | -      | -                          | 0.1.61        |
| loading-type     | [加载中图标类型](/component/loading)                                                                                                                                           | string                                | -      | circular-ring              | -        |
| loading-color    | [加载中图标颜色](/component/loading)                                                                                                                                           | string                                | -      | #ffffff                    | -        |
| loading-size     | [加载中图标尺寸](/component/loading)                                                                                                                                           | string                                | -      | 24px                       | -        |
| use-default-slot | 开启默认唤起项插槽                                                                                                                                                             | boolean                               | -      | false                      | -        |
| status-key       | file 数据结构中，status 对应的 key                                                                                                                                             | string                                | -      | status                     | -        |

## file 数据结构

| 键名     | 类型            | 说明                                       | 最低版本 |
| -------- | --------------- | ------------------------------------------ | -------- |
| uid      | number          | 当前上传文件在列表中的唯一标识             | -        |
| url      | string          | 上传图片地址                               | -        |
| action   | string          | 上传的地址                                 | -        |
| percent  | number          | 上传进度                                   | -        |
| size     | number          | 响文件尺寸应码                             | -        |
| status   | string          | 当前图片上传状态                           | -        |
| response | string / object | 后端返回的内容，可能是对象，也可能是字符串 | -        |

## Slot

| name    | 说明             | 最低版本 |
| ------- | ---------------- | -------- |
| default | 上传唤起插槽样式 | -        |

## Events

| 事件名称    | 说明                   | 参数                                                                        | 最低版本 |
| ----------- | ---------------------- | --------------------------------------------------------------------------- | -------- |
| success     | 上传成功时触发         | event = { file, fileList,formData } file 为当前选上传的文件，'fileList' 上传图片列表 | -        |
| fail        | 上传失败时触发         | event = { error, file,formData } error 错误信息，file 上传失败的文件                 | -        |
| progress    | 上传中时触发           | event = { response, file } response 上传中响应信息，file 为当前选上传的文件 | -        |
| chooseerror | 选择图片失败时触发     | event = { error } error 选择图片失败的错误信息                              | -        |
| change      | 上传列表修改时触发     | 选中的值 event = { fileList } 'fileList' 上传图片列表                       | -        |
| remove      | 移除图片时触发         | event = { file } file: 移除的文件信息                                       | -        |
| oversize    | 文件大小超过限制时触发 | event = { file } file: 尺寸超出的文件信息                                   | -        |
