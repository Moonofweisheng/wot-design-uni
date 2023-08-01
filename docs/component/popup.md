<frame/>

#  Popup 弹出层


## 基本用法

`v-model` 为绑定值，表示是否展示弹出层。

```html
<wd-popup v-model="show" custom-style="padding: 30px 40px;" @close="handleClose">内容</wd-popup>
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
| hide-when-close | 是否当关闭时将弹出层隐藏（display: none) | boolean | - | true | - |
| lazy-render | 弹层内容懒渲染，触发展示时才渲染内容 | boolean | - | true | - |
| safe-area-inset-bottom | 弹出面板是否设置底部安全距离（iphone X 类型的机型） | boolean | - | false | - |

## Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|---------|-----|-----|---------|
| close | 弹出层关闭时触发 | - | - |
| clickmodal | 点击遮罩时触发 | - | - |
| beforeenter | 进入前触发 | - | - |
| enter | 进入时触发 | - | - |
| afterenter | 进入后触发 | - | - |
| beforeleave | 离开前触发 | - | - |
| leave | 离开时触发 | - | - |
| afterleave | 离开后触发| - | - |

## 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根结点样式 | - |
