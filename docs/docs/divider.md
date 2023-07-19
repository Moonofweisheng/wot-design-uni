## Divider 分割线

### 引入

```json
{
  "usingComponents": {
    "wd-divider": "/wot-design/divider/index"
  }
}
```

### 基本使用

使用默认插槽设置内容。

```html
<wd-divider>这是分割线</wd-divider>
```

### 自定义颜色

设置 `color` 属性。

```html
<wd-divider color="#4D80F0">自定义颜色</wd-divider>
```

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|--------|
| color | 自定义颜色，所有颜色的写法 | string | - | - | - |

### Slot

| name | 说明 | 最低版本 |
|------|-----|---------|
| default | 内容 | - |

### 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|-----|---------|
| custom-class | 根结点样式 | - |
