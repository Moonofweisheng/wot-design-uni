# Popup 弹出层

弹出层组件，用于展示弹窗、信息提示等内容。

## 基本用法

`v-model` 为绑定值，表示是否展示弹出层。

```html
<wd-popup v-model="show" custom-style="border-radius:32rpx;" @close="handleClose">
  <text class="custom-txt">弹弹弹</text>
</wd-popup>
```
```css
.custom-txt {
  color: black;
  width: 400rpx;
  height: 400rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40rpx;
  border-radius: 32rpx;
}
```

## 弹出位置

设置 `position`，默认为 'center'，可选值 'top', 'right', 'bottom', 'left'。

```html
<wd-popup v-model="show" position="top" custom-style="height: 200px;" @close="handleClose"></wd-popup>
```

## 关闭按钮

设置 `closable` 属性。

```html
<wd-popup v-model="show" position="bottom" closable custom-style="height: 200px;" @close="handleClose"></wd-popup>
```

## 禁用遮罩点击

通过设置 `close-on-click-modal` 属性为 `false`，你可以禁用用户点击遮罩层时关闭弹出层的功能。

```html
<wd-popup v-model="show" position="bottom" :close-on-click-modal="false" closable custom-style="height: 200px;" @close="handleClose"></wd-popup>
```

## 禁用遮罩

通过设置 `modal` 属性为 `false`，你可以禁用遮罩层，使用户可以与底层内容进行交互。

```html
<wd-popup v-model="show" position="bottom" :modal="false" closable custom-style="height: 200px;" @close="handleClose"></wd-popup>
```


## 开启底部安全区

通过设置 `safe-area-inset-bottom` 属性为 `true`，你可以确保弹出层在底部显示时不会被底部安全区域遮挡。

```html
<wd-popup v-model="show" position="bottom" :safe-area-inset-bottom="true" custom-style="height: 200px;" @close="handleClose"></wd-popup>
```

## root-portal

当使用 `root-portal` 属性为 `true` 时，弹出层会从页面中脱离出来，这可以避免父组件的 transform、filter 等 CSS 属性影响弹出层的 fixed 定位。

不同平台采用不同的实现方案：
- **H5端**：使用 Vue 3 的 teleport 特性
- **APP端**：使用 renderjs 将元素移动到 uni-app 根节点
- **微信小程序/支付宝小程序**：使用 root-portal 组件
- **其他平台**：不支持此功能

```html
<wd-popup v-model="show" root-portal position="center" custom-style="height: 200px;" @close="handleClose">
  <text class="custom-txt">我被传送到了根节点中</text>
</wd-popup>
```

:::tip 提示
该功能主要用于解决复杂布局中弹窗的层级和定位问题，在需要时才建议开启。
:::

## 禁止滚动穿透

使用组件时，会发现内容部分滚动到底时，继续划动会导致底层页面的滚动，这就是滚动穿透。

目前，组件可以通过 `lock-scroll` 属性处理部分滚动穿透问题。 但由于小程序和APP平台自身原因，弹窗内容区域仍会出现滚动穿透。 不过，我们为开发者提供了一个推荐方案以完整解决滚动穿透：

可以使用 [page-meta](https://uniapp.dcloud.net.cn/component/page-meta#page-meta) 组件动态修改 `page-meta` 的 `overflow` 属性。
```html
<!-- page-meta 只能是页面内的第一个节点 -->
<page-meta :page-style="`overflow:${show ? 'hidden' : 'visible'};`"></page-meta>

<wd-popup v-model="show" lock-scroll position="bottom" :safe-area-inset-bottom="true" custom-style="height: 200px;" @close="handleClose"></wd-popup>
```

:::tip 提示
h5 滚动穿透不需要处理，组件已默认开启 `lock-scroll`。
:::

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|-----|------|-------|-------|---------|
| v-model | 弹出层是否显示 | boolean | - | - | - |
| position | 弹出位置 | string | center / top / right / bottom / left | center | - |
| closable | 关闭按钮 | boolean | - | false | - |
| close-on-click-modal | 点击遮罩是否关闭 | boolean | - | true | - |
| duration | 动画持续时间 | number / boolean | - | 300(ms) | - |
| z-index | 设置层级 | number | - | 10 | - |
| custom-style | 自定义弹出层样式 | string | - | - | - |
| modal | 是否显示遮罩 | boolean | - | true | - |
| modal-style | 自定义modal蒙层样式 | string | - | - | - |
| hide-when-close | 是否当关闭时将弹出层隐藏(display: none) | boolean | - | true | - |
| lazy-render | 弹层内容懒渲染，触发展示时才渲染内容 | boolean | - | true | - |
| safe-area-inset-bottom | 弹出面板是否设置底部安全距离（iphone X 类型的机型） | boolean | - | false | - |
| transition | 动画类型，参见 wd-transition 组件的name | string | fade / fade-up / fade-down / fade-left / fade-right / slide-up / slide-down / slide-left / slide-right / zoom-in | - | - |
| lock-scroll | 是否锁定背景滚动，锁定时蒙层里的内容也将无法滚动 | boolean | - | true | 0.1.30 |
| root-portal | 是否从页面中脱离出来，用于解决各种 fixed 失效问题 | boolean | - | false | 1.11.0 |

## Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|---------|-----|-----|---------|
| close | 弹出层关闭时触发 | - | - |
| click-modal | 点击遮罩时触发 | - | - |
| before-enter | 进入前触发 | - | - |
| enter | 进入时触发 | - | - |
| after-enter | 进入后触发 | - | - |
| before-leave | 离开前触发 | - | - |
| leave | 离开时触发 | - | - |
| after-leave | 离开后触发| - | - |

## 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根节点样式 | - |
