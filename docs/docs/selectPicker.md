## SelectPicker 单复选选择器

### 引入

```json
{
  "usingComponents": {
    "wd-select-picker": "/wot-design/selectPicker/index"
  }
}
```

### 基本用法

`label` 设置左侧文本内容；

`columns` 设置数据源，为二维数组，每一列为一个一维数组，每个选项包含 `value`(选项值) 和 `label`(选项名称)；

`value` 设置选中项的值，数据类型为 `Array` | `String` `Number` 或 `Boolean`；

监听 `bind:confirm` 事件，获取新值。

```html
<wd-select-picker label="基本用法" value="{{ value }}" columns="{{ columns }}" bindchange="handleChange" binconfirm="handleConfirm"></wd-select-picker>
```

```javascript
Page({
  data: {
   columns1: [
      {
        value: '1',
        label: '京麦'
      },
      {
        value: '2',
        label: '京东金融'
      },
      {
        value: '3',
        label: '京me'
      }
    ],
    value: ['1']
  },
  handleChange (event) {
    Toast('选择了' + event.detail.value)
  },
  handleConfirm (event) {
    this.setData({
      value: event.detail.value
    })
  }
})
```

### 类型切换

`type` 默认值为 `checkbox`， 为默认值时，value值类型为 `Array` 类型

设置 `type` 值为 `radio` ，开启单选类型，value值类型为 `String` `Number` 或 `Boolean`。

```html
<wd-select-picker label="类型切换" value="{{ value }}" columns="{{ columns }}" type="radio" binconfirm="handleConfirm"></wd-select-picker>
```

```javascript
Page({
  data: {
   columns1: [
      {
        value: '1',
        label: '京麦'
      },
      {
        value: '2',
        label: '京东金融'
      },
      {
        value: '3',
        label: '京me'
      }
    ],
    value: '1'
  },
  handleConfirm (event) {
    this.setData({
      value: event.detail.value
    })
  }
})
```

### 禁用

设置 `disabled` 属性。

```html
<wd-select-picker label="禁用" value="{{ value }}" columns="{{ columns }}" disabled binconfirm="handleConfirm"></wd-select-picker>
```

### 只读

设置 `readonly` 属性。

```html
<wd-select-picker label="只读" value="{{ value }}" columns="{{ columns }}" readonly binconfirm="handleConfirm"></wd-select-picker>
```

### 禁用选项

`columns` 每个选项支持 `disabled` 属性。

```html
<wd-select-picker label="禁用选项" value="{{ value }}" columns="{{ columns }}" binconfirm="handleConfirm"></wd-select-picker>
```

```javascript
Page({
  data: {
   columns1: [
      {
        value: '1',
        label: '京麦',
        disabled: true
      },
      {
        value: '2',
        label: '京东金融'
      },
      {
        value: '3',
        label: '京me'
      }
    ],
    value: ['1']
  },
  handleConfirm (event) {
    this.setData({
      value: event.detail.value
    })
  }
})
```

### 展示格式化

设置 `display-format` 属性，其类型为 `function`，接收当前选中项（当类型`checkbox`时 参数是 数组类型，类型为`radio` 时参数是 `String` `Number` 或 `Boolean` 类型）, 当前的选项数组 `columns`，返回要展示的字符串。

```html
<wd-select-picker label="展示格式化" value="{{ value }}" columns="{{ columns }}" :display-format="displayFormat" binconfirm="handleConfirm"></wd-select-picker>
```

```javascript
Page({
  data: {
   columns1: [
      {
        value: '1',
        label: '京麦'
      },
      {
        value: '2',
        label: '京东金融'
      },
      {
        value: '3',
        label: '京me'
      }
    ],
    value: ['1'],

    displayFormat (items, columns) {
      let showValue = ''
      columns.forEach(column => {
        items.forEach((item, index) => {
          if (column.value === item) {
            showValue += `${item}: ${column.label} ${index + 1 < items.length ? '--' : ''} `
          }
        })
      })
      return showValue
    }
  },
  handleConfirm (event) {
    this.setData({
      value: event.detail.value
    })
  }
})
```

