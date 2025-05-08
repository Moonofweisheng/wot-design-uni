---
url: 'https://wot-design-uni.cn/component/divider.md'
---
# Divider 分割线

用于将内容分隔为多个区域。

:::danger 请注意
`hairline`、`dashed`、`content-position`、`vertical`属性为 1.5.0 版本新增支持，在此之前仅支持默认插槽显示文本和自定义`color`。
:::

## 基本使用

默认渲染一条水平分割线。

```html
<wd-divider></wd-divider>
```

## 展示文本

使用默认插槽在分割线中间插入内容。

```html
<wd-divider>展示文本</wd-divider>
```

## 自定义渲染内容

使用默认插槽在分割线中间插入自定义内容。

```html
<wd-divider>
  <wd-icon name="arrow-down" size="20" color="#1989fa" />
</wd-divider>
```

## 内容位置

通过 `content-position` 指定内容所在位置。

```html
<wd-divider>中间</wd-divider>
<wd-divider content-position="left">左侧</wd-divider>
<wd-divider content-position="right">右侧</wd-divider>
```

## 虚线

添加 `dashed` 属性使分割线渲染为虚线。

```html
<wd-divider dashed>虚线分割</wd-divider>
```

## 自定义颜色

设置 `color` 属性。

```html
<wd-divider color="#4D80F0">自定义颜色</wd-divider>
```

## 垂直分割线

添加 `vertical` 属性使分割线渲染为垂直分割线。

```html
<view class="content">
  文本
  <wd-divider vertical />
  文本
  <wd-divider vertical dashed />
  文本
  <wd-divider vertical :hairline="false" />
  文本
  <wd-divider vertical color="#1989fa" />
  文本
</view>
```

```css
.content {
  padding: 12rpx 15px;
}
```

## Attributes

| 参数             | 说明                           | 类型    | 可选值                  | 默认值   | 最低版本         |
| ---------------- | ------------------------------ | ------- | ----------------------- | -------- | ---------------- |
| color            | 自定义颜色，支持所有颜色的写法 | string  | -                       | -        | -                |
| hairline         | 是否显示边框                   | boolean | -                       | true     | 1.5.0 |
| dashed           | 是否显示为虚线                 | boolean | -                       | false    | 1.5.0 |
| content-position | 内容位置                       | string  | `left`/`center`/`right` | `center` | 1.5.0 |
| vertical         | 是否显示为垂直分割线           | boolean | -                       | false    | 1.5.0 |

## Slot

| name    | 说明 | 最低版本 |
| ------- | ---- | -------- |
| default | 内容，仅在 `vertical` 为 `false` 时生效 | -        |

## 外部样式类

| 类名         | 说明       | 最低版本 |
| ------------ | ---------- | -------- |
| custom-class | 根节点样式 | -        |
