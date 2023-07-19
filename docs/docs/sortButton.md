## SortButton 排序按钮

### 引入

```json
{
  "usingComponents": {
    "wd-sort-button": "/wot-design/sortButton/index"
  }
}

```

### 基本用法

`value` 为组件状态，其值为：`-1、0、1`，分别代表：降序、未选中状态、升序。 `title` 为展示文案，按钮默认处于未选中状态，监听 `bind:change` 事件获取新值。

```html
<wd-sort-button title="价格" value="{{value}}" bind:change="handleChange" />
```

```javascript
Page({
  data: {
    value: 0
  },
  handleChange (event) {
    this.setData({
      value: event.detail.value
    })
  }
})
```

### 按钮重置

双箭头状态下(默认状态)通过设置 `allow-reset` 允许重置按钮为未选中状态

```html
<wd-sort-button title="价格" allow-reset/>
```

### 优先切换为降序

通过设置 `desc-first` 优先切换为降序，默认为升序。

```html
<wd-sort-button value="{{ value }}" desc-first title="价格" />
```

### 取消展示下划线

当只有一个排序按钮时，应该不展示下划线，设置 `line` 属性为 `false`。

```html
<wd-sort-button value="{{ value }}" line="{{false}}" title="价格" />
```

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|--------|
| value | 选中的箭头方向：1 升序，0 重置状态，-1 降序。 | number | -1,0,1 | 0或-1 | - |
| title | 排序按钮展示的文案。 | string | - |	- | - |
| allow-reset | 展示双箭头时，允许手动重置按钮。 | boolean | - | false | - |
| desc-first | 优先切换为降序，不开启则默认优先切换为升序 | boolean | - | false | - |
| line | 展示下划线，当只有一个排序按钮时，应该不展示下划线 | boolean | - | true | - |

### Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|---------|-----|-----|---------|
| bind:change | 监听排序修改 | event.detail = { value } | - |

### 外部样式类
| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根结点样式 | - |
