## Img 图片

增强版的 img 标签，提供多种图片填充模式，支持图片懒加载、加载完成、加载失败

### 引入

```json
{
  "usingComponents": {
    "wd-img": "/wot-design/img/index"
  }
}
```

### 基本用法

基础用法与原生 image(v1.9.91) 标签一致，可以设置 `src` 、 `width` 、`height` 等原生属性。

小程序原生属性，参考[微信小程序image官方文档](https://developers.weixin.qq.com/miniprogram/dev/component/image.html)。

此处需要注意的是src属性：

使用 `相对路径`，需要注意 `src` 需要以组件存放位置相对图片位置为相对路径。

使用 `文件导入` ，需要注意的是微信小程序image标签路径接受二进制数据以及base64编码。单独使用import图片路径无法访问。

```html
<wd-img
  width="100"
  height="100"
  src="{{ joy }}"
/>
```

```JavaScript
const joy = 'data:image/jpeg;base64,...'  // 图片文件base64
// const joy = '../../pages/images/jd.png'
page({
  data: {
    joy
  }
})
```

### 填充模式

通过 `mode` 属性可以设置图片填充模式，可选值见下方表格。

mode为小程序原生属性，参考[微信小程序image官方文档](https://developers.weixin.qq.com/miniprogram/dev/component/image.html)。

```html
<wd-img
  width="100"
  height="100"
  mode="center"
  src="{{ joy }}"
/>
```

### 圆形设置

通过 `round` 属性可以设置以圆形展示。

```html
<wd-img
  width="100"
  height="100"
  round
  src="{{ joy }}"
/>
```

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|---------|
| src | 图片链接 | string | - | - | - |
| width | 宽度，默认单位为px | number / string | - | - | - |
| height | 高度，默认单位为px | number / string | - | - | - |
| mode | 填充模式 | string | 'top left' / 'top right' / 'bottom left' / 'bottom right' / 'right' / 'left' / 'center' / 'bottom' / 'top' / 'heightFix' / 'widthFix' / 'aspectFill' / 'aspectFit' / 'scaleToFill' | 'scaleToFill' | - |
| round | 是否显示为圆形 | boolean | - | false | - |

### Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|---------|-----|-----|---------|
| bind:click | 点击事件 | - | - |
| bind:load | 当图片载入完毕时触发 | event.detail = {height, width} | - |
| bind:error | 当错误发生时触发 | event.detail = {errMsg} | - |

### 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根结点样式 | - |
| custom-image| image 外部自定义样式 | - |
