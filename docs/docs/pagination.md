## Pagination 分页

### 引入

```json
{
  "usingComponents": {
    "wd-pagination": "/wot-design/pagination/index"
  }
}
```

### 基本用法

通过监听 `change` 事件获取`value`变化后的值，total设置总条数，page-size设置一页展示条数，默认为10条，总页数通过total和page-size自动计算。

```html
<wd-pagination value="{{ value }}" bind:change="handleChange" />

Page({
  data: {
    value: 1
  },
  handleChange ({ detail }) {
    this.setData({
      value: detail
    })
  }
})
```

### Icon图标

设置 `show-icon` 属性，将分页导航展示为Icon图标。

```html
<wd-pagination value="{{ value }}" bind:change="handleChange" show-icon ></wd-pagination>
```

### 文字提示

设置 `show-message` 属性，展示文字提示。

```html
<wd-pagination 
  value="{{ value }}" 
  total="{{ total }}" 
  page-size="{{ page }}" 
  bind:change="handleChange" 
  show-icon 
  show-message
/>
```

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|--------|
| value | 绑定值 | number | - | - | - |
| prev-text | 上一页按钮文字 |  string | - | 上一页 | - |
| next-text | 下一页按钮文字 |  string | - | 下一页 | - |
| total-page | 总页数，如果有total，则优先使用total计算页数 |  number | - | `根据页数计算` | - |
| page-size | 分页大小 |  number | - | 10 | - |
| total | 总数据个数 |  number | - | - | - |
| show-icon | 是否展示分页Icon |  boolean | - | false | - |
| show-message | 是否展示文字提示 |  boolean | - | false | - |
| hide-if-one-page | 总页数只有一页时是否隐藏 |  boolean | - | true | - |

### Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|---------|-----|------|--------|
| bind:change | 值修改事件 | event.detail = { value },value为当前值 |

### 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根结点样式 | - |
