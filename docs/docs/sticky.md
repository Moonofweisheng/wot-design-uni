## Sticky 粘性布局

### 引入

```json
{
  "usingComponents": {
    // 全局吸顶
    "wd-sticky": "/wot-design/sticky/index",
    // 指定容器时引入
    "wd-sticky-box": "/wot-design/stickyBox/index",
  }
}
```

### 基本用法

将需要吸顶的内容包裹在 `wd-sticky` 组件内即可。

> 注意：被包裹的元素在样式中使用百分比单位 `width:xx%;height:xx%;` 无效，建议使用 `vh`、`vw`。

```html
<wd-sticky>
  <wd-button type="success">基础用法</wd-button>
</wd-sticky>
```

### 动态插入

`wd-sticky` 支持包裹动态生成的内容。

> 注意包裹动态生成的内容时，内容的宽高不小于 `1px`

```html
<view style="margin-top: 20px;">
  <wd-button type="error" jd:if="{{show}}">点击插入</wd-button>
  <wd-sticky>
    <wd-button type="success" jd:if="{{show}}">动态插入</wd-button>
  </wd-sticky>
</view>
```

```javascript
Page({
  data: {
    show: false
  },
  display () {
    this.setData({ show: true })
  },
  onShow () {
    setTimeout(this.display, 5000)
  }
})
```

```css
page{
  height: 200vh;
}
```


### 吸顶距离

通过 `offset-top` 属性可以设置组件在吸顶时与顶部的距离。

```html
<wd-sticky offset-top="{{50}}">
  <wd-button>吸顶距离</wd-button>
</wd-sticky>
```

### 指定容器

将 `wd-sticky` 组件包裹在自定义容器内，之后再使用 `wd-sticky-box` 包裹自定义容器。

> 注意：被包裹的自定义容器在样式中使用百分比单位 `width:xx%;height:xx%;` 无效，建议使用 `vh`、`vw`。


```html
<wd-sticky-box>
  <view class="container">
    <wd-sticky>
      <wd-button type="warning">指定容器</wd-button>
    </wd-sticky>
  </view>
</wd-sticky-box>
```

```css
.container{
    height: 150px;width: 100vw;
}
```

### Sticky Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|--------|
| z-index | 堆叠顺序 | number | - | 1 | - |
| offset-top | 吸顶距离 | number | - | 0 | - |

### Sticky 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根结点样式 | - |

### Sticky Box 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根结点样式 | - |