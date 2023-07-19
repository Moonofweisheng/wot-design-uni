## Resize 监听元素尺寸变化

当组件包裹的文档流尺寸发生变化时，触发 `size` 事件。一般用于监听 dom 内容更新时导致的 dom 尺寸位置的变化，重新获取 dom 尺寸和位置，进行内容展示的计算操作。

### 引入

```json
{
  "usingComponents": {
    "wd-resize": "/wot-design/resize/index"
  }
}
```

### 基本用法

> 不要给此组件增加任何外部样式

```html
<wd-resize bind:resize="handleResize">
  <view style="background: #4d80f0; width: {{width}};height: {{height}}"></view>
</wd-resize>
```

```javascript
Page({
  data: {
    width: '',
    height: ''
  },
  handleResize ({ detail }) {
    const { height, width, top, right, bottom, left } = detail
    console.log(height, width, top, right, bottom, left)
  },
  onReady () {
    setTimeout(() => {
      this.setData({
        width: '100px',
        height: '100px'
      })
    }, 1500)
  }
})
```

### Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|--------|------|-----|---------|
| bind:size | 尺寸发生变化时触发 | event.detail = { width: number, height: number, top: number, right: number, bottom: number, left: number } | - |
