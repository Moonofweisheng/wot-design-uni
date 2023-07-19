## NoticeBar 通知栏

### 引入

```json
{
  "usingComponents": {
    "wd-notice-bar": "/wot-design/noticeBar/index"
  }
}
```

### 基本用法

设置 `text` 文本内容和 `prefix` 左侧图标。

```html
<wd-notice-bar
  text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
  prefix="warn-bold"
/>
```

### 类型修改

设置 `type` 可修改通知类型，通知类型共有三种 `info`|`warning`|`danger`，默认值为`warning`。

```html
<wd-notice-bar
  text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
  prefix="warn-bold"
  custom-class="space"
/>
<wd-notice-bar
  text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
  prefix="check-outline"
  type="info"
  custom-class="space"
/>
<wd-notice-bar
  text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
  prefix="wifi-error"
  type="danger"
/>
```
```css
.space{
  margin-bottom: 10px;
}
```

### 插槽演示

```html
<wd-notice-bar>
  <view slot="prefix"><wd-icon name="warn-bold" class="prefix"></wd-icon></view>
  通知被禁或时段内消息屏蔽可能造成消…
  <view slot="suffix" style="color: #4D80F0">查看</view>
</wd-notice-bar>
```
```css
.prefix {
  font-size: 18px;
  padding-right: 4px;
  width: 18px;
  height: 18px;
}
```

### 多行展示

设置 `wrapable` 属性为 `true` 且同时禁止滚动 `scrollable` 即可开启多行展示。

```html
<wd-notice-bar
  text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
  wrapable
  scrollable="{{ false }}"
/>
```

### 可关闭的

设置 `closable` 属性，使通知栏可以关闭。

```html
<wd-notice-bar
  text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
  closable
/>
```

### 自定义颜色

设置 `color` 修改文字和图标颜色，设置 `background-color` 修改背景颜色。

```html
<wd-notice-bar
  text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
  prefix="check-outline"
  closable
  color="#34D19D"
  background-color="#f0f9eb"
/>
```

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|--------|
| text | 设置通知栏文案 | string | - | - | - |
| type | 设置通知栏类型 | string | info / warning / danger | warning | - |
| prefix | 设置左侧图标，使用icon章节中的图标名 | string | - | - | - |
| scrollable | 是否可以滚动 | boolean | - | true | - |
| delay | 滚动动画初始延时，单位 秒(s) | number | - | 1 | - |
| speed | 滚动速度，单位 px/s | number | - | 50 | - |
| closable | 是否可以关闭 | boolean | - | false | - |
| wrapable | 是否换行展示 | boolean | - | false | - |
| color | 文字、图标颜色 | string | - | - | - |
| background-color | 背景颜色 | string | - | - | - |

### Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|--------|------|-----|---------|
| bind:close | 关闭按钮点击时 | - | - |

### Slot

| name | 说明 | 最低版本 |
|------|-----|---------|
| prefix | 前置图标 | - |
| suffix | 后置插槽 | - |

### 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根结点样式 | - |
