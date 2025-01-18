# Signature 签名 <el-tag text style="vertical-align: middle;margin-left:8px;" effect="plain">1.6.0</el-tag>

用于签名场景，基于 Canvas 实现的签名组件。它提供了多种自定义选项，包括签名笔的颜色、宽度以及自定义操作按钮。

:::tip 提醒
如果遇到导出图片不清晰，可以将`exportScale`设置为`2`以上。
:::

## 基础用法

```html
<wd-signature @submit="confirm" @clear="clear" />
<wd-img :height="img.height" :width="img.width" :src="img.src" v-if="img.src" />
```

```typescript
const img = ref({
  width: 0,
  height: 0,
  src: ''
})

function confirm(result: SignatureResult) {
  img.value.src = result.tempFilePath
  img.value.height = result.height
  img.value.width = result.width
}
```

## 自定义画笔颜色

`pen-color`设置签名笔的颜色，默认为`黑色`。

```html
<wd-signature pen-color="red" />
```

## 自定义画笔宽度

`line-width`设置签名笔的宽度，默认为`2`。

```html
<wd-signature :line-width="6" />
```

## 自定义背景色

`background-color`设置画板的背景色，无默认值。

```html
<wd-signature background-color="lightgray" />
```

## 禁用滚动

`disable-scroll`设置是否禁用画布滚动，默认为`true`。

```html
<wd-signature :disable-scroll="false" />
```

## 自定义按钮

通过`footer`插槽可以自定义按钮。

```html
<wd-signature :disabled="disabled">
  <template #footer="{ clear, confirm }">
    <wd-button block @click="changeDisabled" v-if="disabled">开始签名</wd-button>
    <wd-button v-if="!disabled" size="small" plain @click="clear">清除</wd-button>
    <wd-button v-if="!disabled" size="small" custom-style="margin-left: 4px" @click="confirm">确认</wd-button>
  </template>
</wd-signature>
```

```typescript
const disabled = ref(true)

function changeDisabled() {
  disabled.value = false
}
```

## Attributes

| 参数            | 说明                                                                 | 类型    | 可选值 | 默认值   | 最低版本 |
|-----------------|----------------------------------------------------------------------|---------|--------|----------|----------|
| penColor        | 签名笔颜色                                                           | String  | --     | #000000  | --       |
| lineWidth       | 签名笔宽度                                                           | Number  | --     | 2        | --       |
| height          | 画布的高度                                                           | Number  | --     | 200      | --       |
| width           | 画布的宽度                                                           | Number  | --     | 300      | --       |
| clearText       | 清空按钮的文本                                                       | String  | --     | 清空     | --       |
| confirmText     | 确认按钮的文本                                                       | String  | --     | 确认     | --       |
| fileType        | 目标文件的类型，[uni.canvasToTempFilePath属性介绍](https://uniapp.dcloud.net.cn/api/canvas/canvasToTempFilePath.html) | String  | --     | png      | --       |
| quality         | 图片的质量，取值范围为 `(0, 1]`，不在范围内时当作1.0处理，[uni.canvasToTempFilePath属性介绍](https://uniapp.dcloud.net.cn/api/canvas/canvasToTempFilePath.html) | Number  | --  | 1    | --    |
| exportScale     | 导出图片的缩放比例                                                   | Number  | --     | 1        | --       |
| disabled        | 是否禁用签名板                                                       | Boolean | --     | false    | --       |
| backgroundColor | 画板的背景色                                                         | String  | --     | --       | --       |
| disableScroll   | 是否禁用画布滚动                                                     | Boolean | --     | true     | --       |

## Slot

| name   | 说明           | 参数                  | 最低版本 |
|--------|----------------|-----------------------|----------|
| footer | 自定义footer   | `{ clear, confirm }`  | -        |

## Events

| 事件名称  | 说明               | 参数                                      | 最低版本 |
|-----------|--------------------|-------------------------------------------|----------|
| start     | 开始签名时触发     | -                                         | -        |
| end       | 结束签名时触发     | -                                         | -        |
| signing   | 签名过程中触发     | `event`                                   | -        |
| confirm   | 点击确定按钮时触发 | `{tempFilePath, width, height, success}` 分别为生成文件的临时路径 (本地路径)、生成图片宽、生成图片高、是否成功 | -        |
| clear     | 点击清空按钮时触发 | -                                         | -        |

## Methods

对外暴露函数

| 事件名称  | 说明               | 参数                                      | 最低版本 |
|-----------|--------------------|-------------------------------------------|----------|
| confirm   | 点击确认按钮时触发 | `{tempFilePath, width, height, success}` 分别为生成文件的临时路径 (本地路径)、生成图片宽、生成图片高、是否成功 | -        |
| clear     | 点击清空按钮时触发 | -                                         | -        |
