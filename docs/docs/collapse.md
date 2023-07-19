## Collapse 折叠面板

### 引入

```json
{
  "usingComponents": {
    "wd-collapse": "/wot-design/collapse/index",
    "wd-collapse-item": "/wot-design/collapseItem/index"
  }
}
```

### 基本使用

`value` 为绑定值，可以为 array 类型（普通折叠）、 string 类型（手风琴）和 boolean 类型（收起展开查看更多）。CollapseItem 的 `title` 和 `name` 为必填。`name` 用于标识该折叠栏。
##由于微信小程序非双向绑定，因此需要事件手动赋值到当前页面##
```javascript
page({
  data: {
    value: [ 'item1' ]
  },
  handleChange (event) {
    this.setData({
      value: event.detail.value
    })
  }
})
```
```html
<wd-collapse value="{{ value }}" bind:change="handleChange1">
  <wd-collapse-item title="标签1" name="item1">
    这是一条简单的示例文字。
  </wd-collapse-item>
  <wd-collapse-item title="标签2" name="item2">
    这是一条简单的示例文字。
  </wd-collapse-item>
  <wd-collapse-item title="标签3" name="item3">
    这是一条简单的示例文字。
  </wd-collapse-item>
</wd-collapse>
```

### 手风琴

设置 `accordion` 属性。

```html
<wd-collapse value="{{ value  }}" accordion>
  <wd-collapse-item title="标签1" name="item1">
    这是一条简单的示例文字。
  </wd-collapse-item>
  <wd-collapse-item title="标签2" name="item2">
    这是一条简单的示例文字。
  </wd-collapse-item>
  <wd-collapse-item title="标签3" name="item3">
    这是一条简单的示例文字。
  </wd-collapse-item>
</wd-collapse>
```

### 禁用

给 CollapseItem 设置 `disabled` 属性，禁用某个折叠栏。

```html
<wd-collapse value="{{ value }}">
  <wd-collapse-item title="标签1" name="item1">
    这是一条简单的示例文字。
  </wd-collapse-item>
  <wd-collapse-item title="标签2" name="item2" disabled >
    这是一条简单的示例文字。
  </wd-collapse-item>
  <wd-collapse-item title="标签3" name="item3">
    这是一条简单的示例文字。
  </wd-collapse-item>
</wd-collapse>
```

### 查看更多

Collapse 可以单独使用，通过设置 `viewmore` 属性，将其转化为查看更多的折叠类型，同时可以设置 `line-num` 修改收起时的显示行数。这时候的 `value` 为 boolean 类型。

```html
<wd-collapse viewmore value="{{ value }}">
  这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。
</wd-collapse>
```
### 查看更多-使用插槽
Collapse 查看更多的模式下，可以使用插槽定义自己想要的折叠处样式，使用 `use-more-slot` 设置插槽开启。并且可以使用外部样式类 `custom-more-slot-class` 为自定义插槽设置样式。
```css
.more-slot{
  color: red;
}
```
```html
<wd-collapse viewmore value="{{ value }}" bind:change="handleChange4" use-more-slot custom-more-slot-class="more-slot">
  具名插槽：这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。
  <view slot="more">显示全部</view>
</wd-collapse>
```

### CollapseItem Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|--------|
| name | 折叠栏的标识符 | string | - | - | - |
| title | 折叠栏的标题 | string | - | - | - |
| disabled | 禁用折叠栏 | boolean | - | false | - |

### Collapse Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|--------|
| value | 绑定值 | string / array / boolean | - | - | - |
| accordion | 手风琴 | boolean | - | false | - |
| viewmore | 查看更多的折叠面板 | boolean | - | false | - |
| useMoreSlot | 查看更多的自定义插槽使用标志 | boolean | - | false | - |
| line-num | 查看更多的折叠面板，收起时的显示行数 | number | - | 2 | - |

### Collapse Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|---------|-----|-----|---------|
| bind:change | 绑定值变化时触发 | event.detail = { value } | - |

### Collapse Slot

| name | 说明 | 最低版本 |
|------|-----|---------|
| more | 查看更多，便于开发者自定义查看更多类型的展开收起样式 | - |

### CollapseItem 外部样式类
| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | collapseItem根结点样式 | - |

**注意：组件内插槽样式不生效，因此使用插槽时需注意添加外部样式类**

### Collapse 外部样式类
| 类名 | 说明 | 最低版本 |
|-----|-----|---------|
| custom-class | collapse根结点样式 | - |
| custom-more-slot-class | 查看更多模式下的插槽外部自定义样式 | - |
