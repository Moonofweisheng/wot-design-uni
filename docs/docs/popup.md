## Popup 弹出层

### 引入

```json
{
  "usingComponents": {
    "wd-popup": "/wot-design/popup/index"
  }
}
```

### 基本用法

通过 `show` 属性设置显示隐藏，监听 `bind:close` 事件修改 `show`。

```html
<wd-popup show="{{ show }}" custom-style="padding: 30px 40px;" bind:close="handleClose">内容</wd-popup>
```

### 弹出位置

设置 `position`，默认为 'center'，可选值 'top', 'right', 'bottom', 'left'。

```html
<wd-popup show="{{ show }}" position="top" custom-style="height: 200px;" bind:close="handleClose"></wd-popup>
```

### 关闭按钮

设置 `closable` 属性。

```html
<wd-popup show="{{ show }}" position="bottom" closable custom-style="height: 200px;" bind:close="handleClose"></wd-popup>
```

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|-----|------|-------|-------|---------|
| show | 弹出层是否显示 | boolean | - | - | - |
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
| safe-area-inset-bottom | 弹出面板是否设置底部安全距离（iphone X 类型的机型） | boolean | - | false | 2.3.0 |

### Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|---------|-----|-----|---------|
| bind:close | 弹出层关闭时触发 | - | - |
| bind:clickmodal | 点击遮罩时触发 | - | - |
| bind:beforeenter | 进入前触发 | - | - |
| bind:enter | 进入时触发 | - | - |
| bind:afterenter | 进入后触发 | - | - |
| bind:beforeleave | 离开前触发 | - | - |
| bind:leave | 离开时触发 | - | - |
| bind:afterleave | 离开后触发| - | - |

### 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根结点样式 | - |
