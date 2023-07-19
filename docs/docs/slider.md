## Slider 滑块

支持单向滑块和双向滑块。

### 引入

```json
{
  "usingComponents": {
    "wd-slider": "/wot-design/slider/index"
  }
}
```

### 基本用法

`value` 为绑定值。如果为 number 类型则显示一个滑块，如果为 array 类型则显示两个滑块。
```html
<wd-slider value="{{ value }}" bind:dragend="handleChange"/>
```
```javascript
page({
  data: {
   value: 30,
  },
  handleChange (event) {
    this.setData({
      value: event.detail.value
    })
  }
})
```
### 双滑块

双滑块模式下 `value` 为 `二元数组` 类型。

```html
<wd-slider value="{{ value }}" bind:dragend="handleChange"/>
```
```javascript
page({
  data: {
   value: [10, 30],
  },
  handleChange (event) {
    this.setData({
      value: event.detail.value
    })
  }
})
```
### 最大值最小值

设置 `min` 最小值，`min` 最大值。

```html
<wd-slider value="{{ value }}" min="{{ 4 }}" max="{{ 10000 }}" bind:dragend="handleChange"/>
```

### 隐藏文案

设置 `hide-label` 隐藏滑块当前值。

```html
<wd-slider value="{{ value }}" hide-label bbind:dragend="handleChange"/>
```

设置 `hide-min-max` 隐藏最大最小值。

```html
<wd-slider value="{{ value }}" hide-min-max bind:dragend="handleChange"/>
```

### 禁用

设置 `disabled` 属性。

```html
<wd-slider value="{{ value }}" disabled bind:dragend="handleChange"/>
```

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|--------|
| value |	滑块值，如果为array，则为双向滑块 |	number / array | - | - | - |
| hide-min-max | 是否显示左右的最大最小值 |	boolean |	- |	false | - |
| hide-label | 是否显示当前滑块值 | boolean | - | false | - |
| disabled | 是否禁用 | boolean | - | false | - |
| max | 最大值 | number | - | 100 | - |
| min | 最小值 | number | - | 0 | - |
| step | 步进值 | number | - | 1 | - |
| active-color | 进度条激活背景颜色 | string | - | linear-gradient(315deg, rgba(81,124,240,1) 0%,rgba(118,158,245,1) 100%) | - |
| inactive-color | 进度条未激活背景颜色 | string | - | #e5e5e5 | - |
| name | form 表单中的字段名 | string | - | - | - |

### Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|---------|-----|-----|---------|
| bind:dragstart | 开始移动时触发 | event.detail = { value } | - |
| bind:dragmove | 移动滑块时触发 | event.detail = { value } | - |
| bind:dragend | 移动结束时触发 | event.detail = { value } | - |

### 外部样式类
| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根结点样式 | - |
| custom-min-class | 最小值自定义样式 | - |
| custom-max-class | 最大值自定义样式 | - |
