---
url: 'https://wot-design-uni.cn/component/sticky.md'
---
# Sticky 粘性布局

粘性布局组件，用于在页面滚动时将元素固定在指定位置。

## 基本用法

将需要吸顶的内容包裹在 `wd-sticky` 组件内即可。

> 注意：被包裹的元素在样式中使用百分比单位 `width:xx%;height:xx%;` 无效，建议使用 `vh`、`vw`。

```html
<wd-sticky>
  <wd-button type="success">基础用法</wd-button>
</wd-sticky>
```

## 动态插入

`wd-sticky` 支持包裹动态生成的内容。

> 注意包裹动态生成的内容时，内容的宽高不小于 `1px`

```html
<view style="margin-top: 20px;">
  <wd-button type="error" v-if="show">点击插入</wd-button>
  <wd-sticky>
    <wd-button type="success" v-if="show">动态插入</wd-button>
  </wd-sticky>
</view>
```

```typescript
const show = ref<boolean>(false)

function display() {
  show.value = true
}

onShow(() => {
  setTimeout(display, 5000)
})

```

```scss
page{
  height: 200vh;
}
```

## 吸顶距离

通过 `offset-top` 属性可以设置组件在吸顶时与顶部的距离。
::: tip 提醒
由于在`H5`端导航栏为普通元素，所以吸顶距离会自动在`offset-top`的基础上增加`44px`，当开发者在`H5`端使用自定义导航栏时`offset-top`就需要先减去`44`。例如期望吸顶距离为20px，那么`offset-top = 20 - 44 = -24`
:::

```html
<wd-sticky :offset-top="50">
  <wd-button>吸顶距离</wd-button>
</wd-sticky>
```

## 指定容器

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

```scss
.container{
    height: 150px;width: 100vw;
}
```

## Sticky Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|--------|
| z-index | 堆叠顺序 | number | - | 1 | - |
| offset-top | 吸顶距离 | number | - | 0 | - |

## Sticky 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根节点样式 | - |

## Sticky Box 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根节点样式 | - |
