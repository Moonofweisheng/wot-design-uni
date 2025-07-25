---
url: 'https://wot-design-uni.cn/component/resize.md'
---
# Resize 监听元素尺寸变化

当组件包裹的文档流尺寸发生变化时，触发 `size` 事件。一般用于监听 dom 内容更新时导致的 dom 尺寸位置的变化，重新获取 dom 尺寸和位置，进行内容展示的计算操作。

## 基本用法

> 不要给此组件增加任何外部样式

```html
<wd-resize @resize="handleResize">
  <view :style="`background: #4d80f0; width: ${width};height: ${height}`"></view>
</wd-resize>
```

```typescript
const width = ref<string>('')
const height = ref<string>('')

onReady(() => {
  setTimeout(() => {
    width.value = '100px'
    height.value = '100px'
  }, 1500)
})

function handleResize(detail: Record<string, string | number>) {
  const { height, width, top, right, bottom, left } = detail
  console.log(height, width, top, right, bottom, left)
}
```

## Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|--------|------|-----|---------|
| resize | 尺寸发生变化时触发 | `{width: number, height: number, top: number, right: number, bottom: number, left: number}` | - |