### 确定前校验

设置 `before-confirm` 函数，在用户点击`确定`按钮时，会执行 `before-confirm` 函数，并传入`value`(选中项 也就是当前选择的值） 和 `resolve` 参数，可以对 `value` 进行校验，并通过 `resolve` 函数告知组件是否确定通过，`resolve` 接受1个 boolean 值，`resolve(true)` 表示选项通过，`resolve(false)` 表示选项不通过，不通过时不会关闭弹窗。

```html
<wd-select-picker label="确定前校验" value="{{ value }}" columns="{{ columns }}" :before-confirm="beforeConfirm" binconfirm="handleConfirm"></wd-select-picker>
```

```javascript
Page({
  data: {
   columns1: [
      {
        value: '1',
        label: '京麦'
      },
      {
        value: '2',
        label: '京东金融'
      },
      {
        value: '3',
        label: '京me'
      }
    ],
    value: ['1'],

    beforeConfirm (value, resolve) {
      if (value.length > 0) {
        Toast.error('暂时无法选择商品')
        resolve(false)
      } else {
        resolve(true)
      }
    }
  },
  handleConfirm (event) {
    this.setData({
      value: event.detail.value
    })
  }
})
```

### 设置标题

设置 `title` 属性，修改弹出层的标题。

```html
<wd-select-picker label="标题" value="{{ value }}" columns="{{ columns }}" title="多选" binconfirm="handleConfirm"></wd-select-picker>
```

### 错误状态

设置 `error` 属性，选择器的值显示为红色。

```html
<wd-select-picker label="错误" value="{{ value }}" columns="{{ columns }}" error binconfirm="handleConfirm"></wd-select-picker>
```

### 必填样式

设置 `required` 属性，展示必填样式。

```html
<wd-select-picker label="必填" value="{{ value }}" columns="{{ columns }}" required binconfirm="handleConfirm"></wd-select-picker>
```

### 选择器大小

通过设置 `size` 修改选择器大小，将 `size` 设置为 'large' 时字号为 16px。

```html
<wd-select-picker label="大尺寸" value="{{ value }}" columns="{{ columns }}" size="large" binconfirm="handleConfirm"></wd-select-picker>
```

### 值靠右展示

设置 `align-right` 属性，选择器的值靠右展示。

```html
<wd-select-picker label="值靠右展示" value="{{ value }}" columns="{{ columns }}" align-right binconfirm="handleConfirm"></wd-select-picker>
```

### 可搜索

设置 `filterable` 属性支持本地搜索，设置 `filter-placeholder` 属性设置搜索框的占位符。

```html
<wd-select-picker label="可搜索" value="{{ value }}" columns="{{ columns }}" filterable binconfirm="handleConfirm"></wd-select-picker>
```

### 自定义选择器

如果默认的 cell 类型的展示格式不满足需求，可以通过默认插槽进行自定义选择器样式。

```html
<veiw>当前选中项：{{customShow}}</view>
<wd-select-picker value="{{ value }}" columns="{{ columns }}" binconfirm="handleConfirm">
  <wd-button>默认唤起项</wd-button>
</wd-select-picker>
```

```javascript
Page({
  data: {
   columns: [
      {
        value: '1',
        label: '京麦'
      },
      {
        value: '2',
        label: '京东金融'
      },
      {
        value: '3',
        label: '京me'
      }
    ],
    value: [],
    customShow: ''
  },
  handleConfirm (event) {
    this.setData({
      value: event.detail.value,
      customShow: event.detail.selectedItems.map(item => {
        return item.label
      }).join(', ')
    })
  }
})
```

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 最低版本 |
|-----|------|-----|-------|-------|---------|
| value | 选中项，`type`类型为`checkbox`时，类型为 array；`type`为`radio` 时 ，类型为 number / boolean / string | array / number / boolean / string | - | - | - |
| columns | 选择器数据，一维数组 | array | - | - | - |
| type | 单复选选择器类型 | string | checkbox / radio | checkbox | - |
| value-key | 选项对象中，value对应的 key | string | - | value | - |
| label-key | 选项对象中，展示的文本对应的 key | string | - | label | - |
| title | 弹出层标题 | string | - | - | - |
| label | 选择器左侧文案 | string | - | - | - |
| placeholder | 选择器占位符 | string | - | 请选择 | - |
| disabled | 禁用 | boolean | - | fasle | - |
| loading | 加载中 | boolean | - | false | - |
| loading-color | 加载的颜色，只能使用十六进制的色值写法，且不能使用缩写 | String | - | #4D80F0 | - |
| readonly | 只读 | boolean | - | false | - |
| display-format | 自定义展示文案的格式化函数，返回一个字符串 | function | - | - | - |
| confirm-button-text | 确认按钮文案 | string | - | 确认 | - |
| size | 设置选择器大小 | string | large | - | - |
| label-width | 设置左侧标题宽度 | string | - | 33% | - |
| error | 是否为错误状态，错误状态时右侧内容为红色 | boolean | - | false | - |
| required | 必填样式 | boolean | - | false | - |
| align-right | 选择器的值靠右展示 | boolean | - | false | - |
| before-confirm | 确定前校验函数，接收 (value, resolve) 参数，通过 resolve 继续执行 picker，resolve 接收1个boolean参数 | function | - | - | - |
| select-size | 设置picker内部的选项组尺寸大小 （单/复选框） | string | large | - | - |
| min | 最小选中的数量（仅在复选框类型下生效，`type`类型为`checkbox`） | number | - | 0 | - |
| max | 最大选中的数量，0 为无限数量，默认为 0（仅在复选框类型下生效，`type`类型为`checkbox`） | number | - | 0 | - |
| checked-color | 选中的颜色（单/复选框） | string | - | #4D80F0 | - |
| use-default-slot | 使用默认插槽时设置该选项 | boolean | - | false | - |
| use-label-slot | 使用 label 插槽时设置该选项 | boolean | - | false | - |
| name | form 表单中的字段名 | string | - | - | - |
| close-on-click-modal | 点击遮罩是否关闭 | boolean | - | true | - |
| z-index | 弹窗层级 | number | - | 15 | 2.3.0 |
| safe-area-inset-bottom | 弹出面板是否设置底部安全距离（iphone X 类型的机型） | boolean | - | true | 2.3.0 |
| filterable | 可搜索（目前只支持本地搜索） | boolean | - | false | 2.3.0 |
| filter-placeholder | 搜索框占位符 | string | - | 搜索 | 2.3.0 |
| ellipsis | 是否超出隐藏 | boolean | - | false | 2.3.0 |

### 选项数据结构

| 键名 | 说明 | 类型 | 是否必填 | 最低版本 |
|------|-----|-----|---------|--------|
| value | 选项值 | string | 是 | - |
| label | 选项名 | string | 是 | - |
| disabled | 禁用选项 | boolean | 否 | - |

### Events

| 事件名称 | 说明 | 参数 | 最低版本 |
|--------|-----|-------|--------|
| bind:confirm | 点击确认时触发 | event.detail = { value, selectedItems }, checkbox 类型时 value 和 selectedItems 为数组，radio 类型为非数组 | - |
| bind:change | picker内选项更改时触发 |  event.detail = { value }, checkbox 类型时 value 为数组，radio 类型为非数组 | - |
| bind:cancel | 点击关闭按钮或者蒙层时触发 | - | - |

### Methods

| 方法名称 | 说明 | 参数 | 最低版本 |
|---------|-----|-----|---------|
| open | 打开弹窗 | - | - |
| close | 关闭弹窗 | - | - |

### Slots

| 插槽名称 | 说明 | 最低版本 |
|---------|-----|--------|
| default | 自定义展示 | - |
| label | 左侧插槽 | - |

### 外部样式类

| 类名 | 说明 | 最低版本 |
|-----|------|--------|
| custom-class | 根结点样式 | - |
| custom-label-class | label 外部自定义样式 | - |
| custom-value-class | value 外部自定义样式 | - |
| custom-content-class | 弹出层内容区域自定义样式 | - |
